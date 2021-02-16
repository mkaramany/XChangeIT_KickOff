import React from 'react';
import { Avatar } from "@material-ui/core";


const getProfilePicture = (reviewer) => {
  if (reviewer.provider === null && reviewer.profilePicture === null)
   return require("assets/images/placeholder.jpg");
  if (reviewer.provider) {
    return reviewer.profilePictureUrl;
  } else {
    return "data:image/jpeg;base64," + reviewer.profilePicture;
  }
}



const Review = (props) => {

  const { review, reviewer } = props;
  console.log("reviewer", reviewer);
  return (
    <div className="testimonial-in-bg">
      <div className="pic">
        <img src={getProfilePicture(reviewer)} alt="avatar" />

      </div>
      <p className="description">{review}</p>
      <h5 className="title">{reviewer.firstName + " " + reviewer.lastName}</h5>
      {/* <small className="post-designation text-white">CEO</small> */}
    </div>
  )
};
export default Review;

