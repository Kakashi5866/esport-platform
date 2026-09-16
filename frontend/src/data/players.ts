export type Player = {
  id: string;
  rank: number;
  name: string;
  game: string;
  wins: number;
  matches: number;
  points: number;
  earnings: string;
  avatar: string;
  verified: boolean;
  uid: string;
};

export const players: Player[] = [
  {
    id: "shadowx",
    rank: 1,
    name: "ShadowX",
    game: "Free Fire",
    wins: 48,
    matches: 55,
    points: 2480,
    earnings: "₹85,000",
    avatar: "SX",
    verified: true,
    uid: "FF10234567",
  },
  {
    id: "darkhunter",
    rank: 2,
    name: "DarkHunter",
    game: "BGMI",
    wins: 44,
    matches: 52,
    points: 2310,
    earnings: "₹72,500",
    avatar: "DH",
    verified: true,
    uid: "BGMI5091823",
  },
  {
    id: "viper",
    rank: 3,
    name: "Viper",
    game: "Valorant",
    wins: 41,
    matches: 50,
    points: 2190,
    earnings: "₹64,000",
    avatar: "VP",
    verified: true,
    uid: "VAL3324551",
  },
  {
    id: "blaze",
    rank: 4,
    name: "Blaze",
    game: "Free Fire",
    wins: 38,
    matches: 49,
    points: 2050,
    earnings: "₹52,000",
    avatar: "BZ",
    verified: false,
    uid: "FF10998211",
  },
  {
    id: "ghost",
    rank: 5,
    name: "Ghost",
    game: "COD Mobile",
    wins: 36,
    matches: 47,
    points: 1940,
    earnings: "₹47,500",
    avatar: "GH",
    verified: false,
    uid: "CODM7761234",
  },
  {
    id: "reaper",
    rank: 6,
    name: "Reaper",
    game: "BGMI",
    wins: 34,
    matches: 45,
    points: 1870,
    earnings: "₹41,000",
    avatar: "RP",
    verified: false,
    uid: "BGMI2298871",
  },
  {
    id: "nova",
    rank: 7,
    name: "Nova",
    game: "Valorant",
    wins: 31,
    matches: 43,
    points: 1760,
    earnings: "₹36,500",
    avatar: "NV",
    verified: false,
    uid: "VAL9012334",
  },
  {
    id: "inferno",
    rank: 8,
    name: "Inferno",
    game: "Free Fire",
    wins: 29,
    matches: 42,
    points: 1690,
    earnings: "₹32,000",
    avatar: "IF",
    verified: false,
    uid: "FF10554432",
  },
];