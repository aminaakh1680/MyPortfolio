import React, { useEffect, useRef, useState } from "react";
import "./CircleSwitch.scss";

type Props = {
  sectionNames: string[];
  onToggleTheme: () => void;
  theme: "light" | "dark";
  onSelect: (index: number) => void;
};

const CircleSwitch: React.FC<Props> = ({
  sectionNames,
  onToggleTheme,
  theme,
  onSelect,
}) => {
  const sectionCount = sectionNames.length;
  const anglePerSlice = 360 / sectionCount;

  const [rotationAngle, setRotationAngle] = useState(0);
  const currentIndex = useRef(0);
  const dragStartX = useRef<number | null>(null);
  const startRotation = useRef(0);

  // ✅ 회전 보정 (가장 가까운 방향으로)
  const rotateToIndex = (targetIndex: number) => {
    const currentAngle = rotationAngle;
    const targetAngle = 270 - targetIndex * anglePerSlice;

    let delta = targetAngle - (currentAngle % 360);
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const newAngle = currentAngle + delta;
    setRotationAngle(newAngle);
    onSelect(targetIndex);
    currentIndex.current = targetIndex;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    startRotation.current = rotationAngle;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    setRotationAngle(startRotation.current + delta * 0.8); // 감도 조절
  };

  const handleMouseUp = () => {
    if (dragStartX.current === null) return;
    dragStartX.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    const rawIndex =
      ((360 - (rotationAngle % 360) + 270) % 360) / anglePerSlice;
    const index = Math.round(rawIndex) % sectionCount;
    rotateToIndex(index);
  };

  const handleClick = (index: number) => {
    rotateToIndex(index);
  };

  return (
    <div className="circle-switch">
      <button className="center-button" onClick={onToggleTheme}>
        <span className="icon">{theme === "light" ? "🌞" : "🌙"}</span>
      </button>

      <svg
        viewBox="0 0 300 300"
        className="rotating-svg"
        style={{ transform: `rotate(${rotationAngle}deg)` }}
        onMouseDown={handleMouseDown}
      >
        {sectionNames.map((name, i) => {
          const startAngle = i * anglePerSlice;
          const endAngle = startAngle + anglePerSlice;
          const largeArc = anglePerSlice > 180 ? 1 : 0;
          const radius = 150;

          const x1 = 150 + radius * Math.cos((Math.PI / 180) * startAngle);
          const y1 = 150 + radius * Math.sin((Math.PI / 180) * startAngle);
          const x2 = 150 + radius * Math.cos((Math.PI / 180) * endAngle);
          const y2 = 150 + radius * Math.sin((Math.PI / 180) * endAngle);

          return (
            <g
              key={i}
              onClick={() => handleClick(i)}
              style={{ cursor: "pointer", pointerEvents: "all" }}
            >
              <path
                d={`M150,150 L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`}
                fill="#666"
              />
              <text
                x={
                  150 +
                  100 *
                    Math.cos(((startAngle + anglePerSlice / 2) * Math.PI) / 180)
                }
                y={
                  150 +
                  100 *
                    Math.sin(((startAngle + anglePerSlice / 2) * Math.PI) / 180)
                }
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="#fff"
              >
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CircleSwitch;
