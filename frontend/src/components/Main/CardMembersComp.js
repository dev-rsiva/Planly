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
import generateUniqueNumber from "../../utills/generateUniqueNum";

const CardMembersComp = ({
  workspaceData,
  workspaceInfo,
  boardInfo,
  listInfo,
  cardInfo,
  membersBtnRef,
  plusBtnRef,
  setShowCardMembersComp,
  showCardMembersComp,
  fromWhere,
  addCardMember,
}) => {
  const [boardTitle, setBoardTitle] = useState(boardInfo.title);
  const [listTitle, setListTitle] = useState(listInfo.title);
  const [listChoosed, setListChoosed] = useState(listInfo);
  const [boardChoosed, setBoardChoosed] = useState(boardInfo);

  const [copiedCardTitle, setCopiedCardTitle] = useState("");

  const membersCardRef = useRef();
  const paramObj = useParams();
  console.log(boardChoosed);
  console.log(listChoosed);
  console.log(boardTitle);

  console.log(cardInfo.members);

  const removeCardMember = (e, member) => {
    e.stopPropagation();

    if (
      !cardInfo.members.some(
        (eachMember) => eachMember.userId === member.userId
      )
    ) {
      console.log("card member is not available");

      return;
    }

    console.log("card member started removing");

    const generatedObj = (card) => {
      return {
        ...card,
        members: card?.members.filter(
          (eachCardMember) => eachCardMember.userId !== member.userId
        ),
      };
    };

    let updatedWorkspaceData = createUpdatedWorkspaceDataType1(
      generatedObj,
      workspaceData,
      { cardId: cardInfo.id }
    );

    console.log(updatedWorkspaceData);
    updateFirebaseDoc(updatedWorkspaceData);
    // setShowCardMembersComp(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (
        !membersCardRef?.current?.contains(e.target) &&
        !membersBtnRef?.current?.contains(e.target) &&
        !plusBtnRef?.current?.contains(e.target)
      ) {
        setShowCardMembersComp(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  });

  return (
    <>
      <div
        ref={membersCardRef}
        className={`absolute ${
          fromWhere === "plusBtn"
            ? "left-[400px]"
            : fromWhere === "membersBtn"
            ? "right-60"
            : "left-[110%] top-1"
        }  top-24 bg-white p-4 rounded w-[300px] z-[1801]`}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Members
          </p>
          <div className="ml-2" onClick={() => setShowCardMembersComp(false)}>
            <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
          </div>
        </div>
        {/* <div>
          <p className="font-sans text-xs font-semibold text-gray-500">
            Search Members
          </p>
          <input
            className="w-full py-1 px-2 border-2 border-blue-500 rounded outline-none font-sans text-sm text-[#172b4d] mt-2 mb-2"
            type="text"
            value=""
          />
        </div> */}

        {cardInfo.members.length !== 0 && (
          <div className="mt-4">
            <p className="font-sans text-xs font-semibold text-gray-500 mb-1">
              Card Members
            </p>
            <div className="max-h-[100px] overflow-y-auto border border-gray-200 py-2 rounded">
              {cardInfo.members.map((eachMember) => {
                return (
                  <div
                    className="w-full flex justify-between cursor-pointer hover:bg-gray-100 py-2 px-3 rounded"
                    onClick={(e) => removeCardMember(e, eachMember)}
                  >
                    <div className="flex items-center">
                      <div className="flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[30px] h-[30px] mr-2">
                        <img src={eachMember?.photoURL} className="w-full" />
                      </div>
                      <p className="text-sm font-semibold mr-3 text-gray-800">
                        {eachMember?.name}
                      </p>
                    </div>

                    <div className="mb-1">
                      <FontAwesomeIcon
                        icon={faX}
                        className="cursor-pointer text-xs"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {boardInfo.members.length !== 0 && (
          <div className="mt-4">
            <p className="font-sans text-xs font-semibold text-gray-500 mb-1">
              Board Members
            </p>
            <div className="max-h-[100px] overflow-y-auto border border-gray-200 py-2 rounded">
              {boardInfo.members.map((eachMember) => {
                return (
                  <div
                    className="w-full flex justify-between cursor-pointer hover:bg-gray-100 py-2 px-3 rounded"
                    onClick={(e) => {
                      //remove the role property from member as the card does not have role.
                      let member = {
                        userId: eachMember?.userId,
                        name: eachMember?.name,
                        email: eachMember?.email,
                        photoURL: eachMember?.photoURL,
                      };
                      addCardMember(e, member);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[30px] h-[30px] mr-2">
                        <img src={eachMember?.photoURL} className="w-full" />
                      </div>
                      <p className="text-sm font-semibold mr-3 text-gray-800">
                        {eachMember?.name}
                      </p>
                    </div>

                    {/* <div className="mb-1">
                    <FontAwesomeIcon
                      icon={faX}
                      className="cursor-pointer text-sm"
                    />
                  </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {workspaceInfo?.members.length !== 0 && (
          <div className="mt-4">
            <p className="font-sans text-xs font-semibold text-gray-500 mb-2">
              Workspace Members
            </p>
            <div className="max-h-[100px] overflow-y-auto border border-gray-200 py-2 rounded">
              {workspaceInfo?.members.map((eachMember) => {
                return (
                  <div
                    className="w-full flex justify-between cursor-pointer hover:bg-gray-100 py-2 px-3 rounded"
                    onClick={(e) => {
                      //remove the role property from member as the card does not have role.
                      let member = {
                        userId: eachMember?.userId,
                        name: eachMember?.name,
                        email: eachMember?.email,
                        photoURL: eachMember?.photoURL,
                      };
                      addCardMember(e, member);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[30px] h-[30px] mr-2">
                        <img src={eachMember?.photoURL} className="w-full" />
                      </div>
                      <p className="text-sm font-semibold mr-3 text-gray-800">
                        {eachMember?.name}
                      </p>
                    </div>

                    {/* <div className="mb-1">
                    <FontAwesomeIcon
                      icon={faX}
                      className="cursor-pointer text-sm"
                    />
                  </div> */}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 mt-1"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default CardMembersComp;
