import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { House, Rows3 } from "lucide-react";

const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col">
      {/* search bar */}
      <div>
        <SearchBar></SearchBar>
      </div>
      {/* home button */}
      <div className="text-white flex justify-center items-center gap-6 mb-5">
        <Link
          to="/"
          className={`${
            pathname === "/" ? " button-active" : " button-inactive"
          } flex items-center justify-center gap-3`}
        >
          <House></House>
          Home
        </Link>

        {/* watchlist button */}
        <Link
          to="/watchlist"
          // onClick={resetGPT}
          className={`${
            pathname === "/watchlist" ? "button-active" : "button-inactive"
          } flex items-center justify-center gap-3`}
        >
          <Rows3></Rows3>
          Watchlist
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
