import { Button, Fab, FormHelperText, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import * as actions from "../../../../../actions/index";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import ItemStatus from "../../../../../components/ItemStatus";
import AddressDisplay from "./../../../../../components/AddressDisplay/index";
import ItemSlot from "./../../../../../components/ItemSlot";
import PhotoCollage from "./../../../../../components/PhotoCollage/index";
import { Formik } from "formik";
import * as Yup from "yup";
import IntlMessages from "util/IntlMessages";

class NewItemSlots extends React.Component {
  state = {
    slotCount: 1,
    emptySlotsFlag: false,
    slots: [],
    itemSlotCompArr: [
      <ItemSlot
        itemKey="0"
        handleUpdates={(index, slot) => this.updateSlots(index, slot)}
      />,
    ],
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { id } = params;
    console.log("componentDidMount NewItemSlots", id);
    this.props.onSetNotTaken(id);
  }

  updateSlots = (slotIndex, slotValue) => {
    let tempSlots = [...this.state.slots];
    tempSlots[slotIndex] = slotValue;
    this.setState({ slots: tempSlots });
    console.log("inside NewItemSlots", tempSlots);
  };

  addSlot = () => {
    if (this.state.slotCount < 5) {
      let tempSlots = [...this.state.slots];
      let tempItemSlotCompArr = [...this.state.itemSlotCompArr];

      tempSlots.push({
        date: new Date(),
        from: new Date(),
        to: new Date(),
      });
      tempItemSlotCompArr.push(
        <ItemSlot
          itemKey={tempSlots.length - 1}
          handleUpdates={(index, slot) => this.updateSlots(index, slot)}
        />
      );

      this.setState((prevState, props) => {
        return {
          slots: tempSlots,
          slotCount: prevState.slotCount + 1,
          itemSlotCompArr: tempItemSlotCompArr,
        };
      });

      return tempItemSlotCompArr;
    }
  };

  validateSlots = () => {
    if (this.state.slots.length < 1) {
      this.setState({ emptySlotsFlag: true });
      return null;
    } else {
      this.setState({ emptySlotsFlag: false });
      return this.state.slots;
    }
  };

  saveNewSlots = () => {
    let item = { id: this.props.itemDetails.id, slots: this.state.slots };
    console.log("saveNewSlots ", item);
     this.props.onSaveNewSlots(item);
  };

  render() {
    if (this.props.taskCompleted) {
      return <Redirect to="/app" />;
    }
    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">
            {this.props.itemDetails && (
              <Formik
                initialValues={{
                  slots: [],
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log("submitting in Formik tag", values);
                  values.slots = this.validateSlots();
                  if (values.slots) {
                    this.saveNewSlots();
                  }
                }}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <div animated slideInUpTiny>
                        <ContainerHeader
                          title={<IntlMessages id="item.newSlots.header" />}
                          match={this.props.match}
                        />

                        <PhotoCollage
                          imageList={this.props.itemDetails.images}
                          heading={this.props.itemDetails.title}
                        ></PhotoCollage>

                        <div className="jr-card">
                          <h2><IntlMessages id="item.newSlots.status" />: </h2>
                          <ItemStatus
                            width={100}
                            status={this.props.itemDetails.status}
                          ></ItemStatus>
                          <br></br>
                          <h2><IntlMessages id="item.newSlots.description" /></h2>
                          {this.props.itemDetails.description}
                          <br></br>
                          <br></br>
                          {this.props.loggedInUser &&
                          this.props.loggedInUser.address && (
                            <AddressDisplay
                              address={this.props.loggedInUser.address}
                            />
                          )}
                        </div>
                        {this.props.itemDetails.status == "AVAILABLE" && (
                          <div className="jr-card">
                            <h2><IntlMessages id="item.newSlots.newSlots" />: </h2>
                            <br></br>
                            {this.state.itemSlotCompArr}
                            {this.state.emptySlotsFlag && (
                              <Grid item xs={12}>
                                <FormHelperText
                                  error={true}
                                  id="component-helper-text"
                                >
                                  Add at least one slot
                                </FormHelperText>
                              </Grid>
                            )}
                            <div
                              style={{
                                margin: "15px",
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              {this.state.slotCount < 5 && (
                                <Fab
                                  onClick={this.addSlot}
                                  size="small"
                                  style={{ backgroundColor: "#2a6700" }}
                                  className="text-white"
                                >
                                  <AddIcon />
                                </Fab>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          margin: "15px",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          className="bg-primary text-white"
                        >
                          {<IntlMessages id="item.newSlots.save" />}
                        </Button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetNotTaken: (id) => dispatch(actions.setItemAsNotTaken(id)),
    onSaveNewSlots: (item) => dispatch(actions.saveNewSlots(item)) 
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewItemSlots));
