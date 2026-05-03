import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BadgeDollarSign,
  BellRing,
  CirclePlay,
  Coins,
  Crown,
  Disc3,
  ExternalLink,
  Flame,
  Gamepad2,
  Gem,
  MessageCircle,
  Radio,
  Send,
  Sparkles,
  Trophy,
  Zap
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getLeaderboard } from "./lib/api";

const logo = "/muta-cat-logo.jpg";

const stats = [
  { label: "Total Winnings", value: 12840, prefix: "$" },
  { label: "Biggest Win", value: 1865, prefix: "$" },
  { label: "Current Balance", value: 427, prefix: "$" }
];

const games = [
  { title: "Neon Reels", meta: "96.8% RTP", icon: Zap, gradient: "from-fuchsia-500 via-violet-500 to-cyan-400" },
  { title: "Cat Jackpot", meta: "Live bonus", icon: Crown, gradient: "from-pink-500 via-purple-500 to-indigo-500" },
  { title: "Pulse Dice", meta: "Turbo mode", icon: Disc3, gradient: "from-blue-500 via-fuchsia-500 to-pink-500" },
  { title: "Void Crash", meta: "High risk", icon: Flame, gradient: "from-violet-500 via-pink-500 to-amber-300" },
  { title: "Cyber Mines", meta: "Max hunt", icon: Gem, gradient: "from-cyan-400 via-violet-500 to-fuchsia-500" },
  { title: "Moon Spin", meta: "Streamer pick", icon: Gamepad2, gradient: "from-indigo-500 via-purple-500 to-pink-500" }
];

const wins = [
  { amount: "$248.80", game: "Neon Reels", time: "2 min ago" },
  { amount: "$184.20", game: "Void Crash", time: "7 min ago" },
  { amount: "$413.00", game: "Cat Jackpot", time: "18 min ago" },
  { amount: "$97.60", game: "Cyber Mines", time: "31 min ago" },
  { amount: "$321.10", game: "Moon Spin", time: "44 min ago" },
  { amount: "$125.40", game: "Pulse Dice", time: "1 hr ago" }
];

function LogoMark({ className = "" }) {
  return (
    <span className={`logo-orbit ${className}`}>
      <img className="relative z-10 h-full w-full rounded-full object-cover" src={logo} alt="MUTA neon cat logo" draggable="false" />
    </span>
  );
}

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-black"
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <motion.div className="relative grid place-items-center" initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <LogoMark className="h-40 w-40 sm:h-52 sm:w-52" />
        <motion.div
          className="absolute -bottom-12 h-1.5 w-64 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span className="block h-full w-1/2 rounded-full bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-300" animate={{ x: ["-120%", "220%"] }} transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 38 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 61) % 100}%`,
        size: 2 + (index % 4),
        delay: (index % 9) * 0.35,
        duration: 4.8 + (index % 7) * 0.4
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
}

