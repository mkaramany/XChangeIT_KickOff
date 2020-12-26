import React from "react";
import { Badge } from "reactstrap";
import IntlMessages from "util/IntlMessages";


const getTypeName = (type) => {
  switch (type) {
    case "DONATION":
      return <IntlMessages id="items.type.donation" />;
    case "TRADE":
      return <IntlMessages id="items.type.trade" />;
  }
};

const ItemType = (props) => {
  return (
    <span>
      {getTypeName(props.type)}
    </span>
  );
};

export default ItemType;
