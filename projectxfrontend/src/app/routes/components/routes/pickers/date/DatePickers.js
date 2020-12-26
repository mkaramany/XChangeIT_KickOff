import React, { useState, useEffect } from "react";
import { DatePicker } from "material-ui-pickers";
import Moment from "moment";

const DatePickers = (props) => {
  console.log("datePickers vlaue: ", props.value);
  const initialDate = props.value ? props.value : null;
  const [selectedDate, handleDateChange] = useState(initialDate);

  useEffect(() => {
    if (selectedDate) props.onUpdate(selectedDate);
  }, [selectedDate]);

  return (
    <DatePicker
      label={props.label}
      value={selectedDate}
      onChange={handleDateChange}
      animateYearScrolling={false}
      disablePast={props.disablePast}
      format="DD.MM.YYYY"
    />
  );
};

export default DatePickers;
