import { useContext } from "react";
import TemplateCategory from "./TemplateCategory";
import dataContext from "../../utills/dataContext";

const TemplateCategories = () => {
  const { templatesData, setTemplatesData } = useContext(dataContext);
  return (
    <div>
      {templatesData.map((templateCategory) => {
        return <TemplateCategory templateCategory={templateCategory} />;
      })}
    </div>
  );
};

export default TemplateCategories;
