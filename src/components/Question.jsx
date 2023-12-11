import { Options } from "./Options";

export function Question({ question, userAnswer, onNewUserAnswer }) {
  return (
    <>
      <div>
        <h4>{question.question}</h4>
        <Options
          question={question}
          onNewUserAnswer={onNewUserAnswer}
          userAnswer={userAnswer}
        />
      </div>
    </>
  );
}
