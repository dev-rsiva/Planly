import CommonBoard from "./CommonBoard";
import YourBoard from "./YourBoard";

const YourBoards = ({ workspace }) => {
  return (
    <div className="flex flex-wrap">
      {workspace.boards?.map((eachBoard, index) => {
        return (
          <CommonBoard key={index} board={eachBoard} typeOfBoard="yourBoard" />
        );
      })}
      <div className="w-[195px] h-[95px] mr-4 bg-[#091e420f] hover:bg-gray-300 cursor-pointer flex rounded-[3px] justify-center items-center text-[#172b4d] font-normal font-sans text-sm">
        Create new board
      </div>
    </div>
  );
};

export default YourBoards;
