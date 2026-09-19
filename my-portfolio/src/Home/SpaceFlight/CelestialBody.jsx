import { memo, useEffect, useMemo, useRef } from 'react';
import { Detailed } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SYSTEM_CENTER } from '../../Journey/solarSystem';
import { bodyStyle, surfacePixels } from './bodyAppearance';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPosition = world.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
const fragmentShader = `
  uniform sampler2D surfaceMap;
  uniform vec3 rimColor;
  uniform vec3 sunPosition;
  uniform float isSun;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 view = normalize(cameraPosition - vPosition);
    vec3 light = normalize(sunPosition - vPosition);
    vec3 albedo = texture2D(surfaceMap, vUv).rgb;
    float diffuse = smoothstep(-0.28, 0.95, dot(normal, light));
    float edge = 1.0 - max(dot(normal, view), 0.0);
    float rim = edge * edge * edge;
    vec3 color = albedo * mix(0.2 + diffuse * 0.9, 1.2 - edge * 0.18, isSun);
    color += rimColor * rim * mix(0.32, 0.12, isSun);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function CelestialBody({ planet, paused }) {
  const spin = useRef(null);
  const style = bodyStyle(planet);
  const sun = planet.type === 'star';
  const resources = useMemo(() => {
    const { pixels, width, height } = surfacePixels(style);
    const texture = new THREE.DataTexture(pixels, width, height, THREE.RGBAFormat);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: {
      surfaceMap: { value: texture }, rimColor: { value: new THREE.Color(style.rim) },
      sunPosition: { value: new THREE.Vector3(...SYSTEM_CENTER) }, isSun: { value: sun ? 1 : 0 },
    } });
    let halo = null;
    if (sun) {
      const size = 64;
      const data = new Uint8Array(size * size * 4);
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const r = Math.hypot((x + .5) / size * 2 - 1, (y + .5) / size * 2 - 1);
        const index = (y * size + x) * 4;
        data[index] = 255; data[index + 1] = 156; data[index + 2] = 48;
        data[index + 3] = Math.max(0, 1 - r) ** 2 * 150;
      }
      halo = new THREE.DataTexture(data, size, size);
      halo.colorSpace = THREE.SRGBColorSpace;
      halo.magFilter = THREE.LinearFilter;
      halo.needsUpdate = true;
    }
    return { texture, material, halo };
  }, [style, sun]);
  useEffect(() => () => {
    resources.material.dispose(); resources.texture.dispose(); resources.halo?.dispose();
  }, [resources]);
  useFrame((_, dt) => {
    if (!paused && spin.current) spin.current.rotation.y += Math.min(dt, .05) * (sun ? .016 : .025);
  });
  const radius = planet.radius;
  return (
    <group>
      <group ref={spin} rotation={[0.12, 0, -0.18]}>
        <Detailed distances={[0, radius * 12]} hysteresis={.15}>
          <mesh material={resources.material}><sphereGeometry args={[radius, 32, 24]} /></mesh>
          <mesh material={resources.material}><sphereGeometry args={[radius, 16, 12]} /></mesh>
        </Detailed>
      </group>
      {sun && <sprite scale={[radius * 3.8, radius * 3.8, 1]}>
        <spriteMaterial map={resources.halo} transparent blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </sprite>}
      {style.ring && <group rotation={planet.id === 'auction' ? [1.12, .2, -.35] : [.8, -.4, .5]}>
        <mesh>
          <ringGeometry args={[radius * 1.28, radius * (planet.id === 'auction' ? 1.85 : 1.34), 64]} />
          <meshBasicMaterial color={style.ring} side={THREE.DoubleSide} transparent opacity={.6} depthWrite={false} />
        </mesh>
        {planet.id !== 'nfc' && <mesh>
          <ringGeometry args={[radius * (planet.id === 'auction' ? 1.94 : 1.55), radius * (planet.id === 'auction' ? 2 : 1.58), 64]} />
          <meshBasicMaterial color={style.ring} side={THREE.DoubleSide} transparent opacity={.35} depthWrite={false} />
        </mesh>}
      </group>}
    </group>
  );
}
export default memo(CelestialBody);
