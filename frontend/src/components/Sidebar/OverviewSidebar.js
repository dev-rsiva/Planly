import React from "react";

import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { workspaceBtns } from "../../utills/workspaceBtns";
import dataContext from "../../utills/dataContext";
import TemplateCategory from "../Main/TemplateCategory";
import sideBarSelectionContext from "../../utills/sideBarSelectionContext";
import templateCategorySelectionContext from "../../utills/templateCategorySelectionContext";
const OverviewSidebar = (
  {
    // templateCategorySelected,
    // setTemplateCategorySelected,
  }
) => {
  const [hoveredOption, setHoveredOption] = useState("");
  const { workspaceData, setWorkspaceData } = useContext(dataContext);
  const { sidebarSelection, setSidebarSelection } = useContext(
    sideBarSelectionContext
  );

  const { templateCategorySelected, setTemplateCategorySelected } =
    useContext(templateCategorySelectionContext) || {};

  const navigate = useNavigate();

  const sideBardBtns = [
    {
      buttonName: "Boards",
      icon: (
        <FontAwesomeIcon
          icon={faTrello}
          color="#172b4d"
          className={`text-[14px] ${
            sidebarSelection === "Boards" ? "text-[#0c66e4]" : "text-[#172b4d]"
          }`}
        />
      ),
    },
    {
      buttonName: "Templates",
      icon: (
        <FontAwesomeIcon
          icon={faFile}
          color="#172b4d"
          className={`text-[14px] ${
            sidebarSelection === "Templates"
              ? "text-[#0c66e4]"
              : "text-[#172b4d]"
          }`}
        />
      ),
      ListOfTemplates: ["Business", "Design", "Education"],
    },

    {
      buttonName: "Home",
      icon: (
        <FontAwesomeIcon
          icon={faHouse}
          color="#172b4d"
          className={`text-[14px] ${
            sidebarSelection === "Home" ? "text-[#0c66e4]" : "text-[#172b4d]"
          }`}
        />
      ),
    },
  ];
  console.log(sidebarSelection);

  const [
    workspaceSideBarDropdownIsShowing,
    setWorkspaceSideBarDropdownIsShowing,
  ] = useState(() => {
    const workspaceDropdownBtns = {};

    workspaceData.workspaces.forEach(
      (workspace) => (workspaceDropdownBtns[workspace.name] = false)
    );

    return workspaceDropdownBtns;
  });
  console.log(workspaceSideBarDropdownIsShowing);

  console.log(workspaceBtns);

  // const addHighlights = () => {
  //   let workspaceButtons = workspaceBtns.slice(0, workspaceBtns.length);
  //   console.log(workspaceButtons);
  //   let highlightsObj = workspaceButtons.slice(0, 1)[0];
  //   console.log(highlightsObj);
  //   console.log(workspaceButtons);
  //   highlightsObj.icon = <FontAwesomeIcon icon={faHeart} />;
  //   highlightsObj.buttonName = "Highlights";
  //   console.log(workspaceButtons);
  //   workspaceButtons.splice(1, 0, highlightsObj);
  //   console.log(workspaceButtons);
  //   return workspaceButtons;
  // };

  // addHighlights();
  console.log(hoveredOption);
  console.log(sidebarSelection);

  const heading = React.createElement(
    "h1",
    { id: "heading" },
    "this is heading"
  );
  console.log(heading);

  return (
    <div className="w-full">
      <div>
        {sideBardBtns.map((eachButton) => {
          return (
            <>
              <div
                className={`w-full py-2 pl-4 mb-[8px] flex justify-start items-center rounded-lg ${
                  hoveredOption === "Home"
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }
          ${
            sidebarSelection === eachButton.buttonName
              ? "bg-[#e9f2ff] hover:bg-[#e9f2ff]"
              : hoveredOption !== "Home" && "hover:bg-gray-200"
          }`}
                onMouseEnter={(e) => setHoveredOption(eachButton.buttonName)}
                onMouseLeave={(e) => setHoveredOption("")}
                onClick={(e) => {
                  setSidebarSelection(e.target.innerText);
                  console.log(e.target.innerText);
                  if (e.target.innerText === "Templates") {
                    setTemplateCategorySelected
                      ? setTemplateCategorySelected("All")
                      : null;
                  }
                  e.target.innerText === "Templates" && navigate("/templates");
                  e.target.innerText === "Boards" && navigate("/user");
                  e.target.innerText === "Home" && navigate("/");
                }}
              >
                <span className="pr-3 text-sm">{eachButton.icon}</span>
                <span
                  className={`font-medium font-sans text-sm ${
                    sidebarSelection === eachButton.buttonName
                      ? "text-[#0c66e4]"
                      : "text-[#172b4d]"
                  }`}
                >
                  {eachButton.buttonName}
                </span>
              </div>
              {sidebarSelection === eachButton.buttonName && (
                <div className="font-sans text-sm font-normal">
                  {eachButton?.ListOfTemplates?.map((eachTemplate) => {
                    return (
                      <p
                        className={`py-2 pl-10 w-full rounded-lg hover:bg-gray-200 cursor-pointer mb-1 ${
                          templateCategorySelected === eachTemplate
                            ? "bg-[#e9f2ff] text-[#0c66e4]"
                            : ""
                        }`}
                        onClick={() => {
                          setTemplateCategorySelected
                            ? setTemplateCategorySelected(eachTemplate)
                            : null;
                          navigate("/templates/" + eachTemplate);
                        }}
                      >
                        {eachTemplate}
                      </p>
                    );
                  })}
                </div>
              )}
            </>
          );
        })}
        <hr className="mt-2" />
      </div>
      <div
        className={`w-full max-h-[calc(90vh-200px)] ${
          sidebarSelection !== "Templates" ? "overflow-y-auto" : ""
        } `}
      >
        <h2 className="w-full py-3 px-4 font-semibold text-xs text-[#44546f] font-sans">
          Workspaces
        </h2>

        {workspaceData.workspaces.map((workspace) => {
          console.log(workspace);
          return (
            <div>
              <div
                className="flex justify-between items-center hover:bg-gray-200 rounded-lg my-[6px] py-[5px] cursor-pointer"
                onClick={() =>
                  setWorkspaceSideBarDropdownIsShowing((prev) => {
                    console.log({
                      ...prev,
                      [workspace.name]: !prev[workspace.name],
                    });
                    return {
                      ...prev,
                      [workspace.name]: !prev[workspace.name],
                    };
                  })
                }
              >
                <div className="w-full py-[2px] pl-4 pr-2 flex items-center">
                  <div
                    style={{
                      backgroundImage: `linear-gradient(to bottom, ${workspace?.iconColors?.color1}, ${workspace?.iconColors?.color2})`,
                    }}
                    className={`relative w-[24px] h-[24px] min:w-[24px] min:h-[24px] rounded mr-3 flex justify-center items-center font-bold text-white text-xl`}
                  >
                    <div className="bg-black opacity-30 absolute w-full h-full rounded" />
                    <p className="z-50 rounded text-sm text-white font-bold font-sans">
                      {workspace.name[0]}
                    </p>
                  </div>
                  <h1 className="font-medium font-sans text-sm text-[#172b4d] flex-1">
                    {workspace.name}
                  </h1>
                </div>

                {workspaceSideBarDropdownIsShowing[workspace.name] ? (
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    size="sm"
                    className="pt-[2px] pl-1 pr-4 text-custom"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    size="sm"
                    className="pt-[2px] pl-1 pr-4 text-custom"
                  />
                )}
              </div>

              {workspaceBtns.map((eachBtn) => {
                console.log(eachBtn);
                return (
                  workspaceSideBarDropdownIsShowing[workspace.name] && (
                    <a
                      className={`px-3 py-1 pl-[25%] mb-[8px] flex justify-start items-center rounded-lg ${
                        eachBtn.buttonName === "Highlights"
                          ? "cursor-not-allowed"
                          : "cursor-pointer hover:bg-gray-200"
                      } `}
                      onClick={() => navigate(`/w/${workspace.shortname}/Home`)}
                    >
                      <span className="pr-2">{eachBtn.icon}</span>
                      <span className="text-[#172b4d] font-medium font-sans text-sm ">
                        {eachBtn.buttonName}
                      </span>
                    </a>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewSidebar;
