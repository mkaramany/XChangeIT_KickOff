import React from "react";
import IntlMessages from "util/IntlMessages";


const getCategoryName = (category) => {
  switch (category) {
    case "SPORTS_EQUIPMENT":
      return <IntlMessages id="items.category.activityEquipment" />;
    case "ACTIVITY_EQUIPMENT":
      return <IntlMessages id="items.category.sportsEquipment" />;
    case "HANDYMAN_TOOLS":
      return <IntlMessages id="items.category.handymanTools" />;
  }
};
  

const ItemCategory = (props) => {
  return (
    <span>
      {getCategoryName(props.age)}
    </span>
  );
};

export default ItemCategory;