function FloatingCats() {
  const cats = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => {
        const leftPos = (index * 47 + 13) % 100;
        const topPos = (index * 71 + 29) % 100;
        return {
          id: index,
          left: `${leftPos}%`,
          top: `${topPos}%`,
          size: 30 + (index * 19 % 45),
          delay: (index * 13 % 15) * 0.5,
          duration: 14 + (index * 23 % 11) * 1.5
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {cats.map((cat) => (
        <img
          key={cat.id}
          src="/floating-cat.png"
          className="cat-particle absolute opacity-30"
          alt=""
          style={{
            left: cat.left,
            top: cat.top,
            width: cat.size,
            height: cat.size,
            animationDelay: `${cat.delay}s`,
            animationDuration: `${cat.duration}s`
          }}
        />
      ))}
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-fuchsia-500/20 bg-black/50 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <LogoMark className="h-11 w-11" />
          <span className="text-lg font-black tracking-[0.22em] text-white">MUTA</span>
        </a>
        <div className="hidden items-center gap-3 text-xs font-black uppercase tracking-[0.16em] md:flex">
          <a className="nav-link" href="#live">Live</a>
          <a className="nav-link" href="#stats">Stats</a>
          <a className="nav-link" href="#games">Games</a>
          <a className="nav-link" href="#community">Social</a>
        </div>
        <div className="flex items-center gap-4">
          <a className="icon-pill hidden sm:grid" href="https://kick.com/muta11" target="_blank" rel="noreferrer" aria-label="Open stream">
            <CirclePlay size={19} />
          </a>
          <button className="rounded-xl border border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-2.5 text-sm font-black uppercase tracking-[0.15em] text-white shadow-[0_0_20px_rgba(217,70,239,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const logoX = useSpring(useTransform(mouseX, [0, 1], [-18, 18]), { stiffness: 70, damping: 22 });
  const logoY = useSpring(useTransform(mouseY, [0, 1], [-14, 14]), { stiffness: 70, damping: 22 });

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      <ParticleField />
      <div className="absolute inset-0 hero-aurora" />
      <div className="absolute inset-0 cyber-grid opacity-35" />
      <motion.div className="float-chip left-[8%] top-[28%]" animate={{ y: [-10, 10, -10], rotate: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity }}>
        <Coins size={22} />
      </motion.div>
      <motion.div className="float-chip right-[10%] top-[24%]" animate={{ y: [8, -12, 8], rotate: [6, -6, 6] }} transition={{ duration: 4.6, repeat: Infinity }}>
        <Sparkles size={22} />
      </motion.div>
      <motion.div className="float-chip bottom-[18%] left-[18%]" animate={{ y: [-8, 12, -8], rotate: [4, -8, 4] }} transition={{ duration: 5.5, repeat: Infinity }}>
        <Trophy size={22} />
      </motion.div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">


        <motion.div className="speaker-container mt-5" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <div className="soundwave"></div>
          <div className="soundwave"></div>
          <div className="soundwave"></div>
          <div className="heartbeat-wrapper">
            <img src="/muta-hero-logo.jpg" alt="MUTA" className="glitch-logo" />
          </div>
        </motion.div>

        <motion.div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
          <a className="button-primary justify-center" href="#live"><CirclePlay size={20} /> Watch Stream</a>
          <a className="button-secondary justify-center" href="https://discord.com/" target="_blank" rel="noreferrer"><MessageCircle size={20} /> Join Discord</a>
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">{title}</h2>
      </div>
    </div>
  );
}

function LiveStream() {
  return (
    <section id="live" className="section-shell">
      <SectionTitle eyebrow="Broadcast" title="MUTA is live" />
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="stream-frame">
          <div className="stream-fallback" aria-hidden="true">
            <LogoMark className="h-24 w-24" />
            <div className="stream-bars">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>Kick stream player</p>
          </div>
          <iframe
            title="MUTA Kick stream"
            className="h-full w-full rounded-[1.15rem] bg-black"
            src="https://player.kick.com/muta11"
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        <aside className="neon-panel flex flex-col justify-between gap-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-sm font-black uppercase text-red-200">
              <span className="live-dot" /> Live now
            </div>
            <h3 className="text-2xl font-black uppercase text-white">Max win hunt: neon slots and crash runs</h3>
            <p className="mt-4 text-sm font-semibold leading-6 text-white/60">Clean stream hub, no clutter. Just the player, the pulse, and the next hit.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="mini-stat"><span>Viewers</span><strong>842</strong></div>
            <div className="mini-stat"><span>Session</span><strong>$427</strong></div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Counter({ stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 1500, 1);
      setCount(Math.floor(stat.value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, stat.value]);

  return (
    <motion.article ref={ref} className="metric-card" whileHover={{ y: -8, scale: 1.015 }}>
      <BadgeDollarSign className="text-cyan-200" size={28} />
      <strong>{stat.prefix}{count.toLocaleString()}</strong>
      <span>{stat.label}</span>
    </motion.article>
  );
}

function StatsPanel() {
  return (
    <section id="stats" className="section-shell">
      <SectionTitle eyebrow="High dopamine metrics" title="Numbers that glow" />
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => <Counter key={stat.label} stat={stat} />)}
      </div>
    </section>
  );
}

function Games() {
  return (
    <section id="games" className="section-shell overflow-hidden">
      <SectionTitle eyebrow="Featured slots" title="Hot rotation" />
      <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-3">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <motion.article key={game.title} className="game-card snap-start" whileHover={{ y: -10, scale: 1.035 }}>
              <div className={`game-art bg-gradient-to-br ${game.gradient}`}>
                <Icon size={54} />
                <span className="game-shine" />
              </div>
              <h3>{game.title}</h3>
              <p>{game.meta}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function BigWins() {
  const [liveWins, setLiveWins] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchWins = async () => {
      const data = await getLeaderboard();
      if (data && data.length > 0) {
        const mapped = data.map((item) => ({
          amount: item.prize,
          game: item.game,
          time: `Rank #${item.rank} - ${item.username}`
        }));
        setLiveWins(mapped);
      } else {
        setLiveWins(wins);
      }
      setIsDataLoading(false);
    };
    fetchWins();
    
    const interval = setInterval(fetchWins, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Live Leaderboard" title="Fresh hits" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isDataLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="win-card animate-pulse border-white/5 opacity-50">
              <div className="h-4 w-32 rounded bg-white/10" />
              <div className="mt-4 h-8 w-24 rounded bg-white/10" />
              <div className="mt-2 h-4 w-20 rounded bg-white/10" />
            </div>
          ))
        ) : (
          liveWins.map((win, index) => (
            <motion.article
              key={`${win.amount}-${win.game}-${index}`}
              className="win-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <span>{win.time}</span>
              <strong>{win.amount}</strong>
              <p>{win.game}</p>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}

function Community() {
  const socials = [
    { label: "Discord", icon: MessageCircle, href: "https://discord.com/" },
    { label: "Telegram", icon: Send, href: "https://telegram.org/" },
    { label: "Kick", icon: Radio, href: "https://kick.com/muta11" }
  ];
  return (
    <section id="community" className="section-shell">
      <div className="community-band">
        <LogoMark className="h-24 w-24" />
        <div className="max-w-xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200">Community</p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">Follow the glow</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a key={social.label} className="social-button" href={social.href} target="_blank" rel="noreferrer">
                <Icon size={21} /> {social.label} <ExternalLink size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-3">
          <LogoMark className="h-11 w-11" />
          <p className="text-sm font-bold text-white/58">© 2026 MUTA. High Stakes. High Energy.</p>
        </div>
        <div className="flex gap-5 text-sm font-bold uppercase tracking-[0.16em] text-white/50">
          <a className="nav-link" href="#privacy">Privacy</a>
          <a className="nav-link" href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading ? <Loader /> : null}</AnimatePresence>
      <main className="relative min-h-screen overflow-hidden bg-black font-display text-white">
        <FloatingCats />
        <Nav />
        <Hero />
        <LiveStream />
        <StatsPanel />
        <Games />
        <BigWins />
        <Community />
        <Footer />
      </main>
    </>
  );
}
