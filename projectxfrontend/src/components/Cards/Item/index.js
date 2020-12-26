import React from "react";
import ItemStatus from "./../../ItemStatus"
import { Card, CardBody, CardImg } from "reactstrap";


const ItemCard = (props) => {
  return (
    <Card className="shadow border-0">
      <CardImg top width="20%" height="20%" src={"data:image/jpeg;base64," + props.image} />
      <CardBody>
        <ItemStatus status={props.status}></ItemStatus>
        <h2 className="mb-0">{props.title}</h2>
        <hr />
        <p className="card-text text-muted">{props.description}</p>
      </CardBody>
    </Card>
  );
};

export default ItemCard;
