import { CapgeminiLogo, HeadoutLogo, MorganLogo } from "assets/svgIcons/experiencesLogo";
import type { experience } from "@/content/portfolio";

const logoByCompany = {
  Headout: HeadoutLogo,
  "Capgemini ↔ Morgan Stanley": MorganLogo,
  Capgemini: CapgeminiLogo,
} as const;

export const getExperienceLogo = (company: (typeof experience)[number]["company"]) =>
  company in logoByCompany ? logoByCompany[company as keyof typeof logoByCompany] : null;
