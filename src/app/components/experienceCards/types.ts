import type { ComponentType } from "react";

export type TExperienceCard = {
  SVGElement: ComponentType | null;
  url: string;
  role: string;
  date: string;
  experienceHighlights: string[];
};
