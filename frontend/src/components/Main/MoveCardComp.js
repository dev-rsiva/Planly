import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeInput from "./TimeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { useParams } from "react-router-dom";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";
import { updateHighlightsDatabase } from "../../utills/updateHighlightsDatabase";
import { cardDataContext } from "../../utills/cardDataContext";
import generateUniqueNumber from "../../utills/generateUniqueNum";

const MoveCardComp = ({
  fromWhere,
  setShowMoveCardComp,
  workspaceData,
  workspaceInfo,
  boardInfo,
  listInfo,
  moveCardBtnRef,
  cardInfo,
}) => {
  const [boardTitle, setBoardTitle] = useState(boardInfo.title);
  const [listTitle, setListTitle] = useState(listInfo.title);
  const [listChoosed, setListChoosed] = useState(listInfo);
  const [boardChoosed, setBoardChoosed] = useState(boardInfo);
  const { user } = useContext(dataContext);

  const moveCardRef = useRef();
  const paramObj = useParams();
  console.log(boardChoosed);
  console.log(listChoosed);
  console.log(boardTitle);
  console.log(cardInfo);

  const moveCard = (e) => {
    console.log("Move card starts");
    e.stopPropagation();
    if (boardChoosed.lists?.length === 0) return;

    let updatedWorkspaceData = { ...workspaceData };

    let targetBoard = boardChoosed;
    let targetList = listChoosed;
    console.log(targetBoard);
    console.log(targetList);

    let currWorkspace = workspaceData?.workspaces?.find((eachWorkspace) => {
      return eachWorkspace?.boards?.some((eachBoard) => {
        return eachBoard?.lists?.some((eachList) => {
          return eachList?.cards?.some((eachCard) => {
            return eachCard?.id === cardInfo?.id;
          });
        });
      });
    });
    console.log(currWorkspace);

    let currBoard = currWorkspace?.boards?.find((eachBoard) => {
      return eachBoard?.lists?.some((eachList) => {
        return eachList?.cards?.some((eachCard) => {
          return eachCard?.id === cardInfo?.id;
        });
      });
    });
    console.log(currBoard);

    let currList = currBoard?.lists?.find((eachList) => {
      return eachList?.cards?.some((eachCard) => {
        return eachCard?.id === cardInfo?.id;
      });
    });
    console.log(currList);

    let currCard = currList?.cards?.find((eachCard) => {
      return eachCard?.id === cardInfo?.id;
    });

    console.log(currCard);

    console.log(updatedWorkspaceData);
    let filteredData = updatedWorkspaceData?.workspaces?.map((workspace) => {
      if (workspace?.id !== currWorkspace?.id) {
        return workspace;
      }
      return {
        ...workspace,
        boards: workspace?.boards?.map((board) => {
          if (board?.id !== currBoard?.id) {
            return board;
          }
          return {
            ...board,
            lists: board?.lists?.map((list) => {
              if (list?.id !== currList?.id) {
                return list;
              }
              return {
                ...list,
                cards: list?.cards?.filter((card) => card?.id !== currCard?.id),
              };
            }),
          };
        }),
      };
    });

    console.log(filteredData);

    let movedData = filteredData.map((workspace) => {
      if (workspace?.id !== currWorkspace?.id) {
        return workspace;
      }
      return {
        ...workspace,
        boards: workspace?.boards?.map((board) => {
          if (board?.id !== targetBoard?.id) {
            return board;
          }

          return {
            ...board,
            lists: board?.lists?.map((list) => {
              if (list?.id !== targetList?.id) {
                return list;
              }
              return { ...list, cards: [currCard, ...list?.cards] };
            }),
          };
        }),
      };
    });

    console.log(movedData);

    updatedWorkspaceData.workspaces = movedData;

    // updateFirebaseDoc(updatedWorkspaceData);

    const addHighlight = (type, highlight, updatedWorkspaceData) => {
      console.log(highlight);
      updateHighlightsDatabase(type, highlight, updatedWorkspaceData);
    };

    addHighlight(
      "card",
      {
        id: generateUniqueNumber("card_moved", 5),
        type: "card_moved",
        details: {
          userId: user?.uid,
          memberName: user?.displayName,
          workspaceId: workspaceInfo?.id,
          workspaceName: workspaceInfo?.name,
          boardId: boardInfo?.id,
          boardName: targetBoard?.title,
          boardStarred: boardInfo?.starred,
          boardBackgroundImg: boardInfo?.backgroundImg,
          checklistName: "",
          cardId: cardInfo.id,
          cardName: cardInfo?.title,
          cardLabels: cardInfo?.labels,
          cardMembers: cardInfo?.members,
          cardInfo: "",
          listId: listInfo?.id,
          listName: targetList?.title,
          listInfo: "",
          timestamp: new Date().toISOString(),
          inviter: "",
          invitedMember: "",
          remover: "",
          comment: "",
          itemName: "",
          startDate: "",
          dueDate: "",
          description: "",
        },
      },
      updatedWorkspaceData
    );

    setShowMoveCardComp(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (
        !moveCardRef?.current?.contains(e.target) &&
        !moveCardBtnRef?.current?.contains(e.target)
      ) {
        setShowMoveCardComp(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  });

  useEffect(() => {
    setListChoosed(boardChoosed.lists[0]);
    if (boardChoosed.lists?.length === 1) {
      setListChoosed((prev) => {
        return boardChoosed.lists[0];
      });
    }
  }, [boardChoosed]);

  return (
    <>
      <div
        ref={moveCardRef}
        className={`absolute ${
          fromWhere === "openCardComponent"
            ? "right-60 top-36"
            : "left-[110%] top-1"
        } bg-white p-4 rounded w-[300px] z-[1801]`}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Move Card
          </p>
          <div className="ml-2" onClick={() => setShowMoveCardComp(false)}>
            <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
          </div>
        </div>
        <p className="font-sans text-xs font-semibold text-gray-500">
          Select Destination
        </p>
        <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Board
          </p>
          <div className="flex items-center gap-2 mt-1">
            <select
              name="workspaces"
              className={`w-full border-2 rounded focus:outline-none pl-2 py-[6px] font-sans text-custom text-sm`}
              value={boardTitle}
              onChange={(e) => {
                setBoardTitle(e.target.value);
                setBoardChoosed((prev) => {
                  console.log(workspaceData);
                  let workspace = workspaceData?.workspaces?.find(
                    (workspace) => {
                      console.log(workspace);
                      return workspace?.boards?.some((board) => {
                        console.log(board?.title);
                        console.log(e.target.value);
                        return board?.title === e.target.value;
                      });
                    }
                  );
                  console.log(workspace);
                  let updatedBoard = workspace?.boards?.filter(
                    (board) => board?.title === e.target.value
                  )[0];

                  console.log(updatedBoard);

                  return updatedBoard;
                });
              }}
            >
              {workspaceData?.workspaces?.map((workspace) => (
                <optgroup key={workspace?.id} label={workspace?.name}>
                  {workspace?.boards?.map((board) => (
                    <option key={board?.id} value={board?.title}>
                      {board?.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">List</p>

          <div className="flex items-center gap-2 mt-1">
            <select
              name="workspaces"
              className={`w-full border-2 rounded focus:outline-none pl-2 py-[6px] font-sans text-custom text-sm`}
              value={listTitle}
              onChange={(e) => {
                setListTitle(e.target.value);
                setListChoosed((prev) => {
                  console.log(workspaceData);

                  let updatedList = boardChoosed.lists?.filter(
                    (list) => list?.title === e.target.value
                  )[0];

                  console.log(updatedList);

                  return updatedList;
                });
              }}
            >
              {boardChoosed?.lists?.map((list) => (
                <option key={list?.id} value={list?.title}>
                  {list?.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button
            className={`mt-4 rounded py-2 px-2 my-3 text-sm font-semibold font-sans w-full ${
              false ? "bg-gray-400 text-gray-600" : "bg-blue-600 text-white"
            }`}
            onClick={moveCard}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default MoveCardComp;
