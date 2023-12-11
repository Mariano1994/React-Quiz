export function FinishedScreen({
  userScore,
  maxPossiblePoints,
  userHighScore,
}) {
  const percentage = (userScore / maxPossiblePoints) * 100;
  console.log(userHighScore);

  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage === 0) emoji = "🤦🏾‍♂️";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😅";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";

  console.log(percentage);
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored {userScore} out of {maxPossiblePoints}{" "}
        == {Math.ceil(percentage)}%
      </p>

      <p className="highscore"> (Highscore: {userHighScore} points)</p>
    </>
  );
}
