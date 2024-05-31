import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeInput from "./TimeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import dataContext from "../../utills/dataContext";
import { updateFirebaseDoc } from "../../utills/updateFirebase";

const templateForAnyCard = ({}) => {
  return (
    <>
      <div className="absolute right-60 top-36 bg-white p-4 rounded w-[300px] z-[1801]">
        <div className="flex justify-between items-center mb-3">
          <p className="flex-grow text-center font-sans text-sm font-semibold text-[#172b4d]">
            Dates
          </p>
          <div className="ml-2">
            <FontAwesomeIcon icon={faX} className="cursor-pointer text-xs" />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Start date
          </p>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={false}
              className="w-[20px] h-[16px]"
            />
            <div className="font-sans text-sm text-[#172b4d]"></div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-[#172b4d]">
            Due date
          </p>

          <div className="flex items-center gap-2 mt-1">
            <div className="font-sans text-sm text-[#172b4d]"></div>

            <p className="text-[10px] font-sans text-gray-400">
              e.g., 1, 13, <br /> 10am, 3pm
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-sans text-xs text-red-600">
            Deleting a checklist is permanent and there is no way to get it
            back.
          </p>
        </div>

        <div>
          <button
            className={`mt-4 rounded py-2 px-2 my-3 text-sm font-semibold font-sans w-full ${
              false ? "bg-gray-400 text-gray-600" : "bg-blue-600 text-white"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default templateForAnyCard;
