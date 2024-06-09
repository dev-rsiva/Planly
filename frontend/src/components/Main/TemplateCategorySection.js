import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import TemplateCards from "./TemplateCards";
import FindTemplateSearchBar from "./FindTemplateSearchBar";
import ListOfTemplateCards from "./ListOfTemplateCards";
import dataContext from "../../utills/dataContext";

const TemplateCategorySection = () => {
  const navigate = useNavigate();
  const paramObj = useParams();

  const { templatesData, setTemplatesData } = useContext(dataContext);

  const templateCategory = templatesData?.templates.find((eachCategory) => {
    return eachCategory.templateCategory === paramObj.templateCategory;
  });

  const templateDetails = templateCategory?.templateList?.find((template) => {
    return template.templateId.replace(/ /g, "-") === paramObj.templateId;
  });

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="font-sans text-sm text-custom">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/templates")}
          >
            Template gallery
          </span>
          <span> / </span>
          {paramObj.templateCategory && (
            <span
              className="hover:underline cursor-pointer"
              onClick={() =>
                navigate(`/templates/${templateCategory?.templateCategory}`)
              }
            >
              {templateCategory?.templateCategory}
            </span>
          )}

          {paramObj.templateId && (
            <span>
              <span> / </span>
              <span className="hover:underline cursor-pointer">
                {templateDetails?.templateName}
              </span>
            </span>
          )}
        </h1>

        <FindTemplateSearchBar />
      </div>

      <Outlet context={[templateCategory, templateDetails]} />
    </div>
  );
};

export default TemplateCategorySection;
