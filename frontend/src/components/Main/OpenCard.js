import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBoxArchive,
  faCopy,
  faDesktop,
  faFileInvoice,
  faPlus,
  faShareNodes,
  faClock,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext.js";
import { cardDataContext } from "../../utills/cardDataContext";
import generateUniqueNumber from "../../utills/generateUniqueNum";
import { randomGradientColor } from "../../utills/randomGradientColor";
import Labels from "./Labels.js";
import LabelList from "./LabelList";
import CreateLabel from "./CreateLabel";
import Boards from "../../pages/Boards.js";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import DatesCard from "./DatesCard";
import AddChecklist from "./AddChecklist";
import ChecklistContainer from "./ChecklistContainer";

import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { createUpdatedWorkspaceDataType1 } from "../../utills/createUpdatedWorkspaceDataType1";

const OpenCard = () => {
  const { workspaceData, setWorkspaceData, user } = useContext(dataContext);
  const navigate = useNavigate();
  const paramObj = useParams();
  const descriptionRef = useRef(null);

  const writeCommentRef = useRef();
  const editCommentRef = useRef();
  const labelsBtnRef = useRef();
  const chooseLabelRef = useRef();
  const createLabelBtn = useRef();
  const datesBtnRef = useRef();

  // const { allCardData, setAllCardData } = useContext(dataContext);
  // console.log(allCardData);
  console.log(workspaceData);

  const [cardDetails, setCardDetails] = useState(null);

  const [newCardData, setNewCardData] = useState(null);
  console.log(newCardData);
  const [listDetails, setListDetails] = useState(null);

  const [cardDesc, setCardDesc] = useState(null);
  const [comment, setComment] = useState("");

  const [cardDescDetails, setCardDescDetails] = useState({
    showInput: false,
    showDesc: true,
    showEdit: false,
  });

  const [commentDetails, setCommentDetails] = useState({
    showInput: false,
    showComment: true,
    showEdit: false,
    showSaveBtn: true,
  });

  const [editCommentFor, setEditCommentFor] = useState({
    id: "",
    comment: "",
  });

  const [labelsIsShowing, setLabelsIsShowing] = useState(false);
  const [newLabelListPosition, setNewLabelListPosition] = useState(false);
  console.log(newLabelListPosition);
  console.log(labelsIsShowing);
  const [showDatesCard, setShowDatesCard] = useState(false);
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  const [watchBtnIsHovered, setWatchBtnIsHovered] = useState(false);
  const [showActivity, setShowActivity] = useState(true);

  const isWatching = newCardData?.watchers?.some(
    (eachWatcher) => eachWatcher?.userId === user?.uid
  );

  let color = randomGradientColor();
  console.log(color);
  // const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const labelsForThisCard = newCardData?.labels?.filter(
    (eachLabel) =>
      eachLabel.isChecked !== undefined && eachLabel.isChecked === true
  );

  const descriptionDisplay = useMemo(() => {
    if (cardDescDetails?.showDesc && !cardDescDetails?.showInput) {
      return (
        <div
          className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-[470px] font-semibold text-[14px] hover:bg-gray-400 cursor-pointer"
          onClick={() => {
            setCardDescDetails((prev) => {
              return (prev = { ...prev, showInput: true });
            });
          }}
        >
          {newCardData?.description?.split(" ").join("") === "" ? (
            <p>Add a more detailed description...</p>
          ) : (
            newCardData?.description
          )}
        </div>
      );
    }
    return null;
  }, [
    cardDescDetails?.showDesc,
    cardDescDetails?.showInput,
    newCardData?.description,
  ]);

  const commentList = useMemo(
    () =>
      newCardData?.Activities?.map((eachActivity) => {
        return (
          <div className="flex mb-4">
            <div
              className={`flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[30px] h-[30px] mr-4`}
              // style={{
              //   backgroundColor: user?.color ? user.color : color,
              // }}
            >
              {/* {eachActivity.user.name[0] +
                eachActivity.user.name[eachActivity.user.name.length - 1]} */}

              <img src={eachActivity?.user?.photoURL} className="w-full" />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center mb-1">
                <p className="text-sm font-semibold mr-3 text-gray-800">
                  {eachActivity?.user.name}
                </p>
                <p className="text-xs mr-3 text-gray-600">
                  {formatTimeDifference(eachActivity.commentTime)}
                </p>
              </div>

              {editCommentFor.id !== eachActivity?.id && (
                <div>
                  <div className="px-2 py-2 bg-white rounded-lg font-base text-[14px] w-full cursor-pointer">
                    <p>{eachActivity?.comment}</p>
                  </div>

                  <div>
                    <button
                      className="text-xs text-[#172b4d] mr-2 underline"
                      onClick={() => {
                        setEditCommentFor((prev) => {
                          return {
                            ...prev,
                            showInput: true,
                            id: eachActivity.id,
                            comment: eachActivity.comment,
                          };
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button className="text-xs text-[#172b4d] mr-2 underline">
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {editCommentFor.id === eachActivity?.id && (
                <div>
                  <input
                    ref={editCommentRef}
                    type="text"
                    value={editCommentFor.comment}
                    className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-[470px] font-semibold text-[14px] mb-4 border-2 border-solid border-blue-600"
                    onChange={(e) =>
                      setEditCommentFor((prev) => {
                        return { ...prev, comment: e.target.value };
                      })
                    }
                  />

                  <div className="flex">
                    <button
                      className={` rounded py-1 px-2 text-white border-blue-400 mr-4 ${
                        editCommentFor.comment.trim() === ""
                          ? "bg-gray-400 hover:bg-gray-400 text-gray-600"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                      disabled={editCommentFor.comment.trim() === ""}
                      onClick={(e) => {
                        updateComment(e);
                      }}
                    >
                      Save
                    </button>

                    <button
                      className="bg-gray-400 rounded py-1 px-2 text-gray-600 border-blue-400 hover:bg-gray-600 hover:text-white mr-4"
                      onClick={() => {
                        setEditCommentFor((prev) => {
                          return { ...prev, id: "" };
                        });
                      }}
                    >
                      Discard Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }),
    [newCardData?.Activities, editCommentFor]
  );

  function toggleWatching(e) {
    e.stopPropagation();

    // let newItem = {
    //   id: generateUniqueNumber(
    //     itemTitle.trim().split(" ").join("").slice(0, 4),
    //     5
    //   ),
    //   title: itemTitle,
    //   status: "not completed",
    // };

    const generatedObj = (card) => {
      if (
        card?.watchers?.some((eachWatcher) => eachWatcher?.userId === user?.uid)
      ) {
        console.log("generating");
        return {
          ...card,
          watchers: card?.watchers?.filter(
            (eachWatcher) => eachWatcher?.userId !== user?.uid
          ),
        };
      }
      console.log("generating1");
      console.log(user);
      console.log(card);

      return {
        ...card,
        watchers: card.watchers
          ? [
              ...card?.watchers,
              {
                userId: user?.uid,
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
              },
            ]
          : [
              {
                userId: user?.uid,
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
              },
            ],
      };
    };

    console.log(generatedObj);
    const updatedWorkspaceData = createUpdatedWorkspaceDataType1(
      generatedObj,
      workspaceData,
      paramObj
    );
    console.log(updatedWorkspaceData);

    updateFirebaseDoc(updatedWorkspaceData);
  }

  function updateCardDescription() {
    // setAllCardData((prev) => {
    // setNewCardData((prev) => {

    // });
    let updatedWorkspaceData = { ...workspaceData };

    // let currWorkspace = workspaceData.workspaces?.find((eachWorkspace) => {
    //   return eachWorkspace.boards.some((eachBoard) => {
    //     return eachBoard.lists.some((eachList) => {
    //       return eachList.cards.some((eachCard) => {
    //         return eachCard.id === paramObj.cardId;
    //       });
    //     });
    //   });
    // });

    // // });

    // console.log(currWorkspace);

    // let updatedBoards = currWorkspace.boards.map((eachBoard) => {
    //   return {
    //     ...eachBoard,
    //     lists: eachBoard.lists.map((eachList) => {
    //       return {
    //         ...eachList,
    //         cards: eachList.cards.map((eachCard) => {
    //           if (eachCard.id !== paramObj.cardId) {
    //             return eachCard;
    //           }
    //           let updatedCard = {
    //             ...newCardData,
    //             description: cardDesc,
    //           };

    //           return updatedCard;
    //         }),
    //       };
    //     }),
    //   };
    // });

    // console.log(updatedBoards);

    // currWorkspace = { ...currWorkspace, boards: updatedBoards };
    // console.log(currWorkspace);

    // let currWorkspaceIndex = workspaceData.workspaces?.findIndex(
    //   (eachWorkspace) => {
    //     return eachWorkspace.id === currWorkspace.id;
    //   }
    // );

    // console.log(currWorkspaceIndex);

    // updatedWorkspaceData.workspaces[currWorkspaceIndex] = currWorkspace;

    // console.log(updatedWorkspaceData);

    let currWorkspace = workspaceData.workspaces?.find((eachWorkspace) => {
      return eachWorkspace.boards.some((eachBoard) => {
        return eachBoard.lists.some((eachList) => {
          return eachList.cards.some((eachCard) => {
            return eachCard.id === paramObj.cardId;
          });
        });
      });
    });
    console.log(currWorkspace);

    let currBoard = currWorkspace.boards.find((eachBoard) => {
      return eachBoard.lists.some((eachList) => {
        return eachList.cards.some((eachCard) => {
          return eachCard.id === paramObj.cardId;
        });
      });
    });
    console.log(currBoard);

    let currList = currBoard.lists.find((eachList) => {
      return eachList.cards.some((eachCard) => {
        return eachCard.id === paramObj.cardId;
      });
    });
    console.log(currList);

    updatedWorkspaceData.workspaces = updatedWorkspaceData.workspaces?.map(
      (eachWorkspace) => {
        if (eachWorkspace.id !== currWorkspace.id) {
          console.log(eachWorkspace);
          return eachWorkspace;
        }
        return {
          ...eachWorkspace,
          boards: eachWorkspace.boards.map((eachBoard) => {
            if (eachBoard.id !== currBoard.id) {
              return eachBoard;
            }
            return {
              ...eachBoard,
              lists: eachBoard.lists.map((eachList) => {
                if (eachList.id !== currList.id) {
                  return eachList;
                }
                return {
                  ...eachList,
                  cards: eachList.cards.map((eachCard) => {
                    if (eachCard.id !== paramObj.cardId) {
                      console.log(eachCard.id !== paramObj.cardId);
                      return eachCard;
                    }
                    return {
                      ...newCardData,
                      description: cardDesc,
                    };
                  }),
                };
              }),
            };
          }),
        };
      }
    );

    console.log(updatedWorkspaceData);

    updateFirebaseDoc(updatedWorkspaceData);

    setCardDescDetails((prev) => {
      return {
        ...prev,
        showInput: false,
        showDesc: true,
        showEdit: cardDesc.split(" ").join("") === "" ? false : true,
      };
    });
  }

  function addComment() {
    // setAllCardData((prev) => {

    let updatedWorkspaceData = { ...workspaceData };

    let newActivity = {
      id: generateUniqueNumber(comment.slice(0, 3), 5),
      user: {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user?.photoURL,
      },
      comment: comment.trim(),
      commentTime: new Date(),
    };
    console.log(newActivity);

    let currWorkspace = workspaceData.workspaces?.find((eachWorkspace) => {
      return eachWorkspace.boards.some((eachBoard) => {
        return eachBoard.lists.some((eachList) => {
          return eachList.cards.some((eachCard) => {
            return eachCard.id === paramObj.cardId;
          });
        });
      });
    });
    console.log(currWorkspace);

    let currBoard = currWorkspace.boards.find((eachBoard) => {
      return eachBoard.lists.some((eachList) => {
        return eachList.cards.some((eachCard) => {
          return eachCard.id === paramObj.cardId;
        });
      });
    });
    console.log(currBoard);

    let currList = currBoard.lists.find((eachList) => {
      return eachList.cards.some((eachCard) => {
        return eachCard.id === paramObj.cardId;
      });
    });
    console.log(currList);

    updatedWorkspaceData.workspaces = updatedWorkspaceData.workspaces?.map(
      (eachWorkspace) => {
        if (eachWorkspace.id !== currWorkspace.id) {
          console.log(eachWorkspace);
          return eachWorkspace;
        }
        return {
          ...eachWorkspace,
          boards: eachWorkspace.boards.map((eachBoard) => {
            if (eachBoard.id !== currBoard.id) {
              return eachBoard;
            }
            return {
              ...eachBoard,
              lists: eachBoard.lists.map((eachList) => {
                if (eachList.id !== currList.id) {
                  return eachList;
                }
                return {
                  ...eachList,
                  cards: eachList.cards.map((eachCard) => {
                    if (eachCard.id !== paramObj.cardId) {
                      console.log(eachCard.id !== paramObj.cardId);
                      return eachCard;
                    }
                    console.log({ ...eachCard, Activities: newActivity });
                    return {
                      ...eachCard,
                      Activities: [newActivity, ...eachCard.Activities],
                    };
                  }),
                };
              }),
            };
          }),
        };
      }
    );

    console.log(updatedWorkspaceData);

    updateFirebaseDoc(updatedWorkspaceData);

    // setNewCardData((prev) => {
    //   let updatedNewCardData = { ...prev };
    //   updatedNewCardData.Activities = [...updatedNewCardData?.Activities];
    //   updatedNewCardData?.Activities.unshift(newActivity);

    //   return updatedNewCardData;
    // });

    // const updatedCard = {
    //   ...prev,
    //   [cardDetails.id]: {
    //     ...prev[cardDetails.id],
    //     Activities: [newActivity, ...prev[cardDetails.id]?.Activities],
    //   },
    // };
    // });

    setCommentDetails((prev) => {
      return { ...prev, showInput: false };
    });

    setComment("");
  }

  function updateComment(e) {
    // let updatedActivitiesList = newCardData?.Activities.map((eachActivity) => {
    //   if (eachActivity?.id === editCommentFor.id) {
    //     return {
    //       ...eachActivity,
    //       comment: editCommentFor.comment.trim(),
    //       commentTime: new Date(),
    //     };
    //   }

    //   return eachActivity;
    // });

    // setAllCardData((prev) => {
    //   return {
    //     ...prev,
    //     [cardDetails.id]: {
    //       ...prev[cardDetails.id],
    //       Activities: updatedActivitiesList,
    //     },
    //   };
    // });

    //----------------------------------------------xxxx----------------------------------------//

    let updatedWorkspaceData = { ...workspaceData };

    // let newActivity = {
    //   id: generateUniqueNumber(comment.slice(0, 3), 5),
    //   user: {
    //     userId: user.uid,
    //     name: user.displayName,
    //     email: user.email,
    //   },
    //   comment: comment.trim(),
    //   commentTime: new Date(),
    // };
    // console.log(newActivity);

    let currWorkspace = workspaceData.workspaces?.find((eachWorkspace) => {
      return eachWorkspace.boards.some((eachBoard) => {
        return eachBoard.lists.some((eachList) => {
          return eachList.cards.some((eachCard) => {
            return eachCard.id === paramObj.cardId;
          });
        });
      });
    });
    console.log(currWorkspace);

    let currBoard = currWorkspace.boards.find((eachBoard) => {
      return eachBoard.lists.some((eachList) => {
        return eachList.cards.some((eachCard) => {
          return eachCard.id === paramObj.cardId;
        });
      });
    });
    console.log(currBoard);

    let currList = currBoard.lists.find((eachList) => {
      return eachList.cards.some((eachCard) => {
        return eachCard.id === paramObj.cardId;
      });
    });
    console.log(currList);

    updatedWorkspaceData.workspaces = updatedWorkspaceData.workspaces?.map(
      (eachWorkspace) => {
        if (eachWorkspace.id !== currWorkspace.id) {
          console.log(eachWorkspace);
          return eachWorkspace;
        }
        return {
          ...eachWorkspace,
          boards: eachWorkspace.boards.map((eachBoard) => {
            if (eachBoard.id !== currBoard.id) {
              return eachBoard;
            }
            return {
              ...eachBoard,
              lists: eachBoard.lists.map((eachList) => {
                if (eachList.id !== currList.id) {
                  return eachList;
                }
                return {
                  ...eachList,
                  cards: eachList.cards.map((eachCard) => {
                    if (eachCard.id !== paramObj.cardId) {
                      console.log(eachCard.id !== paramObj.cardId);
                      return eachCard;
                    }
                    // console.log({ ...eachCard, Activities: newActivity });
                    return {
                      ...eachCard,
                      Activities: eachCard.Activities.map((eachActivity) => {
                        if (eachActivity?.id !== editCommentFor.id) {
                          return eachActivity;
                        }
                        return {
                          ...eachActivity,
                          comment: editCommentFor.comment.trim(),
                          commentTime: new Date(),
                        };
                      }),
                    };
                  }),
                };
              }),
            };
          }),
        };
      }
    );

    console.log(updatedWorkspaceData);

    updateFirebaseDoc(updatedWorkspaceData);

    // setNewCardData((prev) => {
    //   return {
    //     ...prev,
    //     Activities: updatedActivitiesList,
    //   };
    // });

    setEditCommentFor((prev) => {
      return { ...prev, id: "" };
    });
  }

  // function formatTimeDifference(time) {
  //   console.log("formatTimeDifference");
  //   console.log(time);
  //   const now = new Date();
  //   console.log(now);
  //   const commentDate = new Date(time);
  //   console.log(commentDate);
  //   const timeDifference = now - commentDate;
  //   console.log(timeDifference);
  //   const seconds = Math.floor(timeDifference / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);

  //   if (days > 0) {
  //     return `${days} ${days === 1 ? "day" : "days"} ago`;
  //   } else if (hours > 0) {
  //     return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  //   } else if (minutes > 0) {
  //     return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  //   } else {
  //     return "Just now";
  //   }
  // }

  function formatTimeDifference(commentTimestamp) {
    console.log("formatTimeDifference called with:", commentTimestamp);

    // Extract seconds and nanoseconds
    const { seconds, nanoseconds } = commentTimestamp;

    // Convert to milliseconds
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const commentDate = new Date(milliseconds);

    console.log("Comment time:", commentDate);

    const now = new Date();
    console.log("Current time:", now);

    const timeDifference = now - commentDate;
    console.log("Time difference in milliseconds:", timeDifference);

    // Check if the time difference is negative
    if (timeDifference < 0) {
      console.error("Future comment time detected:", commentDate);
      return "Invalid time";
    }

    const secondsDiff = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(secondsDiff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "Just now";
    }
  }

  useEffect(() => {
    if (writeCommentRef.current) {
      writeCommentRef?.current?.focus();
    }
  }, [commentDetails.showInput]);

  useEffect(() => {
    if (editCommentRef.current) {
      editCommentRef?.current?.focus();
    }
  }, [editCommentFor.comment]);

  useEffect(() => {
    if (cardDescDetails?.showInput) {
      descriptionRef.current.focus();
    }
  }, [cardDescDetails?.showInput]);

  useEffect(() => {
    const workspaceInfo = workspaceData?.workspaces?.find((workspace) =>
      workspace?.boards?.some((board) =>
        board?.lists?.some((list) =>
          list?.cards?.some((card) => {
            return card.id === paramObj.cardId;
          })
        )
      )
    );

    const boardInfo = workspaceInfo?.boards?.find((board) =>
      board?.lists?.some((list) =>
        list?.cards?.some((card) => card.id === paramObj.cardId)
      )
    );

    const listInfo = boardInfo?.lists?.find((list) =>
      list?.cards?.some((card) => card.id === paramObj.cardId)
    );

    const cardInfo = listInfo?.cards?.find(
      (card) => card.id == paramObj.cardId
    );

    setCardDetails(cardInfo);
    setListDetails(listInfo);

    // if (allCardData) {
    // setNewCardData(allCardData[cardInfo?.id]);
    // setCardDesc(allCardData[cardInfo.id]?.description?.trim());
    setNewCardData(cardInfo);
    setCardDesc(cardInfo?.description?.trim());

    // }
  }, [workspaceData]);

  return (
    <>
      <Boards />
      <cardDataContext.Provider value={{ newCardData, setNewCardData }}>
        <div
          className="fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-60 z-[999]"
          onClick={() => {
            navigate(-1);
          }}
        ></div>
        <div className="absolute flex flex-col w-[770px] h-[550px] overflow-auto top-1/2 left-1/2 translate-x-[-50%] translate-y-[-46%] bg-[#F0F1F4] z-[1005] rounded-lg p-6">
          <div className="flex justify-between mb-4 p-2">
            <div className="flex items-start ">
              <FontAwesomeIcon
                icon={faDesktop}
                size="lg"
                className="mr-4 mt-2 font-sans text-sm font-semibold text-[#172b4d]"
              />
              <div className="flex flex-col justify-between">
                <div className="">
                  <h1 className="font-sans text-lg font-bold text-[#172b4d]">
                    {cardDetails?.title}
                  </h1>
                  <p className="font-sans text-sm font-base text-[#172b4d]">
                    in list{" "}
                    <span className="underline cursor-pointer">
                      {listDetails?.title}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                navigate(-1);
              }}
            >
              <FontAwesomeIcon icon={faX} className="cursor-pointer" />
            </div>
          </div>

          <div className="flex justify-between ">
            <div className="flex flex-col mr-2 w-full">
              <div className="flex items-center mb-4 p-2 ml-[42px] ">
                {labelsForThisCard && labelsForThisCard.length > 0 && (
                  <div className="mr-4 ">
                    <div className="mb-2 font-semibold text-xs">Labels</div>

                    <div className="flex">
                      <div className="flex">
                        {labelsForThisCard?.map((label) => {
                          return (
                            <div
                              style={{ backgroundColor: label.color }}
                              className="w-[45px] h-[30px] rounded mr-2 flex"
                            >
                              {/* <p>{label.title}</p> */}
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className="w-[30px] h-[30px] bg-gray-400 rounded flex justify-center items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewLabelListPosition(true);
                          setLabelsIsShowing(true);
                        }}
                        ref={chooseLabelRef}
                      >
                        <FontAwesomeIcon icon={faPlus} size={"sm"} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col">
                  <div className="mb-2 font-sans text-xs font-semibold text-[#172b4d]">
                    Notifications
                  </div>
                  <div
                    className="relative flex items-center bg-gray-300 rounded py-1 px-2 cursor-pointer"
                    onClick={(e) => toggleWatching(e)}
                    onMouseEnter={() => {
                      setWatchBtnIsHovered(true);
                    }}
                    onMouseLeave={() => setWatchBtnIsHovered(false)}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className="mr-2 text-xs text-[#172b4d]"
                    />
                    <p className="font-sans text-sm font-semibold text-[#172b4d]">
                      {isWatching ? "Watching" : "Watch"}
                    </p>
                    {isWatching && (
                      <div>
                        <FontAwesomeIcon
                          icon={faSquareCheck}
                          className="ml-2 text-2xl text-[#172b4d]"
                          style={{ color: "#172b4d" }}
                        />
                      </div>
                    )}
                    {isWatching && watchBtnIsHovered && (
                      <p className="absolute top-[120%] left-0 z-50 font-sans text-xs font-semibold text-white bg-[#294474] rounded py-1 px-2 min-w-[180px]">
                        You are receiving notifications for updates on this
                        card(Click to stop watching)
                      </p>
                    )}
                    {!isWatching && watchBtnIsHovered && (
                      <p className="absolute top-[120%] left-0 z-50 font-sans text-xs font-semibold text-white bg-[#294474] rounded py-1 px-2 min-w-[180px]">
                        Watch to get notifications for updates on this card
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {(newCardData?.dates?.start || newCardData?.dates?.due) && (
                <div className="flex items-center mb-6 p-2 ml-[42px]">
                  <div className="mr-4 ">
                    <div className="mb-2 font-semibold text-xs">
                      {newCardData?.dates?.start && newCardData?.dates?.due
                        ? "Dates"
                        : newCardData.dates.start
                        ? "Start date"
                        : "Due date"}
                    </div>

                    <div className="flex items-center">
                      {newCardData?.dates?.start && newCardData?.dates?.due && (
                        <input
                          type="checkbox"
                          className="w-[16px] h-[16px] mr-3"
                          checked={newCardData.dates.status !== "Overdue"}
                          onChange={() => {
                            let updatedWorkspaceData = { ...workspaceData };

                            let currWorkspace = workspaceData.workspaces?.find(
                              (eachWorkspace) => {
                                return eachWorkspace.boards.some(
                                  (eachBoard) => {
                                    return eachBoard.lists.some((eachList) => {
                                      return eachList.cards.some((eachCard) => {
                                        return eachCard.id === paramObj.cardId;
                                      });
                                    });
                                  }
                                );
                              }
                            );
                            console.log(currWorkspace);

                            let currBoard = currWorkspace.boards.find(
                              (eachBoard) => {
                                return eachBoard.lists.some((eachList) => {
                                  return eachList.cards.some((eachCard) => {
                                    return eachCard.id === paramObj.cardId;
                                  });
                                });
                              }
                            );
                            console.log(currBoard);

                            let currList = currBoard.lists.find((eachList) => {
                              return eachList.cards.some((eachCard) => {
                                return eachCard.id === paramObj.cardId;
                              });
                            });
                            console.log(currList);

                            updatedWorkspaceData.workspaces =
                              updatedWorkspaceData.workspaces?.map(
                                (eachWorkspace) => {
                                  if (eachWorkspace.id !== currWorkspace.id) {
                                    console.log(eachWorkspace);
                                    return eachWorkspace;
                                  }
                                  return {
                                    ...eachWorkspace,
                                    boards: eachWorkspace.boards.map(
                                      (eachBoard) => {
                                        if (eachBoard.id !== currBoard.id) {
                                          return eachBoard;
                                        }
                                        return {
                                          ...eachBoard,
                                          lists: eachBoard.lists.map(
                                            (eachList) => {
                                              if (eachList.id !== currList.id) {
                                                return eachList;
                                              }
                                              return {
                                                ...eachList,
                                                cards: eachList.cards.map(
                                                  (eachCard) => {
                                                    if (
                                                      eachCard.id !==
                                                      paramObj.cardId
                                                    ) {
                                                      console.log(
                                                        eachCard.id !==
                                                          paramObj.cardId
                                                      );
                                                      return eachCard;
                                                    }
                                                    // console.log({ ...eachCard, Activities: newActivity });
                                                    return {
                                                      ...eachCard,
                                                      dates: {
                                                        ...eachCard.dates,
                                                        status:
                                                          eachCard.dates
                                                            .status ===
                                                          "Overdue"
                                                            ? "Completed"
                                                            : "Overdue",
                                                      },
                                                    };
                                                  }
                                                ),
                                              };
                                            }
                                          ),
                                        };
                                      }
                                    ),
                                  };
                                }
                              );

                            console.log(updatedWorkspaceData);

                            updateFirebaseDoc(updatedWorkspaceData);
                          }}
                        />
                      )}
                      <div className="flex font-semibold font-sans text-[#172b4d] py-1 px-2 rounded bg-gray-200">
                        {newCardData?.dates?.start &&
                        newCardData?.dates?.due ? (
                          <div>
                            <span>
                              {newCardData?.dates?.start +
                                " - " +
                                newCardData?.dates?.due +
                                " at " +
                                newCardData?.dueDateTime +
                                " "}
                            </span>
                            <span
                              className={`${
                                newCardData?.dates?.status === "Overdue"
                                  ? "bg-red-700 p-1 text-white"
                                  : "bg-green-700 p-1 text-white"
                              }  text-xs rounded ml-1 font-semibold`}
                            >
                              {newCardData?.dates?.status}
                            </span>
                          </div>
                        ) : newCardData?.dates?.start ? (
                          newCardData?.dates?.start
                        ) : (
                          newCardData?.dates?.due
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <div>
                {(newCardData?.dates?.start || newCardData?.dates?.due) && (
                  <div className="flex flex-col justify-center items-start">
                    <div className="font-sans text-sm font-semibold text-[#172b4d]">
                      {newCardData?.dates?.start && newCardData?.dates?.due
                        ? "Dates"
                        : newCardData.dates.start
                        ? "Start date"
                        : "due date"}
                    </div>
                    <div className="font-sans text-[#172b4d] py-1 px-2 rounded bg-gray-200">
                      {newCardData?.dates?.start && newCardData?.dates?.due
                        ? newCardData?.dates?.start +
                          "-" +
                          newCardData?.dates?.due
                        : newCardData?.dates?.start
                        ? newCardData?.dates?.start
                        : newCardData?.dates?.due}
                    </div>
                  </div>
                )}
              </div> */}

              <div className="mb-4 p-2 w-full">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex">
                    <FontAwesomeIcon
                      icon={faAlignLeft}
                      size="lg"
                      className="mr-4 p-1"
                    />
                    <p className="font-sans text-base font-semibold text-[#172b4d]">
                      Description
                    </p>
                  </div>
                  {cardDescDetails?.showEdit && (
                    <div
                      className="bg-gray-300 font-semibold hover:bg-gray-400 py-1 px-2 rounded"
                      onClick={() => {
                        setCardDescDetails((prev) => {
                          return (prev = {
                            ...prev,
                            showInput: true,
                            showEdit: false,
                            showDesc: false,
                          });
                        });
                      }}
                    >
                      <button>Edit</button>
                    </div>
                  )}
                </div>
                <div className="pl-[42px]">
                  {descriptionDisplay}
                  {cardDescDetails?.showInput && (
                    <div>
                      <input
                        ref={descriptionRef}
                        type="text"
                        value={cardDesc}
                        className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-[470px] font-sans text-sm font-semibold text-[#172b4d] mb-4 border-2 border-solid border-blue-600"
                        placeholder="Add a more detailed description..."
                        onChange={(e) => setCardDesc(e.target.value)}
                      />
                      <div className="flex">
                        <button
                          className="bg-blue-600 rounded py-1 px-2 text-white border-blue-400 hover:bg-blue-700 mr-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCardDescription();
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-200 rounded py-1 px-2 text-gray-900 border-blue-400 hover:bg-gray-400 mr-4"
                          onClick={() => {
                            setCardDesc(newCardData.description);
                            setCardDescDetails((prev) => {
                              return {
                                ...prev,
                                showDesc: true,
                                showInput: false,
                              };
                            });
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {<ChecklistContainer newCardData={newCardData} />}

              <div className="mb-8 p-2">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center ">
                    <FontAwesomeIcon
                      icon={faListCheck}
                      size="lg"
                      className="mr-4 p-1"
                    />

                    <p className="font-sans text-base font-semibold text-[#172b4d]">
                      Activity
                    </p>
                  </div>
                  <div className="bg-gray-300 font-semibold hover:bg-gray-400 py-1 px-2 rounded">
                    <button
                      className="px-2 rounded font-sans text-sm font-semibold text-[#172b4d]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowActivity(!showActivity);
                      }}
                    >
                      {showActivity ? "Hide details" : "Show details"}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex">
                    <div
                      className={`flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[30px] h-[30px] mr-4`}
                      // style={{
                      //   backgroundColor: user?.color ? user.color : color,
                      // }}
                    >
                      {/* {user.displayName[0] +
                        user.displayName[user.displayName.length - 1]} */}
                      <img src={user?.photoURL} className="w-full" />
                    </div>

                    {!commentDetails.showInput && (
                      <div
                        className="px-2 py-1 mb-4 bg-white rounded-lg font-sans text-sm font-base text-[#172b4d] w-full cursor-pointer"
                        onClick={() => {
                          setCommentDetails((prev) => {
                            return { ...prev, showInput: true };
                          });
                        }}
                      >
                        Write a comment...
                      </div>
                    )}

                    {commentDetails.showInput && (
                      <div className="mb-4">
                        <input
                          ref={writeCommentRef}
                          type="text"
                          value={comment}
                          className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-[470px] font-semibold text-[14px] mb-4 border-2 border-solid border-blue-600 outline-none"
                          placeholder="Write a comment..."
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="flex">
                          <button
                            className={`rounded cursor-pointer py-1 px-2 border-blue-400 mr-4 ${
                              comment.trim() === ""
                                ? "bg-blue-400 text-white"
                                : "bg-blue-600 text-white"
                            }`}
                            disabled={comment.trim() === ""}
                            onClick={() => {
                              addComment();
                            }}
                          >
                            Save
                          </button>

                          <button
                            className="bg-gray-500 rounded py-1 px-2 text-white border-blue-400 hover:bg-gray-600 hover:text-white mr-4"
                            onClick={() => {
                              setCommentDetails((prev) => {
                                return { ...prev, showInput: false };
                              });
                            }}
                          >
                            Discard Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {showActivity && commentList}
                </div>
              </div>
            </div>

            <div className="h-full">
              <div className="pb-1">
                <p className="pb-1 font-sans text-xs font-semibold text-[#172b4d]">
                  Add to card
                </p>
                {/* <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon icon={faUser} size="sm" className="mr-2 " />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Members
                  </p>
                </div> */}

                <div
                  className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLabelsIsShowing(true);
                    setNewLabelListPosition(false);
                  }}
                  ref={labelsBtnRef}
                >
                  <FontAwesomeIcon icon={faTag} size="sm" className="mr-2 " />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Labels
                  </p>
                </div>

                <div
                  className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2 cursor-pointer"
                  onClick={() => setShowAddChecklist(true)}
                >
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    size="sm"
                    className="mr-2 "
                  />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    CheckList
                  </p>
                </div>

                <div
                  ref={datesBtnRef}
                  className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2 cursor-pointer"
                  onClick={() => {
                    setShowDatesCard(!showDatesCard);
                  }}
                >
                  <FontAwesomeIcon icon={faClock} size="sm" className="mr-2 " />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Dates
                  </p>
                </div>
              </div>

              <div className="relative pb-1">
                <p className="pb-1 font-sans text-xs font-semibold text-[#172b4d]">
                  Actions
                </p>
                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="sm"
                    className="mr-2 "
                  />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Move
                  </p>
                </div>

                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon icon={faCopy} size="sm" className="mr-2 " />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Copy
                  </p>
                </div>

                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon
                    icon={faFileInvoice}
                    size="sm"
                    className="mr-2 "
                  />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Make template
                  </p>
                </div>
                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon
                    icon={faBoxArchive}
                    size="sm"
                    className="mr-2 "
                  />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Archive
                  </p>
                </div>
                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon
                    icon={faShareNodes}
                    size="sm"
                    className="mr-2 "
                  />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Share
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {labelsIsShowing && (
          <Labels
            setLabelsIsShowing={setLabelsIsShowing}
            labelsBtnRef={labelsBtnRef}
            cardInfo={cardDetails}
            newLabelListPosition={newLabelListPosition}
            chooseLabelRef={chooseLabelRef}
            createLabelBtn={createLabelBtn}
          />
        )}

        {showDatesCard && (
          <DatesCard
            datesBtnRef={datesBtnRef}
            showDatesCard={showDatesCard}
            setShowDatesCard={setShowDatesCard}
            newCardData={newCardData}
          />
        )}
        {showAddChecklist && (
          <AddChecklist
            setShowAddChecklist={setShowAddChecklist}
            showAddChecklist={showAddChecklist}
          />
        )}
      </cardDataContext.Provider>
    </>
  );
};

export default OpenCard;
