import { MovieCard } from "components/MovieCard";
import * as React from "react";
import { Movie } from "types";
import { Spinner } from "components/Spinner";
import { useMovieSearch } from "utils/movies";

function HomeScreen() {
  const [query, setQuery] = React.useState<string>("");
  const [queried, setQueried] = React.useState<boolean>();
  const { movies, error, isLoading, isError, isSuccess } =
    useMovieSearch(query);

  function handleSearchClick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQueried(true);
    setQuery(
      (event.currentTarget.elements.namedItem("search") as HTMLInputElement)
        .value
    );
  }

  return (
    <div className="max-w-screen-lg	mx-auto px-2">
      <form onSubmit={handleSearchClick}>
        <div className="my-6 flex">
          <input
            id="search"
            type="search"
            className="w-11/12	mr-2 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 border border-gray-200"
            placeholder="Search for movie"
          />
          <button
            type="submit"
            className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-tmdb-light-green to-tmdb-light-blue hover:bg-green-700"
          >
            Search
          </button>
        </div>
      </form>
      <div>
        {movies.length ? (
          <div className="grid gap-y-4">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : queried ? (
          <div>
            {isLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <p>
                We couldn't find any books with the query "{query}". Please try
                another.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { HomeScreen };
