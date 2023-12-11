import ReactLogo from "../assets/logo512.png";

export function Header() {
  return (
    <header className="app-header">
      <img src={ReactLogo} alt="React logo" />
      <h1>The React Quiz</h1>
    </header>
  );
}
