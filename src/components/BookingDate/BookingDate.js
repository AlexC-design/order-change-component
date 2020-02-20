import React from "react";

import "./css/booking-date.css";

export const BookingDate = ({ date }) => {
  return (
    <div className="booking">
      <div className="booking__text">Your collection is booked for</div>
      <div className="booking__date">{date}</div>
    </div>
  );
};
