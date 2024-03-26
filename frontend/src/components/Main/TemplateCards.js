import TemplateCard from "./TemplateCard";
const TemplateCards = ({ templateList }) => {
  return (
    <div className="flex mb-4 flex-wrap">
      {templateList?.map((template) => {
        return <TemplateCard template={template} />;
      })}
    </div>
  );
};

export default TemplateCards;
