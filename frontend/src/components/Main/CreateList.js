import { useState, useContext, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import generateUniqueNumber from "../../utills/generateUniqueNum";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";

const CreateList = ({ boardInfo }) => {
  const [showAddListBtn, setShowAddListBtn] = useState(true);
  const [showAddListCard, setShowAddListCard] = useState(false);

  const [listTitle, setListTitle] = useState("");
  console.log(boardInfo);
  console.log(listTitle);
  const { workspaceData, setWorkspaceData } = useContext(dataContext);
  console.log(workspaceData);
  const addListInputRef = useRef();

  function addList(e) {
    e.stopPropagation();
    console.log("add list triggered");
    setListTitle("");
    let newList = {
      id: generateUniqueNumber(listTitle, 5),
      title: listTitle,
      cards: [],
    };

    // setWorkspaceData((prev) => {
    let updatedWorkspaceData = { ...workspaceData };

    const currWorkspace = updatedWorkspaceData.workspaces?.find((workspace) => {
      return workspace.boards.some((board) => board.id === boardInfo.id);
    });

    currWorkspace?.boards
      .find((board) => board.id === boardInfo.id)
      .lists.push(newList);

    let currWorkspaceIndex = updatedWorkspaceData.workspaces?.findIndex(
      (workspace) => workspace.boards.some((board) => board.id === boardInfo.id)
    );

    updatedWorkspaceData.workspaces[currWorkspaceIndex] = currWorkspace;
    console.log("firebase");

    updateFirebaseDoc(updatedWorkspaceData);
    // return updatedWorkspaceData;
    // });
  }

  useEffect(() => {
    addListInputRef?.current?.focus();
  }, []);
  return (
    <div
      className={`w-[275px] h-auto bg-[#f1f2f4] hover:bg-gray-300 rounded-xl px-4 py-3 flex flex-col`}
    >
      {showAddListBtn && (
        <div
          className="w-full flex justify-start items-center  rounded-md mr-4 cursor-pointer"
          onClick={() => {
            setShowAddListBtn(false);
            setShowAddListCard(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="pr-2" size={"sm"} />
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Add a list
          </p>
        </div>
      )}

      {showAddListCard && (
        <div className="mb-4">
          <div className="mb-2">
            <input
              ref={addListInputRef}
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              placeholder="Enter list title..."
              type="text"
              className="w-full rounded-md p-2 font-sans text-sm font-semibold text-[#172b4d] focus:outline-none shadow-sm border border-gray-100 focus:border-2 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center">
            <button
              className="px-2 py-[6px] rounded-[3px] font-sans text-sm font-semibold text-white bg-blue-600 mr-4"
              onClick={(e) => addList(e)}
            >
              Add List
            </button>
            <div
              onClick={() => {
                setShowAddListBtn(true);
                setShowAddListCard(false);
              }}
            >
              <FontAwesomeIcon
                icon={faX}
                size="sm"
                className="rounded px-2 py-2 hover:bg-slate-300 p-1 hover:px-2 hover:py-2 cursor-pointer text-sm font-semibold text-[#172b4d]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateList;
