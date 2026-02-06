import React from "react";
import MacWindow from "./MacWindow";
import "./Calendar.scss";

const Calendar = () => {
  return (
    <MacWindow>
      <div className="calendar-window">
        <iframe
          title="Calendar"
          src="https://calendar.google.com/calendar/embed?src=primary&ctz=Asia%2FKolkata&showPrint=0&showCalendars=0&showTabs=0&showTz=0"
          loading="lazy"
        />
      </div>
    </MacWindow>
  );
};

export default Calendar;
