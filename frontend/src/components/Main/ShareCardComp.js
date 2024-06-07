import { useOutletContext } from "react-router-dom";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faEnvelope,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";

const ShareCardComp = ({
  setShowShareCardComp,
  showShareCardComp,
  shareBtnRef,
  fromWhere,
}) => {
  const currUrl = window.location.href;

  const shareCardInputRef = useRef();

  const shareCardRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();

      if (
        shareCardRef?.current &&
        !shareCardRef?.current?.contains(e.target) &&
        !shareBtnRef?.current?.contains(e.target)
      ) {
        setShowShareCardComp(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showShareCardComp]);

  return (
    <div
      ref={shareCardRef}
      className={`w-[300px] absolute ${
        fromWhere === "card" ? "top-[240px] right-[40px]" : "top-0 right-[40px]"
      } z-[2000] shadow-lg bg-white p-4 flex flex-col border border-gray-100 rounded-md`}
    >
      <div className="flex items-center py-2 mb-2">
        <div className="text-sm text-center text-custom font-semibold flex-1">
          Share
        </div>
        <div
          className="cursor-pointer w-6 h-6 flex justify-center items-center rounded hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            setShowShareCardComp(false);
          }}
        >
          <FontAwesomeIcon icon={faX} className="text-xs text-custom" />
        </div>
      </div>

      <div className="flex items-center w-[100x]">
        <input
          ref={shareCardInputRef}
          type="text"
          value={currUrl}
          className="text-sans w-full text-sm text-custom font-semibold flex-1 mr-2 border-gray-400 border-2 rounded py-2 my-2 px-2 
                  outline-none focus:border-blue-600"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-sm font-sans rounded py-2 px-3 text-white font-semibold"
          onClick={() => navigator.clipboard.writeText(currUrl)}
        >
          Copy
        </button>
      </div>

      <div className="flex items-center mt-2">
        <a
          href={`https://twitter.com/intent/tweet?url=${currUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 mr-4"
        >
          <FontAwesomeIcon
            icon={faTwitter}
            size="lg"
            className="text-xl text-gray-500 cursor-pointer"
          />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${currUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 mr-4"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            size="lg"
            className="text-xl text-gray-500 cursor-pointer"
          />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?url=${currUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 mr-4"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            size="lg"
            className="text-xl text-gray-500 cursor-pointer"
          />
        </a>
        <a
          href={`mailto:?subject=Check%20out%20this%20link&body=${currUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            size="lg"
            className="text-xl text-gray-500 cursor-pointer"
          />
        </a>
      </div>

      <hr className="w-full border-t-1 rounded text-gray-600 my-4" />
      <div className="text-custom text-sm font-sans text-wrap flex items-center">
        <FontAwesomeIcon icon={faEarthAmericas} className="text-lg mr-2" />
        <p>Anyone one on the internet can see this template</p>
      </div>
    </div>
  );
};

export default ShareCardComp;
