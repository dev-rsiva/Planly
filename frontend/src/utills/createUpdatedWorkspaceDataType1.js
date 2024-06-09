export const createUpdatedWorkspaceDataType1 = (
  generateUpdatedObj,
  workspaceData,
  paramObj
) => {
  let updatedWorkspaceData = { ...workspaceData };

  let currWorkspace = workspaceData?.workspaces?.find((eachWorkspace) => {
    return eachWorkspace?.boards?.some((eachBoard) => {
      return eachBoard?.lists?.some((eachList) => {
        return eachList?.cards?.some((eachCard) => {
          return eachCard?.id === paramObj.cardId;
        });
      });
    });
  });
  console.log(currWorkspace);

  let currBoard = currWorkspace?.boards?.find((eachBoard) => {
    return eachBoard?.lists?.some((eachList) => {
      return eachList?.cards?.some((eachCard) => {
        return eachCard?.id === paramObj.cardId;
      });
    });
  });
  console.log(currBoard);

  let currList = currBoard?.lists?.find((eachList) => {
    return eachList?.cards?.some((eachCard) => {
      return eachCard?.id === paramObj.cardId;
    });
  });
  console.log(currList);

  updatedWorkspaceData.workspaces = updatedWorkspaceData?.workspaces?.map(
    (eachWorkspace) => {
      if (eachWorkspace?.id !== currWorkspace?.id) {
        console.log(eachWorkspace);
        return eachWorkspace;
      }
      return {
        ...eachWorkspace,
        boards: eachWorkspace?.boards?.map((eachBoard) => {
          if (eachBoard?.id !== currBoard?.id) {
            return eachBoard;
          }
          return {
            ...eachBoard,
            lists: eachBoard?.lists?.map((eachList) => {
              if (eachList?.id !== currList?.id) {
                return eachList;
              }
              return {
                ...eachList,
                cards: eachList?.cards?.map((eachCard) => {
                  if (eachCard?.id !== paramObj.cardId) {
                    console.log(eachCard?.id !== paramObj.cardId);
                    return eachCard;
                  }
                  console.log(eachCard);
                  console.log(generateUpdatedObj(eachCard));
                  return generateUpdatedObj(eachCard);
                }),
              };
            }),
          };
        }),
      };
    }
  );

  console.log(updatedWorkspaceData);

  return updatedWorkspaceData;
};
