import bankingImage from "@/assets/project-banking.jpg";
import climateImage from "@/assets/project-climate.jpg";
import machineLearningImage from "@/assets/project-ml.jpg";
import nextechImage from "@/assets/project-nextech.jpg";
import pharmaImage from "@/assets/project-pharma.jpg";
import streamverseImage from "@/assets/project-streamverse.jpg";
import webImage from "@/assets/project-web.jpg";

export type ProjectCategory = "AI" | "Machine Learning" | "Data Science" | "Web Development";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  problem: string;
  solution: string;
  features: string[];
  learningOutcomes: string[];
  github: string;
  liveDemo: string;
};

export const projects: Project[] = [
  {
    id: "ai-banking-data-analysis",
    title: "AI Banking Data Analysis",
    description:
      "An exploratory data analysis project focused on understanding banking-related data and extracting useful insights.",
    category: "Data Science",
    technologies: ["Python", "Pandas", "Data Analysis"],
    image: bankingImage,
    problem: "Banking datasets can contain patterns that are difficult to spot without structured exploration.",
    solution: "A focused analysis workflow that organizes, explores and visualizes banking-related data.",
    features: ["Exploratory data analysis", "Data cleaning", "Insight-focused visualization"],
    learningOutcomes: ["Working with datasets", "Asking better data questions", "Communicating findings"],
    github: "",
    liveDemo: "",
  },
  {
    id: "machine-learning-project",
    title: "Machine Learning Project",
    description:
      "A machine learning project demonstrating the workflow from data preparation to model evaluation.",
    category: "Machine Learning",
    technologies: ["Python", "Machine Learning", "Google Colab"],
    image: machineLearningImage,
    problem: "A machine learning idea needs a repeatable path from raw data to an evaluated model.",
    solution: "A learning project that follows the core steps of preparing data, training a model and evaluating results.",
    features: ["Data preparation", "Model training", "Evaluation workflow"],
    learningOutcomes: ["Understanding model workflows", "Comparing evaluation steps", "Experimenting in Colab"],
    github: "",
    liveDemo: "",
  },
  {
    id: "netflix-inspired-frontend",
    title: "Netflix-Inspired Frontend",
    description:
      "A responsive streaming-platform-inspired frontend created to practice modern web development and UI design.",
    category: "Web Development",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: webImage,
    problem: "Modern interfaces require clear hierarchy, responsive layouts and comfortable browsing patterns.",
    solution: "A streaming-platform-inspired interface used to practice responsive layout and interaction design.",
    features: ["Responsive layout", "Content browsing patterns", "Modern interface styling"],
    learningOutcomes: ["Responsive UI composition", "Frontend fundamentals", "Visual hierarchy"],
    github: "",
    liveDemo: "",
  },
  {
    id: "nextech-craft",
    title: "NexTech Craft",
    description:
      "A modern tech-accessories store offering premium and durable products for charging, gaming, audio, and workspaces.",
    category: "Web Development",
    technologies: ["E-commerce", "Web Development", "UI Design"],
    image: nextechImage,
    problem: "Tech accessories shoppers need a clean, trustworthy store with fast local delivery and reliable support.",
    solution: "A focused e-commerce-style storefront that highlights quality products, affordable pricing, and customer support.",
    features: ["Product catalog layout", "Local delivery focus", "Customer support section"],
    learningOutcomes: ["E-commerce UX patterns", "Product presentation", "Trust-building design"],
    github: "",
    liveDemo: "https://nextech-store.lovable.app",
  },
  {
    id: "climateaction-local",
    title: "ClimateAction Local",
    description:
      "A hyperlocal climate-awareness platform that creates personalized climate-action campaigns based on your state, language, and preferred voice.",
    category: "AI",
    technologies: ["AI", "Generative Media", "Localization", "Web Development"],
    image: climateImage,
    problem: "Climate information often feels distant and inaccessible, making it hard for local communities to take meaningful action.",
    solution: "A hyperlocal platform that generates visual and audio campaigns tailored to a user's state, language, and voice preference.",
    features: ["Personalized climate campaigns", "Visual and audio content generation", "State and language customization", "Community-focused action prompts"],
    learningOutcomes: ["Building localized AI experiences", "Generative media workflows", "Community-centered product design"],
    github: "",
    liveDemo: "https://climate-speak-india.lovable.app",
  },
  {
    id: "pharmalocate",
    title: "PharmaLocate",
    description:
      "A medicine availability platform that helps users find nearby pharmacies and check medicine stock.",
    category: "Web Development",
    technologies: ["Web Development", "Location Services", "Search & Filtering", "UI Design"],
    image: pharmaImage,
    problem: "Finding medicines in nearby pharmacies can be time-consuming, especially when stock and pricing vary across shops.",
    solution: "A platform that lets users search for medicines by brand, generic name, or shop, with filters for availability, price, and recent updates.",
    features: ["Search by brand, generic name, or shop", "Filter by availability, price, and recent updates", "Nearby pharmacy discovery", "Stock status checks"],
    learningOutcomes: ["Location-based service design", "Search and filter UX", "Building practical utility platforms"],
    github: "",
    liveDemo: "https://stock-watch-meds.lovable.app",
  },
];