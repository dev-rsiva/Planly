import { useState, useContext } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faTrello } from "@fortawesome/free-brands-svg-icons";
import { visibilityDetails } from "../../../utills/visibilityData";
import dataContext from "../../../utills/dataContext";

const CreateWithTemplate = ({
  setNavItemStatus,
  createDropdownStatus,
  setCreateDropdownStatus,
  createDropdownDetails,
  setCreateDropdownDetails,
  backFromTemplateBtn,
  createTemplate,
  createBoardWithTemplateCard,
  setCreateBoardWithTemplateCard,
  setTemplateSelected,
}) => {
  const templateDetails = [
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/350dda08d977f92d756f3d9ec111ea66/photo-1521495084171-3ad639e3d525.jpg",
      templateName: "1-on-1 Meeting Agenda",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/53baf533e697a982248cd73f/480x480/96406688eb291c869064290cfb9b0c80/shutterstock_134707556.jpg",
      templateName: "Agile Board Template | Trello",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/4315f9a5b3c78f696d170e9b626a44d6/e2d2752f.jpg",
      templateName: "Company Overview",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/320x480/ff001cf6d3206de96d324c4a3646f844/photo-1500462918059-b1a0cb512f1d.jpg",
      templateName: "Design Huddle ",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/5755843411a2cd8c83067c03/480x320/cf2d1e29e8e3a4857a5f58f500fb464c/ian-dooley-407846-unsplash.jpg",
      templateName: "Go To Market Strategy Template",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x322/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg",
      templateName: "Kanban Template",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/963ddbe30ac0e2ab51ed5ed7403a5143/photo-1523266092241-0077129f31fe.jpg",
      templateName: "Mise-En-Place Personal Productivity System",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x336/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg",
      templateName: "Project Management",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg",
      templateName: "Remote Team Meetings",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x270/efea59b89ada0934c5256715fb180bd9/photo-1463107971871-fbac9ddb920f.jpg",
      templateName: "Simple Project Board",
    },
    {
      image:
        "https://trello-backgrounds.s3.amazonaws.com/575584dacedaafdf0d8660c2/480x272/02a67bbc2d5b879d912dad85eb5f3a05/asset_3.png",
      templateName: "Teaching: Weekly Planning",
    },
  ];

  const { templatesData, setTemplatesData, setDropDownSourceClick } =
    useContext(dataContext);

  const [templateListshowing, setTemplateListShowing] = useState(true);
  const [editedData, setEditedData] = useState({
    id: "",
    title: "",
    backgroundImg: "",
    visibility: visibilityDetails.find((each) => each.isShowing === true).name,
  });

  const navigate = useNavigate();

  useEffect(() => {
    function handleOutside(e) {
      if (
        createTemplate?.current &&
        !createTemplate?.current?.contains(e.target)
      ) {
        setCreateDropdownDetails((prev) => {
          let updatedCreateDropdownDetails = [...prev];
          updatedCreateDropdownDetails[1] = {
            ...updatedCreateDropdownDetails[1],
            Template: {
              ...updatedCreateDropdownDetails[1].Template,
              isShowing: false,
            },
          };
          return updatedCreateDropdownDetails;
        });
      }
    }

    document.addEventListener("click", handleOutside);

    return () => document.removeEventListener("click", handleOutside);
  }, [createDropdownDetails[1].Template.isShowing]);

  return (
    <div
      className="absolute top-[140%] rounded-md shadow-2xl w-[308px] min-w-[308px] border border-gray-200 py-2 max-h-[570px] bg-white"
      ref={createTemplate}
    >
      <div className="flex justify-between items-center mb-4 px-4">
        <div
          ref={backFromTemplateBtn}
          onClick={(event) => {
            event.stopPropagation();
            setCreateDropdownStatus(true); // Close CreateTemplate
            setCreateDropdownDetails((prev) => {
              let updatedCreateDropdownDetails = [...prev];
              updatedCreateDropdownDetails[1] = {
                ...updatedCreateDropdownDetails[1],
                Template: {
                  ...updatedCreateDropdownDetails[1].Template,
                  isShowing: false,
                },
              };
              return updatedCreateDropdownDetails;
            });
          }}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="cursor-pointer text-sm"
          />
        </div>
        <div className="text-sm text-sans text-custom font-semibold">
          Create with Template
        </div>
        <div
          onClick={() => {
            setCreateDropdownDetails((prev) => {
              let updatedCreateDropdownDetails = [...prev];
              updatedCreateDropdownDetails[1] = {
                ...updatedCreateDropdownDetails[1],
                Template: {
                  ...updatedCreateDropdownDetails[1].Template,
                  isShowing: false,
                },
              };

              return updatedCreateDropdownDetails;
            });
          }}
        >
          <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
        </div>
      </div>

      <div className="mb-4 max-h-[400px] overflow-y-auto">
        <div className="flex justify-between items-center">
          <p className="mb-4 pl-4 text-sans text-xs text-custom font-medium">
            Top Templates
          </p>

          {templateListshowing && (
            <FontAwesomeIcon
              icon={faAngleUp}
              className="cursor-pointer text-sm pr-4 mb-4 text-custom"
              onClick={(e) => {
                e.stopPropagation();
                setTemplateListShowing(!templateListshowing);
              }}
            />
          )}
          {!templateListshowing && (
            <FontAwesomeIcon
              icon={faAngleDown}
              className="cursor-pointer text-sm pr-4 mb-4 text-custom"
              onClick={(e) => {
                e.stopPropagation();
                setTemplateListShowing(!templateListshowing);
              }}
            />
          )}
        </div>

        {templateListshowing && (
          <ul className="flex flex-col px-2">
            {templatesData?.templates.map((templateCategory) => {
              return templateCategory?.templateList?.map((template) => {
                return (
                  <li
                    className="flex items-center px-2 py-2 rounded hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropDownSourceClick("createBtn");
                      setTemplateSelected(template);
                      setCreateBoardWithTemplateCard(true);
                      setCreateDropdownDetails((prev) => {
                        let updatedDropdownDetails = [...prev];
                        updatedDropdownDetails[1] = {
                          ...updatedDropdownDetails[1],
                          Template: {
                            ...updatedDropdownDetails[1].Template,
                            isShowing: false,
                          },
                        };

                        return updatedDropdownDetails;
                      });
                    }}
                  >
                    <img
                      src={template.templateImage}
                      alt="image"
                      className="w-[40px] h-[30px] mr-2 rounded"
                    />
                    <p className="text-sm font-sans text-custom font-medium">
                      {template.templateName}
                    </p>
                  </li>
                );
              });
            })}
          </ul>
        )}
        <hr />
      </div>

      <div className="flex mr-2 items-center mb-2 px-4">
        <FontAwesomeIcon
          icon={faTrello}
          color="blue"
          className="ml-1 mr-3 text-[20px]"
        />
        <p className="font-sans text-sm text-custom">
          See hundreds of templates from the Trello community
        </p>
      </div>
      <div
        className="px-4"
        onClick={() => {
          setCreateDropdownDetails((prev) => {
            let updatedCreateDropdownDetails = [...prev];
            updatedCreateDropdownDetails[1] = {
              ...updatedCreateDropdownDetails[1],
              Template: {
                ...updatedCreateDropdownDetails[1].Template,
                isShowing: false,
              },
            };

            return updatedCreateDropdownDetails;
          });
          navigate("/templates");
        }}
      >
        <button
          className="w-full bg-gray-200 rounded font-sans text-sm font-medium text-custom py-2 px-3 mb-3 
        hover:bg-gray-300 cursor-pointer"
        >
          Explore templates
        </button>
      </div>
    </div>
  );
};

export default CreateWithTemplate;
