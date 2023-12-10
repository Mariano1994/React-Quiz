import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import { Main } from "./components/Main";

const initialState = {
  questions: [],

  //Possible Values of state: 'Loading', 'Error', 'Ready'. 'Active', 'Finished'
  status: "Loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, action: action.payload, status: "ready" };
    default:
      return new Error("Action unknown");
  }
}

export function App() {
  const [state, dispacth] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((response) => response.json())
      .then((data) => dispacth({ type: "dataReceived", payload: data }))
      .catch((error) => console.error("Error"));
  }, []);

  return (
    <>
      <div className="app">
        <Header />

        <Main>
          <p>1/15</p>
          <p>Questions</p>
        </Main>
      </div>
    </>
  );
}
