import { useState, useContext } from "react";
import dataContext from "../../utills/dataContext";
import RecentlyViewedBoards from "./RecentlyViewedBoards";
import StarredBoards from "./StarredBoards";
import { starredBoardsContext } from "../../utills/starredBoardsContext";
import { recentlyViewedContext } from "../../utills/recentlyViewedContext";
import { randomGradientColor } from "../../utills/randomGradientColor";
import YourWorkspaces from "./YourWorkspaces";
const OverviewMain = () => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);

  
  return (
    <div>
      <StarredBoards renderFrom={"overview"} />
      <RecentlyViewedBoards />
      <YourWorkspaces workspaceData={workspaceData} />
      {/* <button className="bg-gray-200 mb-3 py-2 px-4 rounded-md font-sans text-sm text-custom font-semibold cursor-not-allowed">
        View closed boards
      </button> */}
    </div>
  );
};

export default OverviewMain;
