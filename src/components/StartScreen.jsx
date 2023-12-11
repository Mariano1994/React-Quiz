export function StartScreen({ totalQuestions, onSartQuiz }) {
  return (
    <>
      <div className="start">
        <h2>Welcome to React Quiz</h2>
        <h3>{totalQuestions} Test your React mastery</h3>

        <button className="btn btn-ui" onClick={onSartQuiz}>
          {" "}
          Let's start
        </button>
      </div>
    </>
  );
}
