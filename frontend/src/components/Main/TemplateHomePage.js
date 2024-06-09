import { useState } from "react";

import OverviewSidebar from "../Sidebar/OverviewSidebar";
import TemplateMain from "./TemplateGallery";
import { Outlet } from "react-router-dom";
import templateCategorySelectionContext from "../../utills/templateCategorySelectionContext";
const TemplateHomePage = () => {
  const [templateCategorySelected, setTemplateCategorySelected] =
    useState("All");

  return (
    <div className="flex pl-32 pr-14 mt-8 relative top-[45px] ">
      <templateCategorySelectionContext.Provider
        value={{ templateCategorySelected, setTemplateCategorySelected }}
      >
        <div className="w-1/6 mr-2">
          <div className={`fixed h-[85%] overflow-y-auto`}>
            <OverviewSidebar
            // templateCategorySelected={templateCategorySelected}
            // setTemplateCategorySelected={setTemplateCategorySelected}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto ml-[10%]">
          <Outlet />
        </div>
      </templateCategorySelectionContext.Provider>
    </div>
  );
};

export default TemplateHomePage;
