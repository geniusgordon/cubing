export interface Alg {
  name: string;
  alg: string;
}

export interface AlgGroup {
  name: string;
  cases: string[];
}

export interface TrainerHistory {
  case_: Alg;
  guess: string;
}

export enum ColorNeutrality {
  CN = 'CN',
  D_CN = 'D_CN',
  NON_CN = 'NON_CN',
}
