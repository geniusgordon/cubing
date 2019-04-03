import { Alg, AlgGroup } from './types';

export const pll: Alg[] = [
  { name: 'Ua', alg: "(y2) M2 U M U2 M' U M2" },
  { name: 'Ub', alg: "(y2) M2 U' M U2 M' U' M2" },
  { name: 'Ab', alg: "(x') R U' R D2 R' U R D2 R2 (x)" },
  { name: 'Aa', alg: "(x) R' U R' D2 R U' R' D2 R2 (x')" },
  { name: 'H', alg: "M2' U M2' U2 M2' U M2" },
  { name: 'Z', alg: "(y) M' U M2' U M2' U M' U2 M2'" },
  { name: 'T', alg: "R U R' U' R' F R2 U' R' U' R U R' F'" },
  { name: 'Y', alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
  { name: 'V', alg: "R' U R' d' R' F' R2 U' R' U R' F R F" },
  {
    name: 'E',
    alg: "(y x') (R U' R' D) (R U R' D') (R U R' D) (R U' R' D') (x)",
  },
  { name: 'F', alg: "(y) R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R" },
  { name: 'Ja', alg: "(y2) F U' R' F R2 U' R' U' R U R' F' R U R' F'" },
  { name: 'Jb', alg: "R U R' F' R U R' U' R' F R2 U' R' U'" },
  { name: 'Ra', alg: "(y') R U R' F' R U2 R' U2 R' F R U R U2 R' U'" },
  { name: 'Rb', alg: "R' U2 R U2 R' F (R U R' U') R' F' R2' U'" },
  { name: 'Ga', alg: "(y) R2 U (R' U R' U') R U' R2 (D U' R' U) R D'" },
  { name: 'Gc', alg: "(y) R2' U' (R U' R U R') U R2 (D' U R U' R' D)" },
  { name: 'Gb', alg: "R' U' R U D' R2 U R' U R U' R U' R2 D" },
  { name: 'Gd', alg: "(y2) R U R' U' D R2 U' R U' R' U R' U R2 U D'" },
  {
    name: 'Na',
    alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
  },
  { name: 'Nb', alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R" },
];

export const pllGroups: AlgGroup[] = [
  {
    name: 'Edge',
    cases: ['U', 'Z', 'H'],
  },
  {
    name: 'Corner',
    cases: ['A', 'E'],
  },
  {
    name: 'Adjacent',
    cases: ['T', 'F', 'J', 'R'],
  },
  {
    name: 'Diagonal',
    cases: ['Y', 'V', 'N'],
  },
  {
    name: 'G',
    cases: ['G'],
  },
];

export const coll: Alg[] = [
  { name: 'L1', alg: "y R U2' R' (U' R U R') (U' R U R') (U' R U' R') " },
  { name: 'L2', alg: "y2 R U2' (L' U L) U2' R' (L' U L)" },
  { name: 'L3', alg: "y' (R U2' R D) (R' U2 R D') R2" },
  { name: 'L4', alg: "y2 (R' U2' R' D') (R U2' R' D) R2" },
  { name: 'L5', alg: "y' L' (R U R' U') L (U R U' R')" },
  { name: 'L6', alg: "y2 x' (U' R U L') (U' R' U r)" },
  { name: 'T1', alg: "(R U2' R' U' R U' R2') (U2' R U R' U R)" },
  { name: 'T2', alg: "y2 F (R U R' U') (R U' R' U') (R U R' F')" },
  { name: 'T3', alg: "(R' U R) U2' L' (R' U R U') L" },
  { name: 'T4', alg: "y2 (R U' R2' D') (r U2' r') (D R2 U R')" },
  { name: 'T5', alg: "y' (r' U' R U) (L U' R' U) x" },
  { name: 'T6', alg: "y' (r U R' U') (L' U R U') x'" },
  { name: 'U1', alg: "y2 (R U R' U R U2' R2') (U' R U' R' U2 R) " },
  { name: 'U2', alg: "F (R U' R' U) (R U R' U) (R U' R' F')" },
  { name: 'U3', alg: "y2 R2 D (R' U2' R) D' (R' U2' R')" },
  { name: 'U4', alg: "R2 D' (R U2' R') D (R U2' R)" },
  { name: 'U5', alg: "y2 (R' U R U') x' (U L' U L) U2' (R U' R' U) x" },
  { name: 'U6', alg: "(R' U2 R) F (U' R' U' R) U F'" },
  { name: 'Pi1', alg: "R U2' R2 U' R2 U' R2 U2' R" },
  { name: 'Pi2', alg: "(R U' R' U2') (L' U R U') L R' U2' R U R'" },
  { name: 'Pi3', alg: "y (L' U R U' L U R') (R' U' R U' R' U2' R)" },
  { name: 'Pi4', alg: "y' (R' U2' R U R' U R) (R U' L' U R' U' L)" },
  { name: 'Pi5', alg: "y2 (L' U R U') L U' R' (U' R U' R')" },
  { name: 'Pi6', alg: "y F (U R U' R') (U R U2' R') (U' R U R') F'" },
  { name: 'H1', alg: "(R U R' U) (R U' R' U) R U2' R'" },
  { name: 'H2', alg: "y F (R U R' U') (R U R' U') (R U R' U') F'" },
  { name: 'H3', alg: "F (R U' R' U) (R U2' R' U') (R U R' U') F'" },
  { name: 'H4', alg: "(R U R' U) (R U L' U) R' U' L" },
];
