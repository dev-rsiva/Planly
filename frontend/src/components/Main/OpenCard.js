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
} from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
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
import Labels from "./Labels.js";
import LabelList from "./LabelList";
import CreateLabel from "./CreateLabel";
import Boards from "../../pages/Boards.js";

const OpenCard = () => {
  const { workspaceData, setWorkspaceData } = useContext(dataContext);
  const navigate = useNavigate();
  const paramObj = useParams();
  const descriptionRef = useRef(null);

  const writeCommentRef = useRef();
  const editCommentRef = useRef();
  const labelsBtnRef = useRef();
  const chooseLabelRef = useRef();
  const createLabelBtn = useRef();

  const { allCardData, setAllCardData } = useContext(dataContext);
  console.log(allCardData);
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

  const labelsForThisCard = newCardData?.labels?.filter(
    (eachLabel) =>
      eachLabel.isChecked !== undefined && eachLabel.isChecked === true
  );

  const descriptionDisplay = useMemo(() => {
    if (cardDescDetails?.showDesc && !cardDescDetails?.showInput) {
      return (
        <div
          className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-[480px] font-semibold text-[14px] hover:bg-gray-400 cursor-pointer"
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
      newCardData?.Activities?.map((eachUser) => {
        return (
          <div className="flex mb-4">
            <div className="flex justify-center text-white font-bold items-center bg-violet-900 rounded-full w-[30px] h-[30px] mr-4">
              S
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center mb-1">
                <p className="text-sm font-semibold mr-3 text-gray-800">
                  {eachUser?.user}
                </p>
                <p className="text-xs mr-3 text-gray-600">
                  {formatTimeDifference(eachUser?.commentTime)}
                </p>
              </div>

              {editCommentFor.id !== eachUser?.id && (
                <div>
                  <div className="px-2 py-2 bg-white rounded-lg font-semibold text-[14px] w-full cursor-pointer">
                    <p>{eachUser?.comment}</p>
                  </div>

                  <div>
                    <button
                      className="text-sm mr-2 underline"
                      onClick={() => {
                        setEditCommentFor((prev) => {
                          return {
                            ...prev,
                            showInput: true,
                            id: eachUser.id,
                            comment: eachUser.comment,
                          };
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button className="text-sm mr-2 underline">Delete</button>
                  </div>
                </div>
              )}

              {editCommentFor.id === eachUser?.id && (
                <div>
                  <input
                    ref={editCommentRef}
                    type="text"
                    value={editCommentFor.comment}
                    className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-[480px] font-semibold text-[14px] mb-4 border-2 border-solid border-blue-600"
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
                          ? "bg-gray-400 hover:bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={editCommentFor.comment.trim() === ""}
                      onClick={(e) => {
                        let updatedActivitiesList = newCardData?.Activities.map(
                          (eachActivity) => {
                            if (eachActivity?.id === editCommentFor.id) {
                              return {
                                ...eachActivity,
                                comment: editCommentFor.comment.trim(),
                                commentTime: new Date(),
                              };
                            }

                            return eachActivity;
                          }
                        );

                        setAllCardData((prev) => {
                          return {
                            ...prev,
                            [cardDetails.id]: {
                              ...prev[cardDetails.id],
                              Activities: updatedActivitiesList,
                            },
                          };
                        });

                        setNewCardData((prev) => {
                          return {
                            ...prev,
                            Activities: updatedActivitiesList,
                          };
                        });

                        setEditCommentFor((prev) => {
                          return { ...prev, id: "" };
                        });
                      }}
                    >
                      Save
                    </button>

                    <button
                      className="bg-gray-400 rounded py-1 px-2 text-white border-blue-400 hover:bg-gray-700 mr-4"
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

  function updateCardDescription() {
    setAllCardData((prev) => {
      setNewCardData((prev) => {
        return { ...prev, description: cardDesc };
      });

      return {
        ...prev,
        [cardDetails.id]: {
          ...newCardData,
          description: cardDesc,
        },
      };
    });

    setCardDescDetails((prev) => {
      return {
        ...prev,
        showInput: false,
        showDesc: true,
        showEdit: cardDesc.split(" ").join("") === "" ? false : true,
      };
    });
  }

  function formatTimeDifference(commentTime) {
    const now = new Date();
    const commentDate = new Date(commentTime);

    const timeDifference = now - commentDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
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

    if (allCardData) {
      setNewCardData(allCardData[cardInfo?.id]);
      setCardDesc(allCardData[cardInfo.id]?.description?.trim());
    }
  }, [workspaceData, allCardData]);

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
        <div className="absolute flex flex-col w-[770px] h-[590px] overflow-auto top-1/2 left-1/2 translate-x-[-50%] translate-y-[-46%] bg-[#F0F1F4] z-[1005] rounded-lg p-6">
          <div className="flex justify-between mb-8 p-2">
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
              <div className="flex mb-8 p-2 ml-[42px] ">
                {labelsForThisCard && labelsForThisCard.length > 0 && (
                  <div className="mr-4 ">
                    <div className="mb-2 font-semibold text-[14px]">Labels</div>

                    <div className="flex">
                      <div className="flex">
                        {labelsForThisCard?.map((label) => {
                          return (
                            <div
                              style={{ backgroundColor: label.color }}
                              className="w-[45px] h-[30px] rounded mr-2 flex"
                            >
                              <p>fvf</p>
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className="w-[30px] h-[30px] bg-gray-400 rounded flex justify-center items-center"
                        onClick={() => {
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
                  <div className="flex items-center bg-gray-300 rounded px-2 py-1 w-[90px] h-[30px]">
                    <FontAwesomeIcon icon={faEye} className="mr-2 text-sm" />
                    <p className="font-sans text-sm font-semibold text-[#172b4d]">
                      Watch
                    </p>
                  </div>
                </div>
              </div>

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
                        className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-[480px] font-sans text-sm font-bold text-[#172b4d] mb-4 border-2 border-solid border-blue-600"
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
                  <div className=" flex justify-center items-center bg-gray-300 rounded px-2 py-1 font-sans text-base font-semibold text-[#172b4d]">
                    Show details
                  </div>
                </div>

                <div className="flex">
                  <div className="flex justify-center text-white font-bold items-center bg-violet-900 rounded-full w-[30px] h-[30px] mr-4">
                    S
                  </div>

                  {!commentDetails.showInput && (
                    <div
                      className="px-2 py-1 mb-4 bg-white rounded-lg font-sans text-sm font-semibold text-[#172b4d] w-full cursor-pointer"
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
                        className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-[480px] font-semibold text-[14px] mb-4 border-2 border-solid border-blue-600"
                        placeholder="Write a comment..."
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="flex">
                        <button
                          className={`rounded py-1 px-2 text-white border-blue-400 mr-4 ${
                            comment.trim() === ""
                              ? "bg-gray-400 hover:bg-gray-400"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          disabled={comment.trim() === ""}
                          onClick={() => {
                            setAllCardData((prev) => {
                              let newActivity = {
                                id: generateUniqueNumber(
                                  comment.slice(0, 3),
                                  5
                                ),
                                user: "Siva",
                                comment: comment.trim(),
                                commentTime: new Date(),
                              };
                              setNewCardData((prev) => {
                                let updatedNewCardData = { ...prev };
                                updatedNewCardData.Activities = [
                                  ...updatedNewCardData?.Activities,
                                ];
                                updatedNewCardData?.Activities.unshift(
                                  newActivity
                                );

                                return updatedNewCardData;
                              });

                              setComment("");

                              return {
                                ...prev,
                                [cardDetails.id]: {
                                  ...prev[cardDetails.id],
                                  Activities: [
                                    newActivity,
                                    ...prev[cardDetails.id]?.Activities,
                                  ],
                                },
                              };
                            });
                            setCommentDetails((prev) => {
                              return { ...prev, showInput: false };
                            });
                          }}
                        >
                          Save
                        </button>

                        <button
                          className="bg-gray-400 rounded py-1 px-2 text-white border-blue-400 hover:bg-gray-700 mr-4"
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

                {commentList}
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
                  onClick={() => {
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
      </cardDataContext.Provider>
    </>
  );
};

export default OpenCard;
