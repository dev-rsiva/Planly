import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const BoardHeading = ({ boardInfo }) => {
  console.log(boardInfo);
  return (
    <div className="flex justify-between items-center px-[30px] py-3">
      <div className="flex items-center">
        <div className="pr-4 font-sans text-lg text-[#172b4d] font-bold">
          <h1>{boardInfo && boardInfo?.title}</h1>
        </div>
        <div className="pr-4">
          <FontAwesomeIcon
            icon={faStar}
            className="text-sm font-semibold text-[#172b4d] font-sans"
          />
        </div>
        <div className="pr-4">
          <FontAwesomeIcon
            icon={faUserGroup}
            className="text-sm font-semibold text-[#172b4d] font-sans"
          />
        </div>
        <div className="mr-4 bg-[#DFE1E6] rounded-[4px] px-4 py-2 font-sans text-sm text-[#172b4d] font-semibold">
          <button>Board</button>
        </div>
        <div className="mr-4 bg-[#DFE1E6] rounded-[4px] px-2 py-2 flex justify-between items-center">
          <FontAwesomeIcon
            icon={faAngleDown}
            className="text-lg text-[#172b4d]"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <FontAwesomeIcon
          icon={faRocket}
          className="pr-4 text-sm font-semibold text-[#172b4d] font-sans"
        />
        <FontAwesomeIcon
          icon={faBoltLightning}
          className="pr-4 text-sm font-semibold text-[#172b4d] font-sans"
        />
        <div className="pr-4 flex items-center">
          <FontAwesomeIcon
            icon={faFilter}
            className="pr-2 text-sm font-semibold text-[#172b4d] font-sans"
          />
          <p className="flex text-sm font-semibold text-[#172b4d] font-sans">
            Filters
          </p>
        </div>
        <hr className="border h-5 border-gray-400 mr-4"></hr>
        <div className="w-[30px] h-[30px] rounded-full bg-blue-600 flex justify-center items-center mr-4 text-sm font-semibold text-slate-200 font-sans">
          S
        </div>
        <div className="flex justify-center items-center bg-[#DFE1E6] px-4 py-2 rounded-[3px] mr-4 text-[#172b4d] font-sans text-sm font-semibold">
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          <p>Share</p>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faEllipsis}
            className="text-sm font-semibold text-[#172b4d] font-sans"
          />
        </div>
      </div>
    </div>
  );
};

export default BoardHeading;
