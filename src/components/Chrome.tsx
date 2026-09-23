import { useEffect, useRef, useState } from "react";


/**
 * Chrome.tsx — three small controls mounted on every page via Base.astro:
 *  1. Day/Night toggle (persisted in localStorage, flips .dark on <html>)
 *  2. Music toggle (invisible <audio> + a single floating button)
 *  3. Custom ink-brush cursor (visual layer + small ink splatter on click)
 * Mounted once at the bottom of <body>, no client navigation issues.
 */

const MUSIC_SRC = "https://cdn.pixabay.com/audio/2022/03/15/audio_4abcf9d1c5.mp3"; // guzheng-style ambient, free

function useTheme() {
  const [theme, setTheme] = useState<"day" | "night">("night");

  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("pht-theme")) as
      | "day"
      | "night"
      | null;
    const initial: "day" | "night" = saved || "night";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "night");
  }, []);

  const toggle = () => {
    const next = theme === "night" ? "day" : "night";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "night");
    try {
      localStorage.setItem("pht-theme", next);
    } catch {}
  };

  return { theme, toggle };
}

function useMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(MUSIC_SRC);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    return () => {
      a.pause();
      a.src = "";
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return { playing, toggle };
}

function Cursor() {
  useEffect(() => {
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.id = "pht-cursor-dot";
    ring.id = "pht-cursor-ring";
    document.body.append(dot, ring);
    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };
    const onClick = (e: MouseEvent) => {
      const splash = document.createElement("span");
      splash.className = "pht-ink-splash";
      splash.style.left = `${e.clientX}px`;
      splash.style.top = `${e.clientY}px`;
      document.body.appendChild(splash);
      setTimeout(() => splash.remove(), 900);
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener("mousemove", onMove);
    addEventListener("click", onClick);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      removeEventListener("click", onClick);
      dot.remove();
      ring.remove();
    };
  }, []);
  return null;
}

export default function Chrome() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { playing, toggle: toggleMusic } = useMusic();
  return (
    <>
      <Cursor />
      <style>{`
        html, body, a, button, input, textarea, select { cursor: none !important; }
        #pht-cursor-dot, #pht-cursor-ring {
          position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
          transition: opacity .2s ease;
        }
        #pht-cursor-dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: var(--primary); box-shadow: 0 0 12px var(--primary);
        }
        #pht-cursor-ring {
          width: 36px; height: 36px; border-radius: 999px;
          border: 1px solid var(--accent);
          transition: transform .08s linear;
        }
        .pht-ink-splash {
          position: fixed; width: 6px; height: 6px; border-radius: 999px;
          background: var(--primary); pointer-events: none; z-index: 9998;
          animation: phtSplash .9s ease-out forwards;
        }
        @keyframes phtSplash {
          0%   { transform: translate(-50%,-50%) scale(1); opacity: .9; }
          100% { transform: translate(-50%,-50%) scale(28); opacity: 0; }
        }
        #pht-music-btn, #pht-theme-btn {
          position: fixed; right: 1.25rem; z-index: 60;
          width: 44px; height: 44px; border-radius: 999px;
          display: grid; place-items: center;
          background: color-mix(in oklab, var(--card) 85%, transparent);
          border: 1px solid var(--border);
          color: var(--foreground);
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 20px rgba(0,0,0,.18);
          transition: transform .2s ease, background .2s ease;
        }
        #pht-music-btn:hover, #pht-theme-btn:hover { transform: scale(1.06); }
        #pht-theme-btn { bottom: 5.25rem; }
        #pht-music-btn { bottom: 1.25rem; }
        @media (max-width: 640px) {
          html, body, a, button, input, textarea, select { cursor: auto !important; }
          #pht-cursor-dot, #pht-cursor-ring { display: none; }
        }
      `}</style>
      <button
        id="pht-theme-btn"
        onClick={toggleTheme}
        aria-label={theme === "night" ? "Chuyển sang chế độ Triều Đình" : "Chuyển sang chế độ Huyền Tiêu"}
        title={theme === "night" ? "Triều Đình (Ngày)" : "Huyền Tiêu (Đêm)"}
      >
        {theme === "night" ? "☾" : "☀"}
      </button>
      <button
        id="pht-music-btn"
        onClick={toggleMusic}
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc cổ phong"}
        title={playing ? "Tắt nhạc cổ phong" : "Bật nhạc cổ phong (Tranh / Sáo)"}
      >
        {playing ? "❚❚" : "♪"}
      </button>
    </>
  );
}
