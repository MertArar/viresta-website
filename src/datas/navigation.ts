export type NavigationItem = {
  label: string;
  href: string;
};

export type LanguageItem = {
  label: string;
  shortLabel: string;
  code: string;
  href: string;
};

export const navigationItems: NavigationItem[] = [
  {
    label: "KURUMSAL",
    href: "/kurumsal",
  },
  {
    label: "UZMANLIK",
    href: "/uzmanlik",
  },
  {
    label: "HİZMETLER",
    href: "/hizmetler",
  },
  {
    label: "REFERANSLAR",
    href: "/referanslar",
  },
  {
    label: "İLETİŞİM",
    href: "/iletisim",
  },
];

export const languageItems: LanguageItem[] = [
  {
    label: "Türkçe",
    shortLabel: "TR",
    code: "tr",
    href: "/tr",
  },
  {
    label: "English",
    shortLabel: "EN",
    code: "en",
    href: "/en",
  },
];