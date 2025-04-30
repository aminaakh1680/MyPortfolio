// src/components/CircleSwitch.tsx

import React, { useEffect, useRef, useState } from "react";
import "./CircleSwitch.scss";
import sunImg from "../assets/sun.png";
import moonImg from "../assets/moon.png";

type Props = {
  sectionNames: string[];
  scrollX: number;
  maxScroll: number;
  onToggleTheme: () => void;
  theme: "light" | "dark";
  onSelect: (index: number) => void;
};

const CircleSwitch: React.FC<Props> = ({
  sectionNames,
  scrollX,
  maxScroll,
  onToggleTheme,
  theme,
  onSelect,
}) => {
  const count = sectionNames.length;
  const anglePer = 360 / count;
  // 아이콘 설정
  const iconSrc = theme === "light" ? sunImg : moonImg;
  const altText = theme === "light" ? "Sun" : "Moon";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const ignoreScroll = useRef(false);

  const rotateToIndex = (index: number, skipScroll = false) => {
    const targetAngle = 270 - (index * anglePer + anglePer / 2);
    const prev = rotationRef.current;

    let delta = targetAngle - (prev % 360);
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const newRotation = prev + delta;
    setRotation(newRotation);
    rotationRef.current = newRotation;
    setCurrentIndex(index);

    if (!skipScroll) {
      ignoreScroll.current = true;
      onSelect(index);
      setTimeout(() => {
        ignoreScroll.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    if (ignoreScroll.current || maxScroll <= 0) return;
    const ratio = scrollX / maxScroll;
    const idx = Math.round(ratio * (count - 1));
    if (idx !== currentIndex) {
      rotateToIndex(idx, true);
    }
  }, [scrollX, maxScroll]);

  const colors = ["#f3eac2", "#c5dca0", "#d9a7c7", "#aad9cd"];

  return (
    <div className="circle-switch">
      <div className="switch-wrapper">
        <div className="fixed-arrow">▼</div>

        <svg
          viewBox="0 0 300 300"
          className="rotating-svg"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {sectionNames.map((name, i) => {
            const startA = i * anglePer;
            const endA = startA + anglePer;
            const largeArc = anglePer > 180 ? 1 : 0;
            const r = 150;

            const x1 = 150 + r * Math.cos((startA * Math.PI) / 180);
            const y1 = 150 + r * Math.sin((startA * Math.PI) / 180);
            const x2 = 150 + r * Math.cos((endA * Math.PI) / 180);
            const y2 = 150 + r * Math.sin((endA * Math.PI) / 180);

            const midA = startA + anglePer / 2;
            const tx = 150 + 100 * Math.cos((midA * Math.PI) / 180);
            const ty = 150 + 100 * Math.sin((midA * Math.PI) / 180);

            return (
              <g key={i} onClick={() => rotateToIndex(i)}>
                <path
                  d={`M150,150 L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`}
                  fill={colors[i % colors.length]}
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="15"
                  fontWeight="bold"
                  fill="#3e2f2f"
                >
                  {name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 다크모드 토글 버튼 */}
        <div className="center-theme-toggle" onClick={onToggleTheme}>
          <img src={iconSrc} alt={altText} className="center-icon" />
        </div>
      </div>
    </div>
  );
};

export default CircleSwitch;
