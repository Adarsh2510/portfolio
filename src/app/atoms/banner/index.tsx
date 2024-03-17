import Image from "next/image";
import Link from "next/link";
import { css } from "styled-system/css";
import { bannerContainer, bannerImage, bannerText } from "./styles";

export const Banner = () => {
  return (
    <div className={bannerContainer}>
        <div className={bannerText}>
            <h1 className={css({
                fontSize:'5rem',
            })}>Hi,</h1>
            <h2>Myself Adarsh Trivedi</h2>
            <p>Working as a Software Engineer <Link href={"https://www.headout.com/"}> @Headout</Link></p>
            <p>Based out of Gurugram, India 🇮🇳</p>
        </div>
        <div className={bannerImage}>
        <Image src="/bannerImage.jpg" alt="banner" fill={true}
              />
        </div>
    </div>
  );
};
