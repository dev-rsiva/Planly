import { useEffect, useContext } from "react";
import dataContext from "../../../utills/dataContext";

const DisplayCreate = ({
  createRef,
  createBtn,
  createTemplate,
  setCreateDropdownStatus,
  setCreateDropdownDetails,
  createDropdownDetails,
  backFromTemplateBtn,
}) => {
  const { createBoardSourceClick, setCreateBoardSourceClick } =
    useContext(dataContext);

  console.log(createBoardSourceClick);
  useEffect(() => {
    const handleOutside = (e) => {
      console.log("handleOutside 1");
      console.log(createRef?.current);
      console.log(!createRef?.current?.contains(e.target));
      console.log(!createBtn?.current?.contains(e.target));
      console.log(backFromTemplateBtn?.current);
      if (
        createRef?.current &&
        !createRef?.current?.contains(e.target) &&
        !createBtn?.current?.contains(e.target)
      ) {
        setCreateDropdownStatus((prev) => false);
      }
    };

    document.addEventListener("click", handleOutside);

    return () => document.removeEventListener("click", handleOutside);
  }, []);

  return (
    <div
      ref={createRef}
      onClick={(event) => {
        console.log("displaycreate2");
        event.stopPropagation();
      }}
      className="absolute z-10 top-[140%] rounded-md shadow-2xl w-[308px] min-w-[308px] bg-white border border-gray-200 py-3"
    >
      <ul>
        {createDropdownDetails?.map((each, index) => {
          return (
            <li
              className="cursor-pointer hover:bg-gray-200 px-4"
              key={index}
              onClick={() => {
                console.log("displaycreate1");
                setCreateDropdownStatus((prev) => {
                  console.log(
                    "setCreateDropdownStatus is changing from create.js"
                  );
                  return false;
                });
                if (Object.keys(each)[0] === "Board") {
                  console.log("object keys");
                  setCreateBoardSourceClick("createBtn");
                }
                setCreateDropdownDetails((prev) => {
                  let updatedCreateDropdownDetails = [...prev];
                  const property = Object.keys(
                    updatedCreateDropdownDetails[index]
                  )[0];
                  updatedCreateDropdownDetails[index] = {
                    ...updatedCreateDropdownDetails[index],
                    [property]: {
                      ...updatedCreateDropdownDetails[index][property],
                      isShowing: true,
                    },
                  };

                  return updatedCreateDropdownDetails;
                });
              }}
            >
              <div className="flex flex-col items-start py-2">
                <div className="flex justify-start items-center">
                  <div className="mr-3 text-gray-500">
                    {Object.values(each)[0].icon}
                  </div>

                  <p className="text-sm font-sans font-base text-gray-900">
                    {Object.values(each)[0].title}
                  </p>
                </div>

                <div>
                  <p className="text-[12px] font-sans font-normal text-gray-600">
                    {Object.values(each)[0].description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DisplayCreate;
