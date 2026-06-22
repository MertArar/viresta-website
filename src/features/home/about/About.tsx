"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import hero3 from "@/assets/hero3.png";

const COLORS = {
  navy: "#0F2747",
  teal: "#1E6F78",
  soft: "#F6F8FA",
  ink: "#1A1F2B",
};

const headlineWords = [
  "Finansal",
  "bakışı",
  "stratejik",
  "karar",
  "süreçlerine",
  "dönüştürüyoruz.",
];

function AnimatedWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const mid = (index + 0.45) / total;
  const end = (index + 1.1) / total;

  const color = useTransform(
    progress,
    [start, mid, end],
    [COLORS.ink, COLORS.teal, COLORS.navy]
  );

  const y = useTransform(progress, [start, mid, end], [14, 0, -2]);
  const opacity = useTransform(progress, [start, mid], [0.35, 1]);

  return (
    <motion.span
      style={{ color, y, opacity }}
      className="mr-[0.22em] inline-block will-change-transform"
    >
      {word}
    </motion.span>
  );
}

function ImageRevealPanel({ progress }: { progress: MotionValue<number> }) {
  const panelY = useTransform(progress, [0, 0.34, 1], [22, 0, -16]);
  const panelOpacity = useTransform(progress, [0.02, 0.12], [0, 1]);

  const imageScale = useTransform(progress, [0.04, 0.45, 1], [1.13, 1.025, 1]);
  const imageY = useTransform(progress, [0.04, 1], [28, -16]);

  const imageClip = useTransform(
    progress,
    [0.05, 0.3],
    ["inset(18% 14% 18% 14%)", "inset(0% 0% 0% 0%)"]
  );

  const imageFilter = useTransform(
    progress,
    [0.05, 0.32],
    [
      "grayscale(1) contrast(0.92) brightness(0.9)",
      "grayscale(0) contrast(1.06) brightness(1.04)",
    ]
  );

  const curtainOneY = useTransform(progress, [0.05, 0.26], ["0%", "-110%"]);
  const curtainTwoY = useTransform(progress, [0.09, 0.31], ["0%", "110%"]);
  const curtainThreeY = useTransform(progress, [0.13, 0.35], ["0%", "-110%"]);

  const titleOpacity = useTransform(progress, [0.18, 0.34], [0, 1]);
  const titleY = useTransform(progress, [0.18, 0.34], [24, 0]);

  const lineOne = useTransform(progress, [0.28, 0.44], ["0%", "100%"]);
  const lineTwo = useTransform(progress, [0.38, 0.56], ["0%", "100%"]);
  const lineThree = useTransform(progress, [0.48, 0.66], ["0%", "100%"]);

  const noteOpacity = useTransform(progress, [0.58, 0.74], [0, 1]);
  const noteY = useTransform(progress, [0.58, 0.74], [22, 0]);

  const sideTextY = useTransform(progress, [0.08, 1], [12, -20]);

  return (
    <motion.div
      style={{ y: panelY, opacity: panelOpacity }}
      className="relative hidden h-[660px] w-[570px] shrink-0 lg:block"
    >
      <div className="absolute inset-0 bg-white shadow-[0_36px_120px_rgba(15,39,71,0.12)]" />

      <div className="absolute inset-5 border border-[#0F2747]/10" />

      <div className="absolute left-0 top-0 z-20 h-full w-[92px] bg-[#0F2747]">
        <motion.div
          style={{ y: sideTextY }}
          className="absolute bottom-16 left-[64px] flex -translate-x-1/2 rotate-[-90deg] items-center gap-5 whitespace-nowrap"
        >
          <span className="h-px pb-10 w-16" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-white/68">
            Financial perspective
          </span>
        </motion.div>
      </div>

      <motion.div
        style={{ clipPath: imageClip }}
        className="absolute bottom-0 right-0 top-0 w-[calc(100%-92px)] overflow-hidden bg-[#1A1F2B]"
      >
        <motion.div
          style={{
            scale: imageScale,
            y: imageY,
            filter: imageFilter,
          }}
          className="absolute inset-0"
        >
          <Image
            src={hero3}
            alt="Viresta stratejik danışmanlık görseli"
            fill
            sizes="570px"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2747]/84 via-[#0F2747]/30 to-[#0F2747]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2747]/56 via-[#0F2747]/14 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_38%,transparent_0%,rgba(15,39,71,0.34)_72%)]" />
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-30 flex w-[calc(100%-92px)]">
        <motion.div
          style={{ y: curtainOneY }}
          className="h-full flex-1 bg-[#0F2747]"
        />
        <motion.div
          style={{ y: curtainTwoY }}
          className="h-full flex-1 bg-[#F6F8FA]"
        />
        <motion.div
          style={{ y: curtainThreeY }}
          className="h-full flex-1 bg-[#1E6F78]"
        />
      </div>

      <motion.div
        style={{ opacity: titleOpacity, y: titleY }}
        className="absolute left-[132px] top-12 z-50 max-w-[350px] drop-shadow-[0_18px_34px_rgba(0,0,0,0.42)]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-white/90">
          Viresta Lens
        </p>

        <h3 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.07em] text-white">
          Veriyi
          <br />
          karara
          <br />
          yaklaştırır.
        </h3>
      </motion.div>

      <div className="absolute bottom-32 left-[132px] right-10 z-50 space-y-5 drop-shadow-[0_12px_26px_rgba(0,0,0,0.28)]">
        <div>
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/86">
            <span>Finansal okuma</span>
            <span>01</span>
          </div>
          <div className="h-px bg-white/32">
            <motion.div style={{ width: lineOne }} className="h-px bg-white" />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/86">
            <span>Stratejik yorum</span>
            <span>02</span>
          </div>
          <div className="h-px bg-white/32">
            <motion.div
              style={{ width: lineTwo }}
              className="h-px bg-[#AEE7EC]"
            />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/86">
            <span>Yönetim aksiyonu</span>
            <span>03</span>
          </div>
          <div className="h-px bg-white/32">
            <motion.div
              style={{ width: lineThree }}
              className="h-px bg-white"
            />
          </div>
        </div>
      </div>

      <motion.div
        style={{ opacity: noteOpacity, y: noteY }}
        className="absolute -bottom-40 right-10 z-40 w-[410px] overflow-hidden rounded-[1.4rem] bg-white shadow-[0_32px_90px_rgba(15,39,71,0.18)]"
      >
        <div className="relative px-8 py-7">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#1E6F78]" />

          <div className="flex items-start justify-between gap-7">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#1E6F78]">
                Decision Quality
              </p>

              <p className="mt-3 text-[1.32rem] font-semibold leading-tight tracking-[-0.052em] text-[#0F2747]">
                Veriyi, yönetimin hızlı karar alabileceği net bir aksiyon
                haritasına dönüştürür.
              </p>
            </div>

            <div className="shrink-0 text-right">
              <span className="block text-4xl font-semibold leading-none tracking-[-0.08em] text-[#1A1F2B]">
                360
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.26em] text-[#1A1F2B]/38">
                view
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#0F2747]/10 pt-5">
            <div className="relative pl-4">
              <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-[#1E6F78]" />
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#1A1F2B]/38">
                Öncelik
              </p>
              <p className="mt-1 text-sm font-medium text-[#1A1F2B]/76">
                Karar alanları
              </p>
            </div>

            <div className="relative pl-4">
              <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-[#0F2747]" />
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#1A1F2B]/38">
                Çıktı
              </p>
              <p className="mt-1 text-sm font-medium text-[#1A1F2B]/76">
                Uygulama rotası
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute -right-5 top-16 z-50 h-28 w-px bg-[#0F2747]/20" />
      <div className="absolute -right-5 top-16 z-50 h-px w-20 bg-[#0F2747]/20" />
    </motion.div>
  );
}

function MobileImagePanel() {
  return (
    <div className="relative overflow-hidden rounded-[1.4rem] bg-[#0F2747] shadow-[0_24px_80px_rgba(15,39,71,0.12)] lg:hidden">
      <div className="relative h-[440px]">
        <Image
          src={hero3}
          alt="Viresta stratejik danışmanlık görseli"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2747]/84 via-[#0F2747]/28 to-[#0F2747]/8" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2747]/46 via-transparent to-transparent" />

        <div className="absolute bottom-8 left-6 right-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-white/84">
            Viresta Lens
          </p>

          <h3 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.06em] text-white">
            Veriyi karara yaklaştırır.
          </h3>

          <div className="mt-7 space-y-4">
            {["Finansal okuma", "Stratejik yorum", "Yönetim aksiyonu"].map(
              (item, index) => (
                <div key={item}>
                  <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.26em] text-white/78">
                    <span>{item}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <div className="h-px bg-white/28">
                    <div className="h-px w-2/3 bg-white" />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.4,
  });

  const leftBlockY = useTransform(progress, [0, 0.42, 1], [22, 0, -18]);

  const introOpacity = useTransform(progress, [0.1, 0.28], [0, 1]);
  const introY = useTransform(progress, [0.1, 0.28], [24, 0]);

  const ctaOpacity = useTransform(progress, [0.34, 0.52], [0, 1]);
  const ctaY = useTransform(progress, [0.34, 0.52], [24, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[260vh] overflow-clip bg-[#F6F8FA] text-[#1A1F2B]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-32 h-[520px] w-[520px] bg-[#1E6F78]/10 blur-[120px]" />
        <div className="absolute -left-44 bottom-[18%] h-[560px] w-[560px] bg-[#0F2747]/10 blur-[130px]" />
        <div className="absolute left-0 top-0 h-full w-[38%] bg-white" />
      </div>

      <div className="sticky top-0 min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-5 py-24 md:px-10 lg:px-14">
          <div className="relative z-10 flex w-full flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
            <motion.div style={{ y: leftBlockY }} className="max-w-2xl">
              <div className="mb-8 flex items-center gap-5">
                <span className="h-px w-16 bg-[#1E6F78]" />
                <span className="text-xs font-semibold uppercase tracking-[0.42em] text-[#1E6F78]">
                  About Viresta
                </span>
              </div>

              <h2 className="text-[clamp(2.4rem,5vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.065em] text-[#1A1F2B]">
                {headlineWords.map((word, index) => (
                  <AnimatedWord
                    key={word}
                    word={word}
                    index={index}
                    total={headlineWords.length}
                    progress={progress}
                  />
                ))}
              </h2>

              <motion.p
                style={{
                  opacity: introOpacity,
                  y: introY,
                }}
                className="mt-9 max-w-xl text-base leading-8 text-[#1A1F2B]/68 md:text-lg"
              >
                Viresta, şirketlerin finansal görünümünü yalnızca raporlayan
                değil, karar kalitesini yükselten stratejik bir yönetim
                katmanına dönüştüren danışmanlık yaklaşımı geliştirir.
              </motion.p>

              <motion.div
                style={{
                  opacity: ctaOpacity,
                  y: ctaY,
                }}
                className="mt-10 flex items-center gap-6"
              >
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-4 overflow-hidden rounded-[1.15rem] border border-[#0F2747]/80 px-6 py-4 text-sm font-semibold text-[#0F2747] shadow-[0_18px_45px_rgba(15,39,71,0.08)] transition-all duration-500 hover:border-[#0F2747] hover:text-white hover:shadow-[0_26px_70px_rgba(15,39,71,0.18)]"
                >
                  <span className="absolute right-5 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#0F2747] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[18]" />

                  <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/24 blur-sm transition-transform duration-700 group-hover:translate-x-[420%]" />

                  <span className="relative z-10">Tanışalım</span>

                  <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#0F2747] text-white transition-all duration-500 group-hover:rotate-[-35deg] group-hover:bg-white group-hover:text-[#0F2747]">
                    →
                  </span>
                </a>

                <span className="hidden h-px w-24 bg-[#1A1F2B]/15 sm:block" />

                <span className="text-sm leading-6 text-[#1A1F2B]/48">
                  Finansal danışmanlık <br /> kurumsal stratejiyle birleşir.
                </span>
              </motion.div>
            </motion.div>

            <ImageRevealPanel progress={progress} />

            <MobileImagePanel />
          </div>
        </div>
      </div>
    </section>
  );
}