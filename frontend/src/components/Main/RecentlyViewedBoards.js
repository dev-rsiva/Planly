import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import RecentlyViewedBoard from "./RecentlyViewedBoard";
import CommonBoard from "./CommonBoard";
import dataContext from "../../utills/dataContext";

const RecentlyViewedBoards = ({
  hoverBoard,
  setHoverBoard,
  hoverStar,
  setHoverStar,
}) => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);

  console.log(workspaceData);

  const recentlyViewedBoards = workspaceData?.workspaces
    .map((workspace) => {
      return workspace?.boards?.filter((eachBoard, index) => {
        return eachBoard?.viewedAt !== "" && !eachBoard?.starred;
      });
    })
    .flat();

  return (
    <>
      {recentlyViewedBoards.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-start items-center mb-4">
            <FontAwesomeIcon
              icon={faClock}
              className="text-gray-600 mr-3 text-lg"
            />
            <h1 className="font-bold font-sans text-base text-[#172b4d]">
              Recently viewed
            </h1>
          </div>
          <div className="flex flex-wrap">
            {recentlyViewedBoards
              .sort((a, b) => b.viewedAt - a.viewedAt)
              .slice(0, 4)
              .map((eachBoard, index) => {
                console.log("fffff");
                return (
                  <CommonBoard
                    key={index}
                    board={eachBoard}
                    typeOfBoard="recentlyViewed"
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyViewedBoards;
