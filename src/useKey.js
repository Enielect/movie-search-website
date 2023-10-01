import { useEffect } from "react";

export function useKey(key, callbacks) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          callbacks();
        }
      }
      document.addEventListener("keydown", callback);
      //cleaning up our event listeners
      return () => {
        document.removeEventListener("keydown", callback);
      };
    },
    [callbacks, key]
  );
}
