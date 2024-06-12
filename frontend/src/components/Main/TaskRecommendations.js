import React, { useEffect, useState, useContext, useRef } from "react";
import { openai } from "../../utills/openai";
import { updateFirebaseDoc } from "../../utills/updateFirebase";
import { updateHighlightsDatabase } from "../../utills/updateHighlightsDatabase";
import generateUniqueNumber from "../../utills/generateUniqueNum";
import dataContext from "../../utills/dataContext.js"; // Assuming you have a context to get workspaceData and user
import { sortedLabels } from "../../utills/labelColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faSquareCheck,
  faBars,
} from "@fortawesome/free-regular-svg-icons";
import { faCheck, faListCheck } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

const TaskRecommendations = ({
  boardDesc,
  startGeneratingTasks,
  setStartGeneratingTasks,
  workspaceInfo,
  boardInfo,
  setShowGptTasks,
  setShowTaskCreator,
  loading,
  setLoading,
}) => {
  const [tasks, setTasks] = useState(null);
  const { workspaceData, user } = useContext(dataContext); // Assuming you have these in context
  let taskRef = useRef(null);

  console.log(tasks);
  console.log(taskRef);

  const formatDate = (dateString) => {
    console.log(dateString);
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
    const now = new Date();
    const options = { month: "short", day: "numeric" };
    if (date.getFullYear() !== now.getFullYear()) {
      options.year = "numeric";
    }
    console.log(new Intl.DateTimeFormat("en-US", options).format(date));
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getTimeStamp = (dateString) => {
    console.log(dateString);
    const date = new Date(dateString);
    return date.getTime();
  };

  const updateListWithRecommendedTasks = async (tasks, workspaceData) => {
    const updatedWorkspaceData = { ...workspaceData };

    const id = generateUniqueNumber("Task Recommendations", 5);
    const lastFourChars = id.slice(-4);

    let newList = {
      id: id,
      title: `Task Recommendations - ${lastFourChars}`,
      cards: [],
      watching: false,
    };

    console.log(newList);
    tasks?.forEach((task, index) => {
      const { title, description, startDate, endDate } = task;
      console.log(task);
      console.log(formatDate(startDate));
      console.log(formatDate(endDate));

      let newCard = {
        id: generateUniqueNumber(title, 5),
        title: title,
        description: description,
        coverImg: "",
        Activities: [],
        labels: sortedLabels.map((eachLabel, labelIndex) => {
          if (index !== labelIndex) {
            return eachLabel;
          }
          return { ...eachLabel, isChecked: true };
        }),
        checklists: [],
        members: [],
        covers: [],
        dates: {
          start: startDate ? formatDate(startDate) : "",
          startObj: startDate ? new Date(startDate) : "",
          due: endDate ? formatDate(endDate) : "",
          dueObj: endDate ? new Date(endDate) : "",
          status: "Overdue",
        },
        dueDateTime: "",
        attachments: [],
        cover: [],
        customFields: [],
        archived: false,
        watchers: [],
        assignedTo: [],
        subscribers: [],
        dueDate: endDate ? getTimeStamp(endDate) : "",
        highlights: [],
      };
      console.log(newCard);

      // Add new card to the list
      newList?.cards?.push(newCard);
    });

    console.log(newList);

    updatedWorkspaceData.workspaces = updatedWorkspaceData?.workspaces?.map(
      (eachWorkspace) => {
        if (eachWorkspace?.id !== workspaceInfo?.id) {
          return eachWorkspace;
        }

        return {
          ...eachWorkspace,
          boards: eachWorkspace?.boards?.map((eachBoard) => {
            if (eachBoard?.id !== boardInfo?.id) {
              return eachBoard;
            }

            return { ...eachBoard, lists: [newList, ...eachBoard?.lists] };
          }),
        };
      }
    );

    console.log("firebase");

    console.log(updatedWorkspaceData);
    // Update Firebase with the new data
    await updateFirebaseDoc(updatedWorkspaceData);

    setShowTaskCreator(false);
    setShowGptTasks(false);
    console.log("Tasks updated successfully");
  };

  //   function addTaskRecommendations(e) {
  //     e.stopPropagation();

  //     let newCard = {
  //       id: generateUniqueNumber(cardTitle, 5),
  //       title: cardTitle,
  //       description: "",
  //       coverImg: "",
  //       Activities: [],
  //       labels: sortedLabels,
  //       checklists: [],
  //       members: [],
  //       covers: [],
  //       dates: { start: null, due: null },
  //       attachments: [],
  //       cover: [],
  //       customFields: [],
  //       archived: false,
  //       watchers: [],
  //       assignedTo: [],
  //       subscribers: [],
  //       dueDate: "",
  //       highlights: [],
  //     };

  //     let updatedworkspaceData = { ...workspaceData };
  //     const workspace = updatedworkspaceData.workspaces?.find((workspace) =>
  //       workspace?.boards?.some((board) =>
  //         board?.lists?.some((eachlist) => eachlist.id === list?.id)
  //       )
  //     );

  //     const board = workspace?.boards?.find(
  //       (board) => board?.id === boardInfo.id
  //     );

  //     const listToBeAdded = board?.lists?.find(
  //       (eachList) => eachList?.id === list?.id
  //     );
  //     showAddCardInput.top && listToBeAdded.cards?.unshift(newCard);

  //     showAddCardInput.bottom && listToBeAdded.cards?.push(newCard);

  //     setCardTitle("");
  //     addCardInput.current.focus();

  //     console.log("firebase");

  //     updateFirebaseDoc(updatedworkspaceData);
  //     // return updatedworkspaceData;
  //     // });
  //   }

  useEffect(() => {
    const boardContext = `Board Description: ${boardDesc}`;

    const gptQuery = `
      Based on the following board context, suggest new tasks with the following details: title, description, start date, and end date.
      
      ${boardContext}
      
      Please provide tasks in the following JSON format:
      {
        "tasks": [
          {
            "title": "Task Title",
            "description": "Task Description",
            "startDate": "YYYY-MM-DD",
            "endDate": "YYYY-MM-DD"
          },
          ...
        ]
      }
      
      Example:
      {
        "tasks": [
          {
            "title": "Design Landing Page",
            "description": "Create the initial design for the landing page, including layout, color scheme, and typography.",
            "startDate": "2024-06-15",
            "endDate": "2024-06-20"
          },
          {
            "title": "Develop Backend API",
            "description": "Build the backend API to handle user authentication and data processing.",
            "startDate": "2024-06-21",
            "endDate": "2024-06-30"
          },
          {
            "title": "Conduct User Testing",
            "description": "Organize and execute user testing sessions to gather feedback and identify issues.",
            "startDate": "2024-07-01",
            "endDate": "2024-07-05"
          }
        ]
      }
      
      Now, please suggest 5 new tasks.
      `;

    console.log(gptQuery);

    const fetchTasks = async (gptQuery) => {
      const data = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      const result = data.choices[0].message.content;
      console.log(result);

      const tasksObject = JSON.parse(result);

      setTasks(tasksObject.tasks);
      taskRef.current = tasksObject.tasks;

      //   await updateListWithRecommendedTasks(tasksObject.tasks, workspaceData);

      setLoading(false);
    };

    if (startGeneratingTasks) {
      console.log("tasks executed");
      fetchTasks(gptQuery);
    }
  }, [startGeneratingTasks]);

  return (
    <div>
      <p className="font-sans text-lg font-semibold text-white text-center w-full mb-4">
        Your Recommended Tasks and Schedule
      </p>

      {loading ? (
        <Loading />
      ) : (
        <div>
          <ul className="mx-10">
            {tasks?.map((eachTask, index) => {
              return (
                <li className="mb-2" key={generateUniqueNumber("key", 5)}>
                  <div className="bg-[#F0F1F4] py-[7px] px-4 rounded-md shadow">
                    <h1 className="font-sans text-sm font-semibold text-[#172b4d] pb-1">
                      <FontAwesomeIcon
                        icon={faSquareCheck}
                        size="xs"
                        className="mr-2"
                      />
                      {`${eachTask?.title}:`}
                    </h1>
                    <p className="font-sans text-sm font-base text-[#172b4d] pb-1">
                      <FontAwesomeIcon
                        icon={faListCheck}
                        size="xs"
                        className="mr-2"
                      />
                      {eachTask?.description}
                    </p>
                    <span className="font-sans text-sm font-base text-[#172b4d] mr-8">
                      <FontAwesomeIcon
                        icon={faClock}
                        size="xs"
                        className="mr-1"
                      />
                      {`Start Date: ${eachTask?.startDate}`}
                    </span>
                    <span className="font-sans text-sm font-base text-[#172b4d]">
                      <FontAwesomeIcon
                        icon={faClock}
                        size="xs"
                        className="mr-1"
                      />
                      {`End Date: ${eachTask?.endDate}`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex text-sm my-3 justify-center items-center">
            <button
              className="bg-white border border-blue-900 hover:bg-slate-200 rounded-md py-2 px-3 text-blue-900 font-bold p-3 mr-4 cursor-pointer shadow-lg"
              onClick={async () => {
                await updateListWithRecommendedTasks(tasks, workspaceData);
                setShowGptTasks(false);
                setStartGeneratingTasks(false);
              }}
            >
              Add Tasks to board
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskRecommendations;

// const TaskRecommendations = ({
//   boardDesc,
//   startGeneratingTasks,
//   setStartGeneratingTasks,
// }) => {
//   const [tasks, setTasks] = useState(null);
//   let tastRef = useRef(null);

//   console.log(tasks);
//   console.log(tastRef);

//   useEffect(() => {
//     const boardContext = `Board Description: ${boardDesc}`;

//     const gptQuery = `
//     Based on the following board context, suggest new tasks with the following details: title, description, start date, and end date.

//     ${boardContext}

//     Please provide tasks in the following JSON format:
//     {
//       "tasks": [
//         {
//           "title": "Task Title",
//           "description": "Task Description",
//           "startDate": "YYYY-MM-DD",
//           "endDate": "YYYY-MM-DD"
//         },
//         ...
//       ]
//     }

//     Example:
//     {
//       "tasks": [
//         {
//           "title": "Design Landing Page",
//           "description": "Create the initial design for the landing page, including layout, color scheme, and typography.",
//           "startDate": "2024-06-15",
//           "endDate": "2024-06-20"
//         },
//         {
//           "title": "Develop Backend API",
//           "description": "Build the backend API to handle user authentication and data processing.",
//           "startDate": "2024-06-21",
//           "endDate": "2024-06-30"
//         },
//         {
//           "title": "Conduct User Testing",
//           "description": "Organize and execute user testing sessions to gather feedback and identify issues.",
//           "startDate": "2024-07-01",
//           "endDate": "2024-07-05"
//         }
//       ]
//     }

//     Now, please suggest 5 new tasks.
//     `;

//     const fetchTasks = async (gptQuery) => {
//       const data = await openai.chat.completions.create({
//         messages: [{ role: "user", content: gptQuery }],
//         model: "gpt-3.5-turbo",
//         response_format: { type: "json_object" },
//       });

//       const result = data.choices[0].message.content;
//       console.log(result);

//       const tasksObject = JSON.parse(result);

//       setTasks(tasksObject);
//       tastRef = tasksObject;

//       setStartGeneratingTasks(false);
//     };

//     if (startGeneratingTasks) {
//       console.log("tasks executed");
//       fetchTasks(gptQuery);
//     }
//   }, [startGeneratingTasks]);

//   return <div>TaskRecommendations</div>;
// };

// export default TaskRecommendations;
