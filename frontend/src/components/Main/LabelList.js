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
  const { allCardData, setAllCardData } = useContext(dataContext);
  const { newCardData, setNewCardData } = useContext(cardDataContext);


  const [selectedLabel, setSelectedLabel] = useState([]);

 
  const suggestedColor =
    newCardData.labels[Math.floor(Math.random() * 10)]?.color;

  const labelListRef = useRef();

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
            return (
              <div key={label.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4"
                  onChange={() => {
                    setNewCardData((prev) => {
                      let updatedLabels;

                      if (label.isChecked) {
                        updatedLabels = prev.labels.map((eachLabel) =>
                          eachLabel.id === label.id
                            ? { ...eachLabel, isChecked: false }
                            : eachLabel
                        );

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
    </div>
  );
};

export default LabelList;
