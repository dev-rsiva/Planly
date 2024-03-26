import { useRef, useState, useEffect, useContext, useReducer } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { labelColors } from "../../utills/labelColors";
import dataContext from "../../utills/dataContext";
import { cardDataContext } from "../../utills/cardDataContext";
const LabelList = ({
  setLabelsIsShowing,
  setCreateLabelIsShowing,
  labelListIsShowing,
  setLabelListIsShowing,
  labelsRef,
  cardInfo,
  newLabelListPosition,
  chooseLabelRef,
  createLabelBtn,
  setEditLabelInfo,
  setUserActionOnLabel,
  // newCardData,
}) => {
  console.log("LabelList Started");
  const { allCardData, setAllCardData } = useContext(dataContext);
  const { newCardData, setNewCardData } = useContext(cardDataContext);

  console.log(allCardData[cardInfo.id]);
  console.log(newCardData.labels);

  const [selectedLabel, setSelectedLabel] = useState([]);

  // let initialState = { selectedLabel: [], allCardData };

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "SELECT_LABEL":
  //       const { cardId, payload } = action;
  //       const updatedCardData = {
  //         ...state.allCardData[cardId],
  //         labels: [...state.allCardData[cardId].labels, payload],
  //       };

  //       setAllCardData((prev) => ({
  //         ...prev,
  //         [cardId]: updatedCardData,
  //       }));

  //       return {
  //         ...state,
  //         selectedLabel: [...state.selectedLabel, payload],
  //         allCardData: {
  //           ...state.allCardData,
  //           [cardId]: updatedCardData,
  //         },
  //       };

  //     default:
  //       return state;
  //   }
  // };

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "SELECT_LABEL":
  //       console.log({
  //         ...state,
  //         selectedLabel: [...state.selectedLabel, action.payload],
  //         allCardData: {
  //           ...state.allCardData,
  //           [action.cardId]: {
  //             ...state.allCardData[action.cardId],
  //             labels: [
  //               ...state.allCardData[action.cardId].labels,
  //               action.payload,
  //             ],
  //           },
  //         },
  //       });
  //       return {
  //         ...state,
  //         selectedLabel: [...state.selectedLabel, action.payload],
  //         allCardData: {
  //           ...state.allCardData,
  //           [action.cardId]: {
  //             ...state.allCardData[action.cardId],
  //             labels: [
  //               ...state.allCardData[action.cardId].labels,
  //               action.payload,
  //             ],
  //           },
  //         },
  //       };

  //     default:
  //       return state;
  //   }
  // };

  // const [state, dispatch] = useReducer(reducer, initialState);

  // console.log(state);

  const suggestedColor =
    newCardData.labels[Math.floor(Math.random() * 10)]?.color;

  const labelListRef = useRef();

  // const handleOutsideClick = (e) => {
  //   console.log("handleOutsideClick in LabelList");

  //   if (
  //     labelListRef.current &&
  //     !labelListRef.current.contains(e.target) &&
  //     !labelsRef.current.contains(e.target)
  //   ) {
  //     console.log("inside in");
  //     setLabelListIsShowing(false);
  //   }
  // };

  // useEffect(() => {
  //   console.log("useEffect");
  //   document.addEventListener("click", handleOutsideClick);

  //   return () => document.removeEventListener("click", handleOutsideClick);
  // }, []);

  return (
    <div
      className={`absolute ${
        newLabelListPosition ? "left-[420px] top-12" : "right-60 top-12"
      } w-[300px] bg-white p-4 rounded z-[1801]`}
      ref={labelListRef}
    >
      <div className="flex justify-between items-center mb-3">
        <p className="flex-grow text-center">Labels</p>
        <div className="ml-2" onClick={() => setLabelsIsShowing(false)}>
          <FontAwesomeIcon icon={faX} className="cursor-pointer" />
        </div>
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="search labels..."
          className="w-full p-1 border-2 border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <h1 className="mb-3">Suggestions</h1>
        <div>
          <div className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 w-4 h-4" />
            <div
              style={{
                backgroundColor: suggestedColor,
              }}
              className={`w-full h-[30px] rounded mr-2`}
            />

            <div>
              <FontAwesomeIcon
                icon={faPencil}
                // className="mb-[2px] pl-1"
                size="xs"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="mb-3">Labels</h1>
        <div>
          {newCardData.labels.map((label) => {
            console.log(label);
            return (
              <div key={label.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4"
                  onChange={() => {
                    setNewCardData((prev) => {
                      let updatedLabels;
                      console.log(label);

                      if (label.isChecked) {
                        console.log(label.isChecked);
                        updatedLabels = prev.labels.map((eachLabel) =>
                          eachLabel.id === label.id
                            ? { ...eachLabel, isChecked: false }
                            : eachLabel
                        );

                        console.log(updatedLabels);
                      } else {
                        let updatedLabel = { ...label, isChecked: true };
                        updatedLabels = prev.labels.map((eachLabel) =>
                          eachLabel.id === label.id
                            ? { ...eachLabel, isChecked: !eachLabel.isChecked }
                            : eachLabel
                        );
                      }

                      let updatedNewCardData = {
                        ...prev,
                        labels: updatedLabels,
                      };

                      setAllCardData((prev) => {
                        return { ...prev, [cardInfo.id]: updatedNewCardData };
                      });
                      setSelectedLabel((prev) => {
                        return updatedLabels;
                      });
                      console.log(updatedLabels);
                      return updatedNewCardData;
                    });
                  }}
                />
                <div
                  style={{ backgroundColor: label.color }}
                  className={`w-full h-[30px] rounded mr-2 flex items-center pl-2`}
                >
                  {label.title}
                </div>
                <div
                  onClick={(e) => {
                    
                    setEditLabelInfo((prev) => {
                      return {
                        ...prev,
                        id: label?.id,
                        title: label?.title,
                        color: label?.color,
                      };
                    });
                    setUserActionOnLabel("editLabel");
                    e.stopPropagation();
                    setCreateLabelIsShowing(true);
                    setLabelListIsShowing(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPencil}
                    // className="mb-[2px] pl-1"
                    size="xs"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="flex justify-center items-center font-semibold bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 rounded-md"
        ref={createLabelBtn}
        onClick={(e) => {
          console.log("labellist1");
          setUserActionOnLabel("createLabel");
          setCreateLabelIsShowing(true);
          setLabelListIsShowing(false);
          setEditLabelInfo((prev) => {
            return { ...prev, color: "#4BCE97" };
          });
        }}
      >
        <button>Create a new label</button>
      </div>
      {console.log("LabelList ended")}
    </div>
  );
};

export default LabelList;
