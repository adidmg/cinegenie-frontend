import { CircleCheckIcon, CirclePlusIcon } from "lucide-react";
import type { MovieCardProps } from "../types/types";

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  watchlistedIDs,
  setWatchlistedIDs,
}) => {
  const genres = movie.genres;

  //toggle watchlist
  const toggleWatchlist = (clickedMovieID: string) => {
    const newWatchlist = watchlistedIDs.includes(clickedMovieID)
      ? watchlistedIDs.filter((id) => id !== clickedMovieID)
      : [...watchlistedIDs, clickedMovieID];
    setWatchlistedIDs(newWatchlist);
  };

  return (
    <>
      <div className="mb-3 group w-60 rounded-2xl backdrop-blur-md bg-black/20 border border-white/20 overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ">
        <img className="w-full h-64 object-cover" src={movie.poster_link}></img>
        <div className="  pt-1 p-4 space-x-2">
          <span className="text-lg font-semibold text-[#ece9b6]">
            {movie.series_title}
          </span>
          <div className="text-yellow-400 font-bold">
            ⭐ {movie.imdb_rating}
          </div>
          <div className="flex space-x-4 justify-between mt-4">
            <span className=" ml-6  pt-1 text-black rounded-full bg-amber-400 w-[35px]">
              {movie.certificate}
            </span>
            <button
              className={`flex  w-[120px] gap-2 px-3 py-1.5 text-md rounded-2xl text-white ${
                watchlistedIDs.includes(movie.movie_id)
                  ? "watchlist-active"
                  : "watchlist-inactive"
              }`}
              onClick={() => toggleWatchlist(movie.movie_id)}
            >
              {watchlistedIDs.includes(movie.movie_id) ? (
                <>
                  <CircleCheckIcon></CircleCheckIcon>
                  <span>Added</span>
                </>
              ) : (
                <>
                  <CirclePlusIcon></CirclePlusIcon>
                  <span>Watchlist</span>
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-[#e6e5c8] ">{movie.director}</p>
          <span className="text-sm text-[#e6e5c8]">{movie.released_year}</span>

          <p className="text-sm  text-[#e6e5c8]  line-clamp-3">
            {genres[0].genre} {genres[1] ? `| ${genres[1].genre} ` : ""}
            {genres[2] ? `| ${genres[2].genre}` : ""}
          </p>
          <div className="text-sm mt-1 text-gray-300 hidden group-hover:block">
            <p className="p-1 bg-purple-950/50 rounded-2xl">{movie.overview}</p>
            <p className="mt-1 p-1 bg-purple-950/50 rounded-2xl">
              Starrring- {movie.star1}, {movie.star2},{movie.star3},
              {movie.star4}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
