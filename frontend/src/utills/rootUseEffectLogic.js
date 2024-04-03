import { useEffect } from "react";

const rootUseEffectLogic = (templatesData, workspaceData, allCardData) => {
  useEffect(() => {
    localStorage.setItem("templatesData", JSON.stringify(templatesData));
  }, [templatesData]);

  useEffect(() => {
    localStorage.setItem("workspaceData", JSON.stringify(workspaceData));
  }, [workspaceData]);

  useEffect(() => {
    localStorage.setItem("allCardData", JSON.stringify(allCardData));
  }, [allCardData]);

  useEffect(() => {
    console.log("workspaceData changes:", workspaceData);
  }, [workspaceData]);
};

export default rootUseEffectLogic;
