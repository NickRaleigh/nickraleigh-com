import { HomepageContent } from "./types";
import { OvertureMosaic } from "./work/overture/content";
import { WestwoodLawMosaic } from "./work/car-accident-reporting-app/content";

export const homeContent: HomepageContent = {
  hero: {
    firstName: "Nick",
    lastName: "Raleigh",
    italics: {
      firstName: [1],
      lastName: [1, 5],
    },
    infoBar: [
      "Design Engineer",
      "Founding Designer, Overture",
      "11 years building for the web",
      "Longmont, Colorado",
    ],
    tagLine: "I make complicated software feel simple.",
  },
  mosaics: [
    OvertureMosaic,
    // TODO: new url with 301: /work/westwood-law
    WestwoodLawMosaic,
  ],
  whatIDo: {
    missionStatement: {
      title: "",
      description: `
	I’ve been tinkering with computers since the 90s, and I
	never lost the itch to build what I imagine. I trained as
	a designer, then in 2015 I pushed myself to become an
	engineer too. Now I take products from concept to
	production, owning both the design and the code. A decade
	of craft is what lets me get tasteful results from AI,
	not just fast ones.`,
    },
    photo: {
      src: "/uploads/nick-90s-square.jpg",
      alt: "Nick Raleigh as a kid, wearing sunglasses and sitting next to a toy laptop",
      width: 480,
      height: 480,
    },
    aboutLink: {
      href: "/about",
      text: "About me",
    },
    competencies: [
      {
        title: "Product Design",
        description: `
	Interface, interaction, and brand, from first wireframe to
	final UI. I designed Overture\'s product and brand from
	scratch.`,
        icon: {
          src: "/uploads/competencies/product-design.svg",
          alt: "",
          width: 530,
          height: 399,
        },
      },
      {
        title: "Front-End Engineering",
        description: `
	Production React and TypeScript, built from my own designs
	and built to hold up under real content.`,
        icon: {
          src: "/uploads/competencies/frontend-engineering.svg",
          alt: "",
          width: 530,
          height: 399,
        },
      },
      {
        title: "Growth Engineering",
        description: `
	Data pipelines and programmatic pages that turn public data
	into tools people search for. The technical SEO and growth
	loops run underneath nearly everything I ship.`,
        icon: {
          src: "/uploads/competencies/growth-engineering.svg",
          alt: "",
          width: 530,
          height: 399,
        },
      },
    ],
    skills: [
      "React",
      "Redux",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "HTML",
      "CSS/SCSS",
      "Layout",
      "Animation",
      "Responsive design",
      "Web accessibility",
      "Semantic HTML",
      "Web performance",
      "Cross-browser compatibility",
      "State management",
      "Multi-step workflows",
      "Component libraries",
      "REST API integration",
      "Streaming LLM responses",
      "Python",
      "Django",
      "AI-assisted development",
      "Claude Code",
      "LLM APIs",
      "Interface",
      "Interaction",
      "Visual design",
      "Figma",
      "jQuery",
      "Bootstrap",
    ],
  },
};
