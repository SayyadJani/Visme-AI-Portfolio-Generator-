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
    "public/index.html": {
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
    "src/index.js": {
      code: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}`,
      language: "javascript"
    },
    "src/App.js": {
      code: `import React from "react";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";

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
    "src/components/Hero.jsx": {
      code: `import React from "react";
import { portfolioData } from "../data/portfolioData";

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
    "src/components/Projects.jsx": {
      code: `import React from "react";
import { portfolioData } from "../data/portfolioData";

export const Projects = () => {
  return (
    <section className="projects-section">
      <h2>Recent Work</h2>
      <div className="projects-grid">
        {(portfolioData.projects || []).map((project, index) => (
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
    "src/data/portfolioData.js": {
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
    "src/styles.css": {
      code: `body { margin: 0; font-family: sans-serif; background: #0d1117; color: #c9d1d9; }
.hero { padding: 4rem 2rem; text-align: center; }
.hero h1 { font-size: 3rem; margin-bottom: 1rem; color: #58a6ff; }
.skill-badge { background: #21262d; padding: 0.2rem 0.6rem; border-radius: 12px; margin: 0.3rem; display: inline-block; font-size: 0.8rem; border: 1px border #30363d; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; padding: 2rem; }
.project-card { background: #161b22; padding: 1.5rem; border-radius: 8px; border: 1px solid #30363d; }`,
      language: "css"
    }
  }
};
