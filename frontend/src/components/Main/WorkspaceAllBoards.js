import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import YourBoards from "./YourBoards";

const WorkspaceAllBoards = ({ workspaceInfo }) => {
  return (
    <div>
      <div className="flex justify-start items-center mb-4 ">
        <FontAwesomeIcon
          icon={faUserGroup}
          className="mr-3 text-lg text-gray-600"
        />
        <h1 className="font-bold font-sans text-base text-[#172b4d]">
          All boards in this Workspace
        </h1>
      </div>
      <YourBoards
        workspace={workspaceInfo}
        renderFrom={"workspaceYourBoards"}
      />
    </div>
  );
};

export default WorkspaceAllBoards;
