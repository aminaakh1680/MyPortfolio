import React from "react";
import "../styles/sunMoon.scss";

type Props = {
  theme: "light" | "dark";
  scrollX: number;
  maxScroll: number;
};

const SunMoon: React.FC<Props> = ({ theme, scrollX, maxScroll }) => {
  // 💡 커스텀 각도 비율 적용
  // 예: 전체 scroll 진행에 따라 θ를 0 ~ 1.75π 까지만 (살짝 남겨둬서 Contact에서 지게)
  const totalSections = 7;
  const sectionWidth = window.innerWidth;
  const scrollSectionRatio = scrollX / (sectionWidth * (totalSections - 1));
  const theta = Math.PI * scrollSectionRatio;

  // 🔁 방향 반전해서 왼쪽에서 해가 뜨게!
  const reversedTheta = Math.PI - theta;

  const centerX = 50;
  const centerY = 100;
  const radius = 60;

  const x = centerX + Math.cos(reversedTheta) * 50;
  const y = centerY - Math.sin(reversedTheta) * radius;
  return (
    <div
      className="sunmoon"
      style={{
        left: `calc(${x}vw - 50px)`,
        top: `calc(${y}vh - 50px)`,
      }}
    >
      {theme === "light" ? "🌞" : "🌙"}
    </div>
  );
};

export default SunMoon;
