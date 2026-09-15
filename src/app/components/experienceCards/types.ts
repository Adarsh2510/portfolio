import type { ComponentType } from "react";

export type TExperienceCard = {
  SVGElement: ComponentType | null;
  company: string;
  role: string;
  href?: string;
  date: string;
  highlights: readonly string[];
};
