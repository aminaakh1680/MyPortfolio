import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/project.scss";

interface Project {
  id: number;
  title: string;
  image: string;
  shortDesc: string;
  details: {
    description: string;
    retrospective: string;
    stack: string[];
    github?: string;
  };
}

interface ProjectStackProps {
  projects: Project[];
  setIsDetailOpen: (open: boolean) => void;
}

const ProjectStack: React.FC<ProjectStackProps> = ({
  projects,
  setIsDetailOpen,
}) => {
  const [order, setOrder] = useState(projects);
  const [flippingCardId, setFlippingCardId] = useState<number | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [shrinkingCardId, setShrinkingCardId] = useState<number | null>(null);
  const location = useLocation();
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDetailOpen(expandedCardId !== null);
  }, [expandedCardId]);

  // ⭐ 바깥 클릭하면 상세 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        expandedCardId &&
        detailRef.current &&
        !detailRef.current.contains(e.target as Node)
      ) {
        setExpandedCardId(null);
        setShrinkingCardId(null);
        setIsDetailOpen(false); // detail 상태까지 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedCardId]);

  const rotateStack = () => {
    if (expandedCardId || flippingCardId) return;
    const topCard = order[0];
    setFlippingCardId(topCard.id);

    setTimeout(() => {
      const updated = [...order];
      const first = updated.shift();
      if (first) updated.push(first);
      setOrder(updated);
      setFlippingCardId(null);
    }, 100);
  };

  const handleCardClick = () => {
    if (expandedCardId) return;
    rotateStack();
  };

  const handleDetailClick = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    setExpandedCardId(projectId);
  };

  const handleCloseDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShrinkingCardId(expandedCardId);
    setTimeout(() => {
      setExpandedCardId(null);
      setShrinkingCardId(null);
      setIsDetailOpen(false);
    }, 300);
  };

  const getCardStyle = (index: number, isExpanded: boolean) => {
    if (isExpanded) return {};
    const rotate = -index * 3;
    const x = index * 10;
    const y = -index * 2;
    return {
      transform: `rotateZ(${rotate}deg) translate(${x}px, ${y}px)`,
      zIndex: 100 - index,
      opacity: index > 4 ? 0 : 1,
      transition: "transform 0.2s ease, opacity 0.2s ease",
    };
  };

  const topCard = order[0];
  const topRetrospective = topCard?.details.retrospective;
  const expandedProject = order.find((p) => p.id === expandedCardId);

  return (
    <section className="project-stack-wrapper">
      <div className="stack-container">
        {order.map((project, index) => {
          const isTop = index === 0;
          const isExpanded = expandedCardId === project.id;
          const isShrinking = shrinkingCardId === project.id;
          const isPreview = expandedCardId && !isExpanded;
          if (isExpanded) return null;

          return (
            <div
              key={project.id}
              className={`stack-card ${isShrinking ? "shrinking" : ""} ${
                isPreview ? "preview" : ""
              }`}
              style={getCardStyle(index, false)}
              onClick={isTop && !expandedCardId ? handleCardClick : undefined}
            >
              <div className="stack-card-content">
                <img src={project.image} alt={project.title} />
                <div className="card-overlay">
                  <h3>{project.title}</h3>
                  <p>{project.shortDesc}</p>
                  <button
                    className="detail-button"
                    onClick={(e) => handleDetailClick(e, project.id)}
                  >
                    📖 상세 보기
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {expandedCardId === null && topRetrospective && (
        <div className="retrospective-box">
          <h4>💬 회고</h4>
          <p>{topRetrospective}</p>
        </div>
      )}

      {expandedProject && (
        <div className="stack-card expanded" ref={detailRef}>
          <div
            className="card-inner"
            onWheelCapture={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="card-header">
              <h3>{expandedProject.title}</h3>
              <button className="close-button" onClick={handleCloseDetail}>
                ✕
              </button>
            </div>
            <p>{expandedProject.shortDesc}</p>
            <div className="card-detail">
              <p>{expandedProject.details.description}</p>
              <ul>
                {expandedProject.details.stack.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
              {expandedProject.details.github && (
                <a
                  href={expandedProject.details.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗 GitHub
                </a>
              )}
              <div style={{ height: "600px" }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectStack;
