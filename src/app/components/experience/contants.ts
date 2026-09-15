import { CapgeminiLogo, HeadoutLogo, MorganLogo } from "assets/svgIcons/experiencesLogo";
import { experience } from "@/content/portfolio";

const logoByCompany = {
  "Travel marketplace": HeadoutLogo,
  "Capgemini ↔ Morgan Stanley": MorganLogo,
  Capgemini: CapgeminiLogo,
} as const;

export const EXPERIENCES_DATA = experience.map((item) => ({
  SVGElement: item.company in logoByCompany ? logoByCompany[item.company as keyof typeof logoByCompany] : null,
  url: "href" in item ? item.href : "",
  role: `${item.company} — ${item.role}`,
  date: item.date,
  experienceHighlights: [...item.highlights],
}));

export default EXPERIENCES_DATA;
