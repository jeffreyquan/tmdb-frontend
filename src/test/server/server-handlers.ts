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

      return res(
        ctx.json({
          results: matchingMovies,
        })
      );
    }
  ),
  rest.get(`${apiUrl}/movies/:movieId`, async (req, res, ctx) => {
    const { movieId } = req.params;
    const movie = await moviesDB.read(movieId);
    if (!movie) {
      return res(
        ctx.status(404),
        ctx.json({
          status: 404,
          message: "Movie not found",
        })
      );
    }
    return res(ctx.json({ ...movie }));
  }),
];

export { handlers };
