import FadeLine from "./FadeLine";
import { birthday } from "./content";
import tienPhoto from "./assets/tien-birthday.jpg";

export default function BirthdaySection() {
  return (
    <section className="birthday" id="sinh-nhat">
      <p className="bday-date">03 · 10</p>
      <h2 className="bday-title rainbow-text">
        Chúc mừng sinh nhật
        <span className="bday-name">Tiên</span>
      </h2>

      <figure className="bday-photo">
        <img src={tienPhoto} alt="Tiên cười thật tươi trong ngày sinh nhật" />
      </figure>

      <div className="letter bday-letter">
        {birthday.map((line, i) => (
          <FadeLine
            key={`bd-${i}`}
            text={line.text}
            size={line.size}
            special={line.special}
            rainbow={line.rainbow}
          />
        ))}
      </div>
    </section>
  );
}
