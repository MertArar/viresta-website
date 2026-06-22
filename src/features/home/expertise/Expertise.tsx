"use client";

import { memo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

type ExpertiseStatement = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  keywords: string[];
};

const expertiseStatements: ExpertiseStatement[] = [
  {
    id: "01",
    kicker: "Brand System",
    title: "Identity that feels intentional.",
    description:
      "Markanın dijitalde nasıl görüneceğini değil, nasıl hissedileceğini tasarlarız.",
    keywords: ["Art Direction", "Visual Language", "UI System"],
  },
  {
    id: "02",
    kicker: "Motion Logic",
    title: "Scroll that carries the story.",
    description:
      "Hareketi süs olarak değil, sayfanın anlatım ritmini kuran bir tasarım katmanı olarak kullanırız.",
    keywords: ["Reveal", "Rhythm", "Micro Motion"],
  },
  {
    id: "03",
    kicker: "Frontend Craft",
    title: "Interfaces built for production.",
    description:
      "Ağır görünen deneyimleri canlıda stabil, responsive ve sürdürülebilir çalışacak şekilde kodlarız.",
    keywords: ["Next.js", "Components", "Responsive"],
  },
  {
    id: "04",
    kicker: "Conversion Flow",
    title: "Beauty that knows where to lead.",
    description:
      "Sayfa akışını dikkat, güven ve aksiyon sırasına göre kurar; estetiği stratejiyle birleştiririz.",
    keywords: ["CTA Flow", "Trust", "Structure"],
  },
  {
    id: "05",
    kicker: "Performance",
    title: "Premium without the weight.",
    description:
      "Blur, shadow, image ve animasyon yükünü kontrollü kullanarak deneyimin canlıda da güçlü kalmasını sağlarız.",
    keywords: ["Speed", "Polish", "Optimization"],
  },
];

type ExpertiseProps = {
  className?: string;
  ctaHref?: string;
};

