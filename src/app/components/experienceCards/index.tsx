import Link from "next/link";
import { card, cardBody, cardHeader, companyLogo, roleTitle, dateBadge } from "./styles";
import { TExperienceCard } from "./types";

const ExperienceCard = (props: TExperienceCard) => {
  const { SVGElement, url, role, date, experienceHighlights } = props;
  
  return (
    <div className={card}>
      <div className={cardHeader}>
        <Link prefetch={false} href={url} target="_blank" className={companyLogo}>
          <SVGElement />
        </Link>
        <span className={roleTitle}>{role}</span>
        <span className={dateBadge}>{date}</span>
      </div>
      
      <div className={cardBody}>
        <ul>
          {experienceHighlights.map((highlight, key) => (
            <li key={key}>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
