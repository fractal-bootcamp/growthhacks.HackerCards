export interface CardInfo {
  name: string;
  imageUrl: string;
  summary: string;
  ability1: string;
  ability2: string;
  specialattack: string;
  weakness: string;
  HP: number;
  topics: string[];
  // fileType: string;
}

export const defaultCardInfo: CardInfo = {
  name: "Default Name",
  imageUrl: "Default image url",
  summary: "Default Summary",
  ability1: "Default Ability 1",
  ability2: "Default Ability 2",
  specialattack: "Default Special Attack",
  weakness: "Default Weakness",
  HP: 100,
  topics: ["Default Topic 1", "Default Topic 2"],
  // fileType: "SVG",
};
