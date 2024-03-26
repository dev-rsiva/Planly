import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { workspaceBtns } from "../../utills/workspaceBtns";
import YourBoards from "./YourBoards";
const YourWorkspace = ({ workspace }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-14 flex flex-col">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, ${workspace?.iconColors?.color1}, ${workspace?.iconColors?.color2})`,
            }}
            className={`relative w-[40px] h-[40px] rounded mr-3 flex justify-center items-center font-bold text-white text-xl`}
          >
            <div className="bg-black opacity-30 absolute w-full h-full rounded" />
            <p className="z-50 rounded">{workspace.name[0]}</p>
          </div>
          <h1 className="font-bold text-base text-[#172b4d]">
            {workspace.name}
          </h1>
        </div>
        <div className="flex">
          {workspaceBtns.map((eachBtn) => {
            return (
              <a
                className={`px-3 ml-[8px] mb-[8px] flex justify-center items-center bg-[#091e420f] rounded-[3px]  ${
                  eachBtn.buttonName === "Highlights"
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:bg-gray-300"
                }`}
                onClick={() => {
                  navigate(`/w/${workspace.shortname}/Home`);
                  window.scrollTo(0, 0);
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

      <YourBoards workspace={workspace} />
    </div>
  );
};

export default YourWorkspace;
