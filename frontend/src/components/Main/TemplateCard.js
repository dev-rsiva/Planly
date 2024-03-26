import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons"; 
import dataContext from "../../utills/dataContext";

const TemplateCard = ({ template }) => {
  const navigate = useNavigate();
  console.log(template.templateId);

  const { templatesData, setTemplatesData } = useContext(dataContext);
  const templateCategory = templatesData.find((templateCategory) =>
    templateCategory.templateList.some(
      (eachTemplate) => eachTemplate.templateId === template.templateId
    )
  );

  console.log(templateCategory);

  return (
    <div
      className="w-[248px] h-[300px] mb-4 mr-4 rounded-lg cursor-pointer"
      onClick={() =>
        navigate(
          `/templates/${
            templateCategory.templateCategory
          }/${template.templateId.replace(/ /g, "-")}`
        )
      }
    >
      <div className="w-full h-[130px] relative mb-8">
        <img
          src={template.templateImage}
          className="w-full h-full object-cover rounded"
        />
        <div className="w-[48px] h-[48px] flex justify-center items-center bg-white border-gray-600 rounded-full object-cover absolute bottom-[-20px] left-3">
          <img
            src={template.creatorImage}
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>
      </div>
      <h1 className="font-bold font-sans text-sm text-[#172b4d] pb-1">
        {template.templateName}
      </h1>
      <p className="text-xs font-normal font-sans text-[#44546f] pb-1">
        by {template.createdBy}, {template.creatorProffession}
      </p>
      <p className="text-xs font-normal font-sans text-[#44546f] pb-1">
        {template.templateShortDesc}
      </p>

      <div className="flex items-center">
        <div className="text-sm font-normal font-sans text-[#44546f] pb-1 flex items-center mr-4">
          <FontAwesomeIcon icon={faFile} size="sm" className="mr-1" />
          <p className="text-sm font-normal font-sans text-[#44546f]">
            {template.copies}
          </p>
        </div>

        <div className="text-sm font-normal font-sans text-[#44546f] pb-1 flex items-center mr-4">
          <FontAwesomeIcon icon={faEye} size="sm" className="mr-1" />
          <p className="text-sm font-normal font-sans text-[#44546f]">
            {template.views}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
