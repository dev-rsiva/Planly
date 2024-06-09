import { useState, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BoardsSearchList from "../Main/BoardsSearchList";
import dataContext from "../../utills/dataContext";

const SearchBarContainerHeader = () => {
  const { workspaceData } = useContext(dataContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBoards, setShowSearchBoards] = useState(false);
  const [boards, setBoards] = useState([]);
  const searchBoarContainerRef = useRef();

  console.log(boards);
  useEffect(() => {
    let boardsList = [];

    workspaceData?.workspaces?.forEach((eachWorkspace) => {
      eachWorkspace?.boards?.forEach((board) => {
        boardsList?.push({ workspaceName: eachWorkspace?.name, ...board });
      });
    });

    if (searchQuery !== "") {
      const searchResultBoards = boardsList?.filter((eachBoard) => {
        return eachBoard?.title
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim());
      });
      console.log(searchResultBoards);
      setBoards(searchResultBoards);
      return;
    }

    setBoards(
      workspaceData?.workspaces
        ?.map((workspace) => {
          return workspace?.boards?.filter((eachBoard, index) => {
            return eachBoard?.viewedAt !== "" && !eachBoard?.starred;
          });
        })
        .flat()
    );
  }, [searchQuery, workspaceData]);

  return (
    <div
      ref={searchBoarContainerRef}
      id="search-container"
      className="relative flex items-center w-[200px] h-[32px] mr-4 border border-gray-300 rounded px-2"
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        color="gray"
        className="pr-2 text-xs text-custom"
      />
      <input
        type="search"
        placeholder="Search"
        name="search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="w-[150px] focus:outline-none font-sans text-sm placeholder:text-custom font-normal"
        onClick={(e) => {
          e.stopPropagation();
          setShowSearchBoards(true);
        }}
      />
      {showSearchBoards && (
        <BoardsSearchList
          setShowSearchBoards={setShowSearchBoards}
          searchBoarContainerRef={searchBoarContainerRef}
          boards={boards}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default SearchBarContainerHeader;
