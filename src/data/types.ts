export interface Alg {
  name: string;
  alg: string;
}

export interface AlgGroup {
  name: string;
  cases: string[];
}

export interface TestCase {
  alg: Alg;
  preAuf: String;
  postAuf: String;
  cnRotation: String;
  yRotation: String;
}

export interface TrainerHistory {
  case_: TestCase;
  guess: string;
  correct: Boolean;
}

export enum ColorNeutrality {
  CN = 'CN',
  D_CN = 'D_CN',
  NON_CN = 'NON_CN',
}

export type Scramble = string[];
