import { useEffect, useRef, useState } from "react";

export default function FadeLine({ text, size, special }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={`line size-${size} ${special ? "special" : ""} ${
        visible ? "visible" : ""
      }`}
    >
      {text}
    </p>
  );
}
