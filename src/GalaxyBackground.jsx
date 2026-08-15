import { useEffect, useRef } from "react";

// Nền vũ trụ động: sao lấp lánh + bụi tinh vân trôi nhẹ + vài ngôi sao băng
export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, dpr;
    let stars = [];
    let nebulae = [];
    let shootingStars = [];
    let raf;

    const rand = (a, b) => a + Math.random() * (b - a);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initScene();
    }

    function initScene() {
      const starCount = Math.floor((width * height) / 2600);
      stars = Array.from({ length: starCount }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(0.3, 1.6),
        baseAlpha: rand(0.25, 1),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.4, 1.4),
        drift: rand(-0.02, 0.02),
      }));

      const nebulaColors = [
        "99,102,241",
        "168,85,247",
        "236,72,153",
        "56,189,248",
      ];
      nebulae = Array.from({ length: 5 }, (_, i) => ({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(Math.min(width, height) * 0.25, Math.min(width, height) * 0.5),
        color: nebulaColors[i % nebulaColors.length],
        dx: rand(-0.05, 0.05),
        dy: rand(-0.03, 0.03),
        alpha: rand(0.06, 0.14),
      }));

      shootingStars = [];
    }

    function spawnShootingStar() {
      if (Math.random() < 0.006 && shootingStars.length < 3) {
        const startX = rand(0, width);
        shootingStars.push({
          x: startX,
          y: rand(0, height * 0.4),
          len: rand(80, 160),
          speed: rand(6, 11),
          angle: Math.PI / 5,
          life: 1,
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);

      // nen tối gradient
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#05040f");
      bg.addColorStop(0.5, "#0a0818");
      bg.addColorStop(1, "#03030a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // tinh vân
      nebulae.forEach((n) => {
        n.x += n.dx;
        n.y += n.dy;
        if (n.x < -n.r) n.x = width + n.r;
        if (n.x > width + n.r) n.x = -n.r;
        if (n.y < -n.r) n.y = height + n.r;
        if (n.y > height + n.r) n.y = -n.r;

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, `rgba(${n.color},${n.alpha})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      });

      // sao
      stars.forEach((s) => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
        const alpha = s.baseAlpha * (0.4 + 0.6 * twinkle);
        s.y += s.drift;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // sao băng
      spawnShootingStar();
      shootingStars.forEach((ss) => {
        const dx = Math.cos(ss.angle) * ss.len;
        const dy = Math.sin(ss.angle) * ss.len;
        const grad = ctx.createLinearGradient(
          ss.x, ss.y, ss.x - dx, ss.y - dy
        );
        grad.addColorStop(0, `rgba(255,255,255,${ss.life})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - dx, ss.y - dy);
        ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life -= 0.012;
      });
      shootingStars = shootingStars.filter(
        (ss) => ss.life > 0 && ss.x < width + 200 && ss.y < height + 200
      );

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="galaxy-canvas" />;
}
