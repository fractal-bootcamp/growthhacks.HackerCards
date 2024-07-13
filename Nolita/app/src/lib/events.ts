let eventSource: EventSource | null = null;

const baseUrl =
  process.env.NODE_ENV === "development" ? `http://localhost:8080` : "";

export type CardInfo = {
  default: boolean;
  name: string;
  summary: string;
  ability1: string;
  ability2: string;
  specialattack: string;
  weakness: string;
  HP: number;
  topics: string[];
};

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
};

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

export const listenToStream = (
  url: string,
  objective: string,
  callback: (res: AgentEvent) => void
) => {
  eventSource = new EventSource(
    `${baseUrl}/api/browse?url=${encodeURIComponent(
      url
    )}&objective=${encodeURIComponent(objective)}&maxIterations=10`
  );
  eventSource.onmessage = function (event) {
    let response;
    try {
      response = JSON.parse(event.data);
    } catch (e) {
      return;
    }
    console.log(response);
    if (response.done) {
      console.log("done");
      eventSource?.close();
    }
    if (!response.done) {
      callback(response);
    }
  };
  eventSource.onerror = function (error) {
    console.error("EventSource failed:", error);
    eventSource?.close();
  };
};
export const stopListening = () => {
  eventSource?.close();
};
