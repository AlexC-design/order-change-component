import React from "react";
import calendarIcon from "../../assets/calendar-icon.svg";

import "./css/calendar.css";

export const Calendar = () => {
  return (
    <div className="calendar">
      <img src={calendarIcon} alt="calendar" />
    </div>
  );
};
