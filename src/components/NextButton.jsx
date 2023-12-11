export function NextButton({ onGoToNextQuestion, userAnswer }) {
  if (userAnswer === null) return null;
  return (
    <>
      <button className="btn btn-ui" onClick={onGoToNextQuestion}>
        {" "}
        Next{" "}
      </button>
    </>
  );
}
