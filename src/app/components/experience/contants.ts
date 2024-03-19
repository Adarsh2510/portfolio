import { CapgeminiLogo, HeadoutLogo, MorganLogo } from "assets/svgIcons/experiencesLogo";
import {LinkedinIcon } from "assets/svgIcons/socialLinks";

export const EXPERIENCES_DATA = [
    {
        SVGElement : HeadoutLogo,
        url: "https://in.linkedin.com/in/adarsh2510",
        role: "Headout, Inc - SET",
        date: "Nov 2022, Present",
        experienceHighlights: [
            "Developed automation scripts in Selenium python for partner integrations",
            "Develpoed test automation scripts for Microbrands to reduce the manual testing efforts"
        ]
    },
    {
        SVGElement : MorganLogo,
        url: "https://in.linkedin.com/in/adarsh2510",
        role: "Capgemini <-> Morgan Stanley - SWE",
        date: "July 2021 - Nov 2022",
        experienceHighlights: [
            "Developed Automation scripts for Morgan Stanley account",
            "Experienced in technologies like Java, Spring Boot, Selenium, Cucumber, Rest Assured etc"
        ]
    },
    {
        SVGElement : CapgeminiLogo,
        url: "https://in.linkedin.com/in/adarsh2510",
        role: "Capgemini - Intern",
        date: "March 2021 - June 2022",
        experienceHighlights: [
            "Trained in Java, Gradle, Spring Boot, Oracle SQL, Angular, Jenkins, Git",
            "Developed Tata Sky portal clone with functionalities like creating recharges, accounts, packs, Admin portal, etc"
        ]
    },
]
export default EXPERIENCES_DATA;