export function ProgressBar({
  indexOfCurrentQuestion,
  totalQuestions,
  userScore,
  maxPossiblePoints,
  userAnswer,
}) {
  return (
    <>
      <header className="progress">
        <progress
          max={totalQuestions}
          value={indexOfCurrentQuestion + Number(userAnswer !== null)}
        />
        <p>
          Question{" "}
          <strong>
            {indexOfCurrentQuestion + 1} / {totalQuestions}
          </strong>
        </p>
        <p>
          <strong>
            Score {userScore} / {maxPossiblePoints}
          </strong>
        </p>
      </header>
    </>
  );
}
