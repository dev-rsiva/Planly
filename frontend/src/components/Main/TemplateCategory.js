import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import TemplateCards from "./TemplateCards";
import templateCategorySelectionContext from "../../utills/templateCategorySelectionContext";

const TemplateCategory = ({ templateCategory }) => {
  const navigate = useNavigate();

  const { templateCategorySelected, setTemplateCategorySelected } = useContext(
    templateCategorySelectionContext
  );
  return (
    <div className="mb-4 mr-4">
      <div className="flex justify-between items-center mb-8 mr-14">
        <div className="flex items-center">
          <img
            src={templateCategory?.categoryImage}
            className="w-[20px] h-[20px] rounded mr-2"
          />

          <h1 className="font-semibold font-sans text-xl text-custom">
            {templateCategory?.templateCategory}
          </h1>
        </div>
        <button
          className="bg-gray-200 hover:bg-gray-300 py-[6px] px-3 rounded font-sans font-semibold text-custom text-sm"
          onClick={() => {
            setTemplateCategorySelected(templateCategory?.templateCategory);
            navigate(`/templates/${templateCategory?.templateCategory}`);
          }}
        >
          {`More templates for ${templateCategory?.templateCategory}`}
        </button>
      </div>
      <TemplateCards templateList={templateCategory?.templateList} />
    </div>
  );
};

export default TemplateCategory;
