import { useState, useEffect } from "react";

export function useCountUp(end: number, duration = 2000, startAnimation = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, startAnimation]);

  return count;
}
export default useCountUp;
