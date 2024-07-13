import React from "react";
import "./App.css";
import { AgentEvent, listenToStream, stopListening } from "./lib/events";
import { CardInfo, defaultCardInfo } from "../../../Cards";
type Status = "working" | "success" | "fail" | "idle";

function App() {
  // You can change the URL to any website for the objective.
  const [url, setUrl] = React.useState("");

  const [objective] = React.useState(
    "for all the titles written by an author, write a summary of the author's interests and personality traits",
  );
  const [events, setEvents] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<Status>("idle");
  const [cardInfo, setCardInfo] = React.useState<CardInfo | null>(null);
  const handleEvent = (input: AgentEvent) => {
    setEvents((prev: string[]) => {
      if (input?.["objectiveComplete"]) {
        if (input?.objectiveComplete?.cardinfo) {
          setCardInfo(input?.objectiveComplete?.cardinfo);
        }
      }
      if (input?.progressAssessment) {
        return [...prev, `Progress: ${input.description}`];
      }
      return prev;
    });

    if (input?.["objectiveComplete"]) {
      setStatus("success");
      setEvents((prev: string[]) => [
        ...prev,
        `Success: ${input?.objectiveComplete?.result}`,
      ]);
    } else if (input?.["objectiveFailed"]) {
      setStatus("fail");
      setEvents((prev: string[]) => [
        ...prev,
        `Fail: ${input?.objectiveFailed?.result}`,
      ]);
    }
    console.log("CardInfo:", cardInfo)
  };

  const start = () => {
    if (status === "working") {
      stopListening();
      setStatus("idle");
      return;
    }
    setStatus("working");
    setCardInfo(cardInfo);
    setEvents([]);
    listenToStream(url, objective, handleEvent);
  };

  const newest = events[events.length - 1];

  return (
    <div className="items-center min-h-screen justify-center space-y-4 p-8">
      <div className="flex flex-col space-y-4 max-w-screen-md border p-4">
        <p> Enter a url to generate card: </p>
        <input className="border " type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button className="bg-gray-200 p-1" onClick={() => start()}>
          {status !== "working" ? "Start" : "Stop"}
        </button>
      </div>
      <div className="flex items-center">
        <Icon status={status} />
        <p>{newest || "No events yet."}</p>
      </div>
      {cardInfo && <p>Card Info: {JSON.stringify(cardInfo)} </p>}
    </div>
  );
}

const Icon = ({
  status,
}: {
  status: "working" | "success" | "fail" | "idle";
}) => {
  if (status === "working") {
    return <div className="mr-2 blinker"></div>;
  } else if (status === "success") {
    return <div className="mr-2">✅</div>;
  } else if (status === "fail") {
    return <div className="mr-2">❌</div>;
  }
  return <div className="mr-2">❔</div>;
};

export default App;
