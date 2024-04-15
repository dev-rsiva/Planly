import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import DropdownComp from "./dropdowns/DropdownComp.js";
import Create from "./dropdowns/Create.js";
import { Navigate } from "react-router-dom";
import dataContext from "../../utills/dataContext.js";
import sideBarSelectionContext from "../../utills/sideBarSelectionContext.js";
import LogoContainer from "./LogoContainer.js";
import NavItemsContainer from "./NavItemsContainer.js";
import { navItemInfo } from "../../utills/constants.js";
import SearchBarContainerHeader from "./SearchBarContainerHeader.js";
import NotificationContainer from "./NotificationContainer.js";
import { useHandleResize } from "./useHandleResize.js";
import { auth } from "../../utills/firebase.js";
import { signOut } from "firebase/auth";

const Header = ({ isUserAuthenticated, setIsUserAuthenticated }) => {
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

  useHandleResize(setNavItemStatus, navItemInfo);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsUserAuthenticated(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    function handleOutsideClick(e, index) {
      console.log("handleOutside");
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
        <LogoContainer setSidebarSelection={setSidebarSelection} />
        <NavItemsContainer
          navItemStatus={navItemStatus}
          setNavItemStatus={setNavItemStatus}
          navbarBtn={navbarBtn}
          setNavbarBtn={setNavbarBtn}
          dynamicRefs={dynamicRefs}
          dropdownCompRef={dropdownCompRef}
          setCreateDropdownDetails={setCreateDropdownDetails}
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
        />

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
        <SearchBarContainerHeader />
        <NotificationContainer />
        <div className="flex items-center text-sm text-custom font-semibold">
          <span className="mr-2">{auth?.currentUser?.displayName}</span>
          <img className="w-8 mr-2" src={auth?.currentUser?.photoURL} />
          <button
            className={`font-sans text-sm font-medium text-white ${
              isUserAuthenticated ? "bg-orange-700" : "bg-blue-600"
            } rounded mr-4 w-[65px] h-[33px]`}
            onClick={() => handleSignOut()}
          >
            {isUserAuthenticated ? "Log out" : "Login"}
          </button>
        </div>
      </div>
      {console.log("render end")}
    </div>
  );
};

export default Header;
