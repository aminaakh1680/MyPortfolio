import React from "react";
import "../components/sunMoon.scss";
import moonImg from "../assets/moon.png";
import sunImg from "../assets/sun.png";

type Props = {
  theme: "light" | "dark";
  scrollX: number;
  maxScroll: number;
};

const SunMoon: React.FC<Props> = ({ theme, scrollX, maxScroll }) => {
  const scrollRatio = Math.min(Math.max(scrollX / maxScroll, 0), 1);
  const xPct = scrollRatio * 100;
  const yPct = (1 - Math.sin(scrollRatio * Math.PI)) * 80 + 10;

  const iconSrc = theme === "light" ? sunImg : moonImg;
  const altText = theme === "light" ? "Sun" : "Moon";

  return (
    <div
      className="sunmoon"
      style={{
        left: `calc(${xPct}vw - 50px)`, // 100px 이미지 기준 50px 빼야 가운데 맞음
        top: `calc(${yPct}vh - 50px)`,
      }}
    >
      <img src={iconSrc} alt={altText} className={`sunmoon-icon ${theme}`} />
    </div>
  );
};

export default SunMoon;
