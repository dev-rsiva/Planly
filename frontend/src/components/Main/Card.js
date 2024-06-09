import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPencil, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { cardData } from "../../utills/cardData.js";
import Labels from "./Labels.js";
import CardMembersComp from "./CardMembersComp.js";
import MoveCardComp from "./MoveCardComp.js";
import CopyCardComp from "./CopyCardComp.js";
import DatesCard from "./DatesCard.js";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";
import { updateHighlightsDatabase } from "../../utills/updateHighlightsDatabase";
import generateUniqueNumber from "../../utills/generateUniqueNum";
import dataContext from "../../utills/dataContext.js";

const Card = ({
  workspaceData,
  setWorkspaceData,
  boardInfo,
  list,
  card,
  cardId,
  i,
}) => {
  console.log(list);
  const { user } = useContext(dataContext);

  const [cardTitle, setCardTitle] = useState(card?.title);
  const [editIconIsVisible, setEditIconIsVisible] = useState(false);
  const [editCardIsVisible, setEditCardIsVisible] = useState(false);
  const [zIndex, setZindex] = useState(false);

  // const [showOpenCard, setShowOpenCard] = useState(false);

  const [labelsIsShowing, setLabelsIsShowing] = useState(false);
  const [showCardMembersComp, setShowCardMembersComp] = useState(false);
  const [showMoveCardComp, setShowMoveCardComp] = useState(false);
  const [showCopyCardComp, setShowCopyCardComp] = useState(false);
  const [showDatesCard, setShowDatesCard] = useState(false);

  const workspaceInfo = workspaceData?.workspaces?.find((workspace) =>
    workspace?.boards?.some((eachBoard) => eachBoard?.id === boardInfo.id)
  );
  console.log(workspaceInfo);
  const openCardContext = createContext();

  const navigate = useNavigate();

  const inputField = useRef(null);
  const labelsBtnRef = useRef(null);
  const changeMembersBtnRef = useRef(null);
  const moveCardBtnRef = useRef(null);
  const copyCardBtnRef = useRef(null);
  const datesBtnRef = useRef(null);

  const addCardMember = (e, member) => {
    e.stopPropagation();
    if (
      card?.members?.some((eachMember) => eachMember.userId === member.userId)
    ) {
      console.log("already a card member");

      return;
    }

    console.log("card member started adding");

    const generatedObj = (card) => {
      return { ...card, members: [...card?.members, member] };
    };

    let updatedWorkspaceData = createUpdatedWorkspaceDataType1(
      generatedObj,
      workspaceData,
      { cardId: card?.id }
    );

    console.log(updatedWorkspaceData);
    // updateFirebaseDoc(updatedWorkspaceData);

    const addHighlight = (type, highlight, updatedWorkspaceData) => {
      console.log(highlight);
      updateHighlightsDatabase(type, highlight, updatedWorkspaceData);
    };

    addHighlight(
      "card",
      {
        id: generateUniqueNumber("adding_card_member", 5),
        type: "adding_card_member",
        details: {
          userId: user?.uid,
          memberName: member?.name,
          workspaceId: workspaceInfo?.id,
          workspaceName: workspaceInfo?.name,
          boardId: boardInfo?.id,
          boardName: boardInfo?.title,
          boardStarred: boardInfo?.starred,
          boardBackgroundImg: boardInfo?.backgroundImg,
          cardId: card.id,
          cardName: card?.title,
          cardLabels: card?.labels,
          cardMembers: [...card?.members, member],
          cardInfo: "",
          listId: list?.id,
          listName: "",
          listInfo: "",
          timestamp: new Date().toISOString(),
          inviter: user?.displayName,
          invitedMember: "",
          comment: "",
          checklistName: "",
          itemName: "",
          startDate: "",
          dueDate: "",
          description: "",
        },
      },
      updatedWorkspaceData
    );
  };

  const updateCardName = (e) => {
    e.stopPropagation();
    if (!cardTitle || cardTitle.trim() === "") {
      console.log("card title is invalid");

      return;
    }

    console.log("card title started updating");

    const generatedObj = (card) => {
      return { ...card, title: cardTitle };
    };

    let updatedWorkspaceData = createUpdatedWorkspaceDataType1(
      generatedObj,
      workspaceData,
      { cardId: card?.id }
    );

    console.log(updatedWorkspaceData);
    updateFirebaseDoc(updatedWorkspaceData);
    setEditCardIsVisible(false);
  };

  const foucsInput = () => {
    if (inputField.current) {
      inputField?.current?.focus();
      inputField?.current?.select();
    }
  };

  useEffect(() => {
    if (editCardIsVisible) {
      foucsInput();
    }
  }, [editCardIsVisible]);

  return (
    <div key={card?.id} className="relative">
      <div>
        <div
          className="flex justify-between items-center min-h-[40px] px-2 py-1 rounded-xl mr-2 mb-2 bg-white border-2 border-slate-300 shadow-lg hover:border-2 border-transparent hover:border-blue-700 hover:cursor-pointer"
          onMouseEnter={() => {
            setEditIconIsVisible(true);
          }}
          onMouseLeave={() => setEditIconIsVisible(false)}
          onClick={() => {
            // setShowOpenCard(!showOpenCard);
            navigate(`/c/${card?.id}/${card?.title}`);
          }}
        >
          <h1 className="font-sans text-sm font-base text-[#172b4d]">
            {card?.title}
          </h1>
          {editIconIsVisible && (
            <div
              onClick={(event) => {
                event.stopPropagation();
                setEditCardIsVisible(true);
                setZindex(true);
              }}
              className="hover:bg-gray-200 rounded-full flex justify-center items-center p-2 hover:p-2"
            >
              <FontAwesomeIcon
                icon={faPencil}
                // className="mb-[2px] pl-1"
                size="xs"
              />
            </div>
          )}
        </div>

        {editCardIsVisible && (
          <>
            <div
              className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 ${
                zIndex ? "z-40" : ""
              }`}
              onClick={() => {
                if (
                  !labelsIsShowing &&
                  !showCardMembersComp &&
                  !showCopyCardComp
                ) {
                  setEditCardIsVisible(false);
                }
              }}
            />
            <div
              className={`relative top-[-46px] flex justify-between items-start py-1 rounded-md bg-transparent ${
                zIndex ? "z-50" : ""
              }`}
            >
              <div>
                <div className="absolute w-[260px] bg-white rounded p-2 mb-2">
                  <input
                    ref={inputField}
                    value={cardTitle}
                    onChange={(e) => {
                      e.stopPropagation();
                      setCardTitle(e.target.value);
                    }}
                    className="border-2 border-blue-600 rounded p-2 outline-none bg-transparent whitespace-normal font-sans text-sm font-semibold text-[#172b4d]"
                  />
                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="mb-[2px] pl-1"
                  />
                </div>
                <div className="absolute top-[65px]">
                  <button
                    className="whitespace-nowrap px-3 py-1 bg-blue-600 rounded mb-1 font-sans font-semibold text-white"
                    onClick={(e) => updateCardName(e)}
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="absolute left-[110%] flex flex-col font-sans text-sm font-semibold text-[#172b4d]">
                <button
                  className="whitespace-nowrap px-2 py-2 bg-gray-200 rounded mb-1 hover:bg-gray-300"
                  onClick={() => {
                    navigate(`/c/${card?.id}/${card?.title}`);
                  }}
                >
                  Open card
                </button>
                <button
                  ref={labelsBtnRef}
                  className="whitespace-nowrap px-2 py-2 bg-gray-200 rounded mb-1 hover:bg-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLabelsIsShowing(true);
                  }}
                >
                  Edit labels
                </button>
                <button
                  ref={changeMembersBtnRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCardMembersComp(true);
                  }}
                  className="whitespace-nowrap px-2 py-2 bg-gray-200 rounded mb-1 hover:bg-gray-300"
                >
                  Change members
                </button>
                {/* <button className="whitespace-nowrap px-2 py-2 bg-gray-200 rounded mb-1 hover:bg-gray-300">
                  Change cover
                </button> */}
                <button
                  className="whitespace-nowrap px-2 py-2 bg-gray-200 rounded mb-1 hover:bg-gray-300"
                  ref={moveCardBtnRef}
                  onClick={() => setShowMoveCardComp(true)}
                >
                  Move
                </button>
                <button
                  ref={copyCardBtnRef}
                  className="whitespace-nowrap px-2 py-2 bg-gray-200 rounded mb-1 hover:bg-gray-300"
                  onClick={() => setShowCopyCardComp(true)}
                >
                  Copy
                </button>
                <button
                  ref={datesBtnRef}
                  className="whitespace-nowrap px-2 py-2 bg-gray-200 rounded mb-1 hover:bg-gray-300"
                  onClick={() => {
                    setShowDatesCard(!showDatesCard);
                  }}
                >
                  Edit dates
                </button>
                {/* <button className="whitespace-nowrap px-2 py-2 bg-gray-200 rounded mb-1 hover:bg-gray-300">
                  Archive
                </button> */}
              </div>
            </div>

            {labelsIsShowing && (
              <Labels
                setLabelsIsShowing={setLabelsIsShowing}
                labelsBtnRef={labelsBtnRef}
                cardInfo={card}
                newLabelListPosition="fromListsComponent"
                // chooseLabelRef={chooseLabelRef}
                // createLabelBtn={createLabelBtn}
              />
            )}
            {showCardMembersComp && (
              <CardMembersComp
                addCardMember={addCardMember}
                fromWhere="ListsComp"
                workspaceData={workspaceData}
                workspaceInfo={workspaceInfo}
                boardInfo={boardInfo}
                listInfo={list}
                cardInfo={card}
                plusBtnRef={changeMembersBtnRef}
                membersBtnRef={changeMembersBtnRef}
                setShowCardMembersComp={setShowCardMembersComp}
                showCardMembersComp={showCardMembersComp}
              />
            )}

            {showMoveCardComp && (
              <MoveCardComp
                fromWhere="listsComponent"
                setShowMoveCardComp={setShowMoveCardComp}
                workspaceData={workspaceData}
                workspaceInfo={workspaceInfo}
                boardInfo={boardInfo}
                listInfo={list}
                cardInfo={card}
                moveCardBtnRef={moveCardBtnRef}
              />
            )}

            {showCopyCardComp && (
              <CopyCardComp
                fromWhere="listsComponent"
                setShowCopyCardComp={setShowCopyCardComp}
                workspaceData={workspaceData}
                workspaceInfo={workspaceInfo}
                boardInfo={boardInfo}
                listInfo={list}
                cardInfo={card}
                copyCardBtnRef={copyCardBtnRef}
              />
            )}
            {showDatesCard && (
              <DatesCard
                fromWhere="listsComponent"
                datesBtnRef={datesBtnRef}
                showDatesCard={showDatesCard}
                setShowDatesCard={setShowDatesCard}
                newCardData={card}
                workspaceInfo={workspaceInfo}
                boardInfo={boardInfo}
                listInfo={list}
                cardInfo={card}
              />
            )}
          </>
        )}

        {/* {showOpenCard && (
          <OpenCard
            list={list}
            card={card}
            showOpenCard={showOpenCard}
            setShowOpenCard={setShowOpenCard}
          />
        )} */}
      </div>
    </div>
  );
};

export default Card;
