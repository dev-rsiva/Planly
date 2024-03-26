import OverviewSidebar from "../Sidebar/OverviewSidebar";

import OverviewMain from "./OverviewMain";

const Home = () => {
  return (
    <div className="flex px-32 mt-8 relative top-[45px]">
      <div className="w-1/6 mr-2">
        <div className="fixed h-[85%] overflow-y-auto">
          <OverviewSidebar />
        </div>
      </div>

      {/* <div className="flex-1 overflow-y-auto ml-[10%]">Home scroll</div> */}
      <div className="flex-1 overflow-y-auto ml-[10%]">
        <OverviewMain />
      </div>
    </div>
  );
};

export default Home;
