import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAngleLeft,
  faAngleDown,
  faPlus,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { data } from "../../utills/utills.js";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import dataContext from "../../utills/dataContext.js";

const Sidebar = ({ workspaceInfo }) => {

  const {
    createDropdownDetails,
    setCreateDropdownDetails,
    createBoardSourceClick,
    setCreateBoardSourceClick,
  } = useContext(dataContext);

  const workspaceSideBarBtns = [
    {
      btnName: "Boards",
      icon: <FontAwesomeIcon icon={faTrello} size={"sm"} color="#455570" />,
      iconAtRightEnd: "",
    },
    {
      btnName: "Members",
      icon: (
        <FontAwesomeIcon
          icon={faUser}
          size={"sm"}
          color="#455570"
          className=""
        />
      ),
      iconAtRightEnd: (
        <FontAwesomeIcon icon={faPlus} className="" size={"sm"} />
      ),
    },
    {
      btnName: "Workspace settings",
      icon: <FontAwesomeIcon icon={faGear} size={"sm"} color="#455570" />,
      iconAtRightEnd: <FontAwesomeIcon icon={faAngleDown} size={"sm"} />,
    },
    {
      btnName: "Table",
      icon: <FontAwesomeIcon icon={faTable} size={"sm"} color="#455570" />,
      iconAtRightEnd: "",
    },
    {
      btnName: "Calendar",
      icon: <FontAwesomeIcon icon={faCalendar} size={"sm"} color="#455570" />,
      iconAtRightEnd: "",
    },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <div className="w-[262px] flex justify-between items-center py-3 pl-4 pr-6">
        <div className="flex">
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, ${workspaceInfo?.iconColors?.color1}, ${workspaceInfo?.iconColors?.color2})`,
            }}
            className={`relative w-[34px] h-[34px] rounded mr-3 flex justify-center items-center font-bold text-white text-xl`}
          >
            <div className="bg-black opacity-30 absolute w-full h-full rounded" />
            <p className="z-50 rounded text-sm text-white font-bold font-sans">
              {workspaceInfo?.name[0]}
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold font-sans text-sm text-[#172b4d] flex-1">
              {workspaceInfo?.name}
            </h1>
            <h1 className="font-base font-sans text-[12px] text-[#172b4d] flex-1">
              Free
            </h1>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="mb-[2px] pl-1 text-xs text-gray-600"
        />
      </div>
      <hr className="mb-4" />

      <div className="h-[78vh] overflow-y-auto">
        <div>
          {workspaceSideBarBtns.slice(0, 3).map((eachBtn, index) => {
            return (
              <div
                className={`py-1 pl-5 mb-[4px] flex justify-start items-center hover:bg-gray-200 
                ${
                  eachBtn.btnName ===
                  ("Members" || "Workspace settings" || "Table" || "Calendar")
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => navigate(`/w/${workspaceInfo?.shortname}/Home`)}
              >
                <span className="w-7">{eachBtn.icon}</span>
                <div className="w-full flex justify-between items-center pr-4">
                  <span
                    className={`text-[#172b4d] ${
                      eachBtn.btnName === "Workspace settings"
                        ? "font-semibold"
                        : "font-normal"
                    } font-sans text-sm cursor-not-allowed`}
                  >
                    {eachBtn.btnName}
                  </span>
                  {eachBtn.iconAtRightEnd}
                </div>
              </div>
            );
          })}

          <div className="py-2">
            <p className="w-full py-1 pl-3 font-sans text-sm text-[#172b4d] font-semibold">
              Workspaces views
            </p>
            {workspaceSideBarBtns.slice(3).map((eachBtn, index) => {
              return (
                <div
                  className="py-1 pl-5 mb-[4px] flex justify-start items-center hover:bg-gray-200 cursor-not-allowed"
                  onClick={() => navigate(`/w/${workspace.shortname}/Home`)}
                >
                  <span className="w-7">{eachBtn.icon}</span>
                  <div className="w-full flex justify-between items-center pr-4">
                    <span className="text-[#172b4d] font-normal font-sans text-sm ">
                      {eachBtn.btnName}
                    </span>
                    {eachBtn.iconAtRightEnd}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between">
            <p className="w-full py-1 pl-3 font-sans text-sm text-[#172b4d] font-semibold">
              Your Boards
            </p>
            <div
              className="cursor-pointer p-2 mr-3 rounded hover:bg-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setCreateBoardSourceClick("workspaceSidebarBtn");
                setCreateDropdownDetails((prev) => {
                  let updatedCreateDropdownDetails = [...prev];
                  const property = Object.keys(
                    updatedCreateDropdownDetails[0]
                  )[0];
                  updatedCreateDropdownDetails[0] = {
                    ...updatedCreateDropdownDetails[0],
                    [property]: {
                      ...updatedCreateDropdownDetails[0][property],
                      isShowing:
                        !updatedCreateDropdownDetails[0][property].isShowing,
                    },
                  };

                  return updatedCreateDropdownDetails;
                });
              }}
            >
              <FontAwesomeIcon icon={faPlus} size={"sm"} className="mb-[2px]" />
            </div>
          </div>
          <div>
            {workspaceInfo?.boards
              ?.sort((a, b) => {
                if (a.starred === b.starred) {
                  return 0;
                }
                if (a.starred) {
                  return -1;
                }
                return 1;
              })
              .map((eachBoard) => {
                return (
                  <div
                    className="flex items-center py-2 pl-3 rounded hover:bg-gray-300 cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/b/${eachBoard.id}/${eachBoard.title.replace(
                          / /g,
                          "-"
                        )}`
                      );
                    }}
                  >
                    <img
                      src={eachBoard.backgroundImg}
                      className="w-[26px] h-[21px] rounded mr-2"
                    />
                    <div className="flex justify-between items-center flex-1 mr-[2px]">
                      <p
                        className="text-sm font-sans text-[#172b4d] overflow-hidden whitespace-nowrap overflow-ellipsis"
                        style={{ maxWidth: "160px" }}
                      >
                        {eachBoard?.title}
                      </p>
                      {eachBoard.starred && (
                        <FontAwesomeIcon
                          icon={faStar}
                          size={"sm"}
                          className=" pr-3"
                        />
                      )}
                      
                    </div>
                  </div>
                );
              })}
          </div>
          
        </div>
       
      </div>

     
    </div>
  );
};

export default Sidebar;
