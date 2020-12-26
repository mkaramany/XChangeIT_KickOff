import React from "react";
import { Badge } from "reactstrap";
import IntlMessages from "util/IntlMessages";


const getConditionName = (condition) => {
  switch (condition) {
    case "ALMOST_NEW":
      return <IntlMessages id="items.condition.almostNew" />;
      case "GOOD":
        return <IntlMessages id="items.condition.good" />;
    case "DIY":
      return <IntlMessages id="items.condition.DIY" />;
  }
};

const ItemCondition = (props) => {
  return (
    <span>
      {getConditionName(props.condition)}
    </span>
  );
};

export default ItemCondition;
