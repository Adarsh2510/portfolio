import Link from "next/link";
import { css } from "styled-system/css";
import { card, cardBody, cardHeader } from "./styles";
import { TExperienceCard } from "./types";

const ExperienceCard = (props: TExperienceCard) => {
  const { SVGElement, url, role, date, experienceHighlights } = props;
  return (
    <>
      <div className={card}>
        <div className={cardHeader}>
          <Link prefetch={false} href={url} target="_blank">
            <SVGElement />
          </Link>
          <span>{role}</span>
          <span className={css({ marginLeft: "auto", fontWeight:'400'})}>{date}</span>
        </div>
        <div className={cardBody}>
          <ul>
            {experienceHighlights.map((experienceHighlight, key) => {
              return <li key={key}>{experienceHighlight}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ExperienceCard;
