import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BadgeDollarSign,
  CheckCircle,
  CirclePlay,
  ExternalLink,
  MessageCircle,
  Radio,
  Search,
  Send,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { getLeaderboard } from "./mutaData";
import { useMutaData } from "./useMutaData";

const logo = "/muta-cat-logo.jpg";


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
        <Link to="/" className="flex items-center gap-3">
          <LogoMark className="h-11 w-11" />
          <span className="text-lg font-black tracking-[0.22em] text-white">MUTA</span>
        </Link>
        <div className="hidden items-center gap-3 text-xs font-black uppercase tracking-[0.16em] md:flex">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
        </div>
        <div className="flex items-center gap-4">
          <a className="icon-pill hidden sm:grid" href="https://kick.com/muta11" target="_blank" rel="noreferrer" aria-label="Open stream">
            <CirclePlay size={19} />
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center px-4 pt-24 sm:px-6 lg:px-8"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
    >
      <ParticleField />
      <div className="absolute inset-0 hero-aurora" />
      <div className="absolute inset-0 cyber-grid opacity-35" />
      <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: "40%", background: "linear-gradient(to bottom, transparent 0%, rgba(3,3,6,0.5) 40%, rgba(3,3,6,0.85) 70%, #030306 100%)" }} />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        <motion.div className="speaker-container mt-5" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <div className="soundwave"></div>
          <div className="soundwave"></div>
          <div className="soundwave"></div>
          <div className="heartbeat-wrapper">
            <img src="/muta-hero-logo.jpg" alt="MUTA" className="glitch-logo" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedTitle({ text }) {
  const words = text.split(" ");
  return (
    <span className="animated-gradient-title">
      {words.map((word, i) => (
        <span key={i} style={{ display: "block", lineHeight: 1.05 }}>{word}</span>
      ))}
    </span>
  );
}

