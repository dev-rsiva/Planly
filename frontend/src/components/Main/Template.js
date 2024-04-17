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
import dataContext from "../../utills/dataContext";

const Template = () => {
  const [showShareCard, setShowShareCard] = useState(false);
  const [templateCategory, templateDetails] = useOutletContext();
  const currUrl = window.location.href;

  const shareCardInputRef = useRef();
  const shareCardRef = useRef();
  const shareBtn = useRef();



  const {
    createBoardWithTemplateCard,
    setCreateBoardWithTemplateCard,
    setDropDownSourceClick,
    dropDownSourceClick,
    useTemplateBtn,
  } = useContext(dataContext);

  const { templateSelected, setTemplateSelected } = useContext(dataContext);


  const renderParagraphs = (text) => {
    return text?.split("\n\n")?.map((eachPara) => {
      return <p className="mb-2">{eachPara}</p>;
    });
  };

  useEffect(() => {
    if (showShareCard && shareCardInputRef?.current) {
      shareCardInputRef?.current?.select();
      shareCardInputRef?.current?.focus();
    }
  }, [showShareCard]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();


      if (
        shareCardRef?.current &&
        !shareCardRef?.current.contains(e.target) &&
        !shareBtn?.current.contains(e.target)
      ) {
        setShowShareCard(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showShareCard]);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img
            src={templateDetails?.templateImage}
            className="w-[65px] h-[65px] rounded-full mr-4"
          />
          <div className="max-w-[475px]">
            <div className="mb-2">
              <h1 className="font-sans text-2xl font-semibold text-custom">
                {templateDetails?.templateName}
              </h1>
              <p className="text-sm font-normal text-custom">
                Created by {templateDetails?.createdBy}{" "}
                {templateDetails?.creatorProffession}
              </p>
            </div>

            <div className="flex items-center">
              <p className="text-xs text-custom font-medium mr-4">
                <FontAwesomeIcon icon={faFile} size="sm" className="mr-1" />
                {templateDetails?.copies} Copies
              </p>
              <p className="text-xs text-custom font-medium mr-4">
                <FontAwesomeIcon icon={faEye} size="sm" className="mr-1" />
                {templateDetails?.views} Views
              </p>
            </div>
          </div>
        </div>

        <div>
          <button
            ref={shareBtn}
            className="bg-gray-100 py-3 px-4 rounded font-sans text-custom font-medium text-sm mr-4 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setShowShareCard(!showShareCard);
            }}
          >
            Share
          </button>
          {showShareCard && (
            <div
              ref={shareCardRef}
              className="w-[300px] absolute top-[135px] right-[40px] z-50 shadow-lg bg-white p-4 flex flex-col border border-gray-100 rounded-md"
            >
              <div className="flex items-center py-2 mb-2">
                <div className="text-sm text-center text-custom font-semibold flex-1">
                  Share
                </div>
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareCard(false);
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
                <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-sm font-sans rounded py-2 px-3 text-white font-semibold">
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
              <div className="text-custom text-sm font-sans text-wrap flex items-baseline">
                <FontAwesomeIcon
                  icon={faEarthAmericas}
                  className="text-lg mr-2"
                />
                <p>Anyone one on the internet can see this template</p>
              </div>
            </div>
          )}
          <button
            ref={useTemplateBtn}
            className="bg-blue-600 py-3 px-4 rounded font-sans text-slate-50 font-medium text-sm mr-4 hover:bg-blue-700 cursor-pointer"
            onClick={() => {
              setDropDownSourceClick("useTemplateBtn");
              setCreateBoardWithTemplateCard(true);
              setTemplateSelected(templateDetails);
            }}
          >
            Use template
          </button>
        </div>
      </div>
      <div>
        <h1 className="text-custom font-sans font-medium text-xl mb-4">
          About this template
        </h1>
        <div className="text-blue-950 text-sans text-sm font-normal">
          {renderParagraphs(templateDetails?.aboutTemplate)}
        </div>
      </div>
    </div>
  );
};

export default Template;
