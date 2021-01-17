import { Avatar, Button, Grid, Tooltip } from "@material-ui/core";
import _ from "lodash";
import Moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../../../actions/index";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import ItemStatus from "../../../../../components/ItemStatus";
import ItemType from "../../../../../components/ItemType";
import ItemCondition from "../../../../../components/ItemCondition";
import AddressDisplay from "./../../../../../components/AddressDisplay/index";
import PhotoCollage from "./../../../../../components/PhotoCollage/index";
import PopUpMessage from "./../../../../../components/PopUpMessage/index";
import IntlMessages from "util/IntlMessages";
import XChangeItDialog from "components/XChangeItDialog";

class ViewItem extends React.Component {
  state = {
    selectedSlotId: "",
    showReviews: false
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { id } = params;
    console.log("componentDidMount view Item", id);
    this.props.onGetItemById(id);
    if (this.props.loggedInUser) {
      this.props.onCheckIfUserHasItemsToTrade(this.props.loggedInUser.id);
    }


    if (this.props.error) {
      this.setState({ showAlert: true });
    }
  }

  reserveItem = () => {
    let reservedItem = { ...this.props.itemDetails };
    reservedItem.receiver = { ...this.props.loggedInUser };
    reservedItem.images = [];
    reservedItem.slots = this.getUpdatedSlots();
    this.props.onReserveItem(reservedItem);
  };

  getUpdatedSlots = () => {
    const selectedSlotId = this.state.selectedSlotId;
    let updatedSlots = _.map(this.props.itemDetails.slots, (slot) => {
      if (slot.id.toString() === selectedSlotId) {
        let reservedSlot = { ...slot };
        reservedSlot.reserved = true;
        return reservedSlot;
      }
      return slot;
    });
    return updatedSlots;
  };

  goBack() {
    this.props.history.goBack();
  }

  redirectToRequestPage() {
    this.props.history.push("/app/request");
  }

  getAvatar = () => {
    if (this.props.itemDetails.producer.provider) {
      return this.props.itemDetails.producer.profilePictureUrl;
    } else {
      return "data:image/jpeg;base64," + this.props.itemDetails.producer.profilePicture;
    }
  }

  showPlaceholder = () => {
    if (this.props.itemDetails.producer.provider === null && this.props.itemDetails.producer.profilePicture === null)
      return true;
    return false;
  };

  showReviewsPopUp = () => {
    this.setState({ showReviews: true });
  }

  hideReviewsPopUp = () => {
    this.setState({ showReviews: false });
  }

  isReceiverSameAsProducer() {
    if (this.props.loggedInUser) {
      const itemProducer = this.props.itemDetails.producer;
      if (itemProducer.id === this.props.loggedInUser.id) {
        return true;
      }
    }
    return false;
  }

  isAllowedToTrade() {
    return this.props.userHasItemsToTrade;
  }

  canUserRequest = () => {

    if (this.isReceiverSameAsProducer()) {
      return false;
    }

    if (this.props.itemDetails.type === "TRADE" && !this.isAllowedToTrade()) {
      return false;
    }

    if (!this.props.loggedInUser) {
      return false;
    }

    return true;
  }

  getToolTipContent() {
    if (!this.props.loggedInUser) {
      return <IntlMessages id="items.viewItem.tooltip.loginToRequest" />;
    }

    if (this.isReceiverSameAsProducer()) {
      return <IntlMessages id="items.viewItem.tooltip.producerSameAsReceiver" />;
    }
    if (!this.isAllowedToTrade()) {
      return <IntlMessages id="items.viewItem.tooltip.noItemsForTrading" />;
    }
  }

