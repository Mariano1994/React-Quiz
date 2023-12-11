import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { Error } from "./components/Error";
import { Main } from "./components/Main";
import { StartScreen } from "./components/StartScreen";
import { Question } from "./components/Question";
import { NextButton } from "./components/NextButton";

const initialState = {
  questions: [],

  //Possible Values of state: 'Loading', 'Error', 'Ready'. 'Active', 'Finished'
  status: "Loading",
  indexOfCurrentQuestion: 0,
  userAnswer: null,
  userScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFeiled":
      return { ...state, status: "Error" };
    case "quizStarted":
      return { ...state, status: "Active" };
    case "userAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        userAnswer: action.payload,
        userScore:
          action.payload === question.correctOption
            ? state.userScore + question.points
            : state.userScore,
      };

    case "nextQuestion":
      return {
        ...state,
        indexOfCurrentQuestion: state.indexOfCurrentQuestion + 1,
        userAnswer: null,
      };
    default:
      return new Error("Action unknown");
  }
}

export function App() {
  const [
    { questions, status, indexOfCurrentQuestion, userAnswer, userScore },
    dispacth,
  ] = useReducer(reducer, initialState);
  const totalQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((response) => response.json())
      .then((data) => dispacth({ type: "dataReceived", payload: data }))
      .catch((error) => dispacth({ type: "dataFeiled" }));
  }, []);

  function handleStartQuiz() {
    dispacth({ type: "quizStarted" });
  }

  function handlerNewUserAnswer(index) {
    dispacth({ type: "userAnswer", payload: index });
  }

  function handleNextQuestion() {
    dispacth({ type: "nextQuestion" });
  }

  return (
    <>
      <div className="app">
        <Header />

        <Main>
          {status === "Loading" && <Loader />}
          {status === "Error" && <Error />}
          {status === "Ready" && (
            <StartScreen
              totalQuestions={totalQuestions}
              onSartQuiz={handleStartQuiz}
            />
          )}
          {status === "Active" && (
            <>
              <Question
                question={questions[indexOfCurrentQuestion]}
                userAnswer={userAnswer}
                onNewUserAnswer={handlerNewUserAnswer}
              />
              <NextButton
                onGoToNextQuestion={handleNextQuestion}
                userAnswer={userAnswer}
              />
            </>
          )}
        </Main>
      </div>
    </>
  );
}
