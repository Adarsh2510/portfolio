import { experience } from "@/content/portfolio";
import ExperienceCard from "../experienceCards";
import { getExperienceLogo } from "./contants";
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
        {experience.map((item) => (
          <ExperienceCard
            key={`${item.company}-${item.role}`}
            SVGElement={getExperienceLogo(item.company)}
            company={item.company}
            role={item.role}
            href={"href" in item ? item.href : undefined}
            date={item.date}
            highlights={item.highlights}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
