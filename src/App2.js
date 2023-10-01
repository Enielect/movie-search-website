import { useEffect, useState } from "react";
import StarRating from "./star";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

//creating a preloader

function Loader() {
  return <div className="loader">Loading...</div>;
}

const KEY = "39fe5645";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]); //tempMovieData
  const [watched, setWatched] = useState([]); //tempWatchedData
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  //const tempQuery = "interstellar";

  function handleSelectedId(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleBack() {
    setSelectedId(null);
  }

  function handleAddToList(movie) {
    if (watched.find((ele) => ele.imdbID !== movie.imdbID) >= 0) return;
    setWatched((watched) => [...watched, movie]);
    console.log(watched);
  }

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
      fetchData();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <MovieLengthResult movies={movies} />
      </Nav>

      <main className="main">
        <Box>
          {/* {error ? <p>{error}</p> : <Movies movies={movies} />}
          {isLoading ? <Loader /> : <Movies />} */}
          {!isLoading && !error && (
            <Movies movies={movies} onSelectedId={handleSelectedId} />
          )}
          {error && (
            //  query.length < 4 ? <div className="error">Input the name of the movie</div> : (was trying to set initial state of movied from movies not found to input the name of movie but jonas provided a better way)
            <ErrorMessage message={error} />
          )}
          {isLoading && <Loader />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onLeaveDetails={handleBack}
              onMovieAddToList={handleAddToList}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovies watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>♨️</span>
      {message}
    </p>
  );
}

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Box({ children }) {
  const [open, onOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => onOpen((open) => !open)}>
        {open ? "–" : "+"}
      </button>
      {open && children}
    </div>
  );
}

function BackButton({ onLeaveDetails }) {
  return (
    <button className="btn-back" onClick={onLeaveDetails}>
      &larr;
    </button>
  );
}

function Movies({ movies, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => onSelectedId(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function MovieDetails({
  selectedId,
  onLeaveDetails,
  onMovieAddToList,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [rate, setRate] = useState("");
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(
    function () {
      document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
          onLeaveDetails();
        }
      });
    },
    [onLeaveDetails]
  );

  function handleAddWatched() {
    const obj = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: rate,
    };

    onMovieAddToList(obj);
    onLeaveDetails();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        document.title = data.Title;
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      <header>
        <BackButton onLeaveDetails={onLeaveDetails} />
        <img src={poster} alt={`Poster of ${movie} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating size={24} setRate={setRate} StarSize={10} />
              {rate > 0 && (
                <button className="btn-add" onClick={handleAddWatched}>
                  &#43; Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You rated the movie {watchedUserRating} <span>⭐</span>
            </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
        <p>Released in {year}</p>
      </section>
    </div>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovies({ watched, setWatched }) {
  function handleDelete(id) {
    setWatched((watched) => watched.filter((ele) => ele.imdbID !== id));
  }

  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
          <button
            onClick={() => handleDelete(movie.imdbID)}
            className="btn-delete"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Nav({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function MovieLengthResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
