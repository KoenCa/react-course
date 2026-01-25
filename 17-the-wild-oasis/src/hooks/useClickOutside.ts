import { useEffect, useRef } from "react";

/**
 * This hook returns a ref that should be set on the element for which clicks will be checked. When the clicked DOM element
 * is outside of the referenced element then the onClickOutside callback is called.
 *
 * @param {Object} config - The config object for this hook
 * @param config.onClickOutside - Callback function that is called when click outside ref element is detected.
 * @param config.listenCapturing - Determines if the event listeners should be triggered on the capture phase or the default bubbling phase
 * @param config.shouldCheckForClicks - Determines if the event listeners are set or not. When elements are in a closed state the event listeners should not be triggered.
 */
export const useClickOutside = <T>({
  onClickOutside,
  listenCapturing = true,
  shouldCheckForClicks = false,
}: {
  onClickOutside: () => void;
  listenCapturing: boolean;
  shouldCheckForClicks: boolean;
}) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!shouldCheckForClicks) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [onClickOutside]);

  return ref;
};
