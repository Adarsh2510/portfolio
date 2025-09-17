import { CapgeminiLogo, HeadoutLogo, MorganLogo } from "assets/svgIcons/experiencesLogo";
import {LinkedinIcon } from "assets/svgIcons/socialLinks";

export const EXPERIENCES_DATA = [
    {
        SVGElement : HeadoutLogo,
        url: "https://in.linkedin.com/in/adarsh2510",
        role: "Headout, Inc - Software Engineer",
        date: "Nov 2022, Present",
        experienceHighlights: [
            "Developed reusable UI components for a travel booking platform serving 1.96M+ monthly visitors, including product cards, banners and user interface elements that enhanced customer engagement across 250+ global destinations",
            "Implemented automated visual testing tools for Next.js 14 migration, reducing manual testing efforts by 85%",
            "Optimized API performance by leveraging projections and indexes, resulting in a ~90% reduction in critical components like search bar load times",
            "Collaborated in a fast-paced startup environment, taking on multiple roles and responsibilities as needed, to lead the migration from Prismic to Payload CMS and Next.js 14",
            "Engineered automation scripts using Selenium (Python) to streamline and enhance partner integration processes",
        ]
    },
    {
        SVGElement : MorganLogo,
        url: "https://in.linkedin.com/in/adarsh2510",
        role: "Capgemini <-> Morgan Stanley - SWE",
        date: "July 2021 - Nov 2022",
        experienceHighlights: [
            "Authored automation scripts for the Morgan Stanley account, enhancing operational efficiency",
            "Proficient in Java, Spring Boot, Selenium, Cucumber, and Rest Assured, applied in various projects"
        ]
    },
    {
        SVGElement : CapgeminiLogo,
        url: "https://in.linkedin.com/in/adarsh2510",
        role: "Capgemini - Intern",
        date: "March 2021 - June 2022",
        experienceHighlights: [
            "Completed training in Java, Gradle, Spring Boot, Oracle SQL, Angular, Jenkins, and Git, enhancing technical proficiency",
            "Engineered a Tata Sky portal clone, incorporating features such as recharge creation, account management, package selection, and an admin portal"
        ]
    },
]
export default EXPERIENCES_DATA;