import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { Error } from "./components/Error";
import { Main } from "./components/Main";
import { StartScreen } from "./components/StartScreen";
import { Question } from "./components/Question";
import { NextButton } from "./components/NextButton";
import { ProgressBar } from "./components/ProgressBar";
import { FinishedScreen } from "./components/FinishedScreen";

const initialState = {
  questions: [],

  //Possible Values of status: 'Loading', 'Error', 'Ready'. 'Active', 'Finished'
  status: "Loading",
  indexOfCurrentQuestion: 0,
  userAnswer: null,
  userScore: 0,
  score: 0,
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
      const question = state.questions.at(state.indexOfCurrentQuestion);

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
    case "finishedQuiz":
      return {
        ...state,
        status: "Finished",
        score: state.score > state.userScore ? state.score : state.userScore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "Ready",
        score: state.score,
      };
    default:
      return new Error("Action unknown");
  }
}

export function App() {
  const [
    { questions, status, indexOfCurrentQuestion, userAnswer, userScore, score },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFeiled" }));
  }, []);

  function handleStartQuiz() {
    dispatch({ type: "quizStarted" });
  }

  function handleNextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function handleFinishedQuiz() {
    dispatch({ type: "finishedQuiz" });
  }

  function handleRestarQuiz() {
    dispatch({ type: "restart" });
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
              <ProgressBar
                indexOfCurrentQuestion={indexOfCurrentQuestion}
                totalQuestions={totalQuestions}
                userScore={userScore}
                maxPossiblePoints={maxPossiblePoints}
                userAnswer={userAnswer}
              />
              <Question
                question={questions[indexOfCurrentQuestion]}
                userAnswer={userAnswer}
                dispatch={dispatch}
                // onNewUserAnswer={handlerNewUserAnswer}
              />
              <NextButton
                onGoToNextQuestion={handleNextQuestion}
                userAnswer={userAnswer}
                totalQuestions={totalQuestions}
                indexOfCurrentQuestion={indexOfCurrentQuestion}
                onFinishedQuiz={handleFinishedQuiz}
              />
            </>
          )}

          {status === "Finished" && (
            <FinishedScreen
              userScore={userScore}
              maxPossiblePoints={maxPossiblePoints}
              score={score}
              onRestartQuiz={handleRestarQuiz}
            />
          )}
        </Main>
      </div>
    </>
  );
}
