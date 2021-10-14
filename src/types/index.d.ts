import * as React from "react";

type Movie = {
  id: number;
  backdrop: string;
  overview: string;
  poster: string;
  releaseDate: string;
  title: string;
};

type WithChildren = {
  children: React.ReactNode;
};

export { Movie, WithChildren };
