import GalaxyBackground from "./GalaxyBackground";
import FadeLine from "./FadeLine";
import BirthdaySection from "./BirthdaySection";
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

        <nav className="toc" aria-label="Mục lục">
          <p className="toc-heading">Mục lục</p>
          <ol>
            <li><a href="#thu-1"><span className="toc-num">I</span>Lá thư gửi Tiên</a></li>
            <li><a href="#thu-2"><span className="toc-num">II</span>Tiên không một mình đâu</a></li>
            <li><a href="#sinh-nhat"><span className="toc-num">III</span>Chúc mừng sinh nhật · 3/10</a></li>
          </ol>
        </nav>
        <div className="scroll-hint">cuộn xuống để đọc ↓</div>
      </header>

      <main className="letter" id="thu-1">
        {letter.map((line, i) => (
          <FadeLine key={i} text={line.text} size={line.size} special={line.special} />
        ))}
      </main>

      <div className="divider" aria-hidden="true">✦</div>

      <main className="letter" id="thu-2">
        {letter2.map((line, i) => (
          <FadeLine key={`l2-${i}`} text={line.text} size={line.size} special={line.special} />
        ))}
      </main>

      <div className="divider" aria-hidden="true">✦</div>

      <BirthdaySection />

      <footer className="signature">
        <p>— Đông</p>
      </footer>
    </div>
  );
}
