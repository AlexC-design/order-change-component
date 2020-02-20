import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { BookingDate } from "./components/BookingDate/BookingDate";
import { TimeLeft } from "./components/TimeLeft/TimeLeft";
import { EditOrderButton } from "./components/EditOrderButton/EditOrderButton";
import { Calendar } from "./components/Calendar/Calendar";
import loadingIcon from "./assets/loading-icon.svg";

import "react-datepicker/dist/react-datepicker.css";
import "./css/app.css";

const App = () => {
  const [startDate, setStartDate] = useState(moment());
  const [loading, setLoading] = useState(true);
  const [cutoffHour, setCutoffHour] = useState("n/a");
  const [timeDifferece, setTimeDifferece] = useState("calculating...");

  //booking date changing function
  const changeDate = (date, cutoffHour) => {
    setStartDate(
      moment(date).set({
        hour: cutoffHour,
        minute: 0,
        second: 0,
        millisecond: 0
      })
    );
  };

  // -- code executed at component mounting
  useEffect(() => {
    const fetchHour = async () => {
      const response = await axios.get(
        "https://uk-live-support.lovespace.com/cutOffTime"
      );

      //setting default booking date to tomorrow at 11AM (cutoffHour)
      setStartDate(
        moment()
          .add(1, "day")
          .set({
            hour: response.data.cutoffHour,
            minute: 0,
            second: 0,
            millisecond: 0
          })
      );

      setCutoffHour(response.data.cutoffHour);

      setLoading(false);
    };

    fetchHour();
  }, []);

  // -- code executed on component update
  useEffect(() => {
    //calculating time difference
    const getTimeDifferece = startDate => {
      let difference = startDate.diff(moment());
      let duration = moment.duration(difference);

      //creating 'time left' display message (e.g. 14 hour(s) 12 mins 43 secs)
      let durationDisplay = "0 hours";

      duration.asSeconds() < 0
        ? (durationDisplay = "0 hours")
        : (durationDisplay = `${duration.days() * 24 + duration.hours()} hour${
            duration.hours() === 1 && duration.days() === 0 ? "" : "s"
          } ${duration.minutes()} mins ${duration.seconds()} secs`);

      //updating time difference
      setTimeDifferece(durationDisplay);
    };

    setTimeout(() => {
      getTimeDifferece(startDate);
    }, 1000);
  });

  if (loading || timeDifferece === "calculating...") {
    return (
      <div className="loading">
        <img src={loadingIcon} alt="loading" className="loading__icon" />
      </div>
    );
  } else {
    return (
      <div className="main-screen">
        <BookingDate date={moment(startDate).format("dddd, Do MMMM YYYY")} />
        <TimeLeft time={timeDifferece} />
        <div className="main-screen__text">
          You can edit your order up to <b>{cutoffHour}AM</b> the day before
          your collection
        </div>
        {timeDifferece !== "0 hours" && <EditOrderButton />}
        <DatePicker
          selected={startDate.toDate()}
          onChange={date => changeDate(date, cutoffHour)}
        />
        <Calendar />
      </div>
    );
  }
};

export default App;
