import { updateFirebaseDoc } from "./updateFirebase";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
} from "firebase/firestore";
import { db } from "../utills/firebase";

export const updateHighlightsDatabase = async (
  type,
  highlight,
  workspaceData,
  user
) => {
  let workspaceDatAtPresent = [];

  const fetchData = async () => {
    try {
      const workspacesDocRef = doc(db, "workspaces", "workspaceData");
      const workspacesDoc = await getDoc(workspacesDocRef);
      const existingWorkspaces = workspacesDoc.data()?.workspaces || [];

      workspaceDatAtPresent = [
        ...existingWorkspaces.filter((workspace) => {
          return (
            (workspace?.settings.visibility === "private" ||
              workspace?.settings.visibility === "public") &&
            workspace?.members?.some((member) => member?.userId === user?.uid)
          );
        }),
      ];

      console.log(workspaceDatAtPresent);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
      return;
    }
  };

  await fetchData();

  if (
    (!workspaceData || !workspaceData?.workspaces) &&
    !workspaceDatAtPresent.length
  ) {
    console.error("Invalid workspace data");
    return;
  }

  const updatedWorkspaceData = workspaceData?.workspaces
    ? { ...workspaceData }
    : {
        workspaces: workspaceDatAtPresent,
      };

  console.log(highlight);
  console.log(updatedWorkspaceData);

  switch (type) {
    case "workspace":
      updatedWorkspaceData.workspaces = updatedWorkspaceData?.workspaces?.map(
        (eachWorkspace) => {
          if (eachWorkspace?.id !== highlight?.details?.workspaceId) {
            return eachWorkspace;
          }

          return {
            ...eachWorkspace,
            highlights: [highlight, ...(eachWorkspace?.highlights || [])],
          };
        }
      );
      break;

    case "board":
      if (
        updatedWorkspaceData.workspaces.some((eachWorkspace) => {
          eachWorkspace?.boards.some((eachBoard) =>
            eachBoard?.highlights.some(
              (eachHighlight) => eachHighlight.id === highlight?.id
            )
          );
        })
      ) {
        console.log("highlight already present");
        return;
      }
      updatedWorkspaceData.workspaces = updatedWorkspaceData?.workspaces?.map(
        (eachWorkspace) => {
          if (eachWorkspace?.id !== highlight?.details?.workspaceId) {
            return eachWorkspace;
          }

          return {
            ...eachWorkspace,
            boards:
              eachWorkspace?.boards?.map((eachBoard) => {
                if (eachBoard?.id !== highlight?.details?.boardId) {
                  return eachBoard;
                }

                return {
                  ...eachBoard,
                  highlights: [highlight, ...(eachBoard?.highlights || [])],
                };
              }) || [],
          };
        }
      );
      break;

    case "card":
      updatedWorkspaceData.workspaces = updatedWorkspaceData?.workspaces?.map(
        (eachWorkspace) => {
          if (eachWorkspace?.id !== highlight?.details?.workspaceId) {
            return eachWorkspace;
          }
          console.log(eachWorkspace);
          return {
            ...eachWorkspace,
            boards:
              eachWorkspace?.boards?.map((eachBoard) => {
                if (eachBoard?.id !== highlight?.details?.boardId) {
                  return eachBoard;
                }
                console.log(eachBoard);

                return {
                  ...eachBoard,
                  lists: eachBoard?.lists.map((eachList) => {
                    if (eachList?.id !== highlight?.details?.listId) {
                      return eachList;
                    }
                    return {
                      ...eachList,
                      cards:
                        eachList?.cards?.map((eachCard) => {
                          if (eachCard?.id !== highlight?.details?.cardId) {
                            return eachCard;
                          }
                          console.log(eachCard);

                          return {
                            ...eachCard,
                            highlights: [
                              highlight,
                              ...(eachCard?.highlights || []),
                            ],
                          };
                        }) || [],
                    };
                  }),
                };
              }) || [],
          };
        }
      );
      break;

    default:
      console.error("Invalid highlight type");
      return;
  }

  console.log(updatedWorkspaceData);

  updateFirebaseDoc(updatedWorkspaceData)
    .then(() => {
      console.log("Database updated successfully");
    })
    .catch((error) => {
      console.error("Error updating database: ", error);
    });
};