  render() {
    if (this.props.taskCompleted) {
      return <Redirect to="/app" />;
    }

    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">
            {this.props.itemDetails && (
              <div animated slideInUpTiny animation-duration-3>
                <ContainerHeader
                  title={<IntlMessages id="items.viewItem.itemDetails" />}
                  match={this.props.match}
                />

                <PopUpMessage
                  open={this.props.error ? true : false}
                  color="danger"
                  message={this.props.error}
                ></PopUpMessage>

                <PhotoCollage
                  imageList={this.props.itemDetails.images}
                  heading={this.props.itemDetails.title}
                ></PhotoCollage>

                <div className="jr-card">
                  <h2><IntlMessages id="items.viewItem.map" />: </h2>
                </div>

                <div className="jr-card">
                  <h2><IntlMessages id="items.viewItem.status" />: </h2>
                  <ItemStatus
                    width={100}
                    status={this.props.itemDetails.status}
                  ></ItemStatus>
                  <br></br>
                  <br></br>

                  <h2><IntlMessages id="items.type" />: </h2>
                  <ItemType
                    width={100}
                    type={this.props.itemDetails.type}
                  ></ItemType>
                  <br></br>
                  <br></br>

                  <h2><IntlMessages id="items.viewItem.fullDescription" />: </h2>
                  {this.props.itemDetails.description}
                  <br></br>
                  <br></br>
                  {this.props.loggedInUser &&
                    this.props.loggedInUser.address && (
                      <AddressDisplay
                        address={this.props.loggedInUser.address}
                      />
                    )}
                  <br></br>
                  <br></br>
                  <h2><IntlMessages id="items.condition" />: </h2>
                  <ItemCondition
                    width={100}
                    condition={this.props.itemDetails.condition}
                  ></ItemCondition>

                  <br></br>
                  <br></br>
                  <h2><IntlMessages id="items.owner" />: </h2>

                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    {this.showPlaceholder() && (
                      <Avatar
                        className="size-50"
                        alt="..."
                        src={require("assets/images/placeholder.jpg")}
                      />
                    )}
                    {!this.showPlaceholder() && (
                      <Avatar
                        className="size-50"
                        alt="..."
                        src={this.getAvatar()}
                      />
                    )}
                    <span style={{ margin: "1%" }}
                      className="jr-link"
                      onClick={() => this.showReviewsPopUp()}
                    >
                      {this.props.itemDetails.producer.firstName} {this.props.itemDetails.producer.lastName}
                      <p className="mb-0 jr-fs-sm text-truncate"><i className={`zmdi zmdi-star text-orange`} /> {"5.0 from 14 reviews"} </p>
                    </span>
                    <XChangeItDialog
                      open={this.state.showReviews}
                      onClose={this.hideReviewsPopUp}
                      maxWidth='md'
                      title={<IntlMessages id="items.viewItem.userReviews" />}
                      content={"User Reviews code goes here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"}>
                    </XChangeItDialog>
                  </div>

                </div>
                <Grid container>
                  <Grid item xs={4} style={{ padding: "10px" }} >  <Button
                    variant="contained"
                    className="bg-primary text-white"
                    onClick={() => this.goBack()}
                  >
                    {<IntlMessages id="items.viewItem.back" />}
                  </Button>
                  </Grid>
                  <Grid item xs={7} style={{ padding: "10px" }}> </Grid>
                  <Grid item xs={1} style={{ alignContent: "end" }}>
                    {!this.canUserRequest() && (<Tooltip title={this.getToolTipContent()} placement="top-start" >
                      <span>
                        <Button
                          variant="contained"
                          disabled
                        >
                          {<IntlMessages id="items.viewItem.request" />}
                        </Button>
                      </span>
                    </Tooltip>)}

                    {this.canUserRequest() && (<Button
                      variant="contained"
                      className="bg-primary text-white"
                      onClick={() => this.redirectToRequestPage()}
                    >
                      {<IntlMessages id="items.viewItem.request" />}
                    </Button>)}

                  </Grid>
                </Grid>

              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemDetails: state.items.itemDetails,
    loggedInUser: state.auth.authUser,
    taskCompleted: state.items.taskCompleted,
    error: state.items.error,
    userHasItemsToTrade: state.items.userHasItemsToTrade
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetItemById: (id) => dispatch(actions.getItemById(id)),
    onCheckIfUserHasItemsToTrade: (id) => dispatch(actions.checkIfUserHasItemsToTrade(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem);
