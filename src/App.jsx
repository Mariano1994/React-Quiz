import Header from "./components/Header";
import { Main } from "./components/Main";

export function App() {
  return (
    <>
      <div className="app">
        <Header />

        <Main>
          <p>1/15</p>
          <p>Questions</p>
        </Main>
      </div>
    </>
  );
}
