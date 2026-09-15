import Image from "next/image";
import { intro } from "@/content/portfolio";
import { banner } from "./styles";

export const Banner = () => {
  const styles = banner();

  return (
    <section className={styles.root} aria-labelledby="intro-heading">
      <div className={styles.text}>
        <h1>{intro.greeting}</h1>
        <h2 id="intro-heading">{intro.nameLine}</h2>
        <p>{intro.roleLine}</p>
        <p>{intro.locationLine}</p>
      </div>
      <div className={styles.image}>
        <Image
          src="/bannerImage.jpg"
          alt="Illustration of a developer working on a laptop"
          fill
          sizes="(min-width: 1024px) 50vw, 90vw"
          priority
        />
      </div>
    </section>
  );
};

export default Banner;
