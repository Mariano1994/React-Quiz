import { Options } from "./Options";

export function Question({ question, userAnswer, dispatch }) {
  return (
    <>
      <div>
        <h4>{question.question}</h4>
        <Options
          question={question}
          userAnswer={userAnswer}
          dispatch={dispatch}
        />
      </div>
    </>
  );
}
