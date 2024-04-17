import { useContext, useEffect, useRef, useState } from "react";

import CreateBoard from "./CreateBoard";
import CreateWithTemplate from "./CreateWithTemplate.js";
import CreateWorkspace from "./CreateWorkspace.js";
import DisplayCreate from "./DisplayCreate.js";
import CreateBoardWithTemplate from "./CreateBoardWithTemplate.js";
import CreateBoardCopy from "./CreateBoardCopy.js";
import dataContext from "../../../utills/dataContext.js";

const Create = ({
  createDropdownStatus,
  setCreateDropdownStatus,
  createDropdownDetails,
  setCreateDropdownDetails,
  navItemStatus,
  setNavItemStatus,
  createRef,
  createBtn,
  createTemplate,
  backFromTemplateBtn,
  workspaceData,
  setWorkspaceData,
  navbarBtn,
  setNavbarBtn,
  // currWorkspace,
  // setCurrWorkspace,
}) => {


  const {
    createBoardWithTemplateCard,
    setCreateBoardWithTemplateCard,
    dropDownSourceClick,
    setDropDownSourceClick,
  } = useContext(dataContext);

  const { templateSelected, setTemplateSelected } = useContext(dataContext);



  return (
    <div
      onClick={() => {
        setNavbarBtn((prev) => {
          let updatedNavBarBtn = { ...prev };
          updatedNavBarBtn.selected = "";
          updatedNavBarBtn.hovered = "";
          return updatedNavBarBtn;
        });
      }}
    >
      {createDropdownStatus && (
        <DisplayCreate
          createRef={createRef}
          createBtn={createBtn}
          createTemplate={createTemplate}
          createDropdownStatus={createDropdownStatus}
          setCreateDropdownStatus={setCreateDropdownStatus}
          setCreateDropdownDetails={setCreateDropdownDetails}
          createDropdownDetails={createDropdownDetails}
          backFromTemplateBtn={backFromTemplateBtn}
        />
      )}
      {createDropdownDetails[0]?.Board?.isShowing && (
        <CreateBoard
          createDropdownStatus={createDropdownStatus}
          setCreateDropdownStatus={setCreateDropdownStatus}
          createDropdownDetails={createDropdownDetails}
          setCreateDropdownDetails={setCreateDropdownDetails}
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
        />
      )}
      {createDropdownDetails[1]?.Template?.isShowing && (
        <CreateWithTemplate
          setNavItemStatus={setNavItemStatus}
          createDropdownStatus={createDropdownStatus}
          setCreateDropdownStatus={setCreateDropdownStatus}
          createDropdownDetails={createDropdownDetails}
          setCreateDropdownDetails={setCreateDropdownDetails}
          backFromTemplateBtn={backFromTemplateBtn}
          createTemplate={createTemplate}
          createBoardWithTemplateCard={createBoardWithTemplateCard}
          setCreateBoardWithTemplateCard={setCreateBoardWithTemplateCard}
          setTemplateSelected={setTemplateSelected}
        />
      )}
      {createDropdownDetails[2]?.Workspace?.isShowing && (
        <CreateWorkspace
          createDropdownStatus={createDropdownStatus}
          setCreateDropdownStatus={setCreateDropdownStatus}
          createDropdownDetails={createDropdownDetails}
          setCreateDropdownDetails={setCreateDropdownDetails}
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
          // currWorkspace={currWorkspace}
          // setCurrWorkspace={setCurrWorkspace}
        />
      )}

      {createBoardWithTemplateCard && (
        <CreateBoardWithTemplate
          currTemplateData={templateSelected}
          dropDownSourceClick={dropDownSourceClick}
          createDropdownStatus={createDropdownStatus}
          setCreateDropdownStatus={setCreateDropdownStatus}
          createDropdownDetails={createDropdownDetails}
          setCreateDropdownDetails={setCreateDropdownDetails}
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
          templateSelected={templateSelected}
          createBoardWithTemplateCard={createBoardWithTemplateCard}
          setCreateBoardWithTemplateCard={setCreateBoardWithTemplateCard}
          navbarBtn={navbarBtn}
          setNavbarBtn={setNavbarBtn}
        />
      )}
    </div>
  );
};

export default Create;
