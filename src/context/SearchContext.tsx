import { createContext, type Dispatch, type SetStateAction } from "react";
import type { MovieWatchlisted } from "../types/types";

type FetchParams = {
  page: string;
  limit: string;
  searchQuery: string;
  watchlistedIDs: string[];
  isWatchlist: boolean;
  genre?: string;
  isGPT: boolean;
};

type SearchContextType = {
  movieData: MovieWatchlisted[];
  searchQuery: string;
  isGPT: boolean;
  lastPage: number;
  loading: boolean;
  currentPage: string;
  currentLimit: string;
  watchlistedIDs: string[];
  isWatchlist: boolean;
  genres?: string;
  genieQuery: string;
  fetchMoviesAndSet: (params: FetchParams) => Promise<void>;
  setMovieData: Dispatch<SetStateAction<MovieWatchlisted[]>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setWatchlistedIDs: Dispatch<SetStateAction<string[]>>;
  setIsWatchlist: Dispatch<SetStateAction<boolean>>;
  setLastPage: Dispatch<SetStateAction<number>>;
  setIsGPT: Dispatch<SetStateAction<boolean>>;
  setGenres: Dispatch<SetStateAction<string | undefined>>;
  setGenieQuery: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType>({
  movieData: [],
  setMovieData: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  watchlistedIDs: [],
  setWatchlistedIDs: () => {},
  isGPT: false,
  setIsGPT: () => {},
  lastPage: 1,
  setLastPage: () => {},
  loading: false,
  fetchMoviesAndSet: async () => {},
  currentLimit: "12",
  currentPage: "1",
  genres: "",
  setGenres: () => {},
  isWatchlist: false,
  setIsWatchlist: () => {},
  genieQuery: "",
  setGenieQuery: () => {},
});

export default SearchContext;
