import React from "react";

import "./css/time-left.css";

export const TimeLeft = ({ time }) => {
  return (
    <div className="time-left-container">
      <div className="time-left-container__time">{time}</div>
      <div className="time-left-container__text">left to make changes</div>
      <div className="time-left-container__white-cover" />
    </div>
  );
};
