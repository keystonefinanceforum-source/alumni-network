import { useState } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import ResultScreen from "./ResultScreen";

export default function App() {
  const [screen, setScreen] = useState("start"); // start | game | result
  const [playerName, setPlayerName] = useState("");
  const [finalScore, setFinalScore] = useState(null);
  const [finalAnswers, setFinalAnswers] = useState([]);

  const startGame = (name) => {
    setPlayerName(name);
    setScreen("game");
  };

  const endGame = (score, answers) => {
    setFinalScore(score);
    setFinalAnswers(answers);
    setScreen("result");
  };

  const restart = () => {
    setFinalScore(null);
    setFinalAnswers([]);
    setScreen("start");
  };

  return (
    <div className="app-root">
      {screen === "start" && <StartScreen onStart={startGame} />}
      {screen === "game" && (
        <GameScreen playerName={playerName} onEnd={endGame} />
      )}
      {screen === "result" && (
        <ResultScreen
          score={finalScore}
          answers={finalAnswers}
          playerName={playerName}
          onRestart={restart}
        />
      )}
    </div>
  );
}
