import { useLocation, useParams, useSearchParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useContext, useEffect, useMemo, useState } from "react";
import PaginationControls from "./PaginationControls.tsx";
import SearchContext from "../context/SearchContext.tsx";
import { useDebounce } from "use-debounce";

const MovieDisplay = () => {
  //states and variables
  const {
    searchQuery,
    lastPage,
    loading,
    isGPT,
    isWatchlist,
    setIsWatchlist,
    fetchMoviesAndSet,
    movieData,
    genieQuery,
    currentLimit,
    currentPage,
    setGenres,
  } = useContext(SearchContext);

  const [watchlistedIDs, setWatchlistedIDs] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
  });

  const location = useLocation();
  const { genres } = useParams();

  useEffect(() => {
    setIsWatchlist(location.pathname === "/watchlist");
  }, [location.pathname, setIsWatchlist, isWatchlist]);

  useEffect(() => {
    setGenres(genres);
  }, [genres, setGenres]);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const title = useMemo(() => {
    if (location.pathname === "/results") {
      if (loading) {
        return "";
      }
      if (movieData.length > 0) {
        return `Genie Results for "${genieQuery.charAt(0).toUpperCase() + genieQuery.slice(1)}"`;
      }
      if (movieData.length === 0) {
        return "No Genie results";
      }
    }

    if (genres) {
      return genres.charAt(0).toUpperCase() + genres.slice(1);
    }
    if (isWatchlist) {
      return "Watchlist";
    }
    return "All Movies";
  }, [genieQuery, genres, isWatchlist, location.pathname, movieData.length]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlistedIDs));
  }, [watchlistedIDs]);

  // setting page and limit in the url
  useEffect(() => {
    if (!params.get("page") || !params.get("limit")) {
      setSearchParams({ page: "1", limit: "12" });
    }
  }, [setSearchParams, params]);

  //  fetching movies based on genre, page, limit, watchlist
  useEffect(() => {
    if (isGPT) return;
    fetchMoviesAndSet({
      searchQuery: "",
      genre: genres,
      page: currentPage,
      limit: currentLimit,
      isGPT: false,
      watchlistedIDs: isWatchlist ? watchlistedIDs : [],
      isWatchlist: isWatchlist,
    });
  }, [
    genres,
    currentPage,
    isGPT,
    currentLimit,
    watchlistedIDs,
    isWatchlist,
    fetchMoviesAndSet,
  ]);

  // debounced call for searchbar
  useEffect(() => {
    if (isGPT && !genres) return;

    if (debouncedSearchQuery && debouncedSearchQuery !== "") {
      fetchMoviesAndSet({
        searchQuery: debouncedSearchQuery,
        genre: genres,
        page: currentPage,
        limit: currentLimit,
        isGPT: false,
        watchlistedIDs: isWatchlist ? watchlistedIDs : [],
        isWatchlist: isWatchlist,
      });
    }
  }, [
    debouncedSearchQuery,
    genres,
    currentPage,
    isGPT,
    currentLimit,
    watchlistedIDs,
    fetchMoviesAndSet,
    isWatchlist,
  ]);

  return (
    <>
      <div className="text-amber-50 font-sans font-semibold font-stretch-expanded text-2xl mt-15">
        {title}
      </div>
      <div className="flex justify-end pr-8 ">
        {/* results per page dropdon */}
        {Number(lastPage) !== 0 ? (
          <div className="inline-flex bg-gray-500 w-[230px] h-10 pl-4 pt-1 rounded-4xl gap-2">
            <span>Results per page</span>
            <select
              className="pl-3 bg-gray-800 w-18 rounded-2xl  h-8 text-lg focus:ring-transparent active:ring-transparent"
              onChange={(e) => {
                const lmtparam = new URLSearchParams(searchParams);
                lmtparam.set("limit", e.target.value);
                lmtparam.set("page", "1");
                setSearchParams(lmtparam);
              }}
              value={params.get("limit") || "12"}
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
              <option value="48">48</option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Pagination controls */}
      <PaginationControls
        lastPage={Number(lastPage)}
        params={searchParams}
        loading={loading}
      ></PaginationControls>
      <div className="p-4 grid grid-cols-4">
        {movieData.map((movie) => (
          <MovieCard
            key={movie.movie_id}
            movie={movie}
            watchlistedIDs={watchlistedIDs}
            setWatchlistedIDs={setWatchlistedIDs}
          ></MovieCard>
        ))}
      </div>
      {Number(lastPage) !== 0 ? (
        <PaginationControls
          lastPage={Number(lastPage)}
          params={searchParams}
          loading={loading}
        ></PaginationControls>
      ) : (
        ""
      )}
    </>
  );
};

export default MovieDisplay;
