import React from "react";
import "../styles/AboutMe.scss";
import Profile from "../assets/profile.jpg";
const AboutMe = () => {
  return (
    <section className="about-me section">
      <div className="about-wrapper">
        <div className="about-image">
          <img src={Profile} alt="My profile" />
        </div>
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            안녕하세요! 저는 창의성과 따뜻한 감성을 담은 프론트엔드 개발자를
            꿈꾸고 있는 아미나입니다. 사용자에게 감동을 주는 디자인과 직관적인
            인터랙션을 좋아하며, UI/UX에 대한 관심이 많습니다. 성장하는 과정을
            사랑하고, 매일매일 배우는 걸 즐깁니다.
          </p>

          <h3>Education</h3>
          <ul>
            <li>
              2024.10 ~ 2025.04 : 새싹 청년취업사관학교 풀스택 과정 (수료)
            </li>
            <li>2019.03 ~ 2024.09 : 동국대학교 컴퓨터공학과 (졸업)</li>
            <li>
              2017.09 ~ 2019.03 : 상명대학교 국제언어문화교육원 한국어과정(수료)
            </li>
            <li>2015.09 ~ 2017.06: 몽골 재무경제대학교 회계학과 (중퇴)</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
