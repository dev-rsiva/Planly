import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeInput from "./TimeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faX, faStar } from "@fortawesome/free-regular-svg-icons";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { useParams } from "react-router-dom";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";
import { updateHighlightsDatabase } from "../../utills/updateHighlightsDatabase";
import { cardDataContext } from "../../utills/cardDataContext";
import generateUniqueNumber from "../../utills/generateUniqueNum";

const StarredBoardsHomePage = () => {
  const navigate = useNavigate();
  const { workspaceData } = useContext(dataContext);
  console.log(workspaceData);
  let starredBoards = [];
  workspaceData?.workspaces?.forEach((eachWorkspace) => {
    eachWorkspace?.boards?.forEach((board) => {
      if (board?.starred) {
        starredBoards?.push({ workspaceName: eachWorkspace.name, ...board });
      }
    });
  });

  console.log(starredBoards);

  if (starredBoards?.length === 0) {
    return (
      <div className="ml-12 min-w-[300px]">
        <div className="flex justify-between items-center pt-[2px] pb-3">
          <FontAwesomeIcon
            icon={faStar}
            className="text-sm font-semibold text-[#172b4d] font-sans"
          />
          <p className="w-full pl-3 font-sans text-left text-xs text-slate-600 font-semibold">
            Starred
          </p>
          {/* <div className="cursor-pointer p-2 mr-3 rounded hover:bg-gray-300">
          <FontAwesomeIcon icon={faPlus} size={"sm"} className="mb-[2px]" />
        </div> */}
        </div>
        <p className="font-sans text-xs font-semibold text-[#172b4d] w-full text-left pl-1 py-8">
          You have no boards.
        </p>
      </div>
    );
  }
  return (
    <div className="ml-12 min-w-[300px]">
      <div className="flex justify-between items-center pt-[2px] pb-3">
        <FontAwesomeIcon
          icon={faStar}
          className="text-sm font-semibold text-[#172b4d] font-sans"
        />
        <p className="w-full pl-3 font-sans text-left text-xs text-slate-600 font-semibold">
          Starred
        </p>
        {/* <div className="cursor-pointer p-2 mr-3 rounded hover:bg-gray-300">
          <FontAwesomeIcon icon={faPlus} size={"sm"} className="mb-[2px]" />
        </div> */}
      </div>
      <div>
        {starredBoards.map((eachBoard, index) => {
          return (
            <div
              key={index}
              className="flex items-center px-2 py-2 rounded hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                navigate(
                  `/b/${eachBoard?.id}/${eachBoard?.title?.replace(/ /g, "-")}`
                );
              }}
            >
              <img
                src={eachBoard?.backgroundImg}
                className="w-[40px] h-[30px] rounded mr-2"
              />
              <div className="flex justify-between items-center flex-1 mr-[2px]">
                <div>
                  <p
                    className="text-sm font-sans font-semibold text-[#172b4d] overflow-hidden whitespace-nowrap overflow-ellipsis"
                    style={{ maxWidth: "160px" }}
                  >
                    {eachBoard?.title}
                  </p>
                  <p
                    className="text-xs font-sans text-[#172b4d] overflow-hidden whitespace-nowrap overflow-ellipsis"
                    style={{ maxWidth: "160px" }}
                  >
                    {eachBoard?.workspaceName}
                  </p>
                </div>
                {eachBoard?.starred && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#E2B203" // "none" for transparent fill
                    viewBox="0 0 24 24"
                    stroke="#E2B203" // Set the stroke color to white
                    strokeWidth="2"
                    className="w-5 h-5 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StarredBoardsHomePage;
