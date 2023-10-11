import { useEffect } from "react";

const useOutsideClick = (ref, exeptionId, cb) => {
  useEffect(() => {
    function handleOutSideClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exeptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, cb]);
};

export default useOutsideClick;
