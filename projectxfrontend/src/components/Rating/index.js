


import React from "react";
import IntlMessages from "util/IntlMessages";



const Rating = (props) => {
    return (
        <p className="mb-0 jr-fs-sm text-truncate"><i className={`zmdi zmdi-star text-orange`} />
            {" "}  {props.totalRatingValue}  {"from "}
            {props.ratingsCount}  {props.ratingsCount != 1 && (<span>{"users"}</span>)} {props.ratingsCount  ==1 && (<span>{"user"}</span>)}</p>
    );
};

export default Rating;
