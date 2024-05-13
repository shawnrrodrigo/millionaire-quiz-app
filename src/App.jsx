import { useEffect, useState } from "react";
import "./app.css";
import { data, moneyList } from "./dummy";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [username, setUsername] =  useState('');
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  useEffect(() => {
    activeQuestion > 1 &&
      setEarned(moneyList.find((m) => m.id === activeQuestion - 1).price);
  }, [activeQuestion]);

  return (
    <div className="app">
    {username ? (
      <>
      <div className="main">
        {stop ? (
          <h1 className="gameover">You have earned {earned}</h1>
        ) : (
          <>
            <div className="top">
              <div className="timer">
                <Timer setStop={setStop} activeQuestion={activeQuestion} />
              </div>
            </div>
            <div className="bottom">
              <Trivia
                data={data}
                activeQuestion={activeQuestion}
                setActiveQuestion={setActiveQuestion}
                setStop={setStop}
              />
            </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyList.map((item) => {
            return (
              <li
                className={
                  activeQuestion === item.id
                    ? "moneyListItem active"
                    : "moneyListItem"
                }
              >
                <span className="question-number">{item.id}</span>
                <span className="question-price">{item.price}</span>
              </li>
            );
          })}
        </ul>
      </div>
      </>
    ): <Start setUsername={setUsername}/>}
      
    </div>
  );
}

export default App;
