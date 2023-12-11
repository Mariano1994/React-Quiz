export function StartScreen({ totalQuestions }) {
  return (
    <>
      <div className="start">
        <h2>Welcome to React Quiz</h2>
        <h3>{totalQuestions} Test your React mastery</h3>

        <button className="btn btn-ui"> Let's start</button>
      </div>
    </>
  );
}
