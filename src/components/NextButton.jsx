export function NextButton({
  onGoToNextQuestion,
  userAnswer,
  indexOfCurrentQuestion,
  totalQuestions,
  onFinishedQuiz,
}) {
  if (userAnswer === null) return null;

  if (indexOfCurrentQuestion < totalQuestions - 1) {
    return (
      <>
        <button className="btn btn-ui" onClick={onGoToNextQuestion}>
          {" "}
          Next{" "}
        </button>
      </>
    );
  }

  if (indexOfCurrentQuestion === totalQuestions - 1) {
    return (
      <>
        <button className="btn btn-ui" onClick={onFinishedQuiz}>
          {" "}
          Show Result{" "}
        </button>
      </>
    );
  }
}
