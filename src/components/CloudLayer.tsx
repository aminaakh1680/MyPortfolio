import React from "react";
import cloud1 from "../assets/cloud1.png";
import cloud2 from "../assets/cloud2.png";
import cloud3 from "../assets/cloud3.png";
import "../components/cloudLayer.scss";

type Props = {
  scrollX: number;
  maxScroll: number;
};

const clouds = [
  { src: cloud1, top: 5, left: 10, size: 220, speedFactor: 1.0, opacity: 0.9 },
  { src: cloud2, top: 25, left: 70, size: 180, speedFactor: 0.8, opacity: 0.7 },
  {
    src: cloud3,
    top: 55,
    left: 20,
    size: 260,
    speedFactor: 1.2,
    opacity: 0.85,
  },
  { src: cloud2, top: 75, left: 80, size: 200, speedFactor: 1.0, opacity: 0.6 },
];

const CloudLayer: React.FC<Props> = ({ scrollX, maxScroll }) => {
  const scrollRatio = Math.min(Math.max(scrollX / maxScroll, 0), 1);

  return (
    <div className="cloud-layer">
      {clouds.map((cloud, index) => (
        <img
          key={index}
          src={cloud.src}
          alt={`cloud-${index}`}
          className="cloud"
          style={{
            top: `${cloud.top}vh`,
            left: `calc(${cloud.left}vw + ${
              scrollRatio * 200 * cloud.speedFactor
            }px)`, // 스크롤 이동폭도 더 키움!
            width: `${cloud.size}px`,
            height: "auto",
          }}
        />
      ))}
    </div>
  );
};

export default CloudLayer;
