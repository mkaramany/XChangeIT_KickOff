import {
  Button,
  Fab,
  TextField,
  FormHelperText,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import FullScreenUpload from "../../../../../components/dropzone/FullScreen";
import AddressDisplay from "./../../../../../components/AddressDisplay/index";
import PopUpMessage from "./../../../../../components/PopUpMessage/index";
import CardBox from "./../../../../../components/CardBox/index";
import ItemSlot from "./../../../../../components/ItemSlot";
import * as actions from "../../../../../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import IntlMessages from "util/IntlMessages";


const styles = (theme) => ({
  input: {
    borderRadius: "0",
    width: "220%",
  },
});

class AddItem extends React.Component {
  state = {
    slotCount: this.props.redirectInfo ? 0 : 1,
    itemImages: [],
    base64Images: [],
    emptyImagesFlag: false,
    slots: [],
    emptySlotsFlag: false,
    itemSlotCompArr: this.props.redirectInfo
      ? []
      : [
        <ItemSlot
          itemKey="0"
          handleUpdates={(index, slot) => this.updateSlots(index, slot)}
        />,
      ],
  };

  componentDidMount() {
    console.log("props", this.props);
    const { redirectInfo } = this.props;

    if (redirectInfo) {
      // this.setState({ itemImages: redirectInfo.data.images });
      this.updateItemImages(redirectInfo.data.imageFiles);
      this.setState({ slots: redirectInfo.data.slots });
      const tempItemSlotCompArr = redirectInfo.data.slots.map((slot, index) => {
        let slotObjValue = {
          date: moment(slot.date, "DD.MM.YYYY").toDate(),
          from: moment(slot.from, "HH:mm").toDate(),
          to: moment(slot.to, "HH:mm").toDate(),
        };
        return (
          <ItemSlot
            itemKey={index}
            initialValue={slotObjValue}
            handleUpdates={(slotIndex, slotValue) =>
              this.updateSlots(slotIndex, slotValue)
            }
          />
        );
      });
      this.setState({ itemSlotCompArr: tempItemSlotCompArr });
    }
  }

  updateItemImages = (files) => {
    console.log("inside updateItemImages", files);
    this.setState({ itemImages: files });
    this.upload(files);
  };

  getBase64 = (file, index) => {
    console.log("inside getBase64", file);
    var self = this;
    var base64data = null;
    axios({
      method: "get",
      url: URL.createObjectURL(file),
      responseType: "blob",
    }).then(function (response) {
      var reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onloadend = function () {
        base64data = reader.result.split(",")[1];
        console.log("base64data", base64data);
        let tempBase64Images = [...self.state.base64Images];
        tempBase64Images[index] = { base64: base64data };
        self.setState({ base64Images: tempBase64Images });
      };
    });
  };

  upload = (files) => {
    // let tempItemImages = [...this.state.itemImages];
    let tempItemImages = files;
    console.log("inside upload", tempItemImages);

    if (tempItemImages.length > 0) {
      tempItemImages.map((imageFile, index) =>
        this.getBase64(imageFile, index)
      );
    }
  };

  updateSlots = (slotIndex, slotValue) => {
    console.log("inside updateSlots index: " + slotIndex, slotValue);
    let tempSlots = [...this.state.slots];
    tempSlots[slotIndex] = slotValue;
    this.setState({ slots: tempSlots });
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
      const slots = this.props.redirectInfo
        ? this.props.redirectInfo.data.slots
        : this.state.slots;
      return slots;
    }
  };

  validateImages = () => {
    if (this.state.itemImages.length < 1) {
      this.setState({ emptyImagesFlag: true });
      return null;
    } else {
      this.setState({ emptyImagesFlag: false });
      const images = this.props.redirectInfo
        ? this.props.redirectInfo.data.images
        : this.state.itemImages;
      return images;
    }
  };

  validate = () => {
    this.validateImages();
    this.validateSlots();
  };

  addItem = (values) => {
    let item = { ...values };
    item.images = [...this.state.base64Images];
    if (this.props.loggedInUser) {
      this.props.onAddItem(item);
      console.log("inside addItem", item);
    } else {
      item.imageFiles = [...this.state.itemImages];
      const redirectInfo = {
        data: item,
        returnURL: "/app/items/addItem",
      };
      this.props.onRedirectToLogin(redirectInfo);
      this.props.history.push("/signin");
    }
  };

  render() {
    const { classes } = this.props;
    const { redirectInfo } = this.props;
    const requiredErrorMsg = <IntlMessages id="items.addItem.requiredError" />;
    let initValues = {
      title: "",
      description: "",
      producer: this.props.loggedInUser,
      images: [],
      slots: [],
      type: "",
      condition: ""
    };
    if (redirectInfo) {
      initValues.title = redirectInfo.data.title;
      initValues.description = redirectInfo.data.description;
      initValues.images = redirectInfo.data.images;
      initValues.imageFiles = redirectInfo.data.imageFiles;
      initValues.slots = redirectInfo.data.slots;
      initValues.type = redirectInfo.data.type;
      initValues.condition = redirectInfo.data.condition;
    }
    if (this.props.taskCompleted) {
      return <Redirect to="/app" />;
    }
    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">

            <PopUpMessage
              open={this.props.error ? true : false}
              color="danger"
              message={this.props.error}
            ></PopUpMessage>

            <Formik
              initialValues={initValues}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log("submitting in Formik tag", values);
                values.slots = this.validateSlots();
                values.images = this.validateImages();
                if (values.slots && values.images) {
                  this.addItem(values);
                }
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required(requiredErrorMsg),
                description: Yup.string().required(requiredErrorMsg),
                type: Yup.string().required(requiredErrorMsg),
                condition: Yup.string().required(requiredErrorMsg),
              })}
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
                        title={<IntlMessages id="items.addItem.addItemHeader" />}
                        match={this.props.match}
                      />

                      <CardBox
                        heading={<IntlMessages id="items.addItem.itemImages" />}
                        styleName="col-sm-12"
                        cardStyle="jr-card"
                        childrenStyle="text-center"
                      >
                        <FullScreenUpload
                          maxFilesNumber={5}
                          label={
                            <IntlMessages id="items.addItem.uploadToolTip" />
                          }
                          revokeOnNavigation={
                            this.props.loggedInUser ? true : false
                          }
                          initialFiles={values.imageFiles}
                          update={(files) => this.updateItemImages(files)}
                        />
                        {this.state.emptyImagesFlag && (
                          <FormHelperText
                            error={true}
                            id="component-helper-text"
                          >
                            <IntlMessages id="items.addItem.imagesError" />
                          </FormHelperText>
                        )}
                      </CardBox>

                      <div className="jr-card">
                        <h2><IntlMessages id="items.addItem.title" /> </h2>
                        <TextField
                          name="title"
                          variant="outlined"
                          size="small"
                          InputProps={{
                            className: classes.input,
                          }}
                          width="220%"
                          value={values.title}
                          error={errors.title && touched.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.title && touched.title && errors.title
                          }
                        />
                        <br></br>
                        <br></br>

                        <h2><IntlMessages id="items.addItem.description" /> </h2>
                        <TextField
                          name="description"
                          multiline
                          variant="outlined"
                          style={{ width: "37%" }}
                          rows={7}
                          value={values.description}
                          error={errors.description && touched.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.description &&
                            touched.description &&
                            errors.description
                          }
                        />
                        <br></br>
                        <br></br>
                        <br></br>

                        <h2><IntlMessages id="items.type" /> </h2>
                        <RadioGroup
                          className="d-flex flex-row"
                          aria-label="gender"
                          name="type"
                          value={values.type}
                          error={errors.type && touched.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <FormControlLabel
                            key={"DONATION"}
                            value={"DONATION"}
                            control={<Radio color="primary" />}
                            label={<IntlMessages id="items.type.donation" />}
                          />
                          <FormControlLabel
                            key={"TRADE"}
                            value={"TRADE"}
                            control={<Radio color="primary" />}
                            label={<IntlMessages id="items.type.trade" />}
                          /></RadioGroup>
                        {errors.type && touched.type && (
                          <FormHelperText
                            error={true}
                            id="component-helper-text"
                          >
                            <IntlMessages id="items.addItem.requiredError" />
                          </FormHelperText>
                        )}

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
                        <h2><IntlMessages id="items.condition" /> </h2>
                        <RadioGroup
                          className="d-flex"
                          aria-label="gender"
                          name="condition"
                          value={values.condition}
                          error={errors.condition && touched.condition}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        > <FormControlLabel
                            key={"ALMOST_NEW"}
                            value={"ALMOST_NEW"}
                            control={<Radio color="primary" />}
                            label={<IntlMessages id="items.condition.almostNew" />}
                          />
                          <FormControlLabel
                            key={"GOOD"}
                            value={"GOOD"}
                            control={<Radio color="primary" />}
                            label={<IntlMessages id="items.condition.good" />}
                          />
                          <FormControlLabel
                            key={"DIY"}
                            value={"DIY"}
                            control={<Radio color="primary" />}
                            label={<IntlMessages id="items.condition.DIY" />}
                          /></RadioGroup>
                        {errors.condition && touched.condition && (
                          <FormHelperText
                            error={true}
                            id="component-helper-text"
                          >
                            <IntlMessages id="items.addItem.requiredError" />
                          </FormHelperText>
                        )}
                      </div>

                      <div className="jr-card">
                        <h2><IntlMessages id="items.addItem.availableSlots" /> </h2>
                        <br></br>
                        {this.state.itemSlotCompArr}
                        {this.state.emptySlotsFlag && (
                          <Grid item xs={12}>
                            <FormHelperText
                              error={true}
                              id="component-helper-text"
                            >
                              <IntlMessages id="items.addItem.slotsError" />
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
                              style={{ backgroundColor: "#00bcd4" }}
                              className="text-white"
                            >
                              <AddIcon />
                            </Fab>
                          )}
                        </div>
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
                          onClick={this.validate}
                        >
                          {this.props.redirectInfo ? <IntlMessages id="items.addItem.confirm" /> : <IntlMessages id="items.addItem.addItem" />}
                        </Button>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    taskCompleted: state.items.taskCompleted,
    error: state.items.error,
    loggedInUser: state.auth.authUser,
    redirectInfo: state.auth.redirectInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddItem: (item) => dispatch(actions.addItem(item)),
    onRedirectToLogin: (redirectInfo) =>
      dispatch(actions.redirectToLogin(redirectInfo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddItem));
