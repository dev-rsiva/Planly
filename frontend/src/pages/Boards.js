import { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.js";
import BoardHeading from "../components/Main/BoardHeading.js";
import Lists from "../components/Main/Lists.js";
import dataContext from "../utills/dataContext.js";

const Boards = () => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);
  console.log(workspaceData);
  const paramObj = useParams();

  const [workspaceInfo, setWorkspaceInfo] = useState(() => {
    let workspaceDataFromCardsUrl = workspaceData?.workspaces.find(
      (workspace) =>
        workspace?.boards?.some((board) =>
          board?.lists?.some((list) =>
            list?.cards?.some((card) => card.id === paramObj.cardId)
          )
        )
    );
    let workspaceDataFromBoardsUrl = workspaceData?.workspaces.find(
      (workspace) =>
        workspace?.boards?.some((board) => board.id === paramObj.boardId)
    );

    return paramObj.boardId
      ? workspaceDataFromBoardsUrl
      : workspaceDataFromCardsUrl;
  });

  const [boardInfo, setBoardInfo] = useState(() => {
    let boardInfoFromBoardsUrl = workspaceData?.workspaces
      .find((workspace) =>
        workspace.boards?.some((board) => board.id === paramObj.boardId)
      )
      ?.boards?.find((board) => board.id === paramObj.boardId);

    let boardInfoFromCardssUrl = workspaceData?.workspaces
      .find((workspace) =>
        workspace?.boards?.some((board) =>
          board?.lists?.some((list) =>
            list?.cards?.some((card) => card.id === paramObj.cardId)
          )
        )
      )
      ?.boards.find((board) =>
        board?.lists?.some((list) =>
          list?.cards?.some((card) => card.id === paramObj.cardId)
        )
      );

    return paramObj.boardId ? boardInfoFromBoardsUrl : boardInfoFromCardssUrl;
  });

  console.log(boardInfo);
  // const boardOpenedNow = Object.keys(boardInfo).reduce((acc, curr) => {
  //   if (
  //     curr === "id" ||
  //     curr === "title" ||
  //     curr === "starred" ||
  //     curr === "backgroundImg"
  //   ) {
  //     acc[curr] = boardInfo[curr];
  //   }
  //   return acc;
  // }, {});

  useEffect(() => {
    setWorkspaceData((prev) => {
      return {
        ...prev,
        workspaces: prev?.workspaces?.map((eachWorkspace) => {
          const boardIndex = eachWorkspace.boards.findIndex(
            (eachBoard) => eachBoard.id === boardInfo.id
          );

          if (boardIndex !== -1) {
            let updatedBoards = [...eachWorkspace.boards];

            updatedBoards[boardIndex] = {
              ...updatedBoards[boardIndex],
              viewedAt: Date.now(),
            };

            eachWorkspace = {
              ...eachWorkspace,
              boards: updatedBoards,
            };

            return eachWorkspace;
          }

          return eachWorkspace;
        }),
      };
    });
    // }
  }, []);

  useEffect(() => {
    const currWorkspace = workspaceData?.workspaces?.find((workspace) =>
      workspace?.boards?.some((board) => board.id === paramObj.boardId)
    );

    setWorkspaceInfo((prev) => {
      return { ...prev, ...currWorkspace };
    });

    const currBoard = workspaceData?.workspaces
      ?.find((workspace) =>
        workspace.boards?.some((board) => board.id === paramObj.boardId)
      )
      ?.boards.find((board) => board.id === paramObj.boardId);

    setBoardInfo((prev) => {
      return { ...prev, ...currBoard };
    });
  }, [workspaceData, paramObj]);

  return (
    <div
      className={`flex relative top-[45px]`}
      // style={{ backgroundImage: `url(${boardInfo.backgroundImg})` }}
    >
      <div className="mr-2 flex h-[85vh] ">
        <Sidebar workspaceInfo={workspaceInfo} />
        <hr
          style={{
            borderRightWidth: "1px",
            borderColor: "#CCCCCC", // Mild gray color
            height: "90vh",
          }}
          // className="ml-[20px]"
        />
      </div>
      <div className="flex-1 ">
        <BoardHeading
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
          boardInfo={boardInfo}
        />
        <div className="fixed">
          <Lists
            workspaceData={workspaceData}
            setWorkspaceData={setWorkspaceData}
            boardInfo={boardInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Boards;
