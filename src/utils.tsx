import { Alg, ColorNeutrality, Scramble, TestCase } from './data/types';
import { crossScrambles } from './data/scrambles';

function numToAuf(n: number): string {
  const auf = ['', 'U', 'U2', "U'"];
  return auf[n];
}

function numToYRotation(n: number): string {
  const r = ['', 'y', 'y2', "y'"];
  return r[n];
}

function numToCnRotation(n: number): string {
  const rotations = ['', 'x', 'x2', "x'", 'z', "z'"];
  return rotations[n];
}

function generateAuf(): number {
  return Math.floor(Math.random() * 4);
}

function generateYRotation(): number {
  return Math.floor(Math.random() * 4);
}

function generateCnRotation(cn: ColorNeutrality): number {
  switch (cn) {
    case ColorNeutrality.CN:
      return Math.floor(Math.random() * 6);
    case ColorNeutrality.D_CN:
      return Math.floor(Math.random() * 2) * 2;
    case ColorNeutrality.NON_CN:
    default:
      return 0;
  }
}

export function generateCase(alg: Alg, cn: ColorNeutrality): TestCase {
  const preAuf = generateAuf();
  const postAuf = generateAuf();
  const yRotation = generateYRotation();
  const cnRotation = generateCnRotation(cn);
  return {
    alg,
    preAuf,
    postAuf,
    yRotation,
    cnRotation,
  };
}

export function caseToString(c: TestCase): string {
  return (
    numToAuf(c.preAuf) +
    c.alg.alg +
    numToAuf(c.postAuf) +
    numToYRotation(c.yRotation) +
    numToCnRotation(c.cnRotation)
  );
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

export function randomChoice<T>(choices: T[], probs: number[]): T {
  const total = probs.reduce((acc, value) => acc + value, 0);
  const r = Math.random() * total;
  let upto = 0;
  for (let i = 0; i < probs.length; i++) {
    if (upto + probs[i] >= r) {
      return choices[i];
    }
    upto += probs[i];
  }
  return choices[choices.length - 1];
}
