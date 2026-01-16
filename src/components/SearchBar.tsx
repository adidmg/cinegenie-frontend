import { useContext, useEffect, useState } from "react";
import SearchContext from "../context/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRightCircle, BrainCogIcon } from "lucide-react";
import { Tooltip, Zoom } from "@mui/material";
import { motion, AnimatePresence, circOut } from "motion/react";

const SearchBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    watchlistedIDs,
    genres,
    setGenres,
    isGPT,
    setIsGPT,
    setMovieData,
    setLastPage,
    fetchMoviesAndSet,
    setGenieQuery,
    currentPage,
    isWatchlist,
    currentLimit,
    loading,
  } = useContext(SearchContext);

  const navigate = useNavigate();

  const currentPath = useLocation().pathname;
  const [isArrowVisible, setIsArrowVisible] = useState(true);

  useEffect(() => {
    setSearchQuery("");
  }, [currentPath, setSearchQuery]);

  const initiateGptSearch = () => {
    if (!searchQuery.trim() || !isGPT || loading) return;
    setGenres(undefined);
    navigate("/results");
    setGenieQuery(searchQuery);
    setMovieData([]);
    setLastPage(0);

    setIsArrowVisible(false);
    fetchMoviesAndSet({
      searchQuery: searchQuery,
      isGPT: true,
      page: currentPage,
      limit: currentLimit,
      watchlistedIDs: watchlistedIDs,
      isWatchlist: isWatchlist,
      genre: genres,
    });
    setSearchQuery("");
  };

  const handleEnter = (event: { key: string }) => {
    if (event.key === "Enter" && isGPT) {
      initiateGptSearch();
    }
  };
  const handleClick = () => {
    console.log("UI button clicked");
    initiateGptSearch();
  };

  return (
    <div className="flex flex-col  items-center p-4 ">
      <div className=" flex md:w-[700px]  h-[60px] z-20 rounded-full bg-gray-900">
        <div className={`text-sm relative inset-y-0 left-0 `}>
          <Tooltip
            className="my-0.75 ml-1"
            title={`${
              isGPT ? "Turn off GenieMode search" : "Search with GenieMode"
            }`}
            PopperProps={{
              sx: {
                [`& .MuiTooltip-tooltip`]: {
                  fontSize: "16px",
                  padding: "12px 12px",
                  borderRadius: "25px",
                },
              },
            }}
            slots={{
              transition: Zoom,
            }}
          >
            <button
              className={`w-[120px] h-[54px] px-[25px] pt-1 rounded-full ${
                isGPT ? "bg-[#e0d2f8] text-black" : " bg-gray-800 text-white"
              }`}
              onClick={() => {
                setIsGPT(!isGPT);
                setIsArrowVisible(true);
              }}
            >
              <BrainCogIcon className="w-6 h-6 ml-6"></BrainCogIcon>
            </button>
          </Tooltip>
        </div>
        <input
          type="text"
          className={` relative 
          p-4
          h-13.5 
          bg-gray-900           
          text-white
          rounded-full
          placeholder-[#5A5B80]
          focus:outline-none
          transition-all
          duration-300
          text-lg
          shadow-lg
          my-0.75
          w-130

        `}
          placeholder={
            isGPT ? "Enter your query" : "Click on the icon to try GenieMode"
          }
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsArrowVisible(true);
          }}
          onKeyDown={handleEnter}
        />

        <button
          className={`flex justify-center items-center relative inset-y-3.5 right-0 mr-1 w-[50px] h-[33px]  ${
            isGPT && isArrowVisible ? "" : "hidden"
          }`}
          onClick={handleClick}
        >
          <ArrowRightCircle className="w-10 h-10 text-black fill-[#e0d2f8] transition-all duration-200"></ArrowRightCircle>
        </button>
      </div>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading-bar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 120, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: circOut }}
            style={{ overflow: "hidden" }}
            className="bg-[#1d1b31] z-10 w-[702px] mt-[-62px] pt-[75px] rounded-b-2xl rounded-t-[30px] border-2 border-amber-400"
          >
            <span className="text-lg font-semibold ">
              ⏳ Waiting for Genie response
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
