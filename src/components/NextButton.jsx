import { ACTIONS } from "../App";

export function NextButton({
  userAnswer,
  indexOfCurrentQuestion,
  totalQuestions,
  onFinishedQuiz,
  dispatch,
}) {
  if (userAnswer === null) return null;

  if (indexOfCurrentQuestion < totalQuestions - 1) {
    return (
      <>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: ACTIONS.NEXT_QUESTION })}
        >
          {" "}
          Next{" "}
        </button>
      </>
    );
  }

  if (indexOfCurrentQuestion === totalQuestions - 1) {
    return (
      <>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: ACTIONS.QUIZ_COMPLETED })}
        >
          {" "}
          Show Result{" "}
        </button>
      </>
    );
  }
}
