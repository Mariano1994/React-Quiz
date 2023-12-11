export function Options({ question, userAnswer, dispatch }) {
  const hasAnswer = userAnswer !== null;
  return (
    <>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            <button
              key={option}
              className={`btn btn-option ${
                index === userAnswer ? "answer" : ""
              } ${
                hasAnswer
                  ? index === question.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              onClick={() => dispatch({ type: "userAnswer", payload: index })}
              disabled={hasAnswer}
            >
              {option}
            </button>
          );
        })}
      </div>
    </>
  );
}
