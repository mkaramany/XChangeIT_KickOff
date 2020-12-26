import React from "react";
import { Badge } from "reactstrap";
import IntlMessages from "util/IntlMessages";


const getColor = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "success";
    case "RESERVED":
      return "warning";
    case "TAKEN":
      return "danger";
    default:
      return "info";
  }
};

const getStatusName = (status) => {
  switch (status) {
    case "AVAILABLE":
      return <IntlMessages id="items.status.available" />;
    case "RESERVED":
      return <IntlMessages id="items.status.reserved" />;
    case "TAKEN":
      return <IntlMessages id="items.status.taken" />;
    case "REMOVED":
      return <IntlMessages id="items.status.removed" />;
  }
};

const ItemStatus = (props) => {
  return (
    <Badge
      style={{ width: props.width }}
      className="d-block"
      color={getColor(props.status)}
    >
      {getStatusName(props.status)}
    </Badge>
  );
};

export default ItemStatus;
