import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { Error } from "./components/Error";
import { Main } from "./components/Main";
import { StartScreen } from "./components/StartScreen";
import { Question } from "./components/Question";

const initialState = {
  questions: [],

  //Possible Values of state: 'Loading', 'Error', 'Ready'. 'Active', 'Finished'
  status: "Loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFeiled":
      return { ...state, status: "Error" };
    case "quizStarted":
      return { ...state, status: "Active" };
    default:
      return new Error("Action unknown");
  }
}

export function App() {
  const [{ questions, status }, dispacth] = useReducer(reducer, initialState);
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
          {status === "Active" && <Question />}
        </Main>
      </div>
    </>
  );
}
