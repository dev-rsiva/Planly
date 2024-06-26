import { useState, useContext, useEffect } from "react";

import WorkspacesDropdown from "./WorkspacesDropdown.js";
import RecentDropdown from "./RecentDropdown.js";
import StarredDropdown from "./StarredDropdown.js";
import TemplatesDropdown from "./TemplatesDropdown.js";
import MoreDropdown from "./MoreDropdown.js";
import dataContext from "../../../utills/dataContext.js";

const DropdownComp = ({
  dropdownCompRef,
  navItemStatus,
  setNavItemStatus,
  dropdownName,
  workspaceData,
  setWorkspaceData,
  setCreateDropdownDetails,
  navbarBtn,
  setNavbarBtn,
  // i,
  // currWorkspace,
  // setCurrWorkspace,
}) => {
  console.log("DropdownComp start");

  const dropdownDetails = [
    {
      Workspaces: [
        { "Workspace Icon": "N", "Workspace Name": "New Work" },
        { "Workspace Icon": "S", "Workspace Name": "Siva's Workspace" },
      ],
    },

    {
      Recent: [
        {
          "Workspace Icon": "",
          "Workspace Title": "ds",
          "Workspace Subtitle": "Siva's Workspace",
        },
        {
          "Workspace Icon": "",
          "Workspace Title": "rtt",
          "Workspace Subtitle": "Siva's Workspace",
        },
      ],
    },

    {
      Starred: [
        {
          "Workspace Icon": "",
          "Workspace Title": "ds",
          "Workspace Subtitle": "Siva's Workspace",
        },
        {
          "Workspace Icon": "",
          "Workspace Title": "ds",
          "Workspace Subtitle": "Siva's Workspace",
        },
      ],
    },

    {
      Templates: [
        {
          "Workspace Icon": "",
          "Workspace Title": "1 on 1 meeting",
          "Workspace Subtitle": "",
        },
        {
          "Workspace Icon": "",
          "Workspace Title": "Agile board template",
          "Workspace Subtitle": "",
        },
        {
          "Workspace Icon": "",
          "Workspace Title": "Company overview",
          "Workspace Subtitle": "",
        },
      ],
    },

    {
      More: [],
    },
  ];

  const [dropdownState, setDropdownState] = useState(dropdownDetails);

  let updatedMoreDetails = [...dropdownDetails[4].More];
  if (dropdownName === "More") {
    navItemStatus.map((each) => {
      if (!each.isShowing) {
        const newObj = { hidedItem: each.Name };
        updatedMoreDetails.push(newObj);
      }
    });
  }
  console.log(updatedMoreDetails);

  // const info = navItemStatus.map((each, index) => {
  //   const updatedDropdownDetails = { ...dropdownDetails[index] };

  //   // Check if isShowing is false
  //   if (!each.isShowing) {
  //     console.log(each);
  //     // Update the data in the "Dropdown details more" location

  //     const newObj = { hidedItem: each.Name };
  //     updatedMoreDetails[4].More.push(newObj);

  //     // You can add more conditions and update other locations as needed
  //     // updatedMoreDetails[5] = "Another updated data";

  //     // Return the updated array
  //     return updatedMoreDetails;
  //   }

  //   // Return the previous state if isShowing is true
  //   return dropdownDetails;
  // });

  // console.log(info);
  // console.log(info[4].More);
  // useEffect(() => {
  //   console.log("Dropdown UseEffect called");
  //   function updateMoreDropdown() {
  //     console.log("updateMoreDropdown");
  //     navItemStatus.map((each) => {
  //       return setDropdownState((prev) => {
  //         const updatedMoreDetails = [...prev];

  //         // Check if isShowing is false
  //         if (!each.isShowing) {
  //           console.log(each);
  //           // Update the data in the "Dropdown details more" location

  //           const newObj = { hidedItem: each.Name };
  //           updatedMoreDetails[4].More.push(newObj);

  //           // You can add more conditions and update other locations as needed
  //           // updatedMoreDetails[5] = "Another updated data";

  //           // Return the updated array
  //           return updatedMoreDetails;
  //         }

  //         // Return the previous state if isShowing is true
  //         return prev;
  //       });
  //     });
  //   }

  //   updateMoreDropdown();
  // }, [navItemStatus]);

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        setNavbarBtn((prev) => {
          let updatedNavBarBtn = { ...prev };
          updatedNavBarBtn.selected = "";
          updatedNavBarBtn.hovered = "";
          return updatedNavBarBtn;
        });
      }}
      ref={dropdownCompRef}
    >
      {dropdownName === "Workspaces" ? (
        <WorkspacesDropdown
          info={dropdownState[0].Workspaces}
          navItemStatus={navItemStatus}
          setNavItemStatus={setNavItemStatus}
          workspaceData={workspaceData}
          setWorkspaceData={setWorkspaceData}
          // currWorkspace={currWorkspace}
          // setCurrWorkspace={setCurrWorkspace}
        />
      ) : dropdownName === "Recent" ? (
        <RecentDropdown
          info={dropdownState[1].Recent}
          navItemStatus={navItemStatus}
          setNavItemStatus={setNavItemStatus}
        />
      ) : dropdownName === "Starred" ? (
        <StarredDropdown
          info={dropdownState[2].Starred}
          navItemStatus={navItemStatus}
          setNavItemStatus={setNavItemStatus}
        />
      ) : dropdownName === "Templates" ? (
        <TemplatesDropdown
          info={dropdownState[3].Templates}
          navItemStatus={navItemStatus}
          setNavItemStatus={setNavItemStatus}
          setCreateDropdownDetails={setCreateDropdownDetails}
        />
      ) : dropdownName === "More" ? (
        <MoreDropdown
          // key={i}
          info={updatedMoreDetails}
          navItemStatus={navItemStatus}
          setNavItemStatus={setNavItemStatus}
        />
      ) : (
        ""
      )}
      {console.log("DropdownComp end")}
    </div>
  );
};

export default DropdownComp;
