import ExperienceCard from "../experienceCards";
import EXPERIENCES_DATA from "./contants";
import { experienceContainer, timelineContainer } from "./styles";

const Experience = () => {
  return (
    <div className={experienceContainer}>
      <h2>Experience</h2>
      <p>
        Been into multiple roles ranging from Quality assurance, Automations to
        front-end Development, Having following timeline.
      </p>
      <div className={timelineContainer}>
        {EXPERIENCES_DATA.map((experienceData, key) => {
          const { SVGElement, url, role, date, experienceHighlights } = experienceData;
          return (
            <ExperienceCard
              key={key}
              SVGElement={SVGElement}
              url={url}
              role={role}
              date={date}
              experienceHighlights={experienceHighlights}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
