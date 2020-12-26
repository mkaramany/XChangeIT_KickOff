import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TimePickers from "./../../app/routes/components/routes/pickers/time/TimePickers";
import DatePickers from "./../../app/routes/components/routes/pickers/date/DatePickers";
import Moment from "moment";
import IntlMessages from "util/IntlMessages";

const ItemSlot = (props) => {
  console.log("inside ItemSlot", props);

  const initialSlot = props.initialValue? {
    date: props.initialValue.date,
    from: props.initialValue.from,
    to: props.initialValue.to,
  }: {
    date: null,
    from:  null,
    to:  null
  };
  console.log("initialSlot",initialSlot);
  const [slot, handleSlotChange] = useState();

  const onDateChange = (date) => {
    let tempSlot = { ...slot };
    tempSlot.date =  Moment(date).format("DD.MM.YYYY");
    handleSlotChange(tempSlot);
    props.handleUpdates(props.itemKey, tempSlot);
  };

  const onTimeFromChange = (date) => {
    let tempSlot = { ...slot };
    tempSlot.from = Moment(date).format("HH:mm:ss");
    handleSlotChange(tempSlot);
    props.handleUpdates(props.itemKey, tempSlot);
  };

  const onTimeToChange = (date) => {
    let tempSlot = { ...slot };
    tempSlot.to = Moment(date).format("HH:mm:ss");
    handleSlotChange(tempSlot);
    props.handleUpdates(props.itemKey, tempSlot);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          <DatePickers value={initialSlot.date} label={<IntlMessages id="item.slot.date" />} onUpdate={onDateChange} disablePast />
        </Grid>
        <Grid item xs={2} style={{ paddingRight: "10px" }}>
          <TimePickers
          value={initialSlot.from}
            label={<IntlMessages id="item.slot.from" />}
            ampm={false}
            onUpdate={onTimeFromChange}
          />
        </Grid>
        <Grid item xs={2} style={{ paddingLeft: "10px" }}>
          <TimePickers value={initialSlot.to} label={<IntlMessages id="item.slot.to" />} ampm={false} onUpdate={onTimeToChange} />
        </Grid>
      </Grid>
      <br></br>
    </div>
  );
};

export default ItemSlot;
