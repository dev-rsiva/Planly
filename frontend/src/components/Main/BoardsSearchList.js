import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faX } from "@fortawesome/free-solid-svg-icons";

const BoardsSearchList = ({
  searchQuery,
  setSearchQuery,
  setShowSearchBoards,
  searchBoarContainerRef,
  boards,
  setShowBoardsOfUser, // Ensure this function is passed as a prop
}) => {
  console.log("BoardsSearchList rendering");
  console.log(boards);
  const boardSearchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !boardSearchRef?.current?.contains(e.target) &&
        !searchBoarContainerRef?.current?.contains(e.target)
      ) {
        setShowSearchBoards(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [boardSearchRef, searchBoarContainerRef, setShowSearchBoards]);

  return (
    <div
      ref={boardSearchRef}
      className="absolute left-0 top-[120%] bg-white p-4 rounded w-[300px] max-h-[450px] overflow-y-auto z-[1801] border border-gray-200"
    >
      <div className="flex justify-between items-center mb-3">
        <p className="flex-1 flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
          {searchQuery === "" ? "Recent Boards" : "Boards"}
        </p>
        <div
          className="hover:bg-gray-300 flex justify-center items-center w-6 h-6 rounded"
          onClick={() => {
            setShowSearchBoards(false);
            setSearchQuery("");
          }}
        >
          <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
        </div>
      </div>

      <hr className="border-b-gray-50 text-center mx-auto my-2" />

      {boards?.length === 0 && searchQuery !== "" && (
        <p className="font-sans text-sm font-semibold text-[#172b4d] text-center">
          Search results : 0 boards
        </p>
      )}
      {boards?.length !== 0 &&
        boards.map((eachBoard) => (
          <div
            key={eachBoard?.id} // Add a unique key for each element
            className="flex items-center py-2 rounded hover:bg-gray-100"
            onClick={() => {
              setShowBoardsOfUser(null);
              navigate(
                `/b/${eachBoard?.id}/${eachBoard?.title.replace(/ /g, "-")}`
              );
            }}
          >
            <img
              src={eachBoard?.backgroundImg}
              className="w-[40px] h-[33px] rounded mr-2"
              alt={`${eachBoard?.title} background`}
            />
            <div className="flex flex-col flex-1 mr-[2px]">
              <p
                className="text-sm font-sans text-[#172b4d] font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer"
                style={{ maxWidth: "210px" }}
              >
                {eachBoard?.title}
              </p>
              <p className="text-xs font-sans text-custom">
                {eachBoard?.workspaceName}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BoardsSearchList;
