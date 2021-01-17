import { Avatar, Button, Grid, Link, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import * as actions from "../../../../../actions";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import LinkUpload from "../../../../../components/dropzone/LinkUpload";
import IntlMessages from "util/IntlMessages";

const styles = (theme) => ({
  input: {
    borderRadius: "0",
    width: "220%",
  },
});

class UserProfile extends React.Component {
  state = {
    itemImages: [],
    base64Image: [],
    profilePictureRemoved: false,
  };

  componentDidMount() {
    console.log("user profile props", this.props);

    if (this.props.loggedInUser) {
      console.log("loggedInUser not null", this.props);
      this.props.onGetUserById(this.props.loggedInUser.id);
    }
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate user profile");
      if (this.props.taskCompleted !== prevProps.taskCompleted) {
        this.props.onGetUserById(this.props.loggedInUser.id);
      }
  }

  updateProfilePicture = (files) => {
    console.log("inside updateProfilePicture", files);
    this.setState({ itemImages: files });
    this.upload(files);
  };

  getAvatar = () => {
    if (this.state.base64Image.length > 0) {
      return "data:image/jpeg;base64," + this.state.base64Image[0].base64;
    } else if (this.props.userToEdit) {
      if (this.props.userToEdit.profilePictureUrl) {
        console.log("social url");
        return this.props.userToEdit.profilePictureUrl;
      } else {
        return "data:image/jpeg;base64," + this.props.userToEdit.profilePicture;
      }
    }
  };

  showPlaceholder = () => {
    if (
      this.state.profilePictureRemoved ||
      (this.props.userToEdit &&
        this.props.userToEdit.profilePicture === null &&
        this.props.userToEdit.profilePictureUrl === null &&
        this.state.base64Image.length === 0)
    )
      return true;
    return false;
  };

  upload = (files) => {
    let tempItemImages = files;
    console.log("inside upload", tempItemImages);

    if (tempItemImages.length > 0) {
      tempItemImages.map((imageFile, index) =>
        this.getBase64(imageFile, index)
      );
    }
  };

  getBase64 = (file, index) => {
    console.log("inside getBase64", file);
    var self = this;
    var base64data = null;
    axios({
      method: "get",
      url: URL.createObjectURL(file),
      responseType: "blob",
    }).then(function(response) {
      var reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onloadend = function() {
        base64data = reader.result.split(",")[1];
        console.log("base64data", base64data);
        let tempBase64Image = [...self.state.base64Image];
        tempBase64Image[index] = { base64: base64data };
        self.setState({ base64Image: tempBase64Image });
        self.setState({ profilePictureRemoved: false });
      };
    });
  };

  prepareUserData = (values) => {
    //initialize profile picture with the value retrieved from the server
    let pp = values.profilePicture;

    if (this.state.profilePictureRemoved) {
      pp = null;
    } else if (this.state.base64Image.length > 0) {
      pp = this.state.base64Image[0].base64;
    }

    const user = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      profilePicture: pp,
      // address: {
      //   zipCode: values.zipCode,
      //   city: values.city,
      //   streetName: values.streetName,
      //   houseNumber: values.houseNumber,
      // },
    };
    return user;
  };

  render() {
    console.log("profile render", this.props);
    const { classes } = this.props;
    const requiredErrorMsg = <IntlMessages id="user.profile.requiredError" />;
    const numbersErrorMsg = <IntlMessages id="user.profile.numberError" />;
    const tooLongErrorMsg = <IntlMessages id="user.profile.tooLongError" />;

    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">
            {this.props.userToEdit && (
              <Formik
                initialValues={{
                  id: this.props.userToEdit.id,
                  firstName: this.props.userToEdit.firstName,
                  lastName: this.props.userToEdit.lastName,
                  email: this.props.userToEdit.email,
                  streetName: this.props.userToEdit.address
                    ? this.props.userToEdit.address.streetName
                    : "",
                  houseNumber: this.props.userToEdit.address
                    ? this.props.userToEdit.address.houseNumber
                    : "",
                  zipCode: this.props.userToEdit.address
                    ? this.props.userToEdit.address.zipCode
                    : "",
                  city: this.props.userToEdit.address
                    ? this.props.userToEdit.address.city
                    : "",
                  profilePicture: this.props.userToEdit.profilePicture,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log(" submitting edit profile in Formik tag", values);
                  const user = this.prepareUserData(values);
                  this.props.onEditUser(user);
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required(requiredErrorMsg).max(80,  tooLongErrorMsg),
                  lastName: Yup.string().required(requiredErrorMsg).max(80,  tooLongErrorMsg),
                  // zipCode: Yup.number()
                  //   .typeError(numbersErrorMsg)
                  //   .required(requiredErrorMsg),
                  // streetName: Yup.string().required(requiredErrorMsg),
                  // houseNumber: Yup.number()
                  //   .typeError(numbersErrorMsg)
                  //   .required(requiredErrorMsg),
                  // city: Yup.string().required(requiredErrorMsg),
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
                      <div animated>
                        <ContainerHeader
                          title={<IntlMessages id="user.profile.header" />}
                          match={this.props.match}
                        />

                        <div
                          style={{
                            margin: "15px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {this.showPlaceholder() && (
                            <Avatar
                              className="size-100"
                              alt="..."
                              src={require("assets/images/placeholder.jpg")}
                            />
                          )}
                          {!this.showPlaceholder() && (
                            <Avatar
                              className="size-100"
                              alt="..."
                              src={this.getAvatar()}
                            />
                          )}
                        </div>

                        <div
                          style={{
                            margin: "15px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <LinkUpload
                            maxFilesNumber={1}
                            revokeOnNavigation={true}
                            update={(files) => this.updateProfilePicture(files)}
                          />
                          <span
                            style={{ paddingLeft: "2%" }}
                            className="jr-link"
                            onClick={() =>
                              this.setState({
                                profilePictureRemoved: true,
                                base64Image: [],
                              })
                            }
                          >
                            <IntlMessages id="user.profile.picture.remove" />
                          </span>
                        </div>

                        <div className="jr-card">
                          <h2><IntlMessages id="user.profile.title" /> </h2>
                          <Grid container>
                            <Grid item xs={12} style={{ padding: "10px" }}>
                              <Grid item xs={1} style={{ fontSize: "14px" }}>
                              <IntlMessages id="user.profile.email" />
                              </Grid>
                              <Grid item xs={11} style={{ fontSize: "18px" }}>
                                <span>
                                  <p>
                                    <b>{this.props.userToEdit.email}</b>
                                  </p>
                                </span>
                              </Grid>
                            </Grid>

                            <Grid item xs={12} style={{ padding: "10px" }}>
                              <Grid item xs={1} style={{ fontSize: "14px" }}>
                              <IntlMessages id="user.profile.phoneNumber" />
                              </Grid>
                              <Grid item xs={11} style={{ fontSize: "18px" }}>
                                <span>
                                  <p>
                                    <b>{this.props.userToEdit.phoneNumber}</b>
                                  </p>
                                </span>
                              </Grid>
                            </Grid>

                            <Grid item xs={6} style={{ padding: "10px" }}>
                              <TextField
                                type="text"
                                label={<IntlMessages id="user.profile.firstName" />}
                                margin="normal"
                                className="mt-0 mb-2"
                                name="firstName"
                                value={values.firstName}
                                error={errors.firstName && touched.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.firstName &&
                                  touched.firstName &&
                                  errors.firstName
                                }
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={6} style={{ padding: "10px" }}>
                              <TextField
                                type="text"
                                label={<IntlMessages id="user.profile.lastName" />}
                                name="lastName"
                                value={values.lastName}
                                error={errors.lastName && touched.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.lastName &&
                                  touched.lastName &&
                                  errors.lastName
                                }
                                fullWidth
                                margin="normal"
                                className="mt-0 mb-2"
                              />
                            </Grid>

                          </Grid>
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
                            {<IntlMessages id="user.profile.edit" />}
                          </Button>
                        </div>
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
    taskCompleted: state.users.taskCompleted,
    loggedInUser: state.auth.authUser,
    userToEdit: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditUser: (user) => dispatch(actions.editUser(user)),
    onGetUserById: (id) => dispatch(actions.getUserById(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserProfile));
