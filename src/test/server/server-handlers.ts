import { rest } from "msw";
import { Movie } from "types";
import * as moviesDB from "../data/movies";

const apiUrl = process.env.REACT_APP_API_URL;

type SearchType = {
  query: string;
};

type SearchResponse = {
  results: Movie[];
};

const handlers = [
  rest.get<SearchType, SearchResponse>(
    `${apiUrl}/movies/search`,
    async (req, res, ctx) => {
      // if (!req.url.searchParams.has("query")) {
      //   return ctx.fetch(req);
      // }

      const query = req.url.searchParams.get("query");

      let matchingMovies: Movie[] = [];

      if (query) {
        matchingMovies = await moviesDB.query(query);
      }

      console.log(matchingMovies);

      return res(
        ctx.json({
          results: matchingMovies,
        })
      );
    }
  ),
];

export { handlers };
