import type React from "react";

interface Genre {
  genre_id: string;
  genre: string;
}

export interface Movie {
  movie_id: string;
  poster_link: string;
  series_title: string;
  released_year: number;
  certificate: string;
  runtime: number;
  imdb_rating: number;
  overview: string;
  director: string;
  star1: string;
  star2: string;
  star3: string;
  star4: string;
  genres: Genre[];
}
export interface MovieWatchlisted extends Movie {
  watch_listed: boolean;
}

export interface MovieCardProps {
  movie: MovieWatchlisted;
  watchlistedIDs: string[];
  setWatchlistedIDs: React.Dispatch<React.SetStateAction<string[]>>;
}
