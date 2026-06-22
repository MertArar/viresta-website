"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import HeroImageOne from "@/assets/hero1.png";
import HeroImageTwo from "@/assets/hero2.png";
import HeroImageThree from "@/assets/hero3.png";

type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  sector: string;
  metric: string;
  metricLabel: string;
  insight: string;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel: string;
  secondaryActionHref: string;
};

const SLIDE_DURATION = 7000;
const PROGRESS_STEP = 45;

const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Finansal Danışmanlık",
    title: "Finansal kararları stratejik büyüme diline çeviriyoruz.",
    description:
      "Viresta, kurumların finansal yapılarını, yatırım kararlarını ve büyüme hedeflerini daha ölçülebilir bir zemine taşır.",
    image: HeroImageOne,
    imageAlt: "Finansal danışmanlık ve kurumsal analiz",
    sector: "Finance Advisory",
    metric: "360°",
    metricLabel: "Finansal görünürlük",
    insight:
      "Gelir, maliyet, yatırım ve nakit akışını aynı karar mimarisi içinde değerlendirir.",
    primaryActionLabel: "Finansal Analiz Talep Et",
    primaryActionHref: "/iletisim",
    secondaryActionLabel: "Danışmanlık Modeli",
    secondaryActionHref: "/hizmetler",
  },
  {
    eyebrow: "Kurumsal Strateji",
    title: "Şirketinizin yönünü uygulanabilir karar mimarisiyle tasarlarız.",
    description:
      "Pazar konumu, operasyonel kapasite ve rekabet dinamiklerini birlikte okuyarak sürdürülebilir strateji setleri oluştururuz.",
    image: HeroImageTwo,
    imageAlt: "Kurumsal strateji ve yönetim danışmanlığı",
    sector: "Corporate Strategy",
    metric: "B2B",
    metricLabel: "Stratejik büyüme",
    insight:
      "Kurumsal hedefleri ölçülebilir önceliklere, aksiyonlara ve takip edilebilir çıktılara bağlar.",
    primaryActionLabel: "Strateji Görüşmesi Planla",
    primaryActionHref: "/iletisim",
    secondaryActionLabel: "Uzmanlık Alanları",
    secondaryActionHref: "/uzmanlik",
  },
  {
    eyebrow: "İş Geliştirme",
    title: "Yeni fırsatları güçlü iş modellerine dönüştürüyoruz.",
    description:
      "İş geliştirme süreçlerini fikir düzeyinde bırakmadan, takip edilebilir hedeflere ve uygulanabilir kurumsal aksiyonlara bağlarız.",
    image: HeroImageThree,
    imageAlt: "İş geliştirme ve büyüme planlama",
    sector: "Business Growth",
    metric: "+25%",
    metricLabel: "Verim odaklı yaklaşım",
    insight:
      "Pazar fırsatlarını operasyonel kapasite, müşteri değeri ve sürdürülebilir büyüme ekseninde yorumlar.",
    primaryActionLabel: "Büyüme Fırsatlarını Konuşalım",
    primaryActionHref: "/iletisim",
    secondaryActionLabel: "İş Geliştirme",
    secondaryActionHref: "/hizmetler",
  },
];

const textVariants: Variants = {
  initial: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(8px)",
  },
};

const imageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 1.045,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 1.025,
  },
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = heroSlides[activeIndex];

  const activeNumber = String(activeIndex + 1).padStart(2, "0");
  const totalNumber = String(heroSlides.length).padStart(2, "0");

  const nextIndex = useMemo(() => {
    return activeIndex === heroSlides.length - 1 ? 0 : activeIndex + 1;
  }, [activeIndex]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const goToPrevious = () => {
    const previousIndex =
      activeIndex === 0 ? heroSlides.length - 1 : activeIndex - 1;

    goToSlide(previousIndex);
  };

  const goToNext = () => {
    goToSlide(nextIndex);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress =
          currentProgress + (PROGRESS_STEP / SLIDE_DURATION) * 100;

        if (nextProgress >= 100) {
          setActiveIndex((currentIndex) =>
            currentIndex === heroSlides.length - 1 ? 0 : currentIndex + 1
          );

          return 0;
        }

        return nextProgress;
      });
    }, PROGRESS_STEP);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused]);

  return (
    <section className="relative isolate min-h-[calc(100svh-92px)] overflow-hidden bg-[#0F2747]">
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.imageAlt}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-[#0F2747]/14" />
        <div className="absolute inset-y-0 right-0 w-[56%] bg-gradient-to-l from-[#0F2747]/58 via-[#0F2747]/14 to-transparent" />
      </div>

      <div className="absolute inset-y-0 left-0 -z-10 w-[92%] bg-[#F6F8FA]/72 backdrop-blur-[1px] [clip-path:polygon(0_0,100%_0,78%_100%,0_100%)] lg:w-[80%] lg:[clip-path:polygon(0_0,88%_0,72%_100%,0_100%)] xl:w-[76%] xl:[clip-path:polygon(0_0,86%_0,70%_100%,0_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-92px)] w-full max-w-[1480px] flex-col justify-center px-5 pb-28 pt-10 sm:px-8 lg:px-10 lg:pb-32 lg:pt-14 xl:px-12">
        <div className="grid flex-1 grid-cols-1 items-center lg:grid-cols-[0.64fr_0.36fr]">
          <div className="max-w-[780px] pb-20 pt-8 lg:-ml-6 lg:pb-16 lg:pt-10 xl:-ml-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.title}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.68,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <div className="mb-8 flex items-center gap-4">
                  <span className="h-px w-12 bg-[#1E6F78]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#1E6F78]">
                    {activeSlide.eyebrow}
                  </span>
                </div>

                <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.3em] text-[#5E6B78]">
                  Viresta Kurumsal Çözümler
                </p>

                <h1 className="max-w-[860px] text-[45px] font-medium leading-[0.94] tracking-[-0.07em] text-[#0F2747] sm:text-[67px] lg:text-[80px] xl:text-[94px]">
                  {activeSlide.title}
                </h1>

                <p className="mt-7 max-w-[640px] text-[16px] leading-[1.78] text-[#5E6B78] sm:text-[18px]">
                  {activeSlide.description}
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={activeSlide.primaryActionHref}
                    style={{ color: "#FFFFFF" }}
                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-[18px] bg-[#0F2747] px-7 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#1E6F78]"
                  >
                    <span className="text-white">
                      {activeSlide.primaryActionLabel}
                    </span>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.9}
                      className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>

                  <Link
                    href={activeSlide.secondaryActionHref}
                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-[18px] bg-white px-7 text-[15px] font-semibold text-[#0F2747] shadow-[0_18px_45px_rgba(15,39,71,0.08)] transition-all duration-300 hover:text-[#1E6F78]"
                  >
                    {activeSlide.secondaryActionLabel}
                    <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden justify-self-end lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.sector}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.68,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="w-[304px] rounded-[28px] bg-[#F6F8FA]/15 p-5 text-white shadow-[0_30px_90px_rgba(15,39,71,0.22)] backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/64">
                      Aktif Odak
                    </p>

                    <p className="mt-4 text-[20px] font-medium leading-tight text-white">
                      {activeSlide.sector}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#F6F8FA]/18 text-white">
                    <BarChart3 size={22} strokeWidth={1.8} />
                  </div>
                </div>

                <div className="my-6 h-px w-full bg-white/16" />

                <div className="flex items-end justify-between gap-5">
                  <p className="text-[48px] font-medium leading-none tracking-[-0.08em] text-white">
                    {activeSlide.metric}
                  </p>

                  <p className="max-w-[118px] pb-1 text-right text-[12px] font-medium uppercase tracking-[0.16em] text-white/58">
                    {activeSlide.metricLabel}
                  </p>
                </div>

                <p className="mt-6 text-[15px] leading-relaxed text-white/78">
                  {activeSlide.insight}
                </p>

                <div className="mt-7 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1E6F78]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/56">
                    Data Based Direction
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-5 z-30 w-[calc(100%-40px)] max-w-[620px] sm:right-8 lg:bottom-9 lg:right-10 xl:right-12">
        <div className="flex items-center gap-4">
          <div className="font-mono text-[13px] font-semibold text-white">
            {activeNumber} / {totalNumber}
          </div>

          <div className="grid h-1.5 flex-1 grid-cols-3 gap-2 rounded-full">
            {heroSlides.map((slide, index) => {
              const isActive = index === activeIndex;
              const isPassed = index < activeIndex;

              return (
                <button
                  key={slide.title}
                  type="button"
                  aria-label={`${index + 1}. slayta geç`}
                  onClick={() => goToSlide(index)}
                  className="relative h-full overflow-hidden rounded-full bg-white/34"
                >
                  <span
                    className="absolute left-0 top-0 h-full rounded-full bg-white transition-[width] duration-100"
                    style={{
                      width: isActive
                        ? `${progress}%`
                        : isPassed
                          ? "100%"
                          : "0%",
                    }}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label={isPaused ? "Slaytı devam ettir" : "Slaytı durdur"}
            onClick={() => setIsPaused((prev) => !prev)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-white text-[#1E6F78] transition-colors duration-300 hover:bg-[#1E6F78] hover:text-white"
          >
            {isPaused ? (
              <Play size={18} strokeWidth={1.9} fill="currentColor" />
            ) : (
              <Pause size={18} strokeWidth={1.9} fill="currentColor" />
            )}
          </button>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Önceki slayt"
              onClick={goToPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-white text-[#1E6F78] transition-colors duration-300 hover:bg-[#1E6F78] hover:text-white"
            >
              <ChevronLeft size={19} strokeWidth={1.9} />
            </button>

            <button
              type="button"
              aria-label="Sonraki slayt"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-white text-[#1E6F78] transition-colors duration-300 hover:bg-[#1E6F78] hover:text-white"
            >
              <ChevronRight size={19} strokeWidth={1.9} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;