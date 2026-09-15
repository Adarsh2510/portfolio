import Link from "next/link";
import { experienceCard } from "./styles";
import { TExperienceCard } from "./types";

const ExperienceCard = (props: TExperienceCard) => {
  const { SVGElement, url, role, date, experienceHighlights } = props;
  const styles = experienceCard();
  const logo = SVGElement ? <SVGElement /> : <span aria-hidden="true">•</span>;

  return (
    <article className={styles.root}>
      <div className={styles.header}>
        {url ? (
          <Link prefetch={false} href={url} target="_blank" rel="noreferrer" className={styles.logo} aria-label={role}>
            {logo}
          </Link>
        ) : (
          <div className={styles.logo}>{logo}</div>
        )}
        <h3 className={styles.role}>{role}</h3>
        <p className={styles.date}>{date}</p>
      </div>

      <div className={styles.body}>
        <ul>
          {experienceHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ExperienceCard;
