import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { useParams } from "react-router-dom";
import dataContext from "../../utills/dataContext";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";

const ProgressBarContainer = ({ progressPercent }) => {
  // const [itemHovered, setItemHovered] = useState(false);
  // const paramObj = useParams();
  // const { workspaceData } = useContext(dataContext);

  // const updateItemStatus = () => {
  //   const generatedObj = (card) => {
  //     return {
  //       ...card,
  //       checklists: card?.checklists.map((eachChecklist) => {
  //         if (eachChecklist?.id !== checklist?.id) {
  //           return eachChecklist;
  //         }
  //         return {
  //           ...eachChecklist,
  //           items: eachChecklist?.items.map((eachItem) => {
  //             if (eachItem.id !== item.id) {
  //               return eachItem;
  //             }
  //             return {
  //               ...eachItem,
  //               status:
  //                 eachItem.status === "completed"
  //                   ? "not completed"
  //                   : "completed",
  //             };
  //           }),
  //         };
  //       }),
  //     };
  //   };

  //   console.log(generatedObj);
  //   const updatedWorkspaceData = createUpdatedWorkspaceDataType1(
  //     generatedObj,
  //     workspaceData,
  //     paramObj
  //   );
  //   console.log(updatedWorkspaceData);

  //   updateFirebaseDoc(updatedWorkspaceData);
  // };
  return (
    <div className="my-2">
      <div className="flex items-center gap-2">
        <div className="font-sans text-sm text-[#172b4d]">
          {progressPercent}%
        </div>
        <div className="w-full h-[9px] flex justify-between items-center bg-gray-300 rounded-full outline-none cursor-pointer ml-[12px]">
          <div
            className={`bg-blue-500 ${
              progressPercent === 100 ? "rounded-full" : "rounded-l-full"
            }`}
            style={{ width: `${progressPercent}%`, height: "9px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBarContainer;
