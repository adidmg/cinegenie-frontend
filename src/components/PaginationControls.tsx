import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface PaginationProps {
  lastPage: number;
  params: URLSearchParams;
  loading: boolean;
}
const PaginationControls = ({ lastPage, params, loading }: PaginationProps) => {
  const location = useLocation();
  const currentPage = Number(params.get("page"));
  const prevPage = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", String(currentPage - 1));
    return `${location.pathname}?${newParams.toString()}`;
  };
  const nextPage = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", String(currentPage + 1));
    return `${location.pathname}?${newParams.toString()}`;
  };

  return (
    <div className="inline-flex gap-2 text-xl">
      {loading ? (
        <></>
      ) : lastPage !== 0 ? (
        <>
          {Number(params.get("page")) > 1 ? (
            <Link to={prevPage()}>
              <CircleChevronLeft className="w-10 h-10"></CircleChevronLeft>
            </Link>
          ) : (
            <CircleChevronLeft className="w-10 h-10"></CircleChevronLeft>
          )}
          <span className="w-[100px] p-1 bg-gray-700 rounded-full">
            {lastPage === 0 ? lastPage : currentPage} of {lastPage}
          </span>
          {Number(params.get("page")) === lastPage ? (
            <CircleChevronRight className="w-10 h-10 "></CircleChevronRight>
          ) : (
            <Link to={nextPage()}>
              <CircleChevronRight className="w-10 h-10 "></CircleChevronRight>
            </Link>
          )}
        </>
      ) : (
        <p className="mt-10">Sorry! 😞 No Movies available</p>
      )}
    </div>
  );
};

export default PaginationControls;
