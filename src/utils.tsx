import { Alg } from './data/algs';

export function generateAuf(): string {
  const n = Math.floor(Math.random() * 4);
  switch (n) {
    case 0:
      return '';
    case 1:
      return 'U';
    case 2:
      return 'U2';
    case 3:
      return "U'";
    default:
      return '';
  }
}

export function generateCase(alg: Alg): Alg {
  const preAuf = generateAuf();
  const postAuf = generateAuf();
  return {
    ...alg,
    alg: preAuf + alg.alg + postAuf,
  };
}
