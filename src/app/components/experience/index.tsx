import ExperienceCard from "../experienceCards";
import EXPERIENCES_DATA from "./contants";
import { experienceSection } from "./styles";

const Experience = () => {
  const styles = experienceSection();

  return (
    <section id="about" className={styles.root} aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      <p>
        A concise timeline across frontend engineering, automation, and early freelance web work.
      </p>
      <div className={styles.timeline}>
        {EXPERIENCES_DATA.map((experienceData) => {
          const { SVGElement, url, role, date, experienceHighlights } = experienceData;
          return (
            <ExperienceCard
              key={role}
              SVGElement={SVGElement}
              url={url}
              role={role}
              date={date}
              experienceHighlights={experienceHighlights}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
