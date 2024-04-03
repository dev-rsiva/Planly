import { useEffect } from "react";

export const useHandleResize = (setNavItemStatus, navItemInfo) => {
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
};
