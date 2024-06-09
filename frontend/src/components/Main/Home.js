import OverviewSidebar from "../Sidebar/OverviewSidebar";
import Highlights from "./Highlights";
import OverviewMain from "./OverviewMain";
import StarredBoardsHomePage from "./StarredBoardsHomePage";
import RecentlyViewedBoardsHomePage from "./RecentlyViewedBoardsHomePage";

const Home = () => {
  return (
    <div className="flex pl-32 pr-14 mt-8 relative top-[45px]">
      <div className="w-1/6 mr-2">
        <div className="fixed h-[85%] overflow-y-auto">
          <OverviewSidebar />
        </div>
      </div>
      <div className="flex flex-col ml-28">
        <div className="">
          <Highlights />
        </div>
      </div>
      <div className="max-h-[550px] overflow-y-auto fixed right-28">
        <div className="mb-6">
          <StarredBoardsHomePage />
        </div>
        <div className="mb-6">
          <RecentlyViewedBoardsHomePage />
        </div>
      </div>

      {/* <div className="flex-1 overflow-y-auto ml-[10%]">Home scroll</div> */}
      {/* <div className="flex-1 overflow-y-auto ml-[10%]">
        <OverviewMain />
      </div> */}
    </div>
  );
};

export default Home;
