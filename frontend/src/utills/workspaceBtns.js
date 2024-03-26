import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export const workspaceBtns = [
  {
    icon: <FontAwesomeIcon icon={faTrello} color="#455570" />,
    buttonName: "Boards",
  },
  {
    icon: <FontAwesomeIcon icon={faHeart} color="#455570" />,
    buttonName: "Highlights",
  },

  // {
  //   icon: <FontAwesomeIcon icon={faUser} color="#455570" />,
  //   buttonName: "Members",
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faGear} color="#455570" />,
  //   buttonName: "Settings",
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faGraduationCap} color="#455570" />,
  //   buttonName: "Upgrade",
  // },
];
