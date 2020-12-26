import React from "react";
import IntlMessages from "util/IntlMessages";


const AddressDisplay = (props) => {
  return (
    <div>
      <h2><IntlMessages id="user.address.title" />: </h2>

      <b><IntlMessages id="user.address.street" />: </b>
      {props.address.streetName + " "}
      <br></br>
      <b><IntlMessages id="user.address.houseNumber" />: </b>
      {props.address.houseNumber}
      <br></br>
      <b><IntlMessages id="user.address.zipCode" />: </b>
      {props.address.zipCode + " "}
      <br></br>
      <b><IntlMessages id="user.address.city" />: </b>
      {props.address.city + " "}
    </div>
  );
};

export default AddressDisplay;