export default function Expertise({
  className = "",
  ctaHref = "/contact",
}: ExpertiseProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
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
    stiffness: 64,
    damping: 30,
    mass: 0.52,
  });

  const sectionBackground = useTransform(
    progress,
    [0, 0.14, 0.42, 0.72, 1],
    ["#1e6f78", "#050707", "#0d0c09", "#eee8dc", "#eee8dc"],
  );

  const entryCurtainY = useTransform(
    entryProgress,
    [0, 1],
    ["0%", "-105%"],
  );

  const mainTextColor = useTransform(
    progress,
    [0.04, 0.46, 0.72, 1],
    ["#d8f3f0", "#f6f0e7", "#11100d", "#11100d"],
  );

  const mutedTextColor = useTransform(
    progress,
    [0.04, 0.46, 0.72, 1],
    [
      "rgba(216,243,240,0.58)",
      "rgba(246,240,231,0.54)",
      "rgba(17,16,13,0.52)",
      "rgba(17,16,13,0.52)",
    ],
  );

  const lineColor = useTransform(
    progress,
    [0.04, 0.46, 0.72, 1],
    [
      "rgba(216,243,240,0.34)",
      "rgba(246,240,231,0.3)",
      "rgba(17,16,13,0.24)",
      "rgba(17,16,13,0.24)",
    ],
  );

  const expertiseLayerY = useTransform(
    progress,
    [0, 0.18, 0.38, 0.68, 1],
    ["0vh", "0vh", "12vh", "28vh", "42vh"],
  );

  const expertiseLayerScale = useTransform(
    progress,
    [0, 0.16, 0.38, 0.72, 1],
    [0.9, 1, 1.16, 0.9, 0.72],
  );

  const expertiseLayerOpacity = useTransform(
    progress,
    [0, 0.08, 0.22, 0.48, 0.82, 0.96],
    [0, 1, 0.42, 0.18, 0.08, 0],
  );

  const expertiseLayerBlur = useTransform(
    progress,
    [0.08, 0.22, 0.46, 0.82],
    ["blur(0px)", "blur(0px)", "blur(2px)", "blur(8px)"],
  );

  const expertiseLayerTracking = useTransform(
    progress,
    [0.08, 0.46, 0.92],
    ["-0.16em", "-0.11em", "-0.18em"],
  );

  const craftOpacity = useTransform(
    progress,
    [0.12, 0.26, 0.72, 0.94],
    [0, 0.1, 0.08, 0],
  );

  const craftY = useTransform(progress, [0.12, 0.9], ["-8vh", "10vh"]);

  const introOpacity = useTransform(progress, [0.04, 0.18, 0.7, 0.86], [
    0,
    1,
    1,
    0,
  ]);

  const introY = useTransform(progress, [0.04, 0.18, 0.7, 0.86], [
    "24px",
    "0px",
    "0px",
    "-28px",
  ]);

  const smallTitleClip = useTransform(
    progress,
    [0.08, 0.24],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const statementStageOpacity = useTransform(
    progress,
    [0.16, 0.24, 0.78, 0.9],
    [0, 1, 1, 0],
  );

  const ambientOneOpacity = useTransform(
    progress,
    [0.08, 0.32, 0.68, 0.92],
    [0.16, 0.42, 0.24, 0.12],
  );

  const ambientTwoOpacity = useTransform(
    progress,
    [0.08, 0.46, 0.76, 1],
    [0.08, 0.2, 0.16, 0.08],
  );

  const ctaOpacity = useTransform(progress, [0.8, 0.88, 1], [0, 1, 1]);
  const ctaY = useTransform(progress, [0.8, 0.9], ["48px", "0px"]);
  const ctaScale = useTransform(progress, [0.8, 0.9], [0.9, 1]);

  const ctaTitleClip = useTransform(
    progress,
    [0.82, 0.92],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const ctaTextOpacity = useTransform(progress, [0.86, 0.94], [0, 1]);
  const ctaTextY = useTransform(progress, [0.86, 0.94], ["24px", "0px"]);

  const ctaButtonOpacity = useTransform(progress, [0.9, 0.97], [0, 1]);
  const ctaButtonY = useTransform(progress, [0.9, 0.97], ["22px", "0px"]);

  const progressScaleX = useTransform(progress, [0, 1], [0.03, 1]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor: sectionBackground }}
      className={`relative h-[920vh] overflow-visible text-[#11100d] ${className}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          aria-hidden="true"
          style={
            reduceMotion
              ? { y: "-105%" }
              : {
                  y: entryCurtainY,
                }
          }
          className="pointer-events-none absolute inset-0 z-[80] bg-[#1e6f78]"
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.065]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 280 280' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />

        <motion.div
          aria-hidden="true"
          style={{
            opacity: ambientOneOpacity,
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[74vh] w-[74vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.1] bg-white/[0.035] backdrop-blur-2xl"
        />

        <motion.div
          aria-hidden="true"
          style={{
            opacity: ambientTwoOpacity,
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[48vh] w-[48vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.09] bg-white/[0.025] backdrop-blur-2xl"
        />

        <motion.div
          aria-hidden="true"
          style={{
            opacity: craftOpacity,
            y: craftY,
            color: mainTextColor,
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[28vw] font-black uppercase leading-none tracking-[-0.18em]"
        >
          Craft
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 h-[74vh] w-[74vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]" />
          <div className="absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
          <div className="absolute left-[10vw] top-[18vh] h-32 w-32 rounded-full border border-white/[0.08] bg-white/[0.035] backdrop-blur-2xl" />
          <div className="absolute bottom-[15vh] right-[11vw] h-44 w-44 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl" />
        </div>

        <motion.div
          aria-hidden="true"
          style={
            reduceMotion
              ? {
                  color: "#f6f0e7",
                }
              : {
                  y: expertiseLayerY,
                  scale: expertiseLayerScale,
                  opacity: expertiseLayerOpacity,
                  filter: expertiseLayerBlur,
                  color: mainTextColor,
                  letterSpacing: expertiseLayerTracking,
                }
          }
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[18vw] font-black uppercase leading-none sm:text-[15vw] lg:text-[11vw]"
        >
          Expertise
        </motion.div>

        <motion.div
          style={{ color: mutedTextColor }}
          className="absolute left-5 top-5 z-40 sm:left-8 sm:top-8 lg:left-12 lg:top-10"
        >
          <div className="rounded-full border border-current/15 bg-white/[0.11] px-4 py-2 text-[10px] uppercase tracking-[0.36em] shadow-[inset_0_1px_0_rgba(255,255,255,0.26)] backdrop-blur-2xl">
            Expertise
          </div>
        </motion.div>

        <motion.div
          style={{ color: mutedTextColor }}
          className="absolute right-5 top-5 z-40 hidden sm:right-8 sm:top-8 sm:block lg:right-12 lg:top-10"
        >
          <div className="rounded-full border border-current/15 bg-white/[0.11] px-4 py-2 text-[10px] uppercase tracking-[0.36em] shadow-[inset_0_1px_0_rgba(255,255,255,0.26)] backdrop-blur-2xl">
            text based system
          </div>
        </motion.div>

        <motion.div
          style={
            reduceMotion
              ? undefined
              : {
                  opacity: introOpacity,
                  y: introY,
                }
          }
          className="pointer-events-none absolute left-0 top-[11vh] z-20 w-full px-5 sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-6 flex items-center gap-4">
              <motion.span
                style={{ backgroundColor: lineColor }}
                className="h-px w-14"
              />

              <motion.span
                style={{ color: mutedTextColor }}
                className="text-xs uppercase tracking-[0.5em]"
              >
                what we master
              </motion.span>
            </div>

            <motion.div
              style={reduceMotion ? undefined : { clipPath: smallTitleClip }}
              className="overflow-hidden"
            >
              <motion.p
                style={{ color: mutedTextColor }}
                className="max-w-xl text-base leading-8 sm:text-lg"
              >
                Kartlar yok. Sadece tipografi, ritim, renk geçişi ve scroll ile
                değişen bir uzmanlık anlatısı.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        <div className="relative z-20 flex h-full items-center justify-center px-5 sm:px-8 lg:px-12">
          <motion.div
            style={{ opacity: statementStageOpacity }}
            className="relative z-30 flex h-full w-full max-w-[1500px] items-center justify-center"
          >
            {expertiseStatements.map((statement, index) => (
              <StatementLayer
                key={statement.id}
                statement={statement}
                index={index}
                total={expertiseStatements.length}
                progress={progress}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </motion.div>

          <motion.div
            style={
              reduceMotion
                ? undefined
                : {
                    opacity: ctaOpacity,
                    y: ctaY,
                    scale: ctaScale,
                  }
            }
            className="absolute left-1/2 top-1/2 z-50 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 px-5 text-center"
          >
            <motion.div
              style={reduceMotion ? undefined : { clipPath: ctaTitleClip }}
              className="overflow-hidden"
            >
              <motion.h3
                style={{ color: mainTextColor }}
                className="mx-auto max-w-[12ch] text-[13vw] font-black uppercase leading-[0.78] tracking-[-0.13em] sm:text-[9vw] lg:text-[6.7vw]"
              >
                Birlikte daha güçlü bir dijital deneyim tasarlayalım.
              </motion.h3>
            </motion.div>

            <motion.p
              style={
                reduceMotion
                  ? { color: mutedTextColor }
                  : {
                      opacity: ctaTextOpacity,
                      y: ctaTextY,
                      color: mutedTextColor,
                    }
              }
              className="mx-auto mt-8 max-w-2xl text-base font-medium leading-8 sm:text-xl sm:leading-9"
            >
              Markanız için aynı özeni taşıyan, etkileyici ve hızlı çalışan bir
              dijital deneyim kuralım.
            </motion.p>

            <motion.div
              style={
                reduceMotion
                  ? undefined
                  : {
                      opacity: ctaButtonOpacity,
                      y: ctaButtonY,
                    }
              }
              className="mt-9"
            >
              <motion.a
                href={ctaHref}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.03,
                      }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative inline-flex items-center gap-5 overflow-hidden rounded-full border border-current/20 bg-white/[0.12] px-7 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-current shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-current/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

                <span className="relative">Daha fazlası</span>

                <span className="relative grid h-9 w-9 place-items-center rounded-full border border-current/20 bg-white/[0.12] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  <span className="block transition-transform duration-500 group-hover:rotate-45">
                    →
                  </span>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ color: mutedTextColor }}
          className="absolute bottom-6 left-5 right-5 z-40 sm:left-8 sm:right-8 lg:left-12 lg:right-12"
        >
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.32em]">
            <span>expertise narrative</span>
            <span>scroll to shift</span>
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

type StatementLayerProps = {
  statement: ExpertiseStatement;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
};

const StatementLayer = memo(function StatementLayer({
  statement,
  index,
  total,
  progress,
  reduceMotion,
}: StatementLayerProps) {
  const sequenceStart = 0.22;
  const sequenceEnd = 0.76;

  const slot = (sequenceEnd - sequenceStart) / total;
  const activeDuration = slot * 0.84;

  const start = sequenceStart + index * slot;
  const enterEnd = start + activeDuration * 0.16;
  const holdEnd = start + activeDuration * 0.86;
  const end = start + activeDuration;

  const opacity = useTransform(
    progress,
    [start, enterEnd, holdEnd, end],
    [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    [start, enterEnd, holdEnd, end],
    ["18vh", "0vh", "0vh", "-16vh"],
  );

  const x = useTransform(
    progress,
    [start, enterEnd, holdEnd, end],
    index % 2 === 0
      ? ["-4vw", "0vw", "0vw", "4vw"]
      : ["4vw", "0vw", "0vw", "-4vw"],
  );

  const scale = useTransform(
    progress,
    [start, enterEnd, holdEnd, end],
    [0.94, 1, 1, 0.94],
  );

  const blur = useTransform(
    progress,
    [start, enterEnd, holdEnd, end],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"],
  );

  const titleColor = useTransform(
    progress,
    [0.1, 0.58, 0.78],
    ["#f6f0e7", "#f6f0e7", "#11100d"],
  );

  const mutedColor = useTransform(
    progress,
    [0.1, 0.58, 0.78],
    [
      "rgba(246,240,231,0.58)",
      "rgba(246,240,231,0.58)",
      "rgba(17,16,13,0.58)",
    ],
  );

  const accentColor = useTransform(
    progress,
    [0.1, 0.58, 0.78],
    [
      "rgba(246,240,231,0.34)",
      "rgba(246,240,231,0.34)",
      "rgba(17,16,13,0.28)",
    ],
  );

  return (
    <motion.article
      style={
        reduceMotion
          ? undefined
          : {
              opacity,
              x,
              y,
              scale,
              filter: blur,
            }
      }
      className="absolute left-1/2 top-[54%] w-full max-w-[1180px] -translate-x-1/2 -translate-y-1/2 text-center"
    >
      <div className="mx-auto mb-7 flex w-fit items-center justify-center gap-4">
        <motion.span
          style={{ color: mutedColor }}
          className="font-mono text-xs tracking-[0.36em]"
        >
          {statement.id}
        </motion.span>

        <motion.span
          style={{ backgroundColor: accentColor }}
          className="h-px w-14"
        />

        <motion.span
          style={{ color: mutedColor }}
          className="text-[10px] uppercase tracking-[0.38em]"
        >
          {statement.kicker}
        </motion.span>
      </div>

      <motion.h3
        style={{ color: titleColor }}
        className="mx-auto max-w-[10ch] text-[12vw] font-black uppercase leading-[0.78] tracking-[-0.13em] sm:text-[9vw] lg:text-[6.6vw]"
      >
        {statement.title}
      </motion.h3>

      <motion.p
        style={{ color: mutedColor }}
        className="mx-auto mt-7 max-w-2xl text-base font-medium leading-8 sm:text-xl sm:leading-9"
      >
        {statement.description}
      </motion.p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {statement.keywords.map((keyword) => (
          <motion.span
            key={keyword}
            style={{
              color: mutedColor,
              borderColor: accentColor,
            }}
            className="rounded-full border bg-white/[0.08] px-4 py-2 text-[10px] uppercase tracking-[0.28em] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl"
          >
            {keyword}
          </motion.span>
        ))}
      </div>
    </motion.article>
  );
});