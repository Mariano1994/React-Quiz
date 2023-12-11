export function FinishedScreen({
  userScore,
  maxPossiblePoints,
  score,
  onRestartQuiz,
}) {
  const percentage = (userScore / maxPossiblePoints) * 100;
  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage === 0) emoji = "🤦🏾‍♂️";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😅";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored {userScore} out of {maxPossiblePoints}{" "}
        == {Math.ceil(percentage)}%
      </p>

      <p className="highscore"> Highscore: {score} points</p>

      <button className="btn btn-ui" onClick={onRestartQuiz}>
        {" "}
        Restart
      </button>
    </>
  );
}
