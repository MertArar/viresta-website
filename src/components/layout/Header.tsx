"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import Logo from "@/assets/logo2.png";
import { languageItems, navigationItems } from "@/datas/navigation";

const ease = "ease-[cubic-bezier(0.76,0,0.24,1)]";

const Header = () => {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languageRef = useRef<HTMLDivElement | null>(null);

  const activeLanguage = useMemo(() => {
    return (
      languageItems.find((language) =>
        pathname.startsWith(`/${language.code}`)
      ) ?? languageItems[0]
    );
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#F6F8FA]/92 shadow-[0_18px_70px_rgba(15,39,71,0.08)] backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[92px] w-full max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
          <Link
            href="/"
            aria-label="Viresta Kurumsal Çözümler"
            className="relative z-50 flex shrink-0 items-center"
          >
            <Image
              src={Logo}
              alt="Viresta Kurumsal Çözümler Logo"
              width={220}
              height={80}
              priority
              className="h-auto w-[124px] object-contain sm:w-[138px] lg:w-[148px] xl:w-[156px]"
            />
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            <nav className="flex items-center gap-8 xl:gap-10">
              {navigationItems.map((item, index) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative flex items-center gap-2 py-3"
                  >
                    <span
                      className={`text-[10px] font-semibold tracking-[0.18em] transition-all duration-500 ${ease} ${
                        isActive
                          ? "translate-y-0 text-[#1E6F78]"
                          : "translate-y-1 text-transparent group-hover:translate-y-0 group-hover:text-[#1E6F78]"
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <span className="relative block h-[23px] overflow-hidden">
                      <span
                        className={`block text-[16px] font-medium leading-[23px] tracking-[-0.02em] transition-transform duration-500 ${ease} ${
                          isActive
                            ? "-translate-y-full text-[#1E6F78]"
                            : "text-[#0F2747] group-hover:-translate-y-full"
                        }`}
                      >
                        {item.label}
                      </span>

                      <span
                        className={`absolute left-0 top-full block text-[16px] font-medium leading-[23px] tracking-[-0.02em] transition-transform duration-500 ${ease} ${
                          isActive
                            ? "-translate-y-full text-[#1E6F78]"
                            : "text-[#1E6F78] group-hover:-translate-y-full"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>

                    <span
                      className={`ml-1 h-1.5 w-1.5 rounded-full bg-[#1E6F78] transition-all duration-500 ${ease} ${
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-6">
              <span className="h-4 w-px bg-[rgba(30,111,120,0.32)]" />

              <div ref={languageRef} className="relative">
                <button
                  type="button"
                  aria-label="Dil seçimi"
                  aria-expanded={isLanguageOpen}
                  onClick={() => setIsLanguageOpen((prev) => !prev)}
                  className={`group flex items-center gap-2 rounded-[14px] px-2.5 py-3 text-[14px] font-semibold tracking-[0.18em] text-[#0F2747] transition-colors duration-300 hover:text-[#1E6F78]`}
                >
                  <span>{activeLanguage.shortLabel}</span>

                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`h-4 w-4 transition-transform duration-500 ${ease} ${
                      isLanguageOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M5.5 7.5L10 12L14.5 7.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute right-0 top-[calc(100%+14px)] w-[236px] overflow-hidden rounded-[18px] bg-[#F6F8FA] shadow-[0_26px_70px_rgba(15,39,71,0.14)] ring-1 ring-[rgba(30,111,120,0.14)] transition-all duration-500 ${ease} ${
                    isLanguageOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-3 opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between bg-[rgba(30,111,120,0.08)] px-5 py-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#1E6F78]">
                      Language
                    </span>

                    <span className="rounded-full bg-[#F6F8FA] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E6F78] shadow-[0_8px_20px_rgba(15,39,71,0.06)]">
                      {activeLanguage.shortLabel}
                    </span>
                  </div>

                  <div className="p-2">
                    {languageItems.map((language) => {
                      const isActive = activeLanguage.code === language.code;

                      return (
                        <Link
                          key={language.code}
                          href={language.href}
                          className={`group flex items-center justify-between rounded-[14px] px-4 py-3.5 transition-all duration-300 ${
                            isActive
                              ? "bg-[rgba(30,111,120,0.10)] text-[#1E6F78]"
                              : "text-[#1A1F2B] hover:bg-[rgba(30,111,120,0.08)] hover:text-[#1E6F78]"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`h-1.5 w-1.5 rounded-full bg-[#1E6F78] transition-all duration-300 ${
                                isActive
                                  ? "scale-100 opacity-100"
                                  : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                              }`}
                            />

                            <span className="text-[14px] font-medium">
                              {language.label}
                            </span>
                          </span>

                          <span
                            className={`text-[10px] font-bold tracking-[0.2em] transition-colors duration-300 ${
                              isActive
                                ? "text-[#1E6F78]"
                                : "text-[#5E6B78] group-hover:text-[#1E6F78]"
                            }`}
                          >
                            {language.shortLabel}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="group relative z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-[16px] lg:hidden"
          >
            <span
              className={`absolute inset-0 bg-[#0F2747] transition-all duration-500 ${ease} group-hover:bg-[#1E6F78] group-hover:scale-95`}
            />

            <span className="relative flex h-5 w-6 flex-col justify-center gap-1.5">
              <span
                className={`h-px bg-white transition-all duration-500 ${ease} ${
                  isMenuOpen ? "w-6 translate-y-[7px] rotate-45" : "w-6"
                }`}
              />

              <span
                className={`h-px bg-white transition-all duration-500 ${ease} ${
                  isMenuOpen ? "opacity-0" : "ml-auto w-4 group-hover:w-6"
                }`}
              />

              <span
                className={`h-px bg-white transition-all duration-500 ${ease} ${
                  isMenuOpen
                    ? "w-6 -translate-y-[7px] -rotate-45"
                    : "ml-auto w-3 group-hover:w-6"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-[rgba(15,39,71,0.34)] backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-x-0 top-0 z-40 min-h-dvh bg-[#0F2747] px-5 pb-8 pt-[112px] text-white transition-transform duration-700 ${ease} lg:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="absolute left-1/2 top-7 -translate-x-1/2">
          <Image
            src={Logo}
            alt="Viresta Kurumsal Çözümler Logo"
            width={220}
            height={80}
            priority
            className="h-auto w-[146px] object-contain brightness-0 invert"
          />
        </div>

        <nav className="flex flex-col">
          {navigationItems.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-end justify-between border-b border-white/10 py-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`mt-2 text-xs font-semibold tracking-[0.22em] ${
                      isActive ? "text-[#1E6F78]" : "text-white/40"
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <span
                    className={`font-serif text-[38px] leading-none tracking-[-0.04em] transition-colors duration-300 ${
                      isActive
                        ? "text-[#1E6F78]"
                        : "text-white group-hover:text-[#1E6F78]"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mb-1 h-5 w-5 text-[#1E6F78] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-[18px] bg-[rgba(246,248,250,0.08)] p-4">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
            Dil Seçimi
          </p>

          <div className="grid grid-cols-2 gap-2">
            {languageItems.map((language) => {
              const isActive = activeLanguage.code === language.code;

              return (
                <Link
                  key={language.code}
                  href={language.href}
                  className={`rounded-[14px] px-4 py-3 text-center text-[14px] font-semibold tracking-[0.18em] transition-all duration-300 ${
                    isActive
                      ? "bg-[#F6F8FA] text-[#1E6F78]"
                      : "bg-[rgba(246,248,250,0.08)] text-white hover:bg-[#F6F8FA] hover:text-[#1E6F78]"
                  }`}
                >
                  {language.shortLabel}
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;