export type SkillGroup = {
  name: string;
  tone: "indigo" | "violet" | "mint";
  skills: { name: string; level: "Currently Learning" | "Working Knowledge" | "Exploring" }[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Programming",
    tone: "indigo",
    skills: [
      { name: "Python", level: "Working Knowledge" },
      { name: "SQL", level: "Currently Learning" },
      { name: "HTML", level: "Working Knowledge" },
      { name: "CSS", level: "Working Knowledge" },
      { name: "JavaScript", level: "Currently Learning" },
    ],
  },
  {
    name: "AI & Data",
    tone: "violet",
    skills: [
      { name: "Artificial Intelligence", level: "Exploring" },
      { name: "Machine Learning", level: "Currently Learning" },
      { name: "Data Analysis", level: "Currently Learning" },
      { name: "Data Visualization", level: "Exploring" },
      { name: "Generative AI", level: "Exploring" },
    ],
  },
  {
    name: "Tools",
    tone: "mint",
    skills: [
      { name: "Google Colab", level: "Working Knowledge" },
      { name: "Git", level: "Currently Learning" },
      { name: "GitHub", level: "Currently Learning" },
      { name: "VS Code", level: "Working Knowledge" },
      { name: "Weka", level: "Exploring" },
      { name: "Excel", level: "Working Knowledge" },
    ],
  },
];