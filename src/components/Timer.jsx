import { useEffect } from "react";

export function Timer({ dispatch, secondRemanining }) {
  const min = Math.floor(secondRemanining / 60);
  const sec = secondRemanining % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <>
      <div className="timer">
        <span>
          {min < 10 && "0"}
          {min}: {sec < 10 && "0"}
          {sec}
        </span>
      </div>
    </>
  );
}
