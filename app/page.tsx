"use client";

import Link from "next/link";
import { Wand2, ChevronDown } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Magnetic from "@/components/motion/Magnetic";
import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════
   Reusable cursor-tracking motif
   strength > 0  → follows cursor
   strength < 0  → moves away from cursor
   ══════════════════════════════════════════ */
function Motif({
  emoji,
  size = "text-6xl",
  top, bottom, left, right,
  strengthX = 30,
  strengthY = 30,
  stiffness = 80,
  damping = 18,
  spin = false,
  spinDuration = 8,
  float = true,
  floatDuration = 5,
  delay = 0,
  className = "",
}: {
  emoji: string;
  size?: string;
  top?: string; bottom?: string; left?: string; right?: string;
  strengthX?: number; strengthY?: number;
  stiffness?: number; damping?: number;
  spin?: boolean; spinDuration?: number;
  float?: boolean; floatDuration?: number;
  delay?: number;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness, damping });
  const springY = useSpring(mouseY, { stiffness, damping });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * strengthX);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * strengthY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY, strengthX, strengthY]);

  const pos: React.CSSProperties = {};
  if (top) pos.top = top;
  if (bottom) pos.bottom = bottom;
  if (left) pos.left = left;
  if (right) pos.right = right;

  return (
    <motion.div
      style={{ x: springX, y: springY, position: "absolute", ...pos }}
      className={`pointer-events-none select-none ${className}`}
    >
      <motion.div
        animate={
          spin
            ? { rotate: [0, 360] }
            : float
              ? { y: [0, -14, 0], rotate: [0, 8, -8, 0] }
              : {}
        }
        transition={
          spin
            ? { duration: spinDuration, repeat: Infinity, ease: "linear" }
            : float
              ? { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay }
              : {}
        }
        className={`${size}`}
        style={{ display: "inline-block" }}
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
}

