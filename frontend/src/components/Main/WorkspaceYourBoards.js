import StarredBoards from "./StarredBoards";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import YourBoards from "./YourBoards";

const WorkspaceYourBoards = ({ workspaceInfo }) => {
  return (
    <div>
      <div className="flex justify-start items-center mb-4 ">
        <FontAwesomeIcon icon={faUser} className="mr-3 text-lg text-gray-600" />
        <h1 className="font-bold font-sans text-base text-[#172b4d]">
          Your boards
        </h1>
      </div>
      <YourBoards
        workspace={workspaceInfo}
        renderFrom={"workspaceYourBoards"}
      />
    </div>
  );
};

export default WorkspaceYourBoards;
