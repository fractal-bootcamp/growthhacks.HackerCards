export interface CardInfo {
  default: boolean;
  name: string;
  imageUrl: string;
  summary: string;
  ability1: string;
  ability2: string;
  specialattack: string;
  weakness: string;
  HP: number;
  topics: string[];
  fileType: string;
}

export const defaultCardInfo: CardInfo = {
  default: true,
  name: "Default Name",
  imageUrl: "Default image url",
  summary: "Default Summary",
  ability1: "Default Ability 1",
  ability2: "Default Ability 2",
  specialattack: "Default Special Attack",
  weakness: "Default Weakness",
  HP: 100,
  topics: ["Default Topic 1", "Default Topic 2"],
  fileType: "python"
};
export const fakeCardInfo: CardInfo = {
  default: true,
  name: "Sarah Ren",
  imageUrl: "/assets/hackerMouse.webp",
  summary:
    "Fullstack developer wielding AI and TypeScript, exploring websockets, Redis, and AWS. Poasts with flair, mouse-tering the web dev landscape byte by byte.",
  ability1: "Schema cleanup",
  ability2: "Recurse (see Special Attack)",
  specialattack: "Recursion",
  weakness: "Rust, Noobs",
  HP: 75,
  topics: ["Quick builds", "Responsivity"],
  fileType: "typescript"
};
