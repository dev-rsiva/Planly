import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

export const createDropdownInfo = [
  {
    Board: {
      icon: <FontAwesomeIcon icon={faSquarePollVertical} />,
      title: "Create a Board",
      description:
        "A board is made up of cards ordered on  lists?. Use it to manage projects, track information, or organize anything",
      isShowing: false,
    },
  },
  {
    Template: {
      icon: <FontAwesomeIcon icon={faFile} />,
      title: "Start with a template",
      description: "Get started faster with a board template",
      isShowing: false,
    },
  },
  {
    Workspace: {
      icon: <FontAwesomeIcon icon={faUserGroup} />,
      title: "Create Workspace",
      description:
        "A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.",
      isShowing: false,
    },
  },
];
