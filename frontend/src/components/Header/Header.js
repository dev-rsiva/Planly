import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import DropdownComp from "./dropdowns/DropdownComp.js";
import Create from "./dropdowns/Create.js";
import { Navigate } from "react-router-dom";
import dataContext from "../../utills/dataContext.js";
import sideBarSelectionContext from "../../utills/sideBarSelectionContext.js";

const Header = () => {
  console.log("render start");

  const {
    workspaceData,
    setWorkspaceData,
    createDropdownDetails,
    setCreateDropdownDetails,
  } = useContext(dataContext);

  const { sidebarSelection, setSidebarSelection } = useContext(
    sideBarSelectionContext
  );

  let navItemInfo = [
    { Name: "Workspaces", isShowing: true, dropdownIsShowing: false },
    { Name: "Recent", isShowing: true, dropdownIsShowing: false },
    { Name: "Starred", isShowing: true, dropdownIsShowing: false },
    { Name: "Templates", isShowing: true, dropdownIsShowing: false },
    { Name: "More", isShowing: false, dropdownIsShowing: false },
  ];

  const navigate = useNavigate();

  const dynamicRefs = useRef({});

  const createRef = useRef(null);

  const dropdownCompRef = useRef();

  const createBtn = useRef(null);
  const createTemplate = useRef(null);
  const backFromTemplateBtn = useRef(null);
  console.log(backFromTemplateBtn?.current);

  const windowSize = window.innerWidth;

  const [navItemStatus, setNavItemStatus] = useState(navItemInfo);
  const [createDropdownStatus, setCreateDropdownStatus] = useState(false);

  const [navbarBtn, setNavbarBtn] = useState({ hovered: "", selected: "" });

  console.log(navItemStatus[3]?.dropdownIsShowing);

  console.log(createDropdownStatus);

  // const newMapCreateDropdownInfo = new Map([
  //   [
  //     "Board",
  //     {
  //       icon: <FontAwesomeIcon icon={faSquarePollVertical} />,
  //       title: "Create a Board",
  //       description:
  //         "A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything",
  //       isShowing: false,
  //     },
  //   ],

  //   [
  //     "Template",
  //     {
  //       icon: <FontAwesomeIcon icon={faFile} />,
  //       title: "Start with a template",
  //       description: "Get started faster with a board template",
  //       isShowing: false,
  //     },
  //   ],
  //   [
  //     "Workspace",
  //     {
  //       icon: <FontAwesomeIcon icon={faUserGroup} />,
  //       title: "Create Workspace",
  //       description:
  //         "A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.",
  //       isShowing: false,
  //     },
  //   ],
  // ]);

  const handleResize = () => {
    console.log("handleResize");
    const currScreenWidth = window.innerWidth;
    const updatedNavItemInfo = navItemInfo.map((each) => {
      return { ...each, isShowing: false };
    });

    if (currScreenWidth > 0) {
      updatedNavItemInfo[4].isShowing = true;
    }

    if (currScreenWidth > 640) {
      updatedNavItemInfo[0].isShowing = true;
      updatedNavItemInfo[4].isShowing = true;
    }

    if (currScreenWidth > 768) {
      updatedNavItemInfo[0].isShowing = true;
      updatedNavItemInfo[1].isShowing = true;
      updatedNavItemInfo[4].isShowing = true;
    }

    if (currScreenWidth > 1280) {
      updatedNavItemInfo[0].isShowing = true;
      updatedNavItemInfo[1].isShowing = true;
      updatedNavItemInfo[2].isShowing = true;
      updatedNavItemInfo[3].isShowing = true;
      updatedNavItemInfo[4].isShowing = false;
    }

    setNavItemStatus(updatedNavItemInfo);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(e, index) {
      console.log("handleOutside");
      // console.log(dynamicRefs?.current[index]);
      // console.log(!dynamicRefs?.current[index]?.contains(e.target));
      // console.log(navItemStatus[index]?.dropdownIsShowing);
      console.log(dropdownCompRef?.current);
      if (
        dynamicRefs.current[index] &&
        !dynamicRefs.current[index].contains(e.target) &&
        !dropdownCompRef?.current?.contains(e.target) &&
        navItemStatus[index]?.dropdownIsShowing
      ) {
        console.log("inside if");
        setNavItemStatus((prev) => {
          console.log("inside");
          let updatedNavItemStatus = [...prev];
          updatedNavItemStatus[index] = {
            ...updatedNavItemStatus[index],
            dropdownIsShowing: false,
          };

          return updatedNavItemStatus;
        });
        setNavbarBtn((prev) => {
          let updatedNavBarBtn = { ...prev };
          if (
            !dynamicRefs?.current[0]?.contains(e.target) &&
            !dynamicRefs?.current[1]?.contains(e.target) &&
            !dynamicRefs?.current[2]?.contains(e.target) &&
            !dynamicRefs?.current[3]?.contains(e.target) &&
            (dynamicRefs?.current[4]
              ? !dynamicRefs?.current[4]?.contains(e.target)
              : true)
          ) {
            updatedNavBarBtn.selected = "";
            updatedNavBarBtn.hovered = "";
          }
          console.log(updatedNavBarBtn);
          return updatedNavBarBtn;
        });
      }
    }

    const clickHandler = (e) => {
      navItemStatus.forEach((_, index) => {
        handleOutsideClick(e, index);
      });
    };

    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  }, [
    navItemStatus[0].dropdownIsShowing,
    navItemStatus[1].dropdownIsShowing,
    navItemStatus[2].dropdownIsShowing,
    navItemStatus[3].dropdownIsShowing,
    navItemStatus[4].dropdownIsShowing,
  ]);

  useEffect(() => {
    console.log("createDropdownStatus Changed:", createDropdownStatus);
  }, [createDropdownStatus]);

  useEffect(() => {
    console.log("navItemStatus Changed:", navItemStatus);
  }, [navItemStatus]);

  console.log(sidebarSelection);

  return (
    <div className="flex justify-between items-center bg-white max-h-[60px] border border-b-gray-200 px-4 py-[6px] w-full fixed top-0 z-[2000]">
      <div className="flex items-center">
        {/* <div className="w-full mr-4">
          <FontAwesomeIcon icon={faGrip} size="2xl" />
        </div> */}

        <div
          id="logo-container"
          className="ml-8 mr-8 flex justify-center items-center cursor-pointer"
          onClick={() => {
            console.log("header3");
            console.log("onClicked logo");
            setSidebarSelection("Boards");
            navigate("/user");
          }}
        >
          <FontAwesomeIcon
            icon={faTrello}
            color="#455570"
            className="mr-2 text-[16px]"
          />
          <p className="text-xl font-mono font-extrabold text-[#5F6D85]">
            Planly
          </p>
        </div>
        <div
          id="navItem-container"
          className="mr-4 flex justify-center items-center"
        >
          {console.log("header rendering process")}
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
                    console.log("header2");
                    console.log(`onClicked ${navItem.Name}`);
                    console.log(
                      `${navItem.Name} dropdown changing from Header.js`
                    );
                    setNavItemStatus((prev) => {
                      const updatedNavItemStatus = [...prev];
                      updatedNavItemStatus[i] = {
                        ...updatedNavItemStatus[i],
                        dropdownIsShowing:
                          !updatedNavItemStatus[i].dropdownIsShowing,
                      };
                      return updatedNavItemStatus;
                    });
                  }}
                >
                  <p
                    className={`h-full font-sans text-sm font-medium text-custom mr-1 ${
                      navbarBtn?.selected === navItem.Name
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    {navItem?.Name}
                  </p>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    size="sm"
                    className={`pt-[2px] pl-1 text-custom ${
                      navbarBtn?.selected === navItem.Name
                        ? "text-blue-600"
                        : ""
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
                      handleResize={handleResize}
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
        <div className="relative">
          <button
            ref={createBtn}
            className="font-sans text-sm font-medium text-white bg-blue-600 rounded mr-4 w-[65px] h-[33px]"
            onClick={() => {
              console.log("header1");
              console.log("onClicked create");
              setCreateDropdownStatus((prevState) => !prevState);

              setCreateDropdownDetails((prev) => {
                let updatedCreateDropdownDetails = [...prev];
                prev.map((each) => {
                  each = {
                    ...each,
                    [Object.keys(each)[0]]: {
                      ...each[Object.keys(each)[0]],
                      isShowing: false,
                    },
                  };
                  return each;
                });
                return prev;
              });
            }}
          >
            Create
          </button>
          <Create
            createDropdownStatus={createDropdownStatus}
            setCreateDropdownStatus={setCreateDropdownStatus}
            createDropdownDetails={createDropdownDetails}
            setCreateDropdownDetails={setCreateDropdownDetails}
            navItemStatus={navItemStatus}
            setNavItemStatus={setNavItemStatus}
            createRef={createRef}
            createBtn={createBtn}
            createTemplate={createTemplate}
            backFromTemplateBtn={backFromTemplateBtn}
            workspaceData={workspaceData}
            setWorkspaceData={setWorkspaceData}
            navbarBtn={navbarBtn}
            setNavbarBtn={setNavbarBtn}
            // currWorkspace={currWorkspace}
            // setCurrWorkspace={setCurrWorkspace}
          />
        </div>
      </div>

      <div className="flex items-center mr-4">
        <div
          id="search-container"
          className="flex items-center w-[200px] h-[32px] mr-4 border border-gray-300 rounded px-2"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            color="gray"
            className="pr-2 text-xs text-custom"
          />
          <input
            type="search"
            placeholder="Search"
            name="search"
            value=""
            onChange={() => {}}
            className="w-[150px] focus:outline-none font-sans text-sm placeholder:text-custom font-normal"
          />
        </div>
        <div className="mr-4 cursor-not-allowed">
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div className="mr-4 cursor-not-allowed">
          <FontAwesomeIcon icon={faCircleQuestion} />
        </div>
      </div>
      {console.log("render end")}
    </div>
  );
};

export default Header;
