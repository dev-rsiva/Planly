import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBoxArchive,
  faCopy,
  faDesktop,
  faFileInvoice,
  faPlus,
  faShareNodes,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext.js";
import { cardDataContext } from "../../utills/cardDataContext";
import generateUniqueNumber from "../../utills/generateUniqueNum";
import Labels from "./Labels.js";
import LabelList from "./LabelList";
import CreateLabel from "./CreateLabel";
import Boards from "../../pages/Boards.js";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import DatesCard from "./DatesCard";
import Items from "./Items";
import ProgressBarContainer from "./ProgressBarContainer";
import DeleteChecklistCard from "./DeleteChecklistCard";

const Checklist = ({
  checklist,
  newCardData,
  indexOfChecklist,
  currIndexOfChecklist,
  setCurrIndexOfChecklist,
  currIndexOfAddItemBtn,
  setCurrIndexOfAddItemBtn,
}) => {
  const [showDeleteChecklistCard, setShowDeleteChecklistCard] = useState(false);
  const paramObj = useParams();
  console.log(showDeleteChecklistCard);
  const { workspaceData } = useContext(dataContext);

  const calculateProgressPercentage = () => {
    const totalNoOfItems = checklist.items.length;
    if (!totalNoOfItems) {
      return 0;
    }
    const completedNoOfItems = checklist.items.filter(
      (item) => item.status === "completed"
    ).length;

    percentageOfCompletion = (completedNoOfItems / totalNoOfItems) * 100;

    console.log(Math.floor(percentageOfCompletion));
    return Math.floor(percentageOfCompletion);
  };

  const progressPercent = calculateProgressPercentage();

  return (
    <div className="relative my-6">
      <div className="flex justify-between items-center">
        <div className="flex">
          <FontAwesomeIcon
            icon={faSquareCheck}
            size="lg"
            className="mr-4 p-1"
          />
          <p className="font-sans text-base font-semibold text-[#172b4d]">
            {checklist?.title}
          </p>
        </div>

        <div
          className="bg-gray-300 font-semibold hover:bg-gray-400 py-1 px-2 rounded"
          // onClick={() => {
          //   setCardDescDetails((prev) => {
          //     return (prev = {
          //       ...prev,
          //       showInput: true,
          //       showEdit: false,
          //       showDesc: false,
          //     });
          //   });
          // }}
        >
          <button
            className="px-2 rounded font-sans text-sm font-semibold text-[#172b4d]"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteChecklistCard(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <ProgressBarContainer progressPercent={progressPercent} />
      </div>
      <div>
        <Items
          indexOfChecklist={indexOfChecklist}
          checklist={checklist}
          items={checklist?.items}
          currIndexOfChecklist={currIndexOfChecklist}
          setCurrIndexOfChecklist={setCurrIndexOfChecklist}
          currIndexOfAddItemBtn={currIndexOfAddItemBtn}
          setCurrIndexOfAddItemBtn={setCurrIndexOfAddItemBtn}
          paramObj={paramObj}
          workspaceData={workspaceData}
        />
      </div>
      {showDeleteChecklistCard && (
        <DeleteChecklistCard
          setShowDeleteChecklistCard={setShowDeleteChecklistCard}
          paramObj={paramObj}
          workspaceData={workspaceData}
          checklist={checklist}
        />
      )}
    </div>
  );
};

export default Checklist;
