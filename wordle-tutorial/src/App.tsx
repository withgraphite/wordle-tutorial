import { useEffect, useState } from "react";
import "./App.scss";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function App() {
  // The current word
  const [buffer, setBuffer] = useState("");
  // All previous guesses
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // Called every time the user presses a key on the page
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === "Enter" && buffer.length === 5) {
        setHistory((oldValue) => {
          return [...oldValue, buffer];
        });
        setBuffer("");
      } else if (ev.key === "Backspace" && buffer.length > 0) {
        setBuffer(buffer.slice(0, -1));
      } else if (LETTERS.includes(ev.key) && buffer.length < 5) {
        setBuffer(buffer + ev.key);
      }
    };

    // Register the handler defined above (and unregister it if we update it and need to re-register a new version)
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [buffer]);

  return (
    <div>
      {history.map((pastGuess, idx) => {
        return <div key={idx}>{pastGuess}</div>;
      })}
      <div>{buffer}</div>
    </div>
  );
}

export default App;
