


import React from "react";
import IntlMessages from "util/IntlMessages";



const Rating = (props) => {
    console.log("Ratings comp", props);
    return (
        <p className="mb-0 jr-fs-sm text-truncate"><i className={`zmdi zmdi-star text-orange`} />
            {" "}  {props.totalRatingValue}  {"from "}
            {props.ratingsCount}  {props.ratingsCount != 1 && (<span>{<IntlMessages id="items.ratings.users"/>}</span>)} {props.ratingsCount  ==1 && (<span>{<IntlMessages id="items.ratings.user"/>}</span>)}</p>
    );
};

export default Rating;
