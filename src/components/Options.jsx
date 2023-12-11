export function Options({ question, userAnswer, onNewUserAnswer }) {
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
              onClick={() => onNewUserAnswer(index)}
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
