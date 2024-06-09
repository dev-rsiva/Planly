import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dataContext from "../../utills/dataContext";

import { workspaceBtns } from "../../utills/workspaceBtns";
import YourBoards from "./YourBoards";
const YourWorkspace = ({ workspace }) => {
  const navigate = useNavigate();

  const { workspaceData, setWorkspaceData, setShowWorkspaceHeading } =
    useContext(dataContext);

  return (
    <div className="mb-14 flex flex-col">
      <div className="flex justify-between mb-4 mr-16">
        <div className="flex items-center">
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, ${workspace?.iconColors?.color1}, ${workspace?.iconColors?.color2})`,
            }}
            className={`relative w-[40px] h-[40px] rounded mr-3 flex justify-center items-center font-bold text-white text-xl`}
          >
            <div className="bg-black opacity-30 absolute w-full h-full rounded" />
            <p className="z-50 rounded">{workspace?.name[0]}</p>
          </div>
          <h1 className="font-bold text-base text-[#172b4d]">
            {workspace?.name}
          </h1>
        </div>
        <div className="flex">
          {workspaceBtns.map((eachBtn, index) => {
            return (
              <a
                key={index}
                className={`px-3 ml-[8px] mb-[8px] flex justify-center items-center bg-[#091e420f] rounded-[3px]  ${
                  eachBtn.buttonName === "Highlights"
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:bg-gray-300"
                }`}
                onClick={() => {
                  if (eachBtn.buttonName === "Boards") {
                    console.log("navigating to Home");
                    navigate(`/w/${workspace?.shortname}/Home`);
                    window.scrollTo(0, 0);
                  }
                  if (eachBtn.buttonName === "Views") {
                    console.log("navigating to Views");
                    setShowWorkspaceHeading(false);
                    navigate(
                      `/w/${workspace?.shortname}/${workspace?.name.replace(
                        / /g,
                        "-"
                      )}/Views`
                    );
                    window.scrollTo(0, 0);
                  }
                  if (eachBtn.buttonName === "Members") {
                    console.log("navigating to Members");
                    navigate(
                      `/w/${workspace?.shortname}/${workspace?.name.replace(
                        / /g,
                        "-"
                      )}/Members`
                    );
                    window.scrollTo(0, 0);
                  }
                  if (eachBtn.buttonName === "Settings") {
                    console.log("navigating to Workspace settings");
                    navigate(
                      `/w/${workspace?.shortname}/${workspace?.name.replace(
                        / /g,
                        "-"
                      )}/Settings`
                    );
                    window.scrollTo(0, 0);
                  }
                }}
              >
                <span className="pr-2">{eachBtn.icon}</span>
                <span className="text-[#172b4d] font-medium font-sans text-sm ">
                  {eachBtn.buttonName}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <YourBoards workspace={workspace} renderFrom={"YourWorkspace"} />
    </div>
  );
};

export default YourWorkspace;
