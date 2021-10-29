import { QueryClient, useQuery, useQueryClient } from "react-query";
import { client, RequestConfig } from "./api-client";

const loadingMovie = {
  backdrop: "Loading...",
  overview: "Loading...",
  poster: "Loading...",
  releaseDate: "Loading...",
  title: "Loading...",
};

const loadingMovies = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-movie-${index}`,
  ...loadingMovie,
}));

const movieQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function getMovieSearchConfig(
  queryClient: QueryClient,
  client: (endpoint: string, config?: RequestConfig) => Promise<any>,
  query: string
) {
  return {
    queryKey: ["movieSearch", { query }],
    queryFn: () => {
      if (query) {
        return client(`/movies/search?query=${encodeURIComponent(query)}`).then(
          (data) => data
        );
      }
    },
  };
}

function useMovieSearch(query: string) {
  const queryClient = useQueryClient();
  const result = useQuery(getMovieSearchConfig(queryClient, client, query));
  return {
    ...result,
    movies: result.data?.results ?? [],
  };
}

function useMovie(movieId: string | undefined) {
  const { data } = useQuery({
    queryKey: ["movie", { movieId }],
    queryFn: () => {
      if (movieId) {
        return client(`/movies/${movieId}`).then((data) => data);
      }
    },
    ...movieQueryConfig,
  });

  return data;
}

export { useMovie, useMovieSearch };
