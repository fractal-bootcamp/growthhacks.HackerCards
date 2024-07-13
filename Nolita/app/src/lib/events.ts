let eventSource: EventSource | null = null;
import { CardInfo } from "../../../../Cards";
const baseUrl =
  process.env.NODE_ENV === "development" ? `http://localhost:8080` : "";

export type AgentEvent = {
  command?: string[];
  done?: boolean;
  progressAssessment?: string;
  description?: string;
  objectiveComplete?: {
    kind: "ObjectiveComplete";
    cardinfo: CardInfo;
    result: string;
  };
  objectiveFailed: {
    kind: "ObjectiveFailed";
    result: string;
  };
};

export const listenToStream = async (url: string) => {
  const res = await fetch(
    `${baseUrl}/api/browse?url=${encodeURIComponent(url)}&maxIterations=10`
  );
  return res.json();
};
