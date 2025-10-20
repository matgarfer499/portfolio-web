import type { Experience } from '@models/experience';

export const EXPERIENCES: Experience[] = [
  {
    company: "Bettergy",
    logo: "/logos/bettergy.png",
    position: "Full Stack Developer",
    startDate: "Jan 2024",
    endDate: "Present",
    description: "Leading the development of cutting-edge web applications focused on energy optimization and sustainability. Working with modern technologies including React, TypeScript, and Node.js to build scalable solutions that help businesses reduce their energy consumption. Collaborating with cross-functional teams to design and implement features that have a direct impact on environmental sustainability. Mentoring junior developers and conducting code reviews to maintain high code quality standards. Architecting microservices and implementing CI/CD pipelines to streamline deployment processes.",
    current: true
  },
  {
    company: "Uniklinik Koln",
    logo: "/logos/uniklinik.webp",
    position: "Trainee Full Stack Developer",
    startDate: "Mar 2023",
    endDate: "Jun 2023",
    description: "Gained hands-on experience in full-stack development within a healthcare environment, working on patient management systems and internal tools. Developed responsive user interfaces using React and integrated them with RESTful APIs built with Node.js and Express. Worked closely with senior developers to implement database schemas using PostgreSQL and optimize query performance. Participated in agile development processes, including daily standups, sprint planning, and retrospectives. Contributed to improving the user experience of critical healthcare applications used by medical professionals.",
  },
];
