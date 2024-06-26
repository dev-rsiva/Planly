import { useContext } from "react";
import { useParams } from "react-router-dom";
// import { starredBoardsContext } from "../../utills/starredBoardsContext";
import StarredBoard from "./StarredBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import dataContext from "../../utills/dataContext";
import CommonBoard from "./CommonBoard";
import { useParams } from "react-router-dom";
const StarredBoards = ({ renderFrom }) => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);

  const paramObj = useParams();

  const starredBoards =
    renderFrom === "overview"
      ? workspaceData?.workspaces
          ?.map((eachWorkspace, index) => {
            return eachWorkspace?.boards?.filter((eachBoard) => {
              return eachBoard?.starred;
            });
          })
          .flat()
      : renderFrom === "workspaceStarredBoards"
      ? workspaceData.workspaces
          .find(
            (workspace) => workspace.shortname === paramObj.workspaceShortName
          )
          .boards.filter((eachBoard) => {
            return eachBoard.starred;
          })

          .flat()
      : [];

  return (
    <>
      {starredBoards?.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-start items-center mb-4 ">
            <FontAwesomeIcon
              icon={faStar}
              className="mr-3 text-lg text-gray-600"
            />
            <h1 className="font-bold font-sans text-base text-[#172b4d]">
              Starred boards
            </h1>
          </div>
          <div className="flex flex-wrap">
            {starredBoards.flat().map((eachBoard, index) => {
              return (
                <CommonBoard
                  key={index}
                  board={eachBoard}
                  typeOfBoard={
                    renderFrom === "overview" ? "starredBoard" : "yourBoard"
                  }
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default StarredBoards;
