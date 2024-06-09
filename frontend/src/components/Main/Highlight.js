import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

// Helper function to format the timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const Highlight = ({ activityType, data }) => {
  let message = "";
  console.log(data.checklistName);
  switch (activityType) {
    case "joining_board":
      message = `${data.memberName} joined the board ${data.boardName}.`;
      break;
    case "adding_board_member":
      message = `${data.memberName} was added to the board ${data.boardName} as a member by ${data.inviter}.`;
      break;
    case "adding_card_member":
      message = `${data.memberName} was added to the card ${data.cardName} in ${data.boardName} board by ${data.inviter}.`;
      break;
    case "removing_card_member":
      message = `${data.memberName} was removed from the card ${data.cardName} in ${data.boardName} board by ${data.remover}.`;
      break;
    case "card_moved":
      message = `The card ${data.cardName} was moved to ${data.listName} in ${data.boardName} board.`;
      break;
    case "commenting_card":
      message = `${data.memberName} commented on the card ${data.cardName}: "${data.cardComment}".`;
      break;
    case "updating_card_comment":
      message = `${data.memberName} updated a comment on the card ${data.cardName}: "${data.cardComment}".`;
      break;

    case "adding_checklist":
      message = `${data.memberName} added a checklist "${data.checklistName}" to the card ${data.cardName}.`;
      break;
    case "adding_checklist_item":
      message = `${data.memberName} added an item "${data.itemName}" to the checklist "${data.checklistName}" in the card ${data.cardName}.`;
      break;
    case "adding_dates":
      message = `${data.memberName} added ${
        data.startDate ? `a start date ${data.startDate}` : ""
      }${data.startDate && data.dueDate ? " and " : ""}${
        data.dueDate ? `a due date ${data.dueDate}` : ""
      } to the card ${data.cardName}.`;
      break;
    case "inviting_workspace_member":
      message = `${data.inviter} invited a member with email id "${data.invitedMember}" to the workspace ${data.workspaceName}. Let him accept the invitation.`;
      break;

    case "accepting_invitation":
      message = `${data.memberName} has accepted the invitation to join the workspace ${data.workspaceName}.`;
      break;
    case "adding_card_description":
      message = `${data.memberName} added a description to the card ${data.cardName}.`;
      break;
    case "watching_card":
      message = `${data.memberName} is watching the card ${data.cardName}.`;
      break;
    case "watching_list":
      message = `${data.memberName} is watching the list ${data.listName} in ${data.boardName} board.`;
      break;
    case "deleted_board":
      message = `${data.memberName} deleted the board ${data.boardName}.`;
      break;
    case "deleted_card":
      message = `${data.memberName} deleted the card ${data.cardName} from ${data.boardName} board.`;
      break;
    case "deleted_checklist":
      message = `${data.memberName} deleted the checklist ${data.checklistName} from the card ${data.cardName}.`;
      break;
    case "deleted_item":
      message = `${data.memberName} deleted the item ${data.itemName} from the checklist ${data.checklistName} in the card ${data.cardName}.`;
      break;
    default:
      message = "Unknown activity";
  }

  console.log(
    data?.cardInfo?.watchers?.some(
      (eachWatcher) => eachWatcher?.userId === user?.uid
    )
  );

  console.log(data);

  return (
    <div className="highlight mb-6 border border-gray-200 rounded-md">
      <div className="bg-gray-300 rounded-t-md h-8 w-full flex justify-center items-center text-sm font-semibold text-[#172b4d] font-sans">
        {activityType}
      </div>
      <div className=" bg-slate-100 p-4 rounded-b-md w-[440px] z-[1801]">
        {activityType === "joining_board" && (
          <div className=" flex flex-col mb-3 bg-blue-200 rounded-md px-3 py-4">
            <p className="text-start font-sans text-xs font-semibold text-gray-600 pb-2">
              Board
            </p>
            <div className=" flex justify-between items-center">
              <img
                src={data?.boardBackgroundImg}
                className="w-[40px] h-[33px] rounded mr-2"
              />
              <p className="flex-grow text-start font-sans text-sm font-semibold text-[#172b4d]">
                {data?.boardName}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={data?.boardStarred ? "#E2B203" : "none"} // "none" for transparent fill
                viewBox="0 0 24 24"
                stroke={data?.boardStarred ? "#E2B203" : "#172b4d"} // Set the stroke color to white
                strokeWidth="2"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
        )}

        {(activityType === "adding_card_member" ||
          activityType === "removing_card_member" ||
          activityType === "adding_card_description" ||
          activityType === "commenting_card" ||
          activityType === "updating_card_comment" ||
          activityType === "adding_checklist" ||
          activityType === "adding_checklist_item" ||
          activityType === "adding_dates" ||
          activityType === "card_moved") && (
          <div className=" flex flex-col mb-3 bg-blue-200 rounded-md px-3 py-4">
            <p className="text-start font-sans text-xs font-semibold text-gray-600 pb-2">
              Card
            </p>
            <div className=" flex justify-between items-center">
              {data?.cardLabels
                ?.filter((label) => label?.isChecked)
                ?.map((eachLabel) => {
                  return (
                    <>
                      <div
                        key={eachLabel?.id}
                        style={{ backgroundColor: eachLabel?.color }}
                        className="w-[55px] h-[25px] rounded mr-2 flex justify-center items-center"
                      >
                        <p className="font-sans text-xs font-semibold text-[#172b4d]">
                          {eachLabel?.title}
                        </p>
                      </div>
                    </>
                  );
                })}

              <p className="flex-grow text-start font-sans text-sm font-semibold text-[#172b4d]">
                {data?.cardName}
              </p>
              {data?.cardMembers?.map((eachCardMember) => {
                return (
                  <div
                    className={`flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[30px] h-[30px] mr-4`}
                  >
                    <img src={eachCardMember?.photoURL} className="w-full" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {(activityType === "inviting_workspace_member" ||
          activityType === "accepting_invitation") && (
          <div className=" flex flex-col mb-3 bg-blue-200 rounded-md px-3 py-4">
            <p className="text-start font-sans text-xs font-semibold text-gray-600 pb-2">
              Workspace
            </p>
            <div className=" flex justify-between items-center">
              <p className="flex-grow text-start font-sans text-sm font-semibold text-[#172b4d]">
                {data?.workspaceName}
              </p>
              {data?.workspaceMembers?.map((eachWorkspaceMember) => {
                return (
                  <div
                    className={`flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[30px] h-[30px] mr-4`}
                  >
                    <img
                      src={eachWorkspaceMember?.photoURL}
                      className="w-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <p className="text-start font-sans text-sm font-semibold text-[#172b4d] justify-center w-full items-center my-4">
          <span className="w-[400px] text-start font-sans text-sm font-semibold text-[#172b4d] underline pr-3">
            Activity:
          </span>
          {message}
        </p>
        <p className="timestamp text-start font-sans text-sm font-semibold text-[#172b4d] justify-center w-full items-center my-4">
          <span className="w-[400px] text-start font-sans text-sm font-semibold text-[#172b4d] underline pr-3">
            Activity time:
          </span>
          {formatTimestamp(data.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default Highlight;
