import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import waiting from "../assets/wait.mp3";
import wrong from "../assets/wrong.mp3";

function Trivia({ data, activeQuestion, setActiveQuestion, setStop }) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classname, setClassname] = useState("answer");
  const [playGame] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [wait] = useSound(waiting);

  useEffect(() => {
    playGame();
  }, [playGame]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (answer) => {
    setSelectedAnswer(answer.text);
    setClassname("answer active");
    delay(2500, () =>
      setClassname(answer.correct ? "answer correct" : "answer incorrect")
    );
    delay(4000, () => {
      if (answer.correct) {
        correctAnswer();
        delay(3000, () => {
          setActiveQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(2000, () => {
          setStop(true);
        });
      }
    });
  };

  useEffect(() => {
    setQuestion(data[activeQuestion - 1]);
  }, [data, activeQuestion]);

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers?.map((answer) => (
          <div
            className={selectedAnswer === answer.text ? classname : "answer"}
            onClick={() => handleClick(answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trivia;
