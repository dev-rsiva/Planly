import React, { useState, useContext, useEffect } from "react";
import Highlight from "./Highlight";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import dataContext from "../../utills/dataContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Highlights = () => {
  const [highlights, setHighlights] = useState([]);

  const { workspaceData, user } = useContext(dataContext);

  // const addHighlight = (type, highlight) => {
  //   updateHighlightsDatabase(type, highlight);
  // };

  // const updateHighlightsDatabase = (type, highlight) => {
  //   if (!workspaceData || !workspaceData?.workspaces) {
  //     console.error("Invalid workspace data");
  //     return;
  //   }

  //   const updatedWorkspaceData = { ...workspaceData };

  //   switch (type) {
  //     case "workspace":
  //       updatedWorkspaceData.workspaces = updatedWorkspaceData?.workspaces?.map(
  //         (eachWorkspace) => {
  //           if (eachWorkspace?.id !== highlight?.details?.workspaceId) {
  //             return eachWorkspace;
  //           }

  //           return {
  //             ...eachWorkspace,
  //             highlights: [highlight, ...(eachWorkspace?.highlights || [])],
  //           };
  //         }
  //       );
  //       break;

  //     case "board":
  //       updatedWorkspaceData.workspaces = updatedWorkspaceData?.workspaces?.map(
  //         (eachWorkspace) => {
  //           if (eachWorkspace?.id !== highlight?.details?.workspaceId) {
  //             return eachWorkspace;
  //           }

  //           return {
  //             ...eachWorkspace,
  //             boards:
  //               eachWorkspace?.boards?.map((eachBoard) => {
  //                 if (eachBoard?.id !== highlight?.details?.boardId) {
  //                   return eachBoard;
  //                 }

  //                 return {
  //                   ...eachBoard,
  //                   highlights: [highlight, ...(eachBoard?.highlights || [])],
  //                 };
  //               }) || [],
  //           };
  //         }
  //       );
  //       break;

  //     case "card":
  //       updatedWorkspaceData.workspaces = updatedWorkspaceData?.workspaces?.map(
  //         (eachWorkspace) => {
  //           if (eachWorkspace?.id !== highlight?.details?.workspaceId) {
  //             return eachWorkspace;
  //           }

  //           return {
  //             ...eachWorkspace,
  //             boards:
  //               eachWorkspace?.boards?.map((eachBoard) => {
  //                 if (eachBoard?.id !== highlight?.details?.boardId) {
  //                   return eachBoard;
  //                 }

  //                 return {
  //                   ...eachBoard,
  //                   cards:
  //                     eachBoard?.cards?.map((eachCard) => {
  //                       if (eachCard?.id !== highlight?.details?.cardId) {
  //                         return eachCard;
  //                       }

  //                       return {
  //                         ...eachCard,
  //                         highlights: [
  //                           highlight,
  //                           ...(eachCard?.highlights || []),
  //                         ],
  //                       };
  //                     }) || [],
  //                 };
  //               }) || [],
  //           };
  //         }
  //       );
  //       break;

  //     default:
  //       console.error("Invalid highlight type");
  //       return;
  //   }

  //   updateFirebaseDoc(updatedWorkspaceData)
  //     .then(() => {
  //       console.log("Database updated successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating database: ", error);
  //     });
  // };

  console.log(highlights);
  console.log(workspaceData);
  useEffect(() => {
    let allHighlights = [];

    console.log(workspaceData);
    workspaceData?.workspaces?.forEach((eachWorkspace) => {
      eachWorkspace?.highlights?.forEach((eachWorkspaceHighlight) => {
        console.log(eachWorkspaceHighlight);
        allHighlights.push(eachWorkspaceHighlight);
      });

      eachWorkspace?.boards?.forEach((eachBoard) => {
        eachBoard?.highlights?.forEach((eachBoardHighlight) => {
          allHighlights?.push(eachBoardHighlight);
        });

        eachBoard?.lists.forEach((eachList) => {
          eachList.cards?.forEach((eachCard) => {
            eachCard?.highlights?.forEach((eachCardHighlight) => {
              allHighlights.push(eachCardHighlight);
            });
          });
        });
      });
    });

    console.log(allHighlights);

    // Sort highlights by timestamp in descending order (most recent first)
    let sortedHighlights = allHighlights.sort(
      (a, b) => new Date(b.details?.timestamp) - new Date(a.details?.timestamp)
    );
    console.log(sortedHighlights);

    setHighlights(sortedHighlights);
  }, [workspaceData]);

  if (highlights.length === 0 || !highlights) {
    return (
      <p className="w-[440px] text-center font-sans text center py-6 text-sm font-semibold text-[#172b4d] justify-center items-center my-4">
        You have no highlights to show. Create workspaces, boards, invite
        members and collaborate to see the highlights.
      </p>
    );
  }

  return (
    <div className="">
      <div className="flex w-full items-center justify-center gap-2 mb-4">
        <FontAwesomeIcon icon={faHeart} color="#455570" className="text-xs" />
        <h1 className="text-xs font-semibold text-gray-400 font-sans w-full">
          Highlights
        </h1>
      </div>

      {highlights.map((highlight) => (
        <Highlight
          key={highlight?.id}
          activityType={highlight?.type}
          data={highlight?.details}
        />
      ))}
      {/* Example button to add a new highlight */}
      {/* <button
        onClick={() =>
          addHighlight("board", {
            id: "5",
            type: "inviting_workspace_member",
            details: {
              userId: "user123",
              memberName: "Bob Johnson",
              workspaceId: "workspace123",
              workspaceName: "Workspace X",
              boardId: "board123",
              boardName: "Project Z",
              cardId: "card123",
              cardName: "Task 1",
              listId: "list123",
              listName: "In Progress",
              timestamp: new Date().toISOString(),
              inviter: "Alice", // For inviting_workspace_member
              invitedMember: "Charlie", // For inviting_workspace_member
              comment: "This is a sample comment", // For commenting_card
              checklistName: "Checklist 1", // For adding_checklist and deleting_checklist
              itemName: "Item 1", // For adding_checklist_item and deleting_item
              startDate: "2024-06-10T00:00:00.000Z", // For adding_dates
              dueDate: "2024-06-15T00:00:00.000Z", // For adding_dates
              description: "This is a card description", // For adding_card_description
              watching: true, // For watching_card and watching_list
              // Add more details as needed
            },
          })
        }
      >
        Add New Card Highlight
      </button> */}
    </div>
  );
};

export default Highlights;
