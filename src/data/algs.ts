export interface Alg {
  name: string;
  alg: string;
};

const pll: Alg[] = [
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

export { pll };
