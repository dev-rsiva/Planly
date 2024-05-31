import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock } from "@fortawesome/free-solid-svg-icons";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Checklists from "./Checklists";

const ChecklistContainer = ({ newCardData }) => {
  return (
    <div className="p-2 w-full">
      <Checklists newCardData={newCardData} />
    </div>
  );
};

export default ChecklistContainer;
