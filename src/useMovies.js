import { useEffect, useState } from "react";

const KEY = "39fe5645";

export function useMovies(query) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        setIsLoading(true);
        setError("");
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Failed to Load movie");
          const data = await res.json();
          console.log(data);
          if (data.Response === "False") throw new Error("Movie was not found");
          setIsLoading(false);
          setMovies(data.Search);
          console.log(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
        setError("");
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleBack();
      fetchData();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { error, isLoading, movies };
}
