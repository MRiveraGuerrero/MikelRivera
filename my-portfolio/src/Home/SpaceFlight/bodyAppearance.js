// Small, seamless textures baked once on the CPU; no per-frame noise or downloads.
export const BODY_STYLES = {
  sientame: { kind: 'ocean', colors: ['#123f68', '#348f9c', '#b4d5b6'], rim: '#7edbfa' },
  auction: { kind: 'bands', colors: ['#825137', '#cf955b', '#f5ddb1'], rim: '#ffe1a4', ring: '#dbb384' },
  impostor: { kind: 'storm', colors: ['#251c4c', '#7745aa', '#cd9cfa'], rim: '#bb8eff', ring: '#b58bf2' },
  nfc: { kind: 'circuit', colors: ['#0b343a', '#18746a', '#79e3ad'], rim: '#77f6ce', ring: '#70ebbd' },
  'Mikel Rivera': { kind: 'sun', colors: ['#c94a12', '#f5a32f', '#fff1ad'], rim: '#ffb43f' },
  'Mikel Labs': { kind: 'lava', colors: ['#301d40', '#794267', '#ff9acd'], rim: '#ff9dcf' },
  'The Archive': { kind: 'craters', colors: ['#4e536c', '#8991ab', '#c6cbdc'], rim: '#c6c8ec' },
};

export const bodyStyle = body => BODY_STYLES[body.id || body.name] || BODY_STYLES['The Archive'];
const rgb = hex => [1, 3, 5].map(start => parseInt(hex.slice(start, start + 2), 16));
const blend = (a, b, t) => a.map((channel, index) => channel + (b[index] - channel) * Math.max(0, Math.min(1, t)));

export function surfacePixels(style, width = 256, height = 128) {
  const palette = style.colors.map(rgb);
  const pixels = new Uint8ClampedArray(width * height * 4);
  const craters = Array.from({ length: 18 }, (_, i) => {
    const y = 1 - 2 * (i + .5) / 18;
    const angle = i * 2.399963;
    return [Math.sqrt(1 - y * y) * Math.cos(angle), y, Math.sqrt(1 - y * y) * Math.sin(angle), .026 + (i % 4) * .013];
  });
  for (let row = 0; row < height; row++) {
    const latitude = (row / (height - 1) - .5) * Math.PI;
    const y = Math.sin(latitude);
    for (let col = 0; col < width; col++) {
      const longitude = col / (width - 1) * Math.PI * 2;
      const x = Math.cos(longitude) * Math.cos(latitude);
      const z = Math.sin(longitude) * Math.cos(latitude);
      const noise = Math.sin(x * 8 + Math.sin(z * 5)) * Math.cos(y * 9 - z * 3)
        + .42 * Math.sin(x * 21 + y * 15) * Math.cos(z * 19 - y * 6);
      const grain = Math.sin(x * 95 + y * 53) * Math.sin(z * 79 - y * 71);
      let color;
      if (style.kind === 'ocean') {
        color = noise > .12 ? blend(palette[1], palette[2], (noise - .12) * 1.3) : blend(palette[0], palette[1], .3 + noise * .28);
        const cloud = Math.max(0, Math.sin(y * 31 + noise * 2 + z * 7) - .78) * 2;
        color = blend(color, [236, 248, 245], cloud + Math.max(0, Math.abs(y) - .88) * 6);
      } else if (style.kind === 'bands') {
        const bands = .5 + .5 * Math.sin(y * 39 + noise * 1.6);
        color = blend(palette[0], palette[2], .2 + bands * .75 + grain * .045);
      } else if (style.kind === 'circuit') {
        color = blend(palette[0], palette[1], .45 + noise * .25);
        const meridian = Math.abs(Math.sin(longitude * 12));
        const parallel = Math.abs(Math.sin(y * 26));
        if (meridian < .06 || (parallel < .065 && Math.sin(longitude * 7 + y * 8) > -.15)) color = blend(color, palette[2], .9);
      } else if (style.kind === 'lava') {
        color = blend(palette[0], palette[1], .35 + noise * .22);
        const crack = Math.max(0, 1 - Math.abs(noise) * 12);
        color = blend(color, palette[2], crack * .95);
      } else if (style.kind === 'craters') {
        let tone = .5 + noise * .13 + grain * .025;
        for (const [cx, cy, cz, size] of craters) {
          const distance = (1 - (x * cx + y * cy + z * cz)) / size;
          if (distance < 1) tone -= .24 * (1 - distance);
          else if (distance < 1.18) tone += .18 * (1 - (distance - 1) / .18);
        }
        color = blend(palette[0], palette[2], tone);
      } else if (style.kind === 'sun') {
        color = blend(palette[0], palette[2], .58 + noise * .17 + grain * .13);
      } else {
        const swirl = Math.sin(y * 18 + noise * 3.5 + z * 4);
        color = blend(palette[0], palette[2], .45 + swirl * .28 + grain * .035);
      }
      const offset = (row * width + col) * 4;
      pixels[offset] = color[0]; pixels[offset + 1] = color[1]; pixels[offset + 2] = color[2]; pixels[offset + 3] = 255;
    }
  }
  return { pixels, width, height };
}
