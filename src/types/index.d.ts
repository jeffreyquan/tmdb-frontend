import * as React from "react";

type Actor = {
  biography: string | null;
  dateOfBirth: string | null;
  dateOfDeath: string | null;
  id: number;
  imdbId: string | null;
  name: string | null;
  photo: string | null;
  placeOfBirth: string | null;
};

type Movie = {
  id: number;
  backdrop: string | null;
  overview: string;
  poster: string;
  releaseDate: string;
  title: string;
};

type WithChildren = {
  children: React.ReactNode;
};

export { Actor, Movie, WithChildren };
