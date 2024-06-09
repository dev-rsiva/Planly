import TemplateCards from "./TemplateCards";
import { useOutletContext } from "react-router-dom";
const ListOfTemplateCards = () => {
  const [templateCategory] = useOutletContext();
  return (
    <div className="mb-4 mr-4">
      <div className="flex justify-between items-center mb-8 mr-14">
        <div className="flex items-center">
          <img
            src={templateCategory?.categoryImage}
            className="w-[50px] h-[50px] rounded mr-2"
          />

          <h1 className="font-semibold font-sans text-xl text-custom">
            {templateCategory?.templateCategory} Templates
          </h1>
        </div>
        {/* <button className="bg-gray-300 py-[6px] px-3 rounded font-sans font-semibold text-custom text-sm">
    {`More templates for ${templateCategory?.templateCategory}`}
  </button> */}
      </div>
      <TemplateCards templateList={templateCategory?.templateList} />
    </div>
  );
};

export default ListOfTemplateCards;
