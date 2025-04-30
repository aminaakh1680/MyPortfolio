import React from "react";
import "../styles/skills.scss";

const skillsData = {
  Frontend: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 75 },
    { name: "TypeScript", level: 70 },
  ],
  Backend: [
    { name: "Node.js", level: 65 },
    { name: "Spring Boot", level: 60 },
    { name: "Python", level: 55 },
    { name: "Java", level: 50 },
    { name: "Mysql", level: 50 },
  ],
  Tools: [
    { name: "Git", level: 90 },
    { name: "Figma", level: 60 },
    { name: "Photoshop", level: 50 },
  ],
};

const Skills = () => {
  return (
    <section className="skills section">
      <div className="skills-container">
        <h2>My Skills</h2>
        {Object.entries(skillsData).map(([category, skills]) => (
          <div className="skills-category-block" key={category}>
            <h3>{category}</h3>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    {/* <span className="skill-percent">{skill.level}%</span> */}
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
