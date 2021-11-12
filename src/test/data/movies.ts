import moviesData from "./movies-data.json";
import { matchSorter } from "match-sorter";

let movies = [...moviesData];

async function query(search: string) {
  return matchSorter(movies, search, {
    keys: ["title", "overview"],
  });
}

export { query };
