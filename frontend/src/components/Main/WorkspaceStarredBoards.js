import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import StarredBoards from "./StarredBoards";
const WorkspaceStarredBoards = () => {
  return (
    // <div className="flex justify-start items-center mb-4 ">
    //   <FontAwesomeIcon icon={faUser} className="mr-3 text-lg text-gray-600" />
    //   <h1 className="font-bold font-sans text-base text-[#172b4d]">
    //     Starred boards
    //   </h1>

    // </div>
    <StarredBoards renderFrom={"workspaceStarredBoards"}/>
  );
};

export default WorkspaceStarredBoards;
