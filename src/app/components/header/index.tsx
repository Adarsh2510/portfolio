import Link from "next/link";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "assets/svgIcons/socialLinks";
import { navigation, site } from "@/content/site";
import { header } from "./styles";

const socialIcons = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  X: TwitterIcon,
} as const;

const Header = () => {
  const styles = header();

  return (
    <>
      <Link href="#main-content" className={styles.skip}>
        Skip to content
      </Link>
      <header className={styles.root}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
            {site.name}
          </Link>
          <nav aria-label="Primary navigation">
            <ul className={styles.navList}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={styles.socialList} aria-label="Social links">
            {site.socialLinks.map((link) => {
              const Icon = socialIcons[link.label];
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${site.name} on ${link.label}`}
                    prefetch={false}
                  >
                    <Icon />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
