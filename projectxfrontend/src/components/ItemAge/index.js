import React from "react";
import IntlMessages from "util/IntlMessages";


const getAge = (age) => {
  switch (age) {
    case "LESS_THAN_6_MONTHS":
      return <IntlMessages id="items.age.less_than_6_months" />;
    case "FROM_6_12_MONTHS":
      return <IntlMessages id="items.age.from_6_12_months" />;
    case "FROM_1_2_YRS":
      return <IntlMessages id="items.age.from_1_2_yrs" />;
    case "FROM_2_5_YRS":
      return <IntlMessages id="items.age.from_2_5_yrs" />;
    case "FROM_5_10_YRS":
      return <IntlMessages id="items.age.from_5_10_yrs" />;
    case "ABOVE_10_YRS":
      return <IntlMessages id="items.age.above_10_yrs" />;
  }
};

const ItemAge = (props) => {
  return (
    <span>
      {getAge(props.age)}
    </span>
  );
};

export default ItemAge;
