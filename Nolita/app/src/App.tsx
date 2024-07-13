import React from "react";
import "./App.css";
import { listenToStream } from "./lib/events";
import { CardInfo, defaultCardInfo } from "../../../Cards";

function App() {
  // You can change the URL to any website for the objective.
  const [url, setUrl] = React.useState("");
  const [cardInfo, setCardInfo] = React.useState<CardInfo | null>(null);

  const start = async () => {
    setCardInfo(null);
    const cards = await listenToStream(url);
    setCardInfo(cards);
  };

  return (
    <div className="items-center min-h-screen justify-center space-y-4 p-8">
      <div className="flex flex-col space-y-4 max-w-screen-md border p-4">
        <p> Enter a url to generate card: </p>
        <input className="border " type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button className="bg-gray-200 p-1" onClick={() => start()}>
          {"Start"}
        </button>
      </div>

      {cardInfo && <p>Card Info: {JSON.stringify(cardInfo)} </p>}
    </div>
  );
}

export default App;
