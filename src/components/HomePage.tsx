import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import MovieDisplay from "./MovieDisplay";
import NavBar from "./NavBar";
import { useCallback, useEffect, useMemo, useState } from "react";
import SearchContext from "../context/SearchContext";
import type { Movie, MovieWatchlisted } from "../types/types";
import { api } from "../config/config";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGPT, setIsGPT] = useState(false);
  const [loading, setLoading] = useState(false);

  const [movieData, setMovieData] = useState<MovieWatchlisted[]>([]);

  const [isWatchlist, setIsWatchlist] = useState(false);
  const [watchlistedIDs, setWatchlistedIDs] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
  });
  const [genieQuery, setGenieQuery] = useState("");

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const currentLimit = searchParams.get("limit") || "12";
  const [lastPage, setLastPage] = useState(0);
  const [genres, setGenres] = useState<string | undefined>("");

  const fetchMoviesAndSet = useCallback(
    async (params: {
      page: string;
      limit: string;
      searchQuery: string;
      isGPT: boolean;
      genre?: string;
      watchlistedIDs: string[];
      isWatchlist: boolean;
    }) => {
      setLoading(true);
      let res;

      try {
        const queryParams = new URLSearchParams({
          page: params.page,
          limit: params.limit,
        });
        if (!params.isGPT && params.searchQuery) {
          queryParams.set("search", params.searchQuery);
        }
        if (params.isGPT) {
          queryParams.set("prompt", params.searchQuery);
          res = await api.get(`/gpt/?${queryParams.toString()}`);
        } else if (params.genre) {
          res = await api.get(
            `genres/${params.genre}/?${queryParams.toString()}`,
          );
        } else if (params.isWatchlist) {
          res = await api.post(
            `/watchlist/?${queryParams.toString()}`,
            params.watchlistedIDs,
          );
        } else {
          res = await api.get(`/?${queryParams.toString()}`);
        }

        const enrichedMovies = (res.data.data || res.data).map(
          (movie: Movie) => ({
            ...movie,
            watch_listed: params.watchlistedIDs.includes(movie.movie_id),
          }),
        );

        setMovieData(enrichedMovies);
        setLastPage(res.data.lastPage);
      } catch (error) {
        console.error("Api error:", error);
        setMovieData([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname.includes("/watchlist") ||
      pathname.includes("/genres/")
    ) {
      setIsGPT(false);
      setMovieData([]);
      setSearchQuery("");
    }
  }, [pathname]);

  const searchContextValue = useMemo(
    () => ({
      movieData,
      searchQuery,
      watchlistedIDs,
      isGPT,
      isWatchlist,
      loading,
      lastPage,
      currentLimit,
      currentPage,
      genres,
      genieQuery,
      setIsWatchlist,
      fetchMoviesAndSet,
      setGenres,
      setIsGPT,
      setLastPage,
      setSearchQuery,
      setWatchlistedIDs,
      setMovieData,
      setGenieQuery,
    }),
    [
      isWatchlist,
      genieQuery,
      movieData,
      searchQuery,
      watchlistedIDs,
      isGPT,
      loading,
      lastPage,
      fetchMoviesAndSet,
      currentLimit,
      currentPage,
      genres,
    ],
  );

  return (
    <>
      <SearchContext.Provider value={searchContextValue}>
        <div className="align-middle text-center">
          <NavBar></NavBar>
          <div className="mx-20 mt-5">
            <Routes>
              <Route path="/" element={<MovieDisplay></MovieDisplay>}></Route>
              <Route
                path="/genres/:genres/"
                element={<MovieDisplay></MovieDisplay>}
              ></Route>
              <Route
                path="/watchlist"
                element={<MovieDisplay></MovieDisplay>}
              ></Route>
              <Route
                path="/results"
                element={<MovieDisplay></MovieDisplay>}
              ></Route>
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </>
  );
};

export default HomePage;
