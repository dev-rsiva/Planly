import { useState, useContext, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import dataContext from "../../utills/dataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CommonBoard from "./CommonBoard";

const ListOfBoard = () => {
  const [sortBy, setSortBy] = useState("Most recently active");
  const [filterBy, setFilterBy] = useState("Choose a collection");
  const [activeFeature, setActiveFeature] = useState("");
  const [showSortByOption, setShowSortByOption] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { workspaceData, setWorkspaceData } = useContext(dataContext);
  const [workspaceInfo] = useOutletContext();
  console.log(workspaceInfo);
  const permittedBoards = [];

  const sortByRef = useRef();
  const searchRef = useRef();

  const navigate = useNavigate();

  function sortBoards(sortOption) {
    if (sortOption === "Most recently active") {
      return workspaceInfo?.boards?.sort((a, b) => b.viewedAt - a.viewedAt);
    }

    if (sortOption === "Least recently active") {
      return workspaceInfo?.boards?.sort((a, b) => a.viewedAt - b.viewedAt);
    }

    if (sortOption === "Alphabetically A-Z") {
      return workspaceInfo?.boards?.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sortOption === "Alphabetically Z-A") {
      return workspaceInfo?.boards?.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }
    return workspaceInfo?.boards;
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        (activeFeature === "sortBy" &&
          sortByRef?.current &&
          !sortByRef?.current?.contains(e.target)) ||
        (activeFeature === "search" &&
          searchRef?.current &&
          !searchRef?.current?.contains(e.target))
      ) {
        setActiveFeature("");
        setShowSortByOption(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [activeFeature]);

  return (
    <div className="px-[34px] pt-[40px]">
      <div className="mb-[67px]">
        <h1 className="font-sans text-xl text-[#44546f] font-semibold pr-2">
          Boards
        </h1>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="mr-2">
            <p className="font-sans text-xs text-[#44546f] font-bold pr-2 pb-1">
              Sort by
            </p>
            <div
              className={`relative w-[200px] flex justify-between items-center border-2 rounded ${
                activeFeature === "sortBy"
                  ? "border-blue-500"
                  : "border-slate-300"
              }   font-sans text-sm
            text-[#44546f] font-normal p-2 cursor-pointer`}
              onClick={() => {
                setActiveFeature("sortBy");
                setShowSortByOption(!showSortByOption);
              }}
              ref={sortByRef}
            >
              <p>{sortBy}</p>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="text-custom text-base"
              />

              {showSortByOption && (
                <div className="w-[200px] py-1 absolute top-[120%] left-[-2px] z-10 rounded shadow-lg border border-gray-200 bg-white">
                  <ul>
                    {[
                      "Most recently active",
                      "Least recently active",
                      "Alphabetically A-Z",
                      "Alphabetically Z-A",
                    ].map((eachOption) => {
                      return (
                        <li
                          className={`font-sans text-sm text-[#44546f] font-normal p-2 hover:bg-gray-300 ${
                            sortBy === eachOption
                              ? "bg-blue-100 text-blue-600"
                              : ""
                          } cursor-pointer`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSortByOption(false);
                            setSortBy(eachOption);
                          }}
                        >
                          {eachOption}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mr-2 cursor-not-allowed">
            <p className="font-sans text-xs text-[#44546f] font-bold pr-2 pb-1">
              Filter by
            </p>
            <div
              className="w-[200px] flex justify-between items-center border-2 rounded border-slate-300 font-sans text-sm
            text-[#44546f] font-normal p-2"
            >
              <p className="font-semibold text-sm">Choose a collection</p>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="text-custom text-base"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="font-sans text-xs text-[#44546f] font-bold pr-2 pb-1">
            Search
          </p>
          <div
            className={`w-[200px] flex items-center border-2 rounded ${
              activeFeature === "search"
                ? "border-blue-600"
                : "border-slate-300"
            } font-sans text-sm
            text-[#44546f] font-normal p-2`}
            ref={searchRef}
          >
            <span className="mr-2">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                color="gray"
                className="text-sm text-custom"
              />
            </span>
            <input
              type="text"
              value={searchQuery}
              className={`font-normal text-sm focus:border-none focus:outline-none`}
              placeholder="Search boards"
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setActiveFeature("search")}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap mb-8">
        <div className="w-[195px] h-[95px] mr-4 bg-[#091e420f] hover:bg-gray-300 cursor-pointer flex rounded-[3px] justify-center items-center text-[#172b4d] font-normal font-sans text-sm">
          Create new board
        </div>
        {(activeFeature === "search"
          ? workspaceInfo?.boards?.filter((board) =>
              board?.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : activeFeature === "sortBy"
          ? sortBoards(sortBy)
          : workspaceInfo?.boards
        )?.map((eachBoard, index) => {
          return (
            <CommonBoard
              key={index}
              board={eachBoard}
              typeOfBoard="yourBoard"
              workspaceInfo={workspaceInfo}
            />
          );
        })}
      </div>
      <button className="cursor-not-allowed bg-gray-200 hover:bg-gray-300 mb-3 py-2 px-4 rounded-sm font-sans text-sm text-custom font-semibold">
        View closed boards
      </button>
    </div>
  );
};

export default ListOfBoard;
