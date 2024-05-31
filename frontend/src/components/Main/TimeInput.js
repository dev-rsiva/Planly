import React, { useState, useEffect, useRef } from "react";

const TimeInput = ({
  inputTime,
  setInputTime,
  setErrorMessage,
  showError,
  setShowError,
  setDisableSaveButton,
}) => {
  const timeRef = useRef();
  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  const formatTime = (time) => {
    console.log(time);

    console.log(time);
    let hours = parseInt(time, 10);
    console.log(hours);

    // Validate hours input
    if (isNaN(hours) || hours < 0 || hours > 24) {
      setShowError(true);
      setErrorMessage("Invalid time");
      return;
    }

    showError === true && setShowError(false);

    let suffix = "";

    // Handle input with AM/PM
    if (time.includes("a") || time.includes("am")) {
      suffix = "A.M";
    } else if (time.includes("p") || time.includes("pm")) {
      suffix = "P.M";
    }

    // Handle 0 input
    if (hours === 0) {
      return "12 A.M";
    }

    // Handle 1-12 input without suffix
    if (hours >= 1 && hours <= 12 && !suffix) {
      suffix = "A.M";
    }

    // Handle 13-24 input without suffix
    if (hours >= 13 && hours <= 24) {
      hours = hours - 12;
      suffix = "P.M";
    }

    // Special case for 12 PM
    if (hours === 12 && suffix === "A.M.") {
      suffix = "P.M";
    }

    // Special case for 24 hours input
    if (hours === 12 && !suffix) {
      suffix = "P.M";
    }

    return `${hours}:00 ${suffix}`;
  };

  console.log(inputTime);

  const handleBlur = () => {
    setInputTime(formatTime(inputTime));
  };

  return (
    <>
      <div className="font-sans text-sm text-[#172b4d]">
        <input
          ref={timeRef}
          type="text"
          value={inputTime}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-[70px] py-[6px] px-2 border-2 border-blue-500 rounded outline-none text-xs "
          placeholder="h:mm"
        />
      </div>
    </>
  );
};

export default TimeInput;
