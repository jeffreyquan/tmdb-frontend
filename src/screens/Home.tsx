import * as React from "react";
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
    <div>
      <form onSubmit={handleSearchClick}>
        <div className="max-w-screen-xl	mx-auto my-6">
          <input
            id="search"
            type="search"
            className="w-8/12	sm:w-9/12	mr-2 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 border border-gray-200"
          />
          <button
            type="submit"
            className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-tmdb-light-green to-tmdb-light-blue hover:bg-green-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export { HomeScreen };
