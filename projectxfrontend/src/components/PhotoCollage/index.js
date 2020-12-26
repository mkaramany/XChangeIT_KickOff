import React from "react";
import gallery from "./galleryData";
import IconButton from "@material-ui/core/IconButton";
import {Card, CardImg } from "reactstrap";

const PhotoCollage = (props) => {
  return (
    <div className="jr-card">
      <div className="jr-card-header d-flex">
        <h3 className="card-heading mr-auto">{props.heading}</h3>
        {/* <IconButton className="icon-btn"><i className="zmdi zmdi-more-vert"/></IconButton> */}
      </div>

      <ul className="list-inline thumbnail-list">
        {props.imageList.map((image, index) => (
          <li key={index} className="thumbnail-item">
            {/* <div className="grid-thumb-equal"> */}
              {/* <span className="grid-thumb-cover jr-link"> */}
                <Card className="shadow border-0">
                  <CardImg
                    top
                    width="100%"
                    src={"data:image/jpeg;base64," + image.image}
                  />
                </Card>
              {/* </span> */}
             {/* </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoCollage;
