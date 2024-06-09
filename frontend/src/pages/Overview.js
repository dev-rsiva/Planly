import { useContext } from "react";

import OverviewSidebar from "../components/Sidebar/OverviewSidebar.js";
import OverviewMain from "../components/Main/OverviewMain.js";
import sideBarSelectionContext from "../utills/sideBarSelectionContext.js";
import dataContext from "../utills/dataContext.js";

const Overview = () => {
  const { sidebarSelection, setSidebarSelection } = useContext(dataContext);
  return (
    <div className="flex pl-28 pr-14 mt-8 relative top-[45px]">
      <div className="w-1/6 mr-2">
        <div className="fixed h-[85%] overflow-y-auto">
          <OverviewSidebar />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto ml-[7%]">
        <OverviewMain />
      </div>
    </div>
  );
};

export default Overview;
