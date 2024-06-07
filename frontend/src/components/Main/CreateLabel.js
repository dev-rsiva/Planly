import { useRef, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { labelColors } from "../../utills/labelColors";
import { cardDataContext } from "../../utills/cardDataContext.js";
import dataContext from "../../utills/dataContext.js";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import generateUniqueNumber from "../../utills/generateUniqueNum";

const CreateLabel = ({
  setLabelsIsShowing,
  setCreateLabelIsShowing,
  // createLabelBtn,
  createLabelIsShowing,
  labelListIsShowing,
  setLabelListIsShowing,
  editLabelInfo,
  userActionOnLabel,
  cardInfo,
}) => {
  const [title, setTitle] = useState(editLabelInfo?.title);
  const [colorSelected, setColorSelected] = useState(editLabelInfo?.color);

  const { newCardData, setNewCardData } = useContext(cardDataContext);
  const paramObj = useParams();
  const { workspaceData } = useContext(dataContext);
  const createLabelRef = useRef();
  const titleRef = useRef();
  console.log(colorSelected);
  useEffect(() => {
    titleRef?.current?.focus();
  }, []);

  return (
    <div
      className="absolute right-60 top-12 w-[340px] h-[550px] bg-white rounded z-[1801] overflow-auto"
      ref={createLabelRef}
    >
      <div className="flex justify-between items-center px-4 pb-2 pt-4">
        <div
          onClick={(e) => {
            setCreateLabelIsShowing(false);
            setLabelListIsShowing(true);
            setLabelsIsShowing(true);
            e.stopPropagation();
          }}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="cursor-pointer text-sm"
          />
        </div>
        <h1 className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
          Create label
        </h1>
        <div
          onClick={() => {
            setCreateLabelIsShowing(false);
          }}
        >
          <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
        </div>
      </div>
      <div className="p-6 bg-gray-50 my-1">
        <div
          className={`w-full h-[32px] rounded`}
          style={{ backgroundColor: colorSelected }}
        />
      </div>

      <div className="px-4 pb-2 mb-2">
        <h1 className="py-2 font-sans text-sm font-semibold text-[#172b4d]">
          Title
        </h1>
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-300 rounded w-full h-[35px] pl-2 text-sm font-sans"
        />
      </div>

      <div className="px-4 pb-4">
        <h1 className="mb-2 font-sans text-sm font-semibold text-[#172b4d]">
          Select a color
        </h1>
        <div className="flex flex-wrap justify-center pb-2">
          {labelColors.map((each) => {
            return (
              <div
                className={`mb-1 mr-1 p-[2px] ${
                  colorSelected === each.color
                    ? "rounded border-2 border-blue-600"
                    : "border-2 border-transparent"
                } `}
                onClick={() => setColorSelected(each.color)}
              >
                <div
                  style={{ backgroundColor: each.color }}
                  className={`w-[45px] h-[30px] ${
                    each.color === "#4BCE97" ? "" : "rounded"
                  }  hover:opacity-70 cursor-pointer`}
                />
              </div>
            );
          })}
        </div>
        {/* <div className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 w-full p-2 rounded mb-3">
          <FontAwesomeIcon
            icon={faX}
            size={"xs"}
            className="cursor-pointer pr-2"
          />
          <h1>Remove color</h1>
        </div> */}

        <hr className="w-full border-t-1 rounded text-gray-600" />

        {userActionOnLabel === "editLabel" && (
          <div className="flex justify-between my-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 py-2 px-2 rounded w-full text-white text-sm font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                setCreateLabelIsShowing(false);
                setLabelListIsShowing(true);

                // setNewCardData((prev) => {
                // let updatedLabels = prev.labels.map((eachLabel) => {
                //   if (eachLabel.id === editLabelInfo.id) {
                //     return {
                //       ...eachLabel,
                //       title: title,
                //       color: colorSelected,
                //     };
                //   }

                //   return eachLabel;
                // });

                // let updatedNewCardData = { ...prev, labels: updatedLabels };
                // setAllCardData((prev) => {
                //   return { ...prev, [cardInfo.id]: updatedNewCardData };
                // });

                // return updatedNewCardData;

                //-----------------xxxxxxx------------------------//

                let updatedWorkspaceData = { ...workspaceData };

                let currWorkspace = workspaceData?.workspaces?.find(
                  (eachWorkspace) => {
                    return eachWorkspace?.boards?.some((eachBoard) => {
                      return eachBoard?.lists?.some((eachList) => {
                        return eachList?.cards?.some((eachCard) => {
                          return eachCard?.id === paramObj.cardId;
                        });
                      });
                    });
                  }
                );
                console.log(currWorkspace);

                let currBoard = currWorkspace?.boards?.find((eachBoard) => {
                  return eachBoard?.lists?.some((eachList) => {
                    return eachList?.cards?.some((eachCard) => {
                      return eachCard?.id === paramObj.cardId;
                    });
                  });
                });
                console.log(currBoard);

                let currList = currBoard.lists?.find((eachList) => {
                  return eachList?.cards?.some((eachCard) => {
                    return eachCard?.id === paramObj.cardId;
                  });
                });
                console.log(currList);

                updatedWorkspaceData.workspaces =
                  updatedWorkspaceData.workspaces?.map((eachWorkspace) => {
                    if (eachWorkspace?.id !== currWorkspace?.id) {
                      console.log(eachWorkspace);
                      return eachWorkspace;
                    }
                    return {
                      ...eachWorkspace,
                      boards: eachWorkspace?.boards?.map((eachBoard) => {
                        if (eachBoard?.id !== currBoard.id) {
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
                                return {
                                  ...eachCard,
                                  labels: eachCard?.labels.map((eachLabel) => {
                                    if (eachLabel.id !== editLabelInfo.id) {
                                      return eachLabel;
                                    }
                                    return {
                                      ...eachLabel,
                                      title: title,
                                      color: colorSelected,
                                    };
                                  }),
                                };
                              }),
                            };
                          }),
                        };
                      }),
                    };
                  });

                console.log(updatedWorkspaceData);

                updateFirebaseDoc(updatedWorkspaceData);

                // });
              }}
            >
              Save
            </button>
            {/* <button className="bg-red-700 hover:bg-red-800 py-1 px-2 rounded ">
              Delete
            </button> */}
          </div>
        )}

        {userActionOnLabel === "createLabel" && (
          <div>
            <button
              className="bg-blue-600 rounded py-2 px-2 my-3 text-white text-sm font-semibold font-sans w-full"
              onClick={(e) => {
                e.stopPropagation();
                setCreateLabelIsShowing(false);
                setLabelListIsShowing(true);

                let updatedWorkspaceData = { ...workspaceData };

                let currWorkspace = workspaceData?.workspaces?.find(
                  (eachWorkspace) => {
                    return eachWorkspace?.boards?.some((eachBoard) => {
                      return eachBoard?.lists?.some((eachList) => {
                        return eachList?.cards?.some((eachCard) => {
                          return eachCard?.id === paramObj.cardId;
                        });
                      });
                    });
                  }
                );
                console.log(currWorkspace);

                let currBoard = currWorkspace?.boards?.find((eachBoard) => {
                  return eachBoard?.lists?.some((eachList) => {
                    return eachList?.cards?.some((eachCard) => {
                      return eachCard?.id === paramObj.cardId;
                    });
                  });
                });
                console.log(currBoard);

                let currList = currBoard.lists?.find((eachList) => {
                  return eachList?.cards?.some((eachCard) => {
                    return eachCard?.id === paramObj.cardId;
                  });
                });
                console.log(currList);

                updatedWorkspaceData.workspaces =
                  updatedWorkspaceData.workspaces?.map((eachWorkspace) => {
                    if (eachWorkspace?.id !== currWorkspace?.id) {
                      console.log(eachWorkspace);
                      return eachWorkspace;
                    }
                    return {
                      ...eachWorkspace,
                      boards: eachWorkspace?.boards?.map((eachBoard) => {
                        if (eachBoard?.id !== currBoard.id) {
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
                                return {
                                  ...eachCard,
                                  labels: [
                                    {
                                      id: generateUniqueNumber(
                                        title.split(" ").join(""),
                                        5
                                      ),
                                      colorName: "custom color",
                                      title: title,
                                      color: colorSelected,
                                    },
                                    ...eachCard?.labels,
                                  ],
                                };
                              }),
                            };
                          }),
                        };
                      }),
                    };
                  });

                console.log(updatedWorkspaceData);

                updateFirebaseDoc(updatedWorkspaceData);
              }}
            >
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLabel;
