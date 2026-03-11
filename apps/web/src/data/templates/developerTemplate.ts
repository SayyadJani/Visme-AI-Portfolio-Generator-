import { Template } from "../templates";

export const developerTemplate: Template = {
  id: "developer-template",
  name: "Developer Portfolio",
  title: "Developer Portfolio",
  category: "Developer",
  description: "Modern developer portfolio template",
  tags: ["React", "JavaScript"],
  imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2340&auto=format&fit=crop",
  previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2340&auto=format&fit=crop",
  author: "Alex Rivera",
  version: "1.0.0",
  dependencies: {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  files: {
    "/public/index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Developer Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
      language: "html"
    },
    "/src/index.js": {
      code: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}`,
      language: "javascript"
    },
    "/src/App.js": {
      code: `import React from "react";
import { Hero } from "./components/Hero.jsx";
import { Projects } from "./components/Projects.jsx";

export default function App() {
  return (
    <div className="portfolio-app">
      <Hero />
      <main className="main-content">
        <Projects />
      </main>
    </div>
  );
}`,
      language: "javascript"
    },
    "/src/components/Hero.jsx": {
      code: `import React from "react";
import { portfolioData } from "../data/portfolioData.js";

export const Hero = () => {
  return (
    <header className="hero">
      <h1>{portfolioData.name}</h1>
      <p className="role">{portfolioData.role}</p>
      <div className="skills">
        {(portfolioData.skills || []).map((skill) => (
          <span key={skill} className="skill-badge">{skill}</span>
        ))}
      </div>
    </header>
  );
};`,
      language: "javascript"
    },
    "/src/components/Projects.jsx": {
      code: `import React from "react";
import { portfolioData } from "../data/portfolioData.js";

export const Projects = () => {
  return (
    <section className="projects-section">
      <h2>Recent Work</h2>
      <div className="projects-grid">
        {portfolioData.projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};`,
      language: "javascript"
    },
    "/src/data/portfolioData.js": {
      code: `export const portfolioData = {
  name: "Alex Rivera",
  role: "Senior Full Stack Engineer",
  skills: ["React", "Node.js", "TypeScript", "Python"],
  projects: [
    { title: "Project 1", description: "Description 1" },
    { title: "Project 2", description: "Description 2" }
  ]
};`,
      language: "javascript"
    },
    "/src/styles.css": {
      code: `body { margin: 0; font-family: sans-serif; background: #0d1117; color: #c9d1d9; }`,
      language: "css"
    }
  }
};
