import { useState, useEffect, useRef } from "react";

import LabelList from "./LabelList";
import CreateLabel from "./CreateLabel";

const Labels = ({
  labelsBtnRef,
  cardInfo,
  newLabelListPosition,
  chooseLabelRef,
  createLabelBtn,
  setLabelsIsShowing,
}) => {
  console.log("labels started");
  const [labelListIsShowing, setLabelListIsShowing] = useState(true);
  const [createLabelIsShowing, setCreateLabelIsShowing] = useState(false);

  const [editLabelInfo, setEditLabelInfo] = useState({
    id: "",
    title: "",
    color: "",
  });

  const [userActionOnLabel, setUserActionOnLabel] = useState("");
  const labelsRef = useRef();

  console.log(createLabelIsShowing);
  const handleOutsideClick = (e) => {
    if (
      labelsRef?.current &&
      !labelsRef.current.contains(e.target) &&
      labelsBtnRef?.current &&
      !labelsBtnRef?.current.contains(e.target)
    ) {
      console.log("inside if");
      setLabelsIsShowing(false);
      setLabelListIsShowing(true);
      setCreateLabelIsShowing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div ref={labelsRef}>
      <LabelList
        setLabelsIsShowing={setLabelsIsShowing}
        setCreateLabelIsShowing={setCreateLabelIsShowing}
        labelListIsShowing={labelListIsShowing}
        setLabelListIsShowing={setLabelListIsShowing}
        labelsRef={labelsRef}
        cardInfo={cardInfo}
        newLabelListPosition={newLabelListPosition}
        chooseLabelRef={chooseLabelRef}
        createLabelBtn={createLabelBtn}
        createLabelIsShowing={createLabelIsShowing}
        editLabelInfo={editLabelInfo}
        setEditLabelInfo={setEditLabelInfo}
        userActionOnLabel={userActionOnLabel}
        setUserActionOnLabel={setUserActionOnLabel}
      />

      {createLabelIsShowing && (
        <CreateLabel
          setLabelsIsShowing={setLabelsIsShowing}
          createLabelIsShowing={createLabelIsShowing}
          setCreateLabelIsShowing={setCreateLabelIsShowing}
          createLabelBtn={createLabelBtn}
          labelListIsShowing={labelListIsShowing}
          setLabelListIsShowing={setLabelListIsShowing}
          editLabelInfo={editLabelInfo}
          setEditLabelInfo={setEditLabelInfo}
          userActionOnLabel={userActionOnLabel}
          cardInfo={cardInfo}
        />
      )}
    </div>
  );
};

export default Labels;
