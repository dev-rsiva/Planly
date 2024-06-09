import { useContext } from "react";
import CommonBoard from "./CommonBoard";
import YourBoard from "./YourBoard";
import dataContext from "../../utills/dataContext";

const YourBoards = ({ workspace, renderFrom }) => {
  console.log(workspace);
  const { user } = useContext(dataContext);

  const joinedBoards = workspace?.boards?.filter((board) =>
    board?.members?.some((member) => member?.userId === user?.uid)
  );

  console.log(joinedBoards);

  const boardsTobeRendered =
    renderFrom === "workspaceYourBoards" ? joinedBoards : workspace?.boards;

  console.log(boardsTobeRendered);

  if (boardsTobeRendered?.length === 0) {
    return (
      <p className="font-sans text-sm font-semibold text-[#172b4d] w-full text-center py-8">
        You have no boards.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap">
      {boardsTobeRendered?.map((eachBoard, index) => {
        return (
          <CommonBoard
            key={index}
            board={eachBoard}
            typeOfBoard="yourBoard"
            workspaceInfo={workspace}
          />
        );
      })}
      {/* <div className="w-[195px] h-[95px] mr-4 bg-[#091e420f] hover:bg-gray-300 cursor-pointer flex rounded-[3px] justify-center items-center text-[#172b4d] font-normal font-sans text-sm">
        Create new board
      </div> */}
    </div>
  );
};

export default YourBoards;
