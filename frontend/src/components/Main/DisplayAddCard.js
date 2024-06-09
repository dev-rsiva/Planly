import { useState, useRef, useEffect, useContext } from "react";
import { sortedLabels } from "../../utills/labelColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import generateUniqueNumber from "../../utills/generateUniqueNum";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";

const DisplayAddCard = ({
  showAddCardInput,
  setShowCardInput,
  workspaceData,
  setWorkspaceData,
  list,
  boardInfo,
}) => {
  const [cardTitle, setCardTitle] = useState("");

  const {
    user,
    // allCardData, setAllCardData
  } = useContext(dataContext);
  console.log(user);
  const paramObj = useParams();
  const addCardInput = useRef();

  function addCard(e) {
    e.stopPropagation();
    let newCard = {
      id: generateUniqueNumber(cardTitle, 5),
      title: cardTitle,
      description: "",
      coverImg: "",
      Activities: [],
      labels: sortedLabels,
      checklists: [],
      members: [],
      covers: [],
      dates: { start: null, due: null },
      attachments: [],
      cover: [],
      customFields: [],
      archived: false,
      watchers: [],
      assignedTo: [],
      subscribers: [],
      dueDate: "",
      highlights: [],
    };

    // {
    //   members: [],
    //   covers: [],
    //   dates: { start: null, due: null },
    //   attachments: [],
    //   cover: [],
    //   customFields: [],
    //   archived: false,
    //   watching: false,
    //   assignedTo: ["userId1", "userId2"],
    //   subscribers: ["userId1", "userId2"],
    //   dueDate: "timestamp",
    // },

    // setWorkspaceData((prev) => {
    let updatedworkspaceData = { ...workspaceData };
    const workspace = updatedworkspaceData.workspaces?.find((workspace) =>
      workspace?.boards?.some((board) =>
        board?.lists?.some((eachlist) => eachlist.id === list?.id)
      )
    );
    const board = workspace?.boards?.find(
      (board) => board?.id === boardInfo.id
    );

    const listToBeAdded = board?.lists?.find(
      (eachList) => eachList?.id === list?.id
    );
    showAddCardInput.top && listToBeAdded.cards?.unshift(newCard);

    showAddCardInput.bottom && listToBeAdded.cards?.push(newCard);

    setCardTitle("");
    addCardInput.current.focus();

    // setAllCardData((prev) => {
    //   let updatedAllCardData = { ...prev };

    //   updatedAllCardData[newCard.id] = { ...newCard };
    //   return updatedAllCardData;
    // });
    console.log("firebase");

    updateFirebaseDoc(updatedworkspaceData);
    // return updatedworkspaceData;
    // });
  }

  useEffect(() => {
    addCardInput?.current?.focus();
  }, []);

  return (
    <div className="mb-4 ">
      <div className="mb-2">
        <input
          ref={addCardInput}
          placeholder="Enter a title for this card?..."
          value={cardTitle}
          type="text"
          className="w-full rounded-md p-2 font-sans text-sm font-semibold text-[#172b4d] focus:outline-none shadow-sm border border-gray-100 focus:border-2 focus:border-blue-500"
          onChange={(e) => setCardTitle(e.target.value)}
        />
      </div>

      <div className="flex items-center">
        <button
          className="px-2 py-[6px] rounded-[3px] font-sans text-sm font-semibold text-white bg-blue-600 mr-4"
          onClick={(e) => {
            addCard(e);
          }}
        >
          Add Card
        </button>
        <div
          onClick={() => {
            setShowCardInput((prev) => {
              return (prev = { ...prev, top: false, bottom: false });
            });
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
  );
};

export default DisplayAddCard;
