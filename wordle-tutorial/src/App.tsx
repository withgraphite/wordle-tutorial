import classnames from "classnames";
import { useEffect, useState } from "react";
import "./App.scss";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function App() {
  // The word the user is trying to guess
  const [actualWord] = useState("magic");
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
    <div className="guesses">
      {history.map((pastGuess, idx) => {
        return (
          <Word key={idx} guess={pastGuess} highlight actualWord={actualWord} />
        );
      })}
      <Word guess={buffer} actualWord={actualWord} />
    </div>
  );
}

function Word(props: {
  guess: string;
  actualWord: string;
  highlight?: boolean;
}) {
  const guessWithPadding = props.guess.padEnd(5, " ");

  return (
    <div className="word">
      {Array.from(guessWithPadding).map((letter, idx) => {
        return (
          <Letter
            key={idx}
            guess={letter}
            idx={idx}
            actualWord={props.actualWord}
            highlight={props.highlight}
          />
        );
      })}
    </div>
  );
}

function Letter(props: {
  guess: string;
  idx: number;
  actualWord: string;
  highlight?: boolean;
}) {
  return <div className={classnames("letter", {
    "letter--exactly-correct": props.highlight && props.actualWord[props.idx] === props.guess,
    "letter--almost-correct": props.highlight && props.actualWord.indexOf(props.guess) !== -1
  })}>{props.guess}</div>;
}

export default App;
