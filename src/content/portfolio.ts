export const intro = {
  greeting: "Hi,",
  nameLine: "Myself Adarsh Trivedi",
  roleLine: "Senior frontend engineer building fast, clean web experiences for growing teams.",
  locationLine: "Based out of Bengaluru, India 🇮🇳",
} as const;

export const selectedWork = [
  {
    title: "Niyati Prep",
    summary:
      "An AI mock-interview platform with protected routes, live coding and drawing tools, WebSockets, rate limiting, error boundaries, and analytics instrumentation.",
    href: "https://niyatiprep.com",
    meta: "Personal project",
  },
  {
    title: "Visual regression testing for a large migration",
    summary:
      "Built automated visual checks during a Next.js migration, reducing manual visual QA effort by approximately 85%.",
    meta: "Professional work",
  },
  {
    title: "CMS performance and migration work",
    summary:
      "Worked across CMS migration and internal-tool performance, including search-load improvements of up to 90% through render and API tuning.",
    meta: "Professional work",
  },
] as const;

export const experience = [
  {
    company: "Headout",
    role: "Senior Frontend Engineer",
    date: "Nov 2022 — Present",
    href: "https://www.headout.com/",
    highlights: [
      "Developed reusable UI components for a travel booking platform serving approximately 1.96 million monthly visitors, including product cards, banners, and customer-facing interface elements across 250+ global destinations.",
      "Implemented automated visual testing tools for a Next.js migration, reducing manual testing effort by approximately 85%.",
      "Optimized API performance with projections and indexes, resulting in up to a 90% reduction in load times for critical internal components like CMS search.",
      "Collaborated in a fast-paced startup environment, taking on multiple roles and responsibilities as needed across CMS, migration, and partner-integration work.",
      "Engineered automation scripts using Selenium and Python to streamline partner integration processes.",
    ],
  },
  {
    company: "Capgemini ↔ Morgan Stanley",
    role: "Software Engineer",
    date: "Jul 2021 — Nov 2022",
    highlights: [
      "Authored automation scripts for the Morgan Stanley account, enhancing operational efficiency.",
      "Automated more than 50 scenarios across multiple frameworks.",
      "Worked with Java, Spring Boot, Selenium, Cucumber, and Rest Assured.",
    ],
  },
  {
    company: "Capgemini",
    role: "Intern",
    date: "Mar 2021 — Jun 2021",
    highlights: [
      "Completed training in Java, Gradle, Spring Boot, Oracle SQL, Angular, Jenkins, and Git.",
      "Engineered a Tata Sky portal clone with recharge creation, account management, package selection, and an admin portal.",
    ],
  },
  {
    company: "Self-employed",
    role: "Freelance Web Developer",
    date: "Sep 2018 — Dec 2018",
    highlights: [
      "Developed, hosted, and managed a customer-engaging website to boost client online visibility.",
      "Designed, maintained, and integrated a MySQL database to meet the site's data requirements.",
    ],
  },
] as const;
