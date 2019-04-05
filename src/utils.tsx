import { Alg, ColorNeutrality, Scramble } from './data/types';
import { crossScrambles } from './data/scrambles';

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

export function toQueryString(params: any): string {
  return Object.keys(params)
    .filter(key => typeof params[key] !== 'undefined')
    .map(key => key + '=' + params[key])
    .join('&');
}

export function generateCrossScramble(level: number): Scramble | null {
  if (level < 0 || level >= 8) {
    return null;
  }
  const moveNames = [
    'R',
    'R2',
    "R'",
    'F',
    'F2',
    "F'",
    'L',
    'L2',
    "L'",
    'B',
    'B2',
    "B'",
    'U',
    'U2',
    "U'",
    'D',
    'D2',
    "D'",
  ];
  const randomScramble =
    crossScrambles[level - 1][Math.floor(Math.random() * 1000)];
  return randomScramble
    .split('')
    .map(s => moveNames[s.charCodeAt(0) - 'A'.charCodeAt(0)]);
}
