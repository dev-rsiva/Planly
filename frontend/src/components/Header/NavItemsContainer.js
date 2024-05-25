import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import DropdownComp from "./dropdowns/DropdownComp";
const NavItemsContainer = ({
  navItemStatus,
  setNavItemStatus,
  navbarBtn,
  setNavbarBtn,
  dynamicRefs,
  dropdownCompRef,
  setCreateDropdownDetails,
  workspaceData,
  setWorkspaceData,
}) => {
  console.log("navItems Container running", navItemStatus);
  return (
    <div
      id="navItem-container"
      className="mr-4 flex justify-center items-center"
    >
      {navItemStatus?.map((navItem, i) => {
        return (
          navItem?.isShowing && (
            <div
              className={`w-full h-full relative flex justify-center items-center py-[5px] px-3 mr-1 cursor-pointer ${
                navbarBtn?.selected === navItem.Name
                  ? "bg-blue-50 text-blue-600"
                  : navbarBtn?.hovered === navItem.Name
                  ? "bg-gray-200"
                  : ""
              } rounded-[3px]`}
              ref={(element) => (dynamicRefs.current[i] = element)}
              key={i}
              onMouseEnter={() =>
                setNavbarBtn((prev) => {
                  let updatedNavBarBtn = { ...prev };
                  updatedNavBarBtn.hovered = navItem.Name;
                  return updatedNavBarBtn;
                })
              }
              onMouseLeave={() =>
                setNavbarBtn((prev) => {
                  let updatedNavBarBtn = { ...prev };
                  updatedNavBarBtn.hovered =
                    updatedNavBarBtn.hovered === navItem.Name
                      ? ""
                      : navItem.Name;
                  return updatedNavBarBtn;
                })
              }
              onClick={() => {
                setNavbarBtn((prev) => {
                  let updatedNavBarBtn = { ...prev };
                  updatedNavBarBtn.selected =
                    updatedNavBarBtn.selected === navItem.Name
                      ? ""
                      : navItem.Name;
                  return updatedNavBarBtn;
                });
                setNavItemStatus((prev) => {
                  console.log("navitem set");
                  const updatedNavItemStatus = [...prev];
                  updatedNavItemStatus[i] = {
                    ...updatedNavItemStatus[i],
                    dropdownIsShowing:
                      !updatedNavItemStatus[i].dropdownIsShowing,
                  };
                  console.log(updatedNavItemStatus);
                  return updatedNavItemStatus;
                });
              }}
            >
              <p
                className={`h-full font-sans text-sm font-medium text-custom mr-1 ${
                  navbarBtn?.selected === navItem.Name ? "text-blue-600" : ""
                }`}
              >
                {navItem?.Name}
              </p>
              <FontAwesomeIcon
                icon={faAngleDown}
                size="sm"
                className={`pt-[2px] pl-1 text-custom ${
                  navbarBtn?.selected === navItem.Name ? "text-blue-600" : ""
                }`}
              />

              {navItemStatus[i].dropdownIsShowing && (
                <DropdownComp
                  // key={i}
                  dropdownCompRef={dropdownCompRef}
                  navItemStatus={navItemStatus}
                  setNavItemStatus={setNavItemStatus}
                  setCreateDropdownDetails={setCreateDropdownDetails}
                  dropdownName={navItemStatus[i].Name}
                  //   handleResize={handleResize}
                  workspaceData={workspaceData}
                  setWorkspaceData={setWorkspaceData}
                  navbarBtn={navbarBtn}
                  setNavbarBtn={setNavbarBtn}
                  // currWorkspace={currWorkspace}
                  // setCurrWorkspace={setCurrWorkspace}
                />
              )}
            </div>
          )
        );
      })}
    </div>
  );
};

export default NavItemsContainer;
