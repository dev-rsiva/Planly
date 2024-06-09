import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeInput from "./TimeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { updateHighlightsDatabase } from "../../utills/updateHighlightsDatabase";
import dataContext from "../../utills/dataContext.js";
import { cardDataContext } from "../../utills/cardDataContext";
import generateUniqueNumber from "../../utills/generateUniqueNum";

const DatesCard = ({
  datesBtnRef,
  showDatesCard,
  setShowDatesCard,
  newCardData,
  fromWhere,
  workspaceInfo,
  boardInfo,
  listInfo,
  cardInfo,
}) => {
  const { user } = useContext(dataContext);

  console.log(workspaceInfo);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputTime, setInputTime] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveItems, setSaveItems] = useState({
    startDate: false,
    endDate: false,
  });
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const paramObj = useParams();
  const { workspaceData, setWorkspaceData } = useContext(dataContext);
  const datesCardRef = useRef();
  console.log(typeof startDate);
  console.log(endDate);
  console.log(inputTime);

  console.log(saveItems?.startDate, saveItems?.endDate);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
    const now = new Date();
    const options = { month: "short", day: "numeric" };
    if (date.getFullYear() !== now.getFullYear()) {
      options.year = "numeric";
    }
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getTimeStamp = (dateString) => {
    const date = new Date(dateString);
    const timestamp = date.getTime();
    console.log(timestamp); // Outputs the timestamp in milliseconds
    return timestamp;
  };
  console.log(formatDate(startDate));
  console.log(getTimeStamp(startDate));

  const checkIsEndDateBeforeStartDate = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    console.log(start);
    console.log(end);
    return end <= start;
  };

  const isEndDateBeforeStartDate = checkIsEndDateBeforeStartDate(
    startDate,
    endDate
  );

  const handleSave = () => {
    console.log("save click is running");

    console.log(isEndDateBeforeStartDate);
    if (isEndDateBeforeStartDate) {
      setShowError(true);
      setErrorMessage("End date cannot be before start date.");
      setDisableSaveButton(true);
      setSaveItems((prev) => {
        return { ...prev, startDate: false, endDate: false };
      });
      return;
    }

    // if (inputTime === "" || inputTime === "Invalid time") {
    //   setShowError(true);
    //   setErrorMessage("Invalid time");
    //   setDisableSaveButton(true);
    //   setSaveItems((prev) => {
    //     return { ...prev, startDate: false, endDate: false };
    //   });
    //   return;
    // }

    let updatedWorkspaceData = { ...workspaceData };

    let currWorkspace = workspaceData?.workspaces?.find((eachWorkspace) => {
      return eachWorkspace?.boards?.some((eachBoard) => {
        return eachBoard?.lists?.some((eachList) => {
          return eachList?.cards?.some((eachCard) => {
            return eachCard?.id === newCardData.id;
          });
        });
      });
    });
    console.log(currWorkspace);

    let currBoard = currWorkspace?.boards?.find((eachBoard) => {
      return eachBoard?.lists?.some((eachList) => {
        return eachList?.cards?.some((eachCard) => {
          return eachCard?.id === newCardData.id;
        });
      });
    });
    console.log(currBoard);

    let currList = currBoard?.lists?.find((eachList) => {
      return eachList?.cards?.some((eachCard) => {
        return eachCard?.id === newCardData.id;
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
                    if (eachCard?.id !== newCardData.id) {
                      console.log(eachCard?.id !== newCardData.id);
                      return eachCard;
                    }
                    return {
                      ...eachCard,
                      dates: {
                        ...eachCard?.dates,
                        start: saveItems.startDate ? formatDate(startDate) : "",
                        startObj: saveItems.startDate ? startDate : "",
                        due: saveItems.endDate ? formatDate(endDate) : "",
                        dueObj: saveItems.endDate ? endDate : "",
                        status: "Overdue",
                      },
                      dueDate: saveItems.endDate ? getTimeStamp(endDate) : "",
                      dueDateTime: inputTime,
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

    // updateFirebaseDoc(updatedWorkspaceData);

    const addHighlight = (type, highlight, updatedWorkspaceData) => {
      console.log(highlight);
      updateHighlightsDatabase(type, highlight, updatedWorkspaceData);
    };

    addHighlight(
      "card",
      {
        id: generateUniqueNumber("adding_dates", 5),
        type: "adding_dates",
        details: {
          userId: user?.uid,
          memberName: user?.displayName,
          workspaceId: workspaceInfo?.id,
          workspaceName: workspaceInfo?.name,
          boardId: boardInfo?.id,
          boardName: boardInfo?.title,
          boardStarred: boardInfo?.starred,
          boardBackgroundImg: boardInfo?.backgroundImg,
          checklistName: "",
          cardId: cardInfo.id,
          cardName: cardInfo?.title,
          cardLabels: cardInfo?.labels,
          cardMembers: cardInfo?.members,
          cardInfo: "",
          listId: listInfo?.id,
          listName: "",
          listInfo: "",
          timestamp: new Date().toISOString(),
          inviter: "",
          invitedMember: "",
          remover: "",
          comment: "",
          itemName: "",
          startDate: formatDate(startDate),
          dueDate: formatDate(endDate),
          description: "",
        },
      },
      updatedWorkspaceData
    );

    setShowDatesCard(false);
  };

  console.log(disableSaveButton);

  useEffect(() => {
    if (!saveItems.startDate && !saveItems.endDate) {
      setDisableSaveButton(true);
      console.log("disable button");
    } else {
      console.log("enable button");
      setDisableSaveButton(false);
    }
  }, [saveItems, inputTime]);

  useEffect(() => {
    console.log(isEndDateBeforeStartDate);

    if (!isEndDateBeforeStartDate) {
      console.log("is not EndDate Is Lesser Than StartDate");
      setShowError(false);
      setErrorMessage("");
    }
  }, [endDate]);

  useEffect(() => {
    console.log("useEffect running");

    setSaveItems((prev) => {
      return {
        ...prev,
        startDate: newCardData?.dates.start ? true : false,
        endDate: newCardData?.dates.due ? true : false,
      };
    });
    const startTimestamp = newCardData?.dates?.startObj;
    const dueTimestamp = newCardData?.dates?.dueObj;

    console.log(startTimestamp);
    console.log(dueTimestamp);

    // Convert timestamps to Date objects
    setStartDate(startTimestamp ? startTimestamp?.toDate() : new Date());
    setEndDate(dueTimestamp ? dueTimestamp?.toDate() : new Date());
    setInputTime(newCardData?.dueDateTime ? newCardData?.dueDateTime : "");
  }, [newCardData]);

  //Selecting dates from DatePicker is closing the card, so do not apply outside click functionality.

  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     e.stopPropagation();

  //     if (
  //       !datesCardRef?.current.contains(e.target) &&
  //       !datesBtnRef?.current.contains(e.target) &&
  //       showDatesCard
  //     ) {
  //       console.log("setting false");
  //       setShowDatesCard(false);
  //     }
  //   };
  //   document.addEventListener("click", handleOutsideClick);
  //   console.log("eventlistener added");

  //   return () => document.removeEventListener("click", handleOutsideClick);
  // }, []);

  return (
    <>
      <div
        ref={datesCardRef}
        className={`absolute ${
          fromWhere === "openCardComponent"
            ? "right-60 top-36"
            : "left-[110%] top-1"
        }   bg-white p-4 rounded w-[300px] z-[1801]`}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Dates
          </p>
          <div className="ml-2" onClick={() => setShowDatesCard(false)}>
            <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Start date
          </p>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={saveItems?.startDate}
              className="w-[20px] h-[16px]"
              onChange={() =>
                setSaveItems((prev) => {
                  let updatedSaveItems = { ...prev };
                  updatedSaveItems.startDate =
                    updatedSaveItems?.startDate === true ? false : true;
                  return updatedSaveItems;
                })
              }
            />
            <div className="font-sans text-sm text-[#172b4d]">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-[100px] py-1 px-2 border-2 border-blue-500 rounded outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Due date
          </p>

          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={saveItems?.endDate}
              className="w-[20px] h-[16px]"
              onChange={() => {
                if (
                  !saveItems?.endDate &&
                  (inputTime === "" || inputTime === "Invalid time")
                ) {
                  setShowError(true);
                  setErrorMessage("Invalid time");
                  setDisableSaveButton(true);
                  return;
                }
                setSaveItems((prev) => {
                  let updatedSaveItems = { ...prev };
                  updatedSaveItems.endDate =
                    updatedSaveItems?.endDate === true ? false : true;
                  return updatedSaveItems;
                });
              }}
            />
            <div className="font-sans text-sm text-[#172b4d]">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-[100px] py-1 px-2 border-2 border-blue-500 rounded outline-none cursor-pointer"
              />
            </div>
            <TimeInput
              showError={showError}
              setShowError={setShowError}
              setErrorMessage={setErrorMessage}
              inputTime={inputTime}
              setInputTime={setInputTime}
              setDisableSaveButton={setDisableSaveButton}
            />
            <p className="text-[10px] font-sans text-gray-400">
              e.g., 1, 13, <br /> 10am, 3pm
            </p>
          </div>
        </div>
        {showError && (
          <div className="mt-4">
            <p className="font-sans text-xs text-red-600">{errorMessage}</p>
          </div>
        )}

        {/* <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Set due date reminder
          </p>

          <div className="mt-1">
            <select
              name="reminder"
              className="w-full font-sans text-sm text-[#172b4d] py-1 px-2 outline-none border-2 border-blue-500 rounded cursor-pointer"
            >
              <option className="py-2 cursor-pointer">None</option>
              <option className="py-2 cursor-pointer">
                At time of due date
              </option>
              <option className="py-2 cursor-pointer">5 Minutes before</option>
              <option className="py-2 cursor-pointer">10 Minutes before</option>
              <option className="py-2 cursor-pointer">1 Hour before</option>
              <option className="py-2 cursor-pointer">2 Hours before</option>
              <option className="py-2 cursor-pointer">1 Day before</option>
              <option className="py-2 cursor-pointer">2 Day before</option>
            </select>
            <p className="text-sm font-sans text-[#172b4d] mt-2">
              Reminders will be sent to all members and watchers of this card?.
            </p>
          </div>
        </div> */}

        <div>
          <button
            disabled={disableSaveButton}
            className={`mt-4 rounded py-2 px-2 my-3 text-sm font-semibold font-sans w-full ${
              disableSaveButton
                ? "bg-gray-400 text-gray-600"
                : "bg-blue-600 text-white"
            }`}
            onClick={() => handleSave()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default DatesCard;
