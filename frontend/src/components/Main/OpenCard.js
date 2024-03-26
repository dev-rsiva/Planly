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
  console.log("OpenCard started");
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

  // console.log(descriptionRef?.current);

  // console.log(paramObj);

  const workspaceInfo = workspaceData.workspaces.find((workspace) =>
    workspace.boards.some((board) =>
      board.lists.some((list) =>
        list.cards.some((card) => {
          return card.id === paramObj.cardId;
        })
      )
    )
  );

  const boardInfo = workspaceInfo.boards.find((board) =>
    board.lists.some((list) =>
      list.cards.some((card) => card.id === paramObj.cardId)
    )
  );

  // console.log(boardInfo);

  const listInfo = boardInfo.lists.find((list) =>
    list.cards.some((card) => card.id === paramObj.cardId)
  );
  // console.log(listInfo);

  const cardInfo = listInfo.cards.find((card) => card.id == paramObj.cardId);
  console.log(cardInfo);

  // console.log(workspaceInfo);

  console.log(allCardData[cardInfo.id]);

  const [cardDetails, setCardDetails] = useState(cardInfo);

  // {
  //   description: "",
  //   Activities: [{ user: "", comment: "" }],
  //   labels: [],
  //   members: [],
  //   covers: [],
  //   dates: { start: null, due: null },
  //   attachments: [],
  //   cover: [],
  //   customFields: [],
  //   archived: false,
  //   watching: false,
  // }

  // const cardDataContext = createContext()

  const [newCardData, setNewCardData] = useState(allCardData[cardInfo.id]);

  const [listDetails, setListDetails] = useState(listInfo);

  const [cardDesc, setCardDesc] = useState(
    allCardData[cardInfo.id]?.description?.trim()
  );
  const [comment, setComment] = useState("");

  console.log(comment.trim());
  console.log(newCardData);
  console.log(cardInfo.id);
  console.log(allCardData[cardInfo.id]);

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
  console.log(labelsIsShowing);
  const [newLabelListPosition, setNewLabelListPosition] = useState(false);

  console.log(cardDescDetails);
  console.log(allCardData[cardInfo.id]);
  // console.log(cardDetails.id);
  console.log(newCardData);
  console.log(editCommentFor);

  const labelsForThisCard = newCardData?.labels?.filter(
    (eachLabel) =>
      eachLabel.isChecked !== undefined && eachLabel.isChecked === true
  );
  console.log(labelsForThisCard);

  const descriptionDisplay = useMemo(() => {
    console.log("display logic");
    if (cardDescDetails?.showDesc && !cardDescDetails?.showInput) {
      return (
        <div
          className="bg-gray-300 pl-2 pt-2 pb-4 rounded w-[480px] font-semibold text-[14px] hover:bg-gray-400 cursor-pointer"
          onClick={() => {
            console.log("opencard14");
            console.log("parent1");
            setCardDescDetails((prev) => {
              return (prev = { ...prev, showInput: true });
            });
          }}
        >
          {console.log(newCardData?.description?.split(" ").join(""))}
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
        console.log("comment List");
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
              {console.log(editCommentFor.id !== eachUser?.id)}
              {console.log(editCommentFor.id)}
              {console.log(eachUser?.id)}
              {editCommentFor.id !== eachUser?.id && (
                <div>
                  <div className="px-2 py-2 bg-white rounded-lg font-semibold text-[14px] w-full cursor-pointer">
                    {console.log(eachUser?.comment)}
                    <p>{eachUser?.comment}</p>
                  </div>

                  <div>
                    <button
                      className="text-sm mr-2 underline"
                      onClick={() => {
                        console.log("opencard13");
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
                        console.log("opencard12");
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
                        console.log(updatedActivitiesList);

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
                        console.log("opencard11");

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
    console.log("updateDescription:", newCardData?.description);

    setAllCardData((prev) => {
      setNewCardData((prev) => {
        return { ...prev, description: cardDesc };
      });

      console.log({
        ...prev,
        [cardDetails.id]: {
          ...newCardData,
          description: cardDesc,
        },
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
      console.log(newCardData?.description);
      console.log(cardDescDetails);
      console.log(newCardData?.description?.split(" ").join("") !== "");

      return {
        ...prev,
        showInput: false,
        showDesc: true,
        showEdit: cardDesc.split(" ").join("") === "" ? false : true,
      };
    });
  }

  function formatTimeDifference(commentTime) {
    console.log("formatTimeDifference");
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
    console.log("useEffect showInput");
  }, [cardDescDetails]);
  useEffect(() => {
    console.log("useEffect showDesc");
  }, [cardDescDetails?.showDesc]);
  useEffect(() => {
    console.log("useEffect showEdit");
  }, [cardDescDetails?.showEdit]);
  useEffect(() => {
    console.log("useEffect allCardData");
  }, [allCardData]);

  useEffect(() => {
    console.log("useEffect");
    if (cardDescDetails?.showInput) {
      descriptionRef.current.focus();
    }
  }, [cardDescDetails?.showInput]);

  return (
    <>
      <Boards />
      <cardDataContext.Provider value={{ newCardData, setNewCardData }}>
        {console.log("OpenCard rendering process")}
        <div
          className="fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-60 z-[999]"
          onClick={() => {
            console.log("opencard10");
            console.log("setting showOpenCard false");
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
                console.log("opencard9");
                navigate(-1);
              }}
            >
              <FontAwesomeIcon icon={faX} className="cursor-pointer" />
            </div>
          </div>

          <div className="flex justify-between ">
            <div className="flex flex-col mr-2 w-full">
              <div className="flex mb-8 p-2 ml-[42px] ">
                {console.log(newCardData?.labels)}
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
                          console.log("opencard8");
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
                        console.log("opencard7");
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
                            console.log("opencard6");
                            e.stopPropagation();
                            updateCardDescription();
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-200 rounded py-1 px-2 text-gray-900 border-blue-400 hover:bg-gray-400 mr-4"
                          onClick={() => {
                            console.log("opencard5");
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
                        console.log("opencard4");

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
                        {console.log(comment.trim())}
                        {console.log(comment.trim() === "")}
                        <button
                          className={`rounded py-1 px-2 text-white border-blue-400 mr-4 ${
                            comment.trim() === ""
                              ? "bg-gray-400 hover:bg-gray-400"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          disabled={comment.trim() === ""}
                          onClick={() => {
                            console.log("opencard3");
                            setAllCardData((prev) => {
                              console.log("inside setallcard data");
                              let newActivity = {
                                id: generateUniqueNumber(
                                  comment.slice(0, 3),
                                  5
                                ),
                                user: "Siva",
                                comment: comment.trim(),
                                commentTime: new Date(),
                              };
                              console.log(newActivity);
                              console.log(setNewCardData);
                              setNewCardData((prev) => {
                                console.log("inside  newActivity Card Data");
                                let updatedNewCardData = { ...prev };
                                console.log(updatedNewCardData);
                                updatedNewCardData.Activities = [
                                  ...updatedNewCardData?.Activities,
                                ];
                                updatedNewCardData?.Activities.unshift(
                                  newActivity
                                );

                                console.log(updatedNewCardData);
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
                            console.log("opencard2");
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
                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon icon={faUser} size="sm" className="mr-2 " />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Members
                  </p>
                </div>

                <div
                  className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2 cursor-pointer"
                  onClick={() => {
                    console.log("opencard1");
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

                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon
                    icon={faListCheck}
                    size="sm"
                    className="mr-2 "
                  />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Checklist
                  </p>
                </div>
                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon icon={faClock} size="sm" className="mr-2 " />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Dates
                  </p>
                </div>
                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    size="sm"
                    className="mr-2 "
                  />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Attachment
                  </p>
                </div>
                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon icon={faImage} size="sm" className="mr-2 " />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Cover
                  </p>
                </div>
                <div className="flex justify-start items-center bg-gray-300 rounded px-2 py-[6px] w-[175px] mb-2">
                  <FontAwesomeIcon
                    icon={faPaintRoller}
                    size="sm"
                    className="mr-2 "
                  />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Custom Fields
                  </p>
                </div>
              </div>

              <div className="pb-1">
                <p className="pb-1 font-sans text-xs font-semibold text-[#172b4d]">
                  Power-Ups
                </p>
                <div className="flex justify-start items-center rounded px-2 py-1 w-[175px] mb-2">
                  <FontAwesomeIcon icon={faPlus} size="sm" className="mr-2 " />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Add Power-ups
                  </p>
                </div>
              </div>

              <div className="pb-1">
                <p className="pb-1 font-sans text-xs font-semibold text-[#172b4d]">
                  Automation
                </p>
                <div className="flex justify-start items-center rounded px-2 py-1 w-[175px] mb-2">
                  <FontAwesomeIcon icon={faPlus} size="sm" className="mr-2 " />
                  <p className="font-sans text-sm font-semibold text-[#172b4d]">
                    Add button
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
            cardInfo={cardInfo}
            newLabelListPosition={newLabelListPosition}
            chooseLabelRef={chooseLabelRef}
            createLabelBtn={createLabelBtn}
          />
        )}

        {console.log("OpenCard end")}
      </cardDataContext.Provider>
    </>
  );
};

export default OpenCard;