/* ── Speech bubble ── */
function Bubble({
  children,
  style,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const updatePos = () => {
      const isMobile = window.innerWidth < 768;
      const rangeX = isMobile ? 30 : 120;
      const rangeY = isMobile ? 40 : 120;
      setPos({
        x: Math.random() * (rangeX * 2) - rangeX,
        y: Math.random() * (rangeY * 2) - rangeY,
      });
    };

    const timeout = setTimeout(() => {
      updatePos();
      interval = setInterval(updatePos, 2500 + Math.random() * 2000);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 10, x: 0 }}
      animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.4, delay },
        x: { duration: 2.5, ease: "easeInOut" },
        y: { duration: 2.5, ease: "easeInOut" },
      }}
      className={`absolute px-4 py-2 rounded-full text-xs md:text-sm font-black select-none pointer-events-none max-w-[70vw] ${className}`}
      style={{
        background: "#fffef9",
        border: "2.5px solid #141414",
        boxShadow: "3px 3px 0 #141414",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20 md:py-0"
      style={{
        background:
          "linear-gradient(165deg, #b6f7d8 0%, #5ce8d8 40%, #3ab8e8 75%, #2a80d8 100%)",
      }}
    >
      {/* ── Grain texture ── */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
          opacity: 0.16,
          mixBlendMode: "overlay",
        }}
      />

      {/* ══════════════════════════════════════
          CURSOR-TRACKING MOTIFS
          Different strength / spring / float
          values give a real parallax feel
          ══════════════════════════════════════ */}

      {/* 🌙 Moon — left, slow */}
      <Motif emoji="🌙" size="text-5xl md:text-7xl" left="6%" bottom="30%" strengthX={35} strengthY={25} stiffness={70} damping={16} floatDuration={6} />

      {/* ⭐ Star — right top, opposite direction */}
      <Motif emoji="⭐" size="text-4xl md:text-6xl" right="8%" top="28%" strengthX={-28} strengthY={-20} stiffness={55} damping={14} spin spinDuration={14} />

      {/* 🏮 Lantern — far left, fast */}
      <Motif emoji="🏮" size="text-3xl md:text-5xl" left="3%" top="18%" strengthX={40} strengthY={35} stiffness={110} damping={22} floatDuration={4} delay={0.8} />

      {/* ✨ Sparkles — upper-right, counter-direction */}
      <Motif emoji="✨" size="text-3xl md:text-5xl" right="12%" top="16%" strengthX={-35} strengthY={-28} stiffness={90} damping={20} floatDuration={3.5} delay={1.2} className="hidden sm:block" />

      {/* 🕌 Mosque — bottom-right, slow & big */}
      <Motif emoji="🕌" size="text-4xl md:text-6xl" right="5%" bottom="22%" strengthX={-20} strengthY={-15} stiffness={50} damping={18} float={false} />

      {/* 🎀 Ribbon — bottom-left, fast opposite */}
      <Motif emoji="💚" size="text-2xl md:text-4xl" left="18%" bottom="14%" strengthX={50} strengthY={40} stiffness={130} damping={24} floatDuration={3} delay={0.4} className="hidden sm:block" />

      {/* 🌸 Flower — upper center-left */}
      <Motif emoji="🌸" size="text-2xl md:text-4xl" left="28%" top="12%" strengthX={20} strengthY={30} stiffness={100} damping={20} spin spinDuration={20} className="hidden sm:block" />

      {/* 💫 Dizzy — center-right edge */}
      <Motif emoji="💫" size="text-3xl md:text-5xl" right="20%" bottom="30%" strengthX={-45} strengthY={35} stiffness={75} damping={15} floatDuration={5} delay={2} className="hidden sm:block" />

      {/* ── Speech bubbles ── */}
      <Bubble style={{ top: "12%", left: "5%", color: "#141414" }} delay={0.1}>share to bondhur mal</Bubble>
      <Bubble style={{ top: "5%", right: "10%", color: "#141414" }} delay={0.8}>share with your parents</Bubble>
      <Bubble style={{ top: "25%", right: "5%", color: "#141414" }} delay={0.3}>share to u Mal</Bubble>
      <Bubble style={{ top: "45%", left: "2%", color: "#141414" }} delay={1.2}>share to shali</Bubble>
      <Bubble style={{ top: "75%", right: "5%", color: "#141414" }} delay={1.8}>share to baper Ex</Bubble>
      <Bubble style={{ bottom: "30%", left: "5%", color: "#141414" }} delay={2.1}>share to pashar barir vabi</Bubble>
      <Bubble style={{ top: "1%", left: "35%", color: "#141414" }} delay={1.0}>share to bondhur mal</Bubble>
      <Bubble style={{ bottom: "5%", left: "35%", color: "#141414" }} delay={2.4}>share to sugar mummy</Bubble>


      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">

        {/* Giant bubbly title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.72, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 190, damping: 18 }}
          className="font-black tracking-normal leading-[0.95] mb-6 uppercase"
          style={{
            fontSize: "clamp(56px, 15vw, 160px)",
            color: "#FFE500", // Electric Yellow
            fontFamily: "var(--font-fredoka)",
            fontWeight: "900", // Super thick
            letterSpacing: "0.02em",
            textShadow: "6px 6px 0 #141414, -2px -2px 0 #141414, 2px -2px 0 #141414, -2px 2px 0 #141414, 0 10px 50px rgba(0,0,0,0.3)",
          }}
        >
          EID<br />MUBARAK
        </motion.h1>

        {/* Sub-pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mb-8 md:mb-6"
        >
          <span
            className="px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-xl font-bold uppercase inline-block max-w-[90vw]"
            style={{
              background: "#F64974", // Feastables Pink
              border: "4px solid #141414",
              boxShadow: "6px 6px 0 #141414",
              color: "#ffffff",
              fontFamily: "var(--font-sniglet)",
            }}
          >
            Design & share beautiful custom Eid cards ✨
          </span>
        </motion.div>

        {/* Clear Description */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="max-w-xs md:max-w-md text-center font-bold text-lg md:text-xl mb-8 md:mb-10 leading-relaxed"
          style={{
            color: "#141414",
            fontFamily: "var(--font-outfit)",
          }}
        >
          Make your own beautiful Eid greeting cards. Quick and fully customizable!
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.42, type: "spring", stiffness: 220, damping: 18 }}
        >
          <Magnetic strength={0.22}>
            <Link
              href="/generator"
              className="inline-flex items-center gap-2 md:gap-3 px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-xl md:text-2xl group uppercase tracking-wide"
              style={{
                background: "#FFE500", // Yellow CTA
                color: "#141414", // Black text
                fontFamily: "var(--font-fredoka)",
                border: "4px solid #141414",
                boxShadow: "8px 8px 0 #141414",
                transition: "box-shadow .15s, transform .15s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.boxShadow = "12px 12px 0 #141414";
                el.style.transform = "translate(-4px,-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.boxShadow = "8px 8px 0 #141414";
                el.style.transform = "translate(0,0)";
              }}
            >
              <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              BUILD YOUR CARD
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      {/* ── Scroll arrow ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >

      </motion.div>
    </main>
  );
}
