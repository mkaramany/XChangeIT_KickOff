import React from "react";
import { NavLink } from "react-router-dom";
import ItemStatus from "../../../../../../../components/ItemStatus"

function ItemCardDetails({ item }) {

  console.log("PropertiesItemCard", item);

  const { id, thumbnail, title, description, price, status } = item;

  return (
    <div className="media jr-featured-item">
      {/* {isFeatured === true ? <span color="orange"><span className="text-uppercase">featured</span></span> : null} */}
      <div className="jr-featured-thumb">
        <img className="rounded-lg"
          width="150"
          height="150"
          src={"data:image/jpeg;base64," + thumbnail}
          alt="..." />
        {/* <span className="jr-tag">Featured</span> */}
      </div>
      <div className="media-body jr-featured-content">
        <div className="jr-featured-content-left">
            <ItemStatus
              width={100}
              status={status}
            ></ItemStatus>
            
          <h3 className="mb-1">{title}</h3>

          <p className="text-grey mb-1">{description}</p>

          <div className="d-flex flex-wrap mb-2">
            <p className="mr-3 mb-1"><span className="text-grey">Bedrooms:</span> 2</p>
            <p className="mr-3 mb-1"><span className="text-grey">Baths:</span> 3</p>
            <p className="mr-3 mb-1"><span className="text-grey">Area:</span> 4</p>
            {/* <a className="text-grey text-underline" href="#/"> + {more} more</a> */}
          </div>
          <div className="d-flex flex-row">
            <p className="text-grey mb-1">
              <i className={`zmdi zmdi-account jr-fs-lg mr-2 d-inline-block align-middle`} />name
            </p>
            <p className="text-grey ml-4 mb-1">
              <i className={`zmdi zmdi-calendar-alt jr-fs-lg mr-2 d-inline-block align-middle`} /> 20-01-2021
            </p>
          </div>
        </div>
        <div className="jr-featured-content-right">
          <div>
            <h2 className="mb-0 jr-font-weight-medium">${price}</h2>
            <p className="text-grey jr-fs-sm"> sqft</p>
          </div>
          <NavLink
            className="prepend-icon"
            to={"/app/items/viewItem/" + id}
          >
            <p className="text-primary mt-auto mb-0 pointer"><span>Check in detail</span> <i
              className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle`} /></p>
          </NavLink>
        </div>

      </div>
    </div>
  );
}

export default ItemCardDetails;
