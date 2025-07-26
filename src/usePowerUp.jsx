import { useState, useEffect } from "react";

export function usePowerUp(count) {
  const [isPowered, setIsPower] = useState(false);
  // When count is a multiple of 5, activate your powerup for 2s.
  useEffect(() => {
    if (count > 0 && count % 5 === 0) {
      setIsPower(true);
      const timerId = setTimeout(() => {
        setIsPower(false), 20000;
      });
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [count]);
  return isPowered;
}
