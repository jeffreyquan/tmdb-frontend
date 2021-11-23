import moviesData from "./movies.json";
import { matchSorter } from "match-sorter";
import { Movie } from "types";

const movies: Movie[] = moviesData as Movie[];

async function query(search: string) {
  return matchSorter(movies, search, {
    keys: ["title", "overview"],
  }).slice(0, 21);
}

export { query };
