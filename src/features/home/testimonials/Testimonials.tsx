"use client";

import { memo, useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
  metricLabel: string;
};

const testimonials: Testimonial[] = [
  {
    id: "01",
    name: "Deniz Aksoy",
    role: "Founder",
    company: "Nova Studio",
    quote:
      "Siteyi açtığımızda klasik bir kurumsal web sitesi görmedik. Markanın dijitalde gerçekten nefes aldığını hissettik.",
    metric: "+42%",
    metricLabel: "conversion lift",
  },
  {
    id: "02",
    name: "Ece Yılmaz",
    role: "Brand Director",
    company: "Velora",
    quote:
      "Glass efektleri, büyük tipografi ve scroll hissi markayı çok daha premium gösterdi. Abartılı ama kontrollü.",
    metric: "4.9",
    metricLabel: "client score",
  },
  {
    id: "03",
    name: "Mert Kaya",
    role: "CEO",
    company: "Arc Labs",
    quote:
      "Awwwards seviyesinde bir deneyim istedik. En iyi tarafı şu oldu: tasarım etkileyici, ama kullanım hâlâ çok net.",
    metric: "1.8s",
    metricLabel: "target LCP",
  },
  {
    id: "04",
    name: "Selin Arman",
    role: "Marketing Lead",
    company: "Orion Works",
    quote:
      "Referans alanı normalde sayfanın en sıkıcı yeridir. Burada güven duygusu doğrudan bir sahneye dönüşmüş.",
    metric: "3x",
    metricLabel: "share rate",
  },
  {
    id: "05",
    name: "Arda Sönmez",
    role: "Product Lead",
    company: "Northline",
    quote:
      "Scroll ettikçe kartların gelişini izlemek bağımlılık yaptı. Site sadece bilgi vermiyor, markanın ritmini taşıyor.",
    metric: "92%",
    metricLabel: "engagement",
  },
];

type TestimonialsProps = {
  className?: string;
  morphPageBackground?: boolean;
  pageBaseColor?: string;
};

