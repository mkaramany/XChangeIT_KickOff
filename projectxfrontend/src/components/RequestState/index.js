import React from "react";
import { Badge } from "reactstrap";
import IntlMessages from "util/IntlMessages";


const getColor = (state) => {
  switch (state) {
    case "REQUEST_PENDING":
      return "info";
    case "REJECTED":
      return "light";
    default:
      return "info";
  }
};

const getStateName = (state) => {
  switch (state) {
    case "REQUEST_PENDING":
      return <IntlMessages id="request.state.requestPending" />;
    case "REJECTED":
      return <IntlMessages id="request.state.rejected" />;
  }
};

const RequestState = (props) => {
  return (
    <Badge
      style={{ width: props.width }}
      className="d-block"
      color={getColor(props.state)}
    >
      {getStateName(props.state)}
    </Badge>
  );
};

export default RequestState;
