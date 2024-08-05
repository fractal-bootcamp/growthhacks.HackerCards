export interface CardInfo {
  default: boolean;
  name: string;
  summary: string;
  ability1: string;
  ability2: string;
  specialattack: string;
  weakness: string;
  HP: number;
  topics: string[];
  svgPath: string;
}

export const defaultCardInfo: CardInfo = {
  default: true,
  name: "Default Name",
  summary: "Default Summary",
  ability1: "Default Ability 1",
  ability2: "Default Ability 2",
  specialattack: "Default Special Attack",
  weakness: "Default Weakness",
  HP: 100,
  topics: ["Default Topic 1", "Default Topic 2"],
  svgPath: "/assets/icons/svelte.svg"
};
