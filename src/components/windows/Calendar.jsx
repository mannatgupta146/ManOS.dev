import React from "react";
import MacWindow from "./MacWindow";
import "./Calendar.scss";

const Calendar = ({ minimized, onClose, onMinimize }) => {
  return (
    <MacWindow title="Calendar" minimized={minimized} onClose={onClose} onMinimize={onMinimize}>
      <div className="calendar-window">
        <iframe
          title="Calendar"
          src="https://calendar.google.com/calendar/embed?src=mannatgupta146@gmail.com&ctz=Asia%2FKolkata&showPrint=0&showCalendars=0&showTabs=0&showTz=0"
          loading="lazy"
        />
      </div>
    </MacWindow>
  );
};

export default Calendar;
