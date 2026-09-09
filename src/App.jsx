import GalaxyBackground from "./GalaxyBackground";
import FadeLine from "./FadeLine";
import { letter, letter2 } from "./content";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <GalaxyBackground />
      <div className="overlay" />

      <header className="hero">
        <h1 className="hero-title">Gửi Tiên,</h1>
        <p className="hero-sub">một lá thư giữa những vì sao</p>
        <div className="scroll-hint">cuộn xuống để đọc ↓</div>
      </header>

      <main className="letter">
        {letter.map((line, i) => (
          <FadeLine key={i} text={line.text} size={line.size} special={line.special} />
        ))}
      </main>

      <div className="divider" aria-hidden="true">✦</div>

      <main className="letter">
        {letter2.map((line, i) => (
          <FadeLine key={`l2-${i}`} text={line.text} size={line.size} special={line.special} />
        ))}
      </main>

      <footer className="signature">
        <p>— Đông 💌</p>
      </footer>
    </div>
  );
}
