import { useRef, useState, useEffect, useContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { labelColors } from "../../utills/labelColors";
import dataContext from "../../utills/dataContext";
import { cardDataContext } from "../../utills/cardDataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";

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
  newCardData,
}) => {
  const { workspaceData } = useContext(dataContext);
  // const { newCardData, setNewCardData } = useContext(cardDataContext);
  console.log(newCardData);
  const paramObj = useParams();

  const [selectedLabel, setSelectedLabel] = useState([]);

  const suggestedColor =
    newCardData?.labels &&
    newCardData?.labels[Math.floor(Math.random() * 10)]?.color;

  const labelListRef = useRef();

  console.log(selectedLabel);
  console.log(suggestedColor);
  console.log(newCardData);
  return (
    <div
      className={`absolute ${
        newLabelListPosition === "fromOpenCardLabelsBtn"
          ? "left-[420px] top-12"
          : newLabelListPosition === "fromOpenCardPlusBtn"
          ? "right-60 top-12"
          : "left-[110%] top-1"
      } w-[300px] bg-white p-4 rounded z-[1801]`}
      ref={labelListRef}
    >
      <div className="flex justify-between items-center mb-3">
        <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
          Labels
        </p>
        <div className="ml-2" onClick={() => setLabelsIsShowing(false)}>
          <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
        </div>
      </div>
      {/* Search labels and suggested lable are disabled as of now  */}
      {/* <div className="mb-3">
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
      </div> */}

      <div className="mb-4">
        <h1 className="mb-3 font-sans text-xs font-semibold text-[#172b4d]">
          Labels
        </h1>
        <div>
          {newCardData?.labels?.map((label) => {
            return (
              <div key={label.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={label.isChecked}
                  className="mr-2 w-4 h-4"
                  onChange={() => {
                    // setNewCardData((prev) => {
                    // let updatedLabels;

                    // if (label.isChecked) {
                    //   updatedLabels = prev.labels.map((eachLabel) =>
                    //     eachLabel.id === label.id
                    //       ? { ...eachLabel, isChecked: false }
                    //       : eachLabel
                    //   );
                    // } else {
                    //   let updatedLabel = { ...label, isChecked: true };
                    //   updatedLabels = prev.labels.map((eachLabel) =>
                    //     eachLabel.id === label.id
                    //       ? { ...eachLabel, isChecked: !eachLabel.isChecked }
                    //       : eachLabel
                    //   );
                    // }

                    // let updatedNewCardData = {
                    //   ...prev,
                    //   labels: updatedLabels,
                    // };

                    // // setAllCardData((prev) => {
                    //   return { ...prev, [cardInfo.id]: updatedNewCardData };
                    // // });

                    //--------------------------xxxxxx----------------------------------//

                    let updatedWorkspaceData = { ...workspaceData };

                    // let updatedLabels;

                    // if (label.isChecked) {
                    //   updatedLabels = prev.labels.map((eachLabel) =>
                    //     eachLabel.id === label.id
                    //       ? { ...eachLabel, isChecked: false }
                    //       : eachLabel
                    //   );
                    // } else {
                    //   let updatedLabel = { ...label, isChecked: true };
                    //   updatedLabels = prev.labels.map((eachLabel) =>
                    //     eachLabel.id === label.id
                    //       ? { ...eachLabel, isChecked: !eachLabel.isChecked }
                    //       : eachLabel
                    //   );
                    // }

                    let currWorkspace = workspaceData?.workspaces?.find(
                      (eachWorkspace) => {
                        return eachWorkspace?.boards?.some((eachBoard) => {
                          return eachBoard?.lists?.some((eachList) => {
                            return eachList?.cards?.some((eachCard) => {
                              return eachCard?.id === newCardData.id;
                            });
                          });
                        });
                      }
                    );
                    console.log(currWorkspace);

                    let currBoard = currWorkspace?.boards?.find((eachBoard) => {
                      return eachBoard?.lists?.some((eachList) => {
                        return eachList?.cards?.some((eachCard) => {
                          return eachCard?.id === newCardData.id;
                        });
                      });
                    });
                    console.log(currBoard);

                    let currList = currBoard.lists?.find((eachList) => {
                      return eachList?.cards?.some((eachCard) => {
                        return eachCard?.id === newCardData.id;
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
                                    if (eachCard?.id !== newCardData.id) {
                                      console.log(
                                        eachCard?.id !== newCardData.id
                                      );
                                      return eachCard;
                                    }
                                    return {
                                      ...eachCard,
                                      labels: eachCard?.labels.map(
                                        (eachLabel) => {
                                          if (eachLabel.id !== label.id) {
                                            return eachLabel;
                                          }
                                          return {
                                            ...eachLabel,
                                            isChecked: label.isChecked
                                              ? false
                                              : true,
                                          };
                                        }
                                      ),
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

                    // setSelectedLabel((prev) => {
                    //   return updatedLabels;
                    // });
                    // return updatedNewCardData;

                    // });
                  }}
                />
                <div
                  style={{ backgroundColor: label.color }}
                  className={`w-full h-[30px] rounded mr-2 flex items-center pl-2 font-sans text-sm font-semibold text-[#172b4d]`}
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
      {newLabelListPosition !== "fromListsComponent" && (
        <div
          className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 py-2 rounded-md font-sans text-sm font-semibold text-[#172b4d]"
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
      )}
    </div>
  );
};

export default LabelList;
