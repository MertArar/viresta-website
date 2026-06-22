"use client";

import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, useRef, useState } from "react";
import { motion, useAnimationFrame, useReducedMotion } from "motion/react";

import skeletonImage from "@/assets/building1.png";
import finishedImage from "@/assets/building2.png";

type ServicesProps = {
  className?: string;
  skeletonSrc?: StaticImageData;
  finishedSrc?: StaticImageData;
};

type RevealStyle = CSSProperties & {
  "--reveal-x": string;
  "--reveal-y": string;
  "--reveal-radius": string;
  "--reveal-soft-start": string;
  "--reveal-soft-end": string;
};

type SectionStyle = CSSProperties & {
  "--mouse-x": string;
  "--mouse-y": string;
  "--water-x": string;
  "--water-y": string;
};

const servicePoints = [
  "Konut projeleri",
  "Mimari uygulama",
  "Cephe dönüşümü",
  "Anahtar teslim süreç",
];

export default function Services({
  className = "",
  skeletonSrc = skeletonImage,
  finishedSrc = finishedImage,
}: ServicesProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const targetX = useRef(50);
  const targetY = useRef(50);
  const targetRadius = useRef(96);

  const currentX = useRef(50);
  const currentY = useRef(50);
  const currentRadius = useRef(96);

  const backgroundTargetX = useRef(50);
  const backgroundTargetY = useRef(50);
  const backgroundCurrentX = useRef(50);
  const backgroundCurrentY = useRef(50);

  const [isHoveringBuilding, setIsHoveringBuilding] = useState(false);
  const reduceMotion = useReducedMotion();

  useAnimationFrame((time) => {
    const stage = stageRef.current;
    const section = sectionRef.current;

    if (!reduceMotion && !isHoveringBuilding) {
      targetX.current =
        50 + Math.cos(time / 1500) * 18 + Math.sin(time / 2300) * 5;

      targetY.current =
        50 + Math.sin(time / 1750) * 18 + Math.cos(time / 2600) * 5;

      targetRadius.current = 88 + Math.sin(time / 1200) * 10;
    }

    currentX.current += (targetX.current - currentX.current) * 0.12;
    currentY.current += (targetY.current - currentY.current) * 0.12;
    currentRadius.current +=
      (targetRadius.current - currentRadius.current) * 0.12;

    backgroundCurrentX.current +=
      (backgroundTargetX.current - backgroundCurrentX.current) * 0.08;

    backgroundCurrentY.current +=
      (backgroundTargetY.current - backgroundCurrentY.current) * 0.08;

    if (stage) {
      const radius = currentRadius.current;

      stage.style.setProperty("--reveal-x", `${currentX.current}%`);
      stage.style.setProperty("--reveal-y", `${currentY.current}%`);
      stage.style.setProperty("--reveal-radius", `${radius}px`);
      stage.style.setProperty("--reveal-soft-start", `${radius + 28}px`);
      stage.style.setProperty("--reveal-soft-end", `${radius + 76}px`);
    }

    if (section) {
      const waterX = (backgroundCurrentX.current - 50) * 0.72;
      const waterY = (backgroundCurrentY.current - 50) * 0.42;

      section.style.setProperty("--mouse-x", `${backgroundCurrentX.current}%`);
      section.style.setProperty("--mouse-y", `${backgroundCurrentY.current}%`);
      section.style.setProperty("--water-x", `${waterX}px`);
      section.style.setProperty("--water-y", `${waterY}px`);
    }
  });

  function handleSectionPointerMove(event: React.PointerEvent<HTMLElement>) {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width) * 100;
    const nextY = ((event.clientY - rect.top) / rect.height) * 100;

    backgroundTargetX.current = Math.max(0, Math.min(100, nextX));
    backgroundTargetY.current = Math.max(0, Math.min(100, nextY));
  }

  function handleBuildingPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width) * 100;
    const nextY = ((event.clientY - rect.top) / rect.height) * 100;

    targetX.current = Math.max(0, Math.min(100, nextX));
    targetY.current = Math.max(0, Math.min(100, nextY));
  }

  function handleBuildingPointerEnter() {
    setIsHoveringBuilding(true);
    targetRadius.current = 138;
  }

  function handleBuildingPointerLeave() {
    setIsHoveringBuilding(false);
    targetRadius.current = 96;
  }

  const revealStyle: RevealStyle = {
    "--reveal-x": "50%",
    "--reveal-y": "50%",
    "--reveal-radius": "96px",
    "--reveal-soft-start": "124px",
    "--reveal-soft-end": "172px",
  };

  const sectionStyle: SectionStyle = {
    "--mouse-x": "50%",
    "--mouse-y": "50%",
    "--water-x": "0px",
    "--water-y": "0px",
  };

  const finishedMaskStyle: CSSProperties = {
    WebkitMaskImage:
      "radial-gradient(circle at var(--reveal-x) var(--reveal-y), rgba(0,0,0,1) 0px, rgba(0,0,0,1) var(--reveal-radius), rgba(0,0,0,0.78) var(--reveal-soft-start), rgba(0,0,0,0) var(--reveal-soft-end))",
    maskImage:
      "radial-gradient(circle at var(--reveal-x) var(--reveal-y), rgba(0,0,0,1) 0px, rgba(0,0,0,1) var(--reveal-radius), rgba(0,0,0,0.78) var(--reveal-soft-start), rgba(0,0,0,0) var(--reveal-soft-end))",
  };

  const buildingContourMaskStyle: CSSProperties = {
    WebkitMaskImage: `url(${skeletonSrc.src})`,
    maskImage: `url(${skeletonSrc.src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      onPointerMove={handleSectionPointerMove}
      className={`relative overflow-hidden bg-[#EDE7DC] px-5 pb-24 pt-28 text-[#10100d] sm:px-8 sm:pb-28 sm:pt-32 lg:px-12 lg:pb-36 lg:pt-40 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#EDE7DC] via-[#F3EEE5] to-white" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: [
                    "0px 0px",
                    "640px 0px",
                    "1280px 0px",
                  ],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-x-[-22%] top-[7%] h-[280px] opacity-[0.42]"
          style={{
            transform:
              "translate3d(var(--water-x), var(--water-y), 0) skewY(-2deg)",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1280 280' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 134 C 90 78 165 72 250 128 C 342 188 430 190 520 126 C 610 62 710 70 800 132 C 900 202 1010 194 1120 118 C 1182 75 1232 65 1280 72' fill='none' stroke='%231e6f78' stroke-width='3.6' stroke-linecap='round'/%3E%3Cpath d='M0 176 C 120 104 230 112 340 172 C 462 240 570 218 690 150 C 810 82 930 104 1050 170 C 1136 218 1214 212 1280 178' fill='none' stroke='%231e6f78' stroke-width='2.1' stroke-linecap='round'/%3E%3Cpath d='M0 218 C 150 132 285 150 420 218 C 560 288 702 244 840 178 C 970 116 1090 142 1220 212 C 1246 226 1264 232 1280 236' fill='none' stroke='%230b2f35' stroke-width='1.35' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundSize: "1280px 280px",
          }}
        />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: [
                    "0px 0px",
                    "-760px 0px",
                    "-1520px 0px",
                  ],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-x-[-28%] top-[34%] h-[340px] opacity-[0.26]"
          style={{
            transform:
              "translate3d(calc(var(--water-x) * -0.75), calc(var(--water-y) * 0.45), 0) skewY(1.8deg)",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1520 340' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 156 C 132 74 270 88 400 156 C 548 234 675 222 820 145 C 960 70 1100 86 1240 158 C 1365 222 1450 208 1520 150' fill='none' stroke='%231e6f78' stroke-width='3' stroke-linecap='round'/%3E%3Cpath d='M0 214 C 170 112 330 132 500 214 C 680 302 850 248 1015 176 C 1160 112 1310 136 1520 220' fill='none' stroke='%230b2f35' stroke-width='1.7' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundSize: "1520px 340px",
          }}
        />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: [
                    "0px 0px",
                    "560px 0px",
                    "1120px 0px",
                  ],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-x-[-18%] bottom-[8%] h-[260px] opacity-[0.2]"
          style={{
            transform:
              "translate3d(calc(var(--water-x) * 0.55), calc(var(--water-y) * -0.55), 0) skewY(-1deg)",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1120 260' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 118 C 96 54 195 68 292 124 C 410 192 520 182 636 112 C 750 44 864 62 980 130 C 1038 164 1084 170 1120 156' fill='none' stroke='%231e6f78' stroke-width='2.4' stroke-linecap='round'/%3E%3Cpath d='M0 174 C 132 92 260 112 390 178 C 536 252 660 220 800 154 C 920 98 1030 124 1120 184' fill='none' stroke='%230b2f35' stroke-width='1.35' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundSize: "1120px 260px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(30,111,120,0.12) 36%, transparent 62%), linear-gradient(75deg, transparent 0%, rgba(255,255,255,0.55) 45%, transparent 72%)",
            transform:
              "translate3d(calc(var(--water-x) * 0.35), calc(var(--water-y) * 0.22), 0)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1540px] gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.62em] text-[#1e6f78]">
            services
          </p>

          <h2 className="max-w-[10ch] text-[18vw] font-black uppercase leading-[0.74] tracking-[-0.14em] sm:text-[12vw] lg:text-[7.2vw]">
            Frame becomes future.
          </h2>

          <p className="mt-8 max-w-xl text-base leading-8 text-[#11100d]/58 sm:text-lg">
            Yapının ham hâlinden bitmiş mimariye uzanan dönüşümü, kullanıcıya
            doğrudan hissettiren etkileşimli bir sahne kurgusu.
          </p>

          <div className="mt-12 space-y-5">
            {servicePoints.map((point, index) => (
              <div
                key={point}
                className="group flex items-center gap-5 border-b border-[#11100d]/12 pb-5"
              >
                <span className="font-mono text-xs tracking-[0.32em] text-[#11100d]/34">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-lg font-semibold tracking-[-0.04em] text-[#11100d]/76 transition-colors duration-300 group-hover:text-[#1e6f78] sm:text-xl">
                  {point}
                </span>

                <span className="ml-auto text-xl text-[#11100d]/28 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#1e6f78]">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={stageRef}
          style={revealStyle}
          onPointerMove={handleBuildingPointerMove}
          onPointerEnter={handleBuildingPointerEnter}
          onPointerLeave={handleBuildingPointerLeave}
          className="relative mx-auto aspect-[3/4] w-full max-w-[590px] touch-none select-none overflow-visible sm:max-w-[630px] lg:max-w-[610px]"
        >
          <div className="pointer-events-none absolute left-1/2 top-[-8%] z-40 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.34em] text-[#11100d]/42 sm:top-[-7%] lg:top-[-6%]">
            move to reveal
          </div>

          <div className="relative z-20 h-full w-full">
            <Image
              src={skeletonSrc}
              alt="İnşaat halindeki apartman iskeleti"
              fill
              priority
              sizes="(max-width: 1024px) 88vw, 610px"
              className="object-contain drop-shadow-[0_50px_70px_rgba(10,20,20,0.18)]"
              draggable={false}
            />

            <div className="absolute inset-0 z-20" style={finishedMaskStyle}>
              <Image
                src={finishedSrc}
                alt="Tamamlanmış modern apartman"
                fill
                priority
                sizes="(max-width: 1024px) 88vw, 610px"
                className="object-contain drop-shadow-[0_50px_80px_rgba(10,20,20,0.18)]"
                draggable={false}
              />
            </div>

            <motion.div
              aria-hidden="true"
              style={buildingContourMaskStyle}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      backgroundPosition: [
                        "0% 0%",
                        "100% 38%",
                        "40% 100%",
                        "0% 0%",
                      ],
                      opacity: [0.08, 0.34, 0.16, 0.08],
                    }
              }
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-0 z-30 mix-blend-screen"
            >
              <div className="h-full w-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_38deg,rgba(30,111,120,0.75)_48deg,rgba(255,255,255,0.9)_53deg,transparent_66deg,transparent_360deg)] bg-[length:190%_190%]" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              style={buildingContourMaskStyle}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.12, 0.28, 0.12],
                    }
              }
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-0 z-10 opacity-20 drop-shadow-[0_0_2px_rgba(30,111,120,0.65)]"
            />
          </div>

          <div className="pointer-events-none absolute bottom-[-9%] left-1/2 z-40 w-[88%] -translate-x-1/2 sm:bottom-[-8%] lg:bottom-[-7%]">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.26em] text-[#11100d]/42">
              <span>construction</span>
              <span className="mx-4 h-px flex-1 bg-[#11100d]/18" />
              <span>completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}