function SectionTitle({ eyebrow, title, centered = false, titleStyle, eyebrowStyle }) {
  return (
    <div className={`mb-9 flex flex-col gap-3 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div>
        {eyebrow && <p className="font-black uppercase text-cyan-200" style={{ fontSize: '0.75rem', letterSpacing: '0.3em', ...eyebrowStyle }}>{eyebrow}</p>}
        <h2 className={`text-3xl font-black uppercase text-white sm:text-5xl ${eyebrow ? 'mt-3' : ''}`} style={titleStyle}>{title}</h2>
      </div>
    </div>
  );
}

function LiveStream() {
  return (
    <section id="live" className="section-shell">
      <SectionTitle title={<AnimatedTitle text="Stream" />} centered titleStyle={{ fontFamily: "PPNeueCorp, sans-serif" }} />
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

function StatsPanel({ stats }) {
  return (
    <section id="stats" className="section-shell">
      <SectionTitle title={<AnimatedTitle text="Leaderboard Stats" />} centered titleStyle={{ fontFamily: "PPNeueCorp, sans-serif" }} />
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => <Counter key={stat.label} stat={stat} />)}
      </div>
    </section>
  );
}

function Games({ games }) {
  return (
    <section id="games" className="section-shell">
      <SectionTitle title={<AnimatedTitle text="Partners" />} centered titleStyle={{ fontFamily: "PPNeueCorp, sans-serif" }} />
      <div className="partner-grid">
        {games.map((game) => (
          <motion.article
            key={game.title}
            className="partner-card"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="partner-card-logo">
              <img src={game.image} alt={game.title} />
            </div>
            <div className="partner-code">
              <span>»</span> Code <strong>MUTA</strong> <span>«</span>
            </div>
            <ul className="partner-features">
              <li><CheckCircle size={17} /> Exclusive Rewards</li>
              <li><CheckCircle size={17} /> Leaderboard</li>
            </ul>
            <a href={game.url} target="_blank" rel="noreferrer" className="partner-signup">
              Sign up
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

const RANK_LABELS = ["1st", "2nd", "3rd"];
const CROWN_EMOJIS = ["👑", "🥈", "🥉"];

function TiltCard({ children, className, motionProps }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 22 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -16);
    rotateY.set(x * 16);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

function Leaderboard({ partners }) {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  const activePartner = partners[activeTab];
  const entries = getLeaderboard(activePartner?.name || "");
  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  const filteredRest = search
    ? rest.filter((e) => e.username.toLowerCase().includes(search.toLowerCase()))
    : rest;

  const podiumOrder = top3.length >= 3
    ? [top3[1], top3[0], top3[2]]
    : top3;

  return (
    <section id="leaderboard" className="section-shell">
      <SectionTitle
        eyebrow="MUTA"
        title={<><span style={{ fontSize: "1.25em", lineHeight: 1 }}>L</span>EADERBOARD<span style={{ fontSize: "1.25em", lineHeight: 1 }}>S</span></>}
        centered
        titleStyle={{ fontFamily: "PPNeueCorp, sans-serif", letterSpacing: "0.04em", marginTop: "-1.8rem" }}
        eyebrowStyle={{ fontFamily: "PPNeueCorp, sans-serif", fontSize: "5rem", letterSpacing: "0.06em", background: "linear-gradient(135deg, #7e22ce, #d946ef, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 14px rgba(217,70,239,0.85)) drop-shadow(0 0 30px rgba(168,85,247,0.5))" }}
      />

      <div className="lb-tabs" style={{ justifyContent: "center" }}>
        {partners.map((partner, idx) => (
          <button
            key={partner.name}
            className={`lb-tab ${idx === activeTab ? "active" : ""}`}
            onClick={() => { setActiveTab(idx); setSearch(""); }}
          >
            <img src={partner.image} alt={partner.name} className="lb-tab-img" />
          </button>
        ))}
      </div>

      {activePartner && (
        <div className="lb-pool-banner">
          <span>Prize Pool</span>
          <strong>${activePartner.leaderboardTotal.toLocaleString()}</strong>
          <span>•</span>
          <span>Code: {activePartner.code}</span>
        </div>
      )}

      {top3.length >= 3 && (
        <div className="lb-podium">
          {podiumOrder.map((entry, i) => {
            const realIndex = i === 0 ? 1 : i === 1 ? 0 : 2;
            const medalClass = ["gold", "silver", "bronze"][realIndex];
            return (
              <TiltCard
                key={entry.username}
                className={`lb-podium-card ${medalClass}`}
                motionProps={{
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1 },
                }}
              >
                <span className="lb-crown">{CROWN_EMOJIS[realIndex]}</span>
                <span className="lb-rank-label">{RANK_LABELS[realIndex]}</span>
                <span className="lb-username">{entry.username}</span>
                <span className="lb-wagered-small">${entry.wagered.toLocaleString()}</span>
                <span className="lb-prize-big">${entry.reward.toLocaleString()}</span>
              </TiltCard>
            );
          })}
        </div>
      )}

      <div className="lb-search" style={{ margin: "0 auto 1.5rem" }}>
        <Search size={18} />
        <input
          type="text"
          placeholder="Search username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredRest.length > 0 && (
        <div className="lb-table">
          <div className="lb-table-head">
            <span>Rank</span>
            <span>Player</span>
            <span>Wagered</span>
            <span style={{ textAlign: "right" }}>Prize</span>
          </div>
          {filteredRest.map((entry, i) => (
            <motion.div
              key={entry.username}
              className="lb-table-row"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <span className="lb-rank-badge">{i + 4}</span>
              <span className="lb-player-name">{entry.username}</span>
              <span className="lb-wagered-val">${entry.wagered.toLocaleString()}</span>
              <span className="lb-prize-val">${entry.reward.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-shell">
      <div className="footer-inner">

        {/* Col 1 — Branding & Disclaimer */}
        <div className="footer-col">
          <div className="flex items-center gap-3 mb-4">
            <LogoMark className="h-10 w-10" />
            <span className="text-base font-black tracking-[0.2em] text-white">MUTA</span>
          </div>
          <a href="https://www.gambleaware.org/" target="_blank" rel="noreferrer" className="footer-gambleaware" style={{ marginTop: "0.5rem" }}>
            🛡 GambleAware
          </a>
          <p className="footer-disclaimer" style={{ marginTop: "0.75rem" }}>
            Gambling involves risk. Please gamble responsibly and only bet what you can afford to lose. If you feel you may have a problem, seek help from a professional support service.
          </p>
        </div>

        <div className="footer-divider" />

        {/* Col 2 — Partners */}
        <div className="footer-col">
          <h4 className="footer-heading">Partners</h4>
          <ul className="footer-links">
            <li><a href="https://shuffle.com/?r=muta" target="_blank" rel="noreferrer">Shuffle <ExternalLink size={12} /></a></li>
            <li><a href="https://packdraw.com/?ref=muta" target="_blank" rel="noreferrer">PackDraw <ExternalLink size={12} /></a></li>
            <li><a href="https://skinrave.gg/en?r=muta" target="_blank" rel="noreferrer">SkinRave <ExternalLink size={12} /></a></li>
            <li><a href="https://dejen.com/?r=muta" target="_blank" rel="noreferrer">Dejen <ExternalLink size={12} /></a></li>
          </ul>
        </div>

        <div className="footer-divider" />

        {/* Col 3 — Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><a href="https://kick.com/muta11" target="_blank" rel="noreferrer">Live Stream <ExternalLink size={12} /></a></li>
          </ul>
        </div>

        <div className="footer-divider" />

        {/* Col 4 — Socials */}
        <div className="footer-col">
          <h4 className="footer-heading">Community</h4>
          <div className="footer-socials">

            <a href="https://kick.com/muta11" target="_blank" rel="noreferrer" aria-label="Kick">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z"/></svg>
            </a>
            <a href="https://x.com/OgMuta" target="_blank" rel="noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>
            </a>
            <a href="https://discord.gg/C3QyjybcKP" target="_blank" rel="noreferrer" aria-label="Discord">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2026 MUTA.VIP | ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
}

function HomePage({ games, stats }) {
  return (
    <>
      <Hero />
      <Games games={games} />
      <StatsPanel stats={stats} />
      <LiveStream />
    </>
  );
}

function LeaderboardPage({ partners }) {
  return (
    <>
      <div className="pt-24">
        <Leaderboard partners={partners} />
      </div>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const { stats, games, partners } = useMutaData();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>{loading ? <Loader /> : null}</AnimatePresence>
      <main className="relative min-h-screen overflow-hidden bg-black font-display text-white">
        <FloatingCats />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage games={games} stats={stats} />} />
          <Route path="/leaderboard" element={<LeaderboardPage partners={partners} />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
}
