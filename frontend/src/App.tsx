import Card from "./components/Card";
import charizard from "./assets/charizard.png";
const cardProps = {
  name: "Charizard",
  imageUrl: charizard,
  type: "Fire",
  hp: 100,
  attack: 100,
  defense: 100
};
function App() {
  return (
    <>
      <Card data={cardProps} />
    </>
  );
}

export default App;
