import { useEffect, useState } from "react";

export function useLocalStorage(initialState, name) {
  const [value, setValue] = useState(function () {
    const stored = localStorage.getItem(name);
    return stored ? JSON.parse(stored.getItem(name)) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(name, JSON.stringify(value));
    },
    [value, name]
  );
  return [value, setValue];
}
