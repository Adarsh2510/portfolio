import Link from "next/link";
import { SOCIAL_MEDIA_LINKS } from "./contants";
import { headerContactsContainer, headerContainer, headerLogo } from "./styles";

const Header = () => {
  return (
    <div className={headerContainer}>
      <span className={headerLogo}>adarsh trivedi</span>
      <div className={headerContactsContainer}>
        <span>Let&apos;s connect</span>
        {SOCIAL_MEDIA_LINKS.map((linkData, key) => {
          const { SVGElement, url } = linkData;
          return (
            <Link key={key} prefetch={false} href={url} target="_blank">
              <SVGElement />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
