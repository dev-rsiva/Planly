import { useRef, useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { labelColors } from "../../utills/labelColors";
import { cardDataContext } from "../../utills/cardDataContext.js";
import dataContext from "../../utills/dataContext.js";
const CreateLabel = ({
  setLabelsIsShowing,
  setCreateLabelIsShowing,
  createLabelBtn,
  createLabelIsShowing,
  labelListIsShowing,
  setLabelListIsShowing,
  editLabelInfo,
  userActionOnLabel,
  cardInfo,
}) => {
  console.log("CreateLabel Started");

  const [title, setTitle] = useState(editLabelInfo?.title);
  const [colorSelected, setColorSelected] = useState(editLabelInfo?.color);

  const { newCardData, setNewCardData } = useContext(cardDataContext);

  const { allCardData, setAllCardData } = useContext(dataContext);
  console.log(newCardData);
  console.log(allCardData);

  console.log(title);
  console.log(colorSelected);
  const createLabelRef = useRef();
  const titleRef = useRef();

  // const handleOutsideClickCL = (e) => {
  //   console.log(e);
  //   console.log(createLabelIsShowing);
  //   console.log(createLabelRef.current);
  //   console.log(!createLabelRef.current.contains(e.target));
  //   if (createLabelRef.current && !createLabelRef.current.contains(e.target)) {
  //     console.log("createLabel If");
  //     setCreateLabelIsShowing(false);
  //   }
  // };

  // useEffect(() => {
  //   console.log("CreateLabel useEffect started");
  //   if (createLabelRef.current) {
  //     console.log("click evetListener added");
  //     document.addEventListener("click", handleOutsideClickCL);
  //   }

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClickCL);
  //     console.log("CreateLabel component unmounted");
  //   };
  // }, [createLabelIsShowing]);

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
          <FontAwesomeIcon icon={faAngleLeft} className="cursor-pointer" />
        </div>
        <h1 className="flex-grow text-center">Create label</h1>
        <div
          onClick={() => {
            console.log("createlabel1");
            setCreateLabelIsShowing(false);
          }}
        >
          <FontAwesomeIcon icon={faX} className="cursor-pointer" />
        </div>
      </div>
      <div className="p-6 bg-gray-50 my-1">
        <div className="w-full h-[30px] bg-[#F8E6A0] rounded" />
      </div>

      <div className="px-4 pb-2">
        <h1 className="py-2">Title</h1>
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-300 rounded w-full h-[35px] pl-2"
        />
      </div>

      <div className="px-4 pb-4">
        <h1 className="mb-2">Select a color</h1>
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
        <div className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 w-full p-2 rounded mb-3">
          <FontAwesomeIcon
            icon={faX}
            size={"xs"}
            className="cursor-pointer pr-2"
          />
          <h1>Remove color</h1>
        </div>

        <hr className="w-full border-t-1 rounded text-gray-600" />

        {userActionOnLabel === "editLabel" && (
          <div className="flex justify-between my-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setCreateLabelIsShowing(false);
                setLabelListIsShowing(true);

                setNewCardData((prev) => {
                  let updatedLabels = prev.labels.map((eachLabel) => {
                    if (eachLabel.id === editLabelInfo.id) {
                      return {
                        ...eachLabel,
                        title: title,
                        color: colorSelected,
                      };
                    }

                    return eachLabel;
                  });

                  let updatedNewCardData = { ...prev, labels: updatedLabels };
                  console.log(updatedNewCardData);
                  setAllCardData((prev) => {
                    console.log(cardInfo.id);
                    console.log({
                      ...prev,
                      [newCardData.id]: updatedNewCardData,
                    });
                    return { ...prev, [cardInfo.id]: updatedNewCardData };
                  });

                  return updatedNewCardData;
                });
              }}
            >
              Save
            </button>
            <button className="bg-red-700 hover:bg-red-800 py-1 px-2 rounded ">
              Delete
            </button>
          </div>
        )}

        {userActionOnLabel === "createLabel" && (
          <div>
            <button className="bg-blue-600 rounded py-1 px-2 my-3">
              Create
            </button>
          </div>
        )}
      </div>
      {console.log("CreateLabel ended")}
    </div>
  );
};

export default CreateLabel;
