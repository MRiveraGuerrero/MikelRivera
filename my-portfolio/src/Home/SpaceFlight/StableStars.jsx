import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 2200;
const vertexShader = `
  attribute vec3 direction;
  attribute vec3 starColor;
  attribute float diameter;
  uniform vec2 resolution;
  varying vec2 vUv;
  varying vec3 vColor;
  void main() {
    vUv = uv;
    vColor = starColor;
    // Infinite sky: rotation follows the view, translation never moves stars.
    vec3 viewDirection = mat3(viewMatrix) * direction;
    if (viewDirection.z >= -0.01) {
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      return;
    }
    vec4 clip = projectionMatrix * vec4(viewDirection * 1000.0, 1.0);
    // Use small quads with a multi-pixel footprint, not subpixel GL points.
    clip.xy += position.xy * diameter * 2.0 / resolution * clip.w;
    clip.z = clip.w * 0.99999;
    gl_Position = clip;
  }
`;
const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vColor;
  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r2 = dot(p, p);
    float glow = exp(-4.5 * r2) * (1.0 - smoothstep(0.55, 1.0, r2));
    gl_FragColor = vec4(vColor, glow * 0.8);
    #include <colorspace_fragment>
  }
`;

export default function StableStars() {
  const data = useMemo(() => {
    let seed = 73519;
    const random = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; };
    const directions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const diameters = new Float32Array(COUNT);
    const palette = [new THREE.Color('#c1d6f2'), new THREE.Color('#e5edff'), new THREE.Color('#ffe3bf')];
    for (let i = 0; i < COUNT; i++) {
      const z = 2 * random() - 1;
      const angle = 2 * Math.PI * random();
      const r = Math.sqrt(1 - z * z);
      directions.set([r * Math.cos(angle), r * Math.sin(angle), z], i * 3);
      const color = palette[Math.floor(random() * palette.length)];
      const brightness = 0.35 + random() * 0.65;
      colors.set([color.r * brightness, color.g * brightness, color.b * brightness], i * 3);
      diameters[i] = 4.5 + Math.pow(random(), 3) * 4;
    }
    return { directions, colors, diameters };
  }, []);
  const uniforms = useMemo(() => ({ resolution: { value: new THREE.Vector2(1, 1) } }), []);
  useFrame(({ gl }) => { gl.getDrawingBufferSize(uniforms.resolution.value); });
  return <mesh frustumCulled={false} renderOrder={-1000} raycast={() => null}>
    <instancedBufferGeometry instanceCount={COUNT}>
      <bufferAttribute attach="attributes-position" args={[new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]), 3]} />
      <bufferAttribute attach="attributes-uv" args={[new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2]} />
      <bufferAttribute attach="index" args={[new Uint16Array([0, 1, 2, 0, 2, 3]), 1]} />
      <instancedBufferAttribute attach="attributes-direction" args={[data.directions, 3]} />
      <instancedBufferAttribute attach="attributes-starColor" args={[data.colors, 3]} />
      <instancedBufferAttribute attach="attributes-diameter" args={[data.diameters, 1]} />
    </instancedBufferGeometry>
    <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent depthWrite={false} toneMapped={false} />
  </mesh>;
}
