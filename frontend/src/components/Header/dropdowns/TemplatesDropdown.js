import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import dataContext from "../../../utills/dataContext";

const TemplatesDropdown = ({ setNavItemStatus, setCreateDropdownDetails }) => {
  const {
    templatesData,
    setTemplatesData,
    setDropDownSourceClick,
    setTemplateSelected,
    setCreateBoardWithTemplateCard,
  } = useContext(dataContext);
  const [templateListshowing, setTemplateListShowing] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="absolute top-[160%] left-0 rounded-md shadow-2xl w-[308px] min-w-[308px] border border-gray-200 py-3 max-h-[570px] bg-white">
            <div className="mb-4 max-h-[400px] overflow-y-auto">
        <div className="flex justify-between items-center">
          <p className="mb-4 pl-4 text-sans text-xs text-custom font-medium">
            Top Templates
          </p>

          {templateListshowing && (
            <FontAwesomeIcon
              icon={faAngleUp}
              className="cursor-pointer text-sm p-1 rounded mr-3 mb-4 text-custom hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                setTemplateListShowing(!templateListshowing);
              }}
            />
          )}
          {!templateListshowing && (
            <FontAwesomeIcon
              icon={faAngleDown}
              className="cursor-pointer text-sm p-1 rounded mr-3 mb-4 text-custom hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                setTemplateListShowing(!templateListshowing);
              }}
            />
          )}
        </div>

        {templateListshowing && (
          <ul className="flex flex-col px-2">
            {templatesData.templates.map((templateCategory) => {
              return templateCategory.templateList.map((template) => {
                return (
                  <li
                    className="flex items-center px-2 py-2 rounded cursor-pointer hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropDownSourceClick("templatesDropdownBtn");
                      setTemplateSelected(template);
                      setCreateBoardWithTemplateCard(true);

                      setNavItemStatus((prev) => {
                        let updatedNavItemStatus = [...prev];

                        updatedNavItemStatus[3] = {
                          ...updatedNavItemStatus[3],
                          dropdownIsShowing: false,
                        };

                        return updatedNavItemStatus;
                      });
                      // setCreateDropdownDetails((prev) => {
                      //   let updatedDropdownDetails = [...prev];
                      //   updatedDropdownDetails[1] = {
                      //     ...updatedDropdownDetails[1],
                      //     Template: {
                      //       ...updatedDropdownDetails[1].Template,
                      //       isShowing: false,
                      //     },
                      //   };

                      //   return updatedDropdownDetails;
                      // });
                    }}
                  >
                    <img
                      src={template.templateImage}
                      alt="image"
                      className="w-[40px] h-[30px] mr-2 rounded"
                    />
                    <p className="text-sm font-sans text-custom font-medium">
                      {template.templateName}
                    </p>
                  </li>
                );
              });
            })}
          </ul>
        )}
        <hr />
      </div>

      <div className="flex mr-2 items-center mb-2 px-4">
        <FontAwesomeIcon
          icon={faTrello}
          color="blue"
          className="ml-1 mr-3 text-[20px]"
        />
        <p className="font-sans text-sm text-custom">
          See hundreds of templates from the Trello community
        </p>
      </div>
      <div
        className="px-4"
        onClick={() => {
          setNavItemStatus((prev) => {
            let updatedNavItemStatus = [...prev];

            updatedNavItemStatus[3] = {
              ...updatedNavItemStatus[3],
              dropdownIsShowing: false,
            };

            return updatedNavItemStatus;
          });
          navigate("/templates");
        }}
      >
        <button
          className="w-full bg-gray-200 rounded font-sans text-sm font-medium text-custom py-2 px-3 mb-3 
        hover:bg-gray-300 cursor-pointer"
        >
          Explore templates
        </button>
      </div>
    </div>
  );
};

export default TemplatesDropdown;
