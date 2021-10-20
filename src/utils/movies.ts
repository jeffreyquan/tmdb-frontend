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

function getMovieSearchConfig(
  queryClient: QueryClient,
  client: (endpoint: string, config?: RequestConfig) => Promise<any>,
  query: string
) {
  return {
    queryKey: ["movieSearch", { query }],
    queryFn: () => {
      if (query) {
        return client(`movies/search?query=${encodeURIComponent(query)}`).then(
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

export { useMovieSearch };
