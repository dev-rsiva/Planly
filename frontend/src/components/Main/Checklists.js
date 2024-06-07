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
import Checklist from "./Checklist";

const Checklists = ({ newCardData }) => {
  const [currIndexOfChecklist, setCurrIndexOfChecklist] = useState(null);
  const [currIndexOfAddItemBtn, setCurrIndexOfAddItemBtn] = useState(true);
  console.log(currIndexOfChecklist);
  return (
    <div>
      {newCardData?.checklists?.map((eachChecklist, indexOfChecklist) => {
        return (
          <Checklist
            checklist={eachChecklist}
            newCardData={newCardData}
            indexOfChecklist={indexOfChecklist}
            currIndexOfChecklist={currIndexOfChecklist}
            setCurrIndexOfChecklist={setCurrIndexOfChecklist}
            currIndexOfAddItemBtn={currIndexOfAddItemBtn}
            setCurrIndexOfAddItemBtn={setCurrIndexOfAddItemBtn}
          />
        );
      })}
    </div>
  );
};

export default Checklists;
