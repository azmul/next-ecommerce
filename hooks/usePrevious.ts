import { useRef, useEffect } from "react";

/**
 * A custom hook that builds on useRef to get the previous value
 *
 * @param {*} value
 * @returns {*} previous value
 */
export const usePrevious = (value: any): any => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