export default function Testimonials({
  className = "",
  morphPageBackground = true,
  pageBaseColor = "#ffffff",
}: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const previousBodyBackground = useRef("");
  const previousBodyTransition = useRef("");
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: entryScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const entryProgress = useSpring(entryScrollProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.42,
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 74,
    damping: 25,
    mass: 0.42,
  });

  const entryBackground = useTransform(
    entryProgress,
    [0, 1],
    [pageBaseColor, "#050505"],
  );

  const sceneBackground = useTransform(
    progress,
    [0, 0.1, 0.24, 0.42, 0.78, 0.9, 1],
    [
      pageBaseColor,
      "#050505",
      "#050505",
      "#ede8dc",
      "#ede8dc",
      "#1e6f78",
      "#1e6f78",
    ],
  );

  const curtainColor = useTransform(
    progress,
    [0, 0.1, 1],
    [pageBaseColor, "#050505", "#050505"],
  );

  const mainTextColor = useTransform(
    progress,
    [0.05, 0.28, 0.42, 0.86],
    ["#f5f1e8", "#f5f1e8", "#11100d", "#f5f1e8"],
  );

  const mutedTextColor = useTransform(
    progress,
    [0.05, 0.28, 0.42, 0.86],
    [
      "rgba(245,241,232,0.48)",
      "rgba(245,241,232,0.48)",
      "rgba(17,16,13,0.48)",
      "rgba(245,241,232,0.58)",
    ],
  );

  const lineColor = useTransform(
    progress,
    [0.05, 0.28, 0.42, 0.86],
    [
      "rgba(245,241,232,0.32)",
      "rgba(245,241,232,0.32)",
      "rgba(17,16,13,0.24)",
      "rgba(245,241,232,0.36)",
    ],
  );

  /**
   * Giriş eski mantık:
   * üst perde yukarı, alt perde aşağı kaçar.
   * renk beyazdan siyaha yumuşak döner.
   */
  const topCurtainY = useTransform(
    progress,
    [0, 0.1, 1],
    ["0%", "-105%", "-105%"],
  );

  const bottomCurtainY = useTransform(
    progress,
    [0, 0.1, 1],
    ["0%", "105%", "105%"],
  );

  /**
   * Çıkış yeni mantık:
   * tek parça #1e6f78 curtain yukarıdan aşağıya iner.
   */
  const exitCurtainY = useTransform(
    progress,
    [0, 0.8, 0.96, 1],
    ["-105%", "-105%", "0%", "0%"],
  );

  const exitCurtainOpacity = useTransform(
    progress,
    [0, 0.78, 0.86, 1],
    [0, 0, 1, 1],
  );

  const leftBlockOpacity = useTransform(
    progress,
    [0.04, 0.15, 0.76, 0.88],
    [0, 1, 1, 0],
  );

  const leftBlockY = useTransform(
    progress,
    [0.04, 0.18, 0.76, 0.88],
    ["10vh", "0vh", "0vh", "-10vh"],
  );

  const firstLineClip = useTransform(
    progress,
    [0.08, 0.2],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const secondLineClip = useTransform(
    progress,
    [0.14, 0.27],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const thirdLineClip = useTransform(
    progress,
    [0.2, 0.34],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const leftMicroOpacity = useTransform(progress, [0.25, 0.38], [0, 1]);
  const leftMicroY = useTransform(progress, [0.25, 0.38], ["20px", "0px"]);

  const ghostTextOpacity = useTransform(
    progress,
    [0.12, 0.28, 0.48, 0.76],
    [0.08, 0.18, 0.07, 0.03],
  );

  const ghostTextColor = useTransform(
    progress,
    [0.1, 0.42, 0.86],
    ["rgba(245,241,232,0.9)", "rgba(17,16,13,1)", "rgba(245,241,232,1)"],
  );

  const railX = useTransform(progress, [0.18, 0.78], ["38vw", "-184vw"]);
  const railRotateY = useTransform(progress, [0.18, 0.78], [-8, 6]);
  const railRotateX = useTransform(progress, [0.18, 0.78], [3, -2]);

  const stageOpacity = useTransform(
    progress,
    [0.12, 0.22, 0.78, 0.88],
    [0, 1, 1, 0],
  );

  const progressScaleX = useTransform(progress, [0, 1], [0.03, 1]);

  const ambientOpacity = useTransform(progress, [0.08, 0.32, 0.58, 0.86], [
    0.2,
    0.55,
    0.28,
    0.18,
  ]);

  useEffect(() => {
    if (!morphPageBackground) return;

    previousBodyBackground.current = document.body.style.backgroundColor;
    previousBodyTransition.current = document.body.style.transition;

    document.body.style.transition =
      "background-color 900ms cubic-bezier(0.16, 1, 0.3, 1)";

    return () => {
      document.body.style.backgroundColor = previousBodyBackground.current;
      document.body.style.transition = previousBodyTransition.current;
    };
  }, [morphPageBackground]);

  useMotionValueEvent(entryBackground, "change", (latest) => {
    if (!morphPageBackground) return;

    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isEntering = rect.top > 0 && rect.top < window.innerHeight;

    if (!isEntering) return;

    document.body.style.backgroundColor = latest;
  });

  useMotionValueEvent(sceneBackground, "change", (latest) => {
    if (!morphPageBackground) return;

    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isInsideScene =
      rect.top <= 0 && rect.bottom >= window.innerHeight * 0.25;

    if (!isInsideScene) return;

    document.body.style.backgroundColor = latest;
  });

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor: sceneBackground }}
      className={`relative h-[560vh] text-[#11100d] ${className}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          aria-hidden="true"
          style={{ opacity: ambientOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/2 h-[76vh] w-[76vw] -translate-x-1/2 -translate-y-1/2 rounded-[4.5rem] border border-white/20 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(0,0,0,0.08),0_80px_190px_rgba(0,0,0,0.16)] backdrop-blur-[18px]" />

          <div className="absolute left-[8vw] top-[18vh] h-40 w-40 rounded-full border border-white/15 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.34)] backdrop-blur-3xl" />

          <div className="absolute bottom-[14vh] right-[10vw] h-56 w-56 rounded-full border border-white/15 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-3xl" />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.075]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 280 280' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />

        <motion.div
          style={
            reduceMotion
              ? {
                  y: "-105%",
                  backgroundColor: "#050505",
                }
              : {
                  y: topCurtainY,
                  backgroundColor: curtainColor,
                }
          }
          className="pointer-events-none absolute inset-x-0 top-0 z-50 h-1/2"
        />

        <motion.div
          style={
            reduceMotion
              ? {
                  y: "105%",
                  backgroundColor: "#050505",
                }
              : {
                  y: bottomCurtainY,
                  backgroundColor: curtainColor,
                }
          }
          className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-1/2"
        />

        <motion.div
          style={
            reduceMotion
              ? {
                  y: "-105%",
                  opacity: 0,
                  backgroundColor: "#1e6f78",
                }
              : {
                  y: exitCurtainY,
                  opacity: exitCurtainOpacity,
                  backgroundColor: "#1e6f78",
                }
          }
          className="pointer-events-none absolute inset-0 z-[70]"
        />

        <motion.div
          style={{ color: mutedTextColor }}
          className="absolute left-5 top-5 z-30 sm:left-8 sm:top-8 lg:left-12 lg:top-10"
        >
          <div className="rounded-full border border-current/15 bg-white/[0.14] px-4 py-2 text-[10px] uppercase tracking-[0.36em] shadow-[inset_0_1px_0_rgba(255,255,255,0.36)] backdrop-blur-2xl">
            Testimonials
          </div>
        </motion.div>

        <motion.div
          style={{ color: mutedTextColor }}
          className="absolute right-5 top-5 z-30 hidden sm:right-8 sm:top-8 sm:block lg:right-12 lg:top-10"
        >
          <div className="rounded-full border border-current/15 bg-white/[0.14] px-4 py-2 text-[10px] uppercase tracking-[0.36em] shadow-[inset_0_1px_0_rgba(255,255,255,0.36)] backdrop-blur-2xl">
            scroll driven
          </div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{
            opacity: ghostTextOpacity,
            color: ghostTextColor,
          }}
          className="pointer-events-none absolute left-1/2 top-[52%] z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[18vw] font-black uppercase leading-none tracking-[-0.16em]"
        >
          Trusted
        </motion.div>

        <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-[0.88fr_1.12fr]">
          <motion.div
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: leftBlockOpacity,
                    y: leftBlockY,
                  }
            }
            className="pointer-events-none flex h-full items-center px-5 sm:px-8 lg:px-12"
          >
            <div className="w-full max-w-[720px]">
              <div className="mb-8 flex items-center gap-4">
                <motion.span
                  style={{ backgroundColor: lineColor }}
                  className="h-px w-12"
                />

                <motion.span
                  style={{ color: mutedTextColor }}
                  className="text-xs uppercase tracking-[0.5em]"
                >
                  client voices
                </motion.span>
              </div>

              <div className="space-y-[-0.9vw]">
                <motion.div
                  style={reduceMotion ? undefined : { clipPath: firstLineClip }}
                  className="overflow-hidden"
                >
                  <motion.h2
                    style={{ color: mainTextColor }}
                    className="text-[17vw] font-black uppercase leading-[0.75] tracking-[-0.14em] sm:text-[13vw] lg:text-[8.5vw]"
                  >
                    Real
                  </motion.h2>
                </motion.div>

                <motion.div
                  style={reduceMotion ? undefined : { clipPath: secondLineClip }}
                  className="overflow-hidden"
                >
                  <motion.h2
                    style={{ color: mainTextColor }}
                    className="text-[17vw] font-black uppercase leading-[0.75] tracking-[-0.14em] sm:text-[13vw] lg:text-[8.5vw]"
                  >
                    Words
                  </motion.h2>
                </motion.div>

                <motion.div
                  style={reduceMotion ? undefined : { clipPath: thirdLineClip }}
                  className="overflow-hidden"
                >
                  <motion.h2
                    style={{ color: mainTextColor }}
                    className="text-[17vw] font-black uppercase leading-[0.75] tracking-[-0.14em] sm:text-[13vw] lg:text-[8.5vw]"
                  >
                    Move.
                  </motion.h2>
                </motion.div>
              </div>

              <motion.p
                style={
                  reduceMotion
                    ? { color: mutedTextColor }
                    : {
                        opacity: leftMicroOpacity,
                        y: leftMicroY,
                        color: mutedTextColor,
                      }
                }
                className="mt-8 max-w-md text-base leading-8 sm:text-lg"
              >
                Önce sahne karanlığa düşer. Sonra kelimeler belirir. Scroll
                ilerledikçe arka plan açılır ve referanslar cam panellerin
                içinden okunur hâle gelir.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: stageOpacity }}
            className="relative hidden h-full items-center overflow-hidden lg:flex"
          >
            <div
              className="relative h-full w-full"
              style={{
                perspective: "1700px",
                perspectiveOrigin: "42% 50%",
              }}
            >
              <motion.div
                style={
                  reduceMotion
                    ? undefined
                    : {
                        x: railX,
                        rotateY: railRotateY,
                        rotateX: railRotateX,
                        transformStyle: "preserve-3d",
                      }
                }
                className="absolute left-0 top-1/2 flex -translate-y-1/2 gap-10 will-change-transform"
              >
                {testimonials.map((item, index) => (
                  <GlassCard
                    key={item.id}
                    item={item}
                    index={index}
                    progress={progress}
                    reduceMotion={Boolean(reduceMotion)}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: stageOpacity }}
            className="relative flex h-full items-end overflow-hidden px-5 pb-24 pt-[46vh] sm:px-8 lg:hidden"
          >
            <motion.div
              style={reduceMotion ? undefined : { x: railX }}
              className="flex gap-5"
            >
              {testimonials.map((item, index) => (
                <MobileGlassCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ color: mutedTextColor }}
          className="absolute bottom-6 left-5 right-5 z-30 sm:left-8 sm:right-8 lg:left-12 lg:right-12"
        >
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.32em]">
            <span>proof sequence</span>
            <span>keep scrolling</span>
          </div>

          <div className="h-px w-full overflow-hidden bg-current/20">
            <motion.div
              style={{
                scaleX: progressScaleX,
                backgroundColor: mainTextColor,
              }}
              className="h-full origin-left"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

type CardProps = {
  item: Testimonial;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
};

const GlassCard = memo(function GlassCard({
  item,
  index,
  progress,
  reduceMotion,
}: CardProps) {
  const cardStart = 0.16 + index * 0.12;
  const cardCenter = cardStart + 0.16;
  const cardEnd = cardCenter + 0.16;

  const rotateY = useTransform(progress, [cardStart, cardCenter, cardEnd], [
    -20,
    0,
    14,
  ]);

  const rotateX = useTransform(progress, [cardStart, cardCenter, cardEnd], [
    7,
    0,
    -4,
  ]);

  const z = useTransform(progress, [cardStart, cardCenter, cardEnd], [
    -180,
    120,
    -140,
  ]);

  const scale = useTransform(progress, [cardStart, cardCenter, cardEnd], [
    0.88,
    1,
    0.92,
  ]);

  const opacity = useTransform(progress, [cardStart, cardCenter, cardEnd], [
    0.72,
    1,
    0.76,
  ]);

  const quoteY = useTransform(progress, [cardStart, cardCenter, cardEnd], [
    "7%",
    "0%",
    "-5%",
  ]);

  return (
    <motion.article
      style={
        reduceMotion
          ? undefined
          : {
              rotateY,
              rotateX,
              z,
              scale,
              opacity,
              transformStyle: "preserve-3d",
            }
      }
      className="relative h-[620px] w-[560px] shrink-0 overflow-hidden rounded-[3rem] border border-white/45 bg-white/24 p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.76),inset_0_-1px_0_rgba(0,0,0,0.08),0_80px_170px_rgba(35,30,22,0.22)] backdrop-blur-xl sm:backdrop-blur-2xl lg:backdrop-blur-[42px] transform-gpu"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12)_38%,rgba(255,255,255,0.28)_100%)]" />

      <div className="pointer-events-none absolute inset-[18px] rounded-[2.35rem] border border-black/[0.075]" />

      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/20 blur-2xl" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-8">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.35em] text-black/38">
                {item.id}
              </span>
              <span className="h-px w-14 bg-black/18" />
              <span className="text-[10px] uppercase tracking-[0.34em] text-black/36">
                verified
              </span>
            </div>

            <h3 className="text-5xl font-black uppercase leading-[0.82] tracking-[-0.09em] text-[#11100d]">
              {item.name}
            </h3>

            <p className="mt-4 text-base text-black/48">
              {item.role}, {item.company}
            </p>
          </div>

          <div className="rounded-full border border-white/50 bg-white/25 px-5 py-4 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl">
            <div className="text-4xl font-black tracking-[-0.08em]">
              {item.metric}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-black/38">
              {item.metricLabel}
            </div>
          </div>
        </div>

        <motion.div
          style={reduceMotion ? undefined : { y: quoteY }}
          className="mt-auto"
        >
          <p className="text-[3.7rem] font-black leading-[0.84] tracking-[-0.105em] text-[#11100d]">
            “{item.quote}”
          </p>
        </motion.div>

        <div className="mt-8 flex items-end justify-between border-t border-black/10 pt-5">
          <span className="text-[10px] uppercase tracking-[0.34em] text-black/36">
            client reaction
          </span>

          <div className="flex gap-1 text-black/45">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <span key={starIndex}>★</span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
});

type MobileCardProps = {
  item: Testimonial;
  index: number;
};

const MobileGlassCard = memo(function MobileGlassCard({
  item,
  index,
}: MobileCardProps) {
  return (
    <article className="relative h-[460px] w-[82vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/45 bg-white/24 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.76),inset_0_-1px_0_rgba(0,0,0,0.08),0_60px_130px_rgba(35,30,22,0.22)] backdrop-blur-xl sm:backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12)_38%,rgba(255,255,255,0.28)_100%)]" />

      <div className="relative flex h-full flex-col">
        <div className="mb-6 font-mono text-xs tracking-[0.35em] text-black/38">
          {String(index + 1).padStart(2, "0")}
        </div>

        <h3 className="text-3xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-[#11100d]">
          {item.name}
        </h3>

        <p className="mt-3 text-sm text-black/48">
          {item.role}, {item.company}
        </p>

        <p className="mt-auto text-4xl font-black leading-[0.9] tracking-[-0.085em] text-[#11100d]">
          “{item.quote}”
        </p>

        <div className="mt-6 flex items-end justify-between border-t border-black/10 pt-5">
          <div>
            <div className="text-3xl font-black tracking-[-0.08em]">
              {item.metric}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-black/38">
              {item.metricLabel}
            </div>
          </div>

          <div className="flex gap-1 text-black/45">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <span key={starIndex}>★</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
});