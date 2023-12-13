import { ACTIONS } from "../App";

export function StartScreen({ totalQuestions, dispatch }) {
  return (
    <>
      <div className="start">
        <h2>Welcome to React Quiz</h2>
        <h3>{totalQuestions} Test your React mastery</h3>

        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: ACTIONS.START_QUIZ })}
        >
          {" "}
          Let's start
        </button>
      </div>
    </>
  );
}
