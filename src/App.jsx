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
import { Footer } from "./components/Footer";
import { Timer } from "./components/Timer";

export const ACTIONS = {
  DATA_RECEIVED: "dataReceived",
  DATA_FEILED: "dataFeiled",
  START_QUIZ: "quizStarted",
  USER_RESPONSE: "userAnswer",
  NEXT_QUESTION: "nextQuestion",
  QUIZ_COMPLETED: "finishedQuiz",
  RESTART_QUIZ: "restart",
  TIME_TICK: "tick",
};

const initialState = {
  questions: [],

  //Possible Values of status: 'Loading', 'Error', 'Ready'. 'Active', 'Finished'
  status: "Loading",
  indexOfCurrentQuestion: 0,
  userAnswer: null,
  userScore: 0,
  score: 0,
  secondRemanining: null,
};

const SECOND_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DATA_RECEIVED:
      return { ...state, questions: action.payload, status: "Ready" };
    case ACTIONS.DATA_FEILED:
      return { ...state, status: "Error" };
    case ACTIONS.START_QUIZ:
      return {
        ...state,
        status: "Active",
        secondRemanining: state.questions.length * SECOND_PER_QUESTION,
      };
    case ACTIONS.USER_RESPONSE:
      const question = state.questions.at(state.indexOfCurrentQuestion);

      return {
        ...state,
        userAnswer: action.payload,
        userScore:
          action.payload === question.correctOption
            ? state.userScore + question.points
            : state.userScore,
      };
    case ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        indexOfCurrentQuestion: state.indexOfCurrentQuestion + 1,
        userAnswer: null,
      };
    case ACTIONS.QUIZ_COMPLETED:
      return {
        ...state,
        status: "Finished",
        score: state.score > state.userScore ? state.score : state.userScore,
      };

    case ACTIONS.RESTART_QUIZ:
      return {
        ...initialState,
        questions: state.questions,
        status: "Ready",
        score: state.score,
      };

    case ACTIONS.TIME_TICK:
      return {
        ...state,
        secondRemanining: state.secondRemanining - 1,
        status: state.secondRemanining === 0 ? "Finished" : state.status,
      };
    default:
      return new Error("Action unknown");
  }
}

export function App() {
  const [
    {
      questions,
      status,
      indexOfCurrentQuestion,
      userAnswer,
      userScore,
      score,
      secondRemanining,
    },
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
            <StartScreen totalQuestions={totalQuestions} dispatch={dispatch} />
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
              />

              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondRemanining={secondRemanining}
                />
                <NextButton
                  userAnswer={userAnswer}
                  totalQuestions={totalQuestions}
                  indexOfCurrentQuestion={indexOfCurrentQuestion}
                  dispatch={dispatch}
                />
              </Footer>
            </>
          )}

          {status === "Finished" && (
            <FinishedScreen
              userScore={userScore}
              maxPossiblePoints={maxPossiblePoints}
              score={score}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}
