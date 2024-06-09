import { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext";
import { useNavigate } from "react-router-dom";
const FindTemplateSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { templatesData, setTemplatesData } = useContext(dataContext);
  const navigate = useNavigate();

  const filteredTemplatesList = templatesData?.templates
    .map((templateCategory) => {
      return templateCategory?.templateList;
    })
    .flat()
    .filter((template) =>
      template.templateName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchResultClick = (templateSelected) => {
    const templateCategoryFound = templatesData?.templates.find(
      (templateCategory) =>
        templateCategory?.templateList?.some((template) => {
          return template.templateId === templateSelected.templateId;
        })
    );

    navigate(
      `/templates/${
        templateCategoryFound.templateCategory
      }/${templateSelected.templateId.replace(/ /g, "-")}`
    );

    setSearchQuery("");
  };

  return (
    <>
      <div className="flex items-center justify-between w-[240px] h-[35px] border border-gray-300 rounded px-3 py-2 relative">
        <input
          type="search"
          placeholder="Find template"
          name="search"
          value={searchQuery}
          className="focus:outline-none text-sm"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color="gray"
          className="pr-2 text-md text-custom"
        />
      </div>

      {searchQuery.trim() !== "" && filteredTemplatesList.length > 0 && (
        <div className="flex flex-col p-2 w-[240px] absolute top-[40px] right-[130px] z-[3000] bg-white border border-gray-200 rounded-lg cursor-pointer">
          {filteredTemplatesList.map((templateSelected) => {
            return (
              <div
                className="flex items-center mb-3"
                onClick={() => {
                  handleSearchResultClick(templateSelected);
                }}
              >
                <img
                  src={templateSelected.templateImage}
                  className="w-[40px] h-[40px] rounded-md mr-2"
                />
                <div className="flex flex-col flex-1 mr-[2px]">
                  <p
                    className="text-sm font-sans text-custom font-bold overflow-hidden whitespace-nowrap overflow-ellipsis
             "
                    style={{ maxWidth: "170px" }}
                  >
                    {templateSelected.templateName}
                  </p>
                  <p className="text-xs font-sans text-custom">
                    by {templateSelected.createdBy},{" "}
                    {templateSelected.creatorProffession}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FindTemplateSearchBar;
