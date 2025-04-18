import { useEffect, useRef } from "react";

const useSmoothSnapScroll = () => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();

      // deltaY 기반으로 수평 이동 (부드럽고 감도 조절 가능)
      el.scrollLeft += e.deltaY * 3; // ← 이 값 줄이면 더 부드러워짐 (0.5 ~ 2)
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return elRef;
};

export default useSmoothSnapScroll;
