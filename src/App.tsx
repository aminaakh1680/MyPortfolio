import React, { useEffect, useRef, useState } from "react";
import useSmoothSnapScroll from "./hooks/useHorizontalScroll";
import SunMoon from "./components/SunMoon";
import AboutMe from "./pages/AboutMe";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import ContactMe from "./pages/ContactMe";
import CircleSwitch from "./components/CircleSwitch";
import "./styles/globals.scss";
import CloudLayer from "./components/CloudLayer";

const sectionNames = ["About", "Skills", "Projects", "Contact"];

function App() {
  const scrollRef = useSmoothSnapScroll();
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrollX(el.scrollLeft);
      setMaxScroll(el.scrollWidth - el.clientWidth);
      if (isDetailOpen) {
        setIsDetailOpen(false); // ⭐ 스크롤하면 상세 닫기
      }
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isDetailOpen]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: index * window.innerWidth,
      behavior: "smooth",
    });
  };

  // ⭐ 상세 열렸을 때 App 휠 이벤트 막기
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (isDetailOpen) {
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [isDetailOpen]);

  return (
    <div className={`app-container ${theme}`}>
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
      <CloudLayer scrollX={scrollX} maxScroll={maxScroll} />
      <SunMoon theme={theme} scrollX={scrollX} maxScroll={maxScroll} />
      <div
        ref={scrollRef}
        className="scroll-container"
        style={{
          overflowX: isDetailOpen ? "hidden" : "auto",
          overflowY: isDetailOpen ? "hidden" : "hidden",
          display: "flex",
          height: "100vh",
        }}
      >
        <div style={{ flex: "0 0 100vw" }}>
          <AboutMe />
        </div>
        <div style={{ flex: "0 0 100vw" }}>
          <Skills />
        </div>
        <div
          style={{
            flex: "0 0 100vw",
            height: "100vh",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              background: "transparent",
            }}
          >
            <Projects setIsDetailOpen={setIsDetailOpen} />
          </div>
        </div>
        <div style={{ flex: "0 0 100vw" }}>
          <ContactMe />
        </div>
      </div>
    </div>
  );
}

export default App;
