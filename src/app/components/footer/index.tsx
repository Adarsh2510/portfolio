import Link from "next/link";
import { site } from "@/content/site";
import { footer } from "./styles";

export const Footer = () => {
  const styles = footer();

  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <p>© {new Date().getFullYear()} {site.name}</p>
        <div className={styles.links}>
          <Link href={`mailto:${site.email}`} className={styles.link}>
            Email
          </Link>
          {site.socialLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
