import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import dataContext from "../../utills/dataContext";
import FindTemplateSearchBar from "./FindTemplateSearchBar";
const FeatureCategories = () => {
  const navigate = useNavigate();

  const { templatesData, setTemplatesData } = useContext(dataContext);
  return (
    <div>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="font-semibold font-sans text-xl text-custom">
          Featured categories
        </h1>

        <FindTemplateSearchBar />
      </div>

      <div className="flex mb-4">
        {templatesData?.templates.map((templateCategory) => {
          return (
            <div
              className="flex flex-col items-center mr-4 mb-4 cursor-pointer"
              onClick={() =>
                navigate(`/templates/${templateCategory?.templateCategory}`)
              }
            >
              <div className="w-[105px] h-[105px]">
                <img
                  src={templateCategory?.categoryImage}
                  className="w-full h-full object-cover overflow-hidden rounded-sm hover:shadow-md hover:shadow-gray-400"
                />
              </div>
              <h1 className="font-sans text-xs text-custom p-1">
                {templateCategory?.templateCategory}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureCategories;
