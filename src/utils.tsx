import { Alg, ColorNeutrality } from './data/types';

function generateAuf(): string {
  const n = Math.floor(Math.random() * 4);
  const auf = ['', 'U', 'U2', "U'"];
  return auf[n];
}

function generateYRotation(): string {
  const n = Math.floor(Math.random() * 4);
  const r = ['', 'y', 'y2', "y'"];
  return r[n];
}

function generateCnRotation(): string {
  const n = Math.floor(Math.random() * 6);
  const rotations = ['', 'x', 'x2', "x'", 'z', "z'"];
  return rotations[n];
}

function generateDualCnRotation(): string {
  const n = Math.floor(Math.random() * 2);
  const rotations = ['', 'x2'];
  return rotations[n];
}

function generateRotation(cn: ColorNeutrality): string {
  switch (cn) {
    case ColorNeutrality.CN:
      return generateCnRotation();
    case ColorNeutrality.D_CN:
      return generateDualCnRotation();
    case ColorNeutrality.NON_CN:
    default:
      return '';
  }
}

export function generateCase(alg: Alg, cn: ColorNeutrality): Alg {
  const preAuf = generateAuf();
  const postAuf = generateAuf();
  const cnRotation = generateRotation(cn);
  const yRotation = generateYRotation();
  return {
    ...alg,
    alg: preAuf + alg.alg + postAuf + cnRotation + yRotation,
  };
}
