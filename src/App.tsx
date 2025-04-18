import React, { useEffect, useRef, useState } from "react";
import useSmoothSnapScroll from "./hooks/useHorizontalScroll";
import SunMoon from "./components/SunMoon";
import AboutMe from "./pages/AboutMe";
import Skills from "./pages/Skills";
import Project1 from "./pages/Project1";
import Project2 from "./pages/Project2";
import Project3 from "./pages/Project3";
import Project4 from "./pages/Project4";
import ContactMe from "./pages/ContactMe";
import CircleSwitch from "./components/CircleSwitch";
import "./styles/globals.scss";

const sectionNames = [
  "About",
  "Skills",
  "Project 1",
  "Project 2",
  "Project 3",
  "Project 4",
  "Contact",
];

function App() {
  const scrollRef = useSmoothSnapScroll();
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 현재 페이지 인덱스
  const currentIndexRef = useRef(0);

  // 스크롤 이벤트로 scrollX, maxScroll 업데이트
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrollX(el.scrollLeft);
      setMaxScroll(el.scrollWidth - el.clientWidth);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 세팅

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 드래그 → index 선택 시 스크롤 이동
  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    currentIndexRef.current = index;

    el.scrollTo({
      left: index * window.innerWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <CircleSwitch
        scrollX={scrollX}
        maxScroll={maxScroll}
        sectionNames={sectionNames}
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
        onSelect={scrollToIndex}
      />

      <SunMoon theme={theme} scrollX={scrollX} maxScroll={maxScroll} />

      <div ref={scrollRef} className="scroll-container">
        <AboutMe />
        <Skills />
        <Project1 />
        <Project2 />
        <Project3 />
        <Project4 />
        <ContactMe />
      </div>
    </>
  );
}

export default App;
