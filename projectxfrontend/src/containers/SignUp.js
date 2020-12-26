import { Grid, IconButton, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignUp,
  userTwitterSignIn,
} from "actions/Auth";
import { Formik } from "formik";
import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import * as Yup from "yup";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: {
          streetName: "",
          houseNumber: "",
          zipCode: "",
          city: "",
        },
      },
    };
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }

  onUserPropertyChange = (value, propertyName) => {
    let tempUser = { ...this.state.user };
    tempUser[propertyName] = value;
    this.setState({ user: tempUser });
  };

  onAddressPropertyChange = (value, propertyName) => {
    let tempUser = { ...this.state.user };
    let tempAddress = { ...this.state.user.address };
    tempAddress[propertyName] = value;
    tempUser.address = tempAddress;
    this.setState({ user: tempUser });
  };

  prepareUserData = (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      address: {
        zipCode: values.zipCode,
        city: values.city,
        streetName: values.streetName,
        houseNumber: values.houseNumber
      }
    };
    return user;
  };

  render() {
    const { user } = this.state;
    const { showMessage, loader, alertMessage } = this.props;
    const requiredErrorMsg = <IntlMessages id="signUp.requiredError" />;
    const numbersErrorMsg = <IntlMessages id="signUp.numberError" />;
    const emailErrorMsg = <IntlMessages id="signUp.emailError" />;
    const tooShortErrorMsg = <IntlMessages id="signUp.tooShortError" />;
    const passwordMismatchErrorMsg = <IntlMessages id="signUp.passwordMismatchError" />;
    
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="Jambo">
              <img
                src={require("assets/images/logo.png")}
                alt="jambo"
                title="jambo"
              />
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header">
              <h1>Sign Up</h1>
            </div>

            <div className="mb-4">
              <h2>
                <IntlMessages id="appModule.createAccount" />
              </h2>
            </div>

            <div className="app-login-form">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  streetName: "",
                  houseNumber: "",
                  zipCode: "",
                  city: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log("submitting signUp in Formik tag", values);
                  this.props.showAuthLoader();
                  const user = this.prepareUserData(values);
                  console.log("prepared user", user);
                  this.props.userSignUp(user);
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required(requiredErrorMsg),
                  lastName: Yup.string().required(requiredErrorMsg),
                  email: Yup.string()
                    .email(emailErrorMsg)
                    .required(requiredErrorMsg),
                  password: Yup.string()
                    .required(requiredErrorMsg)
                    .min(6, tooShortErrorMsg),
                  confirmPassword: Yup.string()
                    .required(requiredErrorMsg)
                    .when("password", {
                      is: (val) => (val && val.length > 0 ? true : false),
                      then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        passwordMismatchErrorMsg
                      ),
                    }),
                  zipCode: Yup.number()
                    .typeError(numbersErrorMsg)
                    .required(requiredErrorMsg),
                  streetName: Yup.string().required(requiredErrorMsg),
                  houseNumber: Yup.number()
                    .typeError(numbersErrorMsg)
                    .required(requiredErrorMsg),
                  city: Yup.string().required(requiredErrorMsg),
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
                      <Grid container>
                        <Grid item xs={6} style={{ paddingRight: "5px" }}>
                          {" "}
                          <TextField
                            type="text"
                            label="First Name"
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
                          />
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: "5px" }}>
                          <TextField
                            type="text"
                            label="Last Name"
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
                        <Grid item xs={12}>
                          {" "}
                          <TextField
                            // type="email"
                            name="email"
                            value={values.email}
                            error={errors.email && touched.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.email && touched.email && errors.email
                            }
                            label={<IntlMessages id="appModule.email" />}
                            fullWidth
                            margin="normal"
                            className="mt-0 mb-2"
                          />
                        </Grid>
                        <Grid item xs={6} style={{ paddingRight: "5px" }}>
                          <TextField
                            type="password"
                            name="password"
                            value={values.password}
                            error={errors.password && touched.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.password &&
                              touched.password &&
                              errors.password
                            }
                            label={<IntlMessages id="appModule.password" />}
                            fullWidth
                            margin="normal"
                            className="mt-0 mb-4"
                          />
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: "5px" }}>
                          {" "}
                          <TextField
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            error={
                              errors.confirmPassword && touched.confirmPassword
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.confirmPassword &&
                              touched.confirmPassword &&
                              errors.confirmPassword
                            }
                            label={"Confirm Password"}
                            fullWidth
                            margin="normal"
                            className="mt-0 mb-4"
                          />
                        </Grid>
                        <Grid item xs={6} style={{ paddingRight: "5px" }}>
                          {" "}
                          <TextField
                            type="text"
                            name="streetName"
                            value={values.streetName}
                            error={errors.streetName && touched.streetName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.streetName &&
                              touched.streetName &&
                              errors.streetName
                            }
                            label={"Street"}
                            fullWidth
                            margin="normal"
                            className="mt-0 mb-4"
                          />
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: "5px" }}>
                          {" "}
                          <TextField
                            type="text"
                            name="houseNumber"
                            value={values.houseNumber}
                            error={errors.houseNumber && touched.houseNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.houseNumber &&
                              touched.houseNumber &&
                              errors.houseNumber
                            }
                            label={"House Number"}
                            fullWidth
                            margin="normal"
                            className="mt-0 mb-4"
                          />
                        </Grid>
                        <Grid item xs={6} style={{ paddingRight: "5px" }}>
                          <TextField
                            type="text"
                            name="zipCode"
                            value={values.zipCode}
                            error={errors.zipCode && touched.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.zipCode &&
                              touched.zipCode &&
                              errors.zipCode
                            }
                            label={"Zip Code"}
                            fullWidth
                            margin="normal"
                            className="mt-0 mb-4"
                          />
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: "5px" }}>
                          {" "}
                          <TextField
                            type="text"
                            name="city"
                            value={values.city}
                            error={errors.city && touched.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.city && touched.city && errors.city
                            }
                            label={"City"}
                            fullWidth
                            margin="normal"
                            className="mt-0 mb-4"
                          />
                        </Grid>
                      </Grid>

                      <div className="mb-3 d-flex align-items-center justify-content-between">
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={() => {
                            // this.props.showAuthLoader();
                            console.log("user to register", user);
                            //   this.props.userSignUp(user);
                          }}
                          color="primary"
                        >
                          <IntlMessages id="appModule.regsiter" />
                        </Button>
                        <Link to="/signin">
                          <IntlMessages id="signUp.alreadyMember" />
                        </Link>
                      </div>
                      <div className="app-social-block my-1 my-sm-3">
                        <IntlMessages id="signIn.connectWith" />
                        <ul className="social-link">
                          <li>
                            <IconButton
                              className="icon"
                              onClick={() => {
                                this.props.showAuthLoader();
                                this.props.userFacebookSignIn();
                              }}
                            >
                              <i className="zmdi zmdi-facebook" />
                            </IconButton>
                          </li>

                          <li>
                            <IconButton
                              className="icon"
                              onClick={() => {
                                this.props.showAuthLoader();
                                this.props.userTwitterSignIn();
                              }}
                            >
                              <i className="zmdi zmdi-twitter" />
                            </IconButton>
                          </li>

                          <li>
                            <IconButton
                              className="icon"
                              onClick={() => {
                                this.props.showAuthLoader();
                                this.props.userGoogleSignIn();
                              }}
                            >
                              <i className="zmdi zmdi-google-plus" />
                            </IconButton>
                          </li>

                          <li>
                            <IconButton
                              className="icon"
                              onClick={() => {
                                this.props.showAuthLoader();
                                this.props.userGithubSignIn();
                              }}
                            >
                              <i className="zmdi zmdi-github" />
                            </IconButton>
                          </li>
                        </ul>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>

        {loader && (
          <div className="loader-view">
            <CircularProgress />
          </div>
        )}
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return { loader, alertMessage, showMessage, authUser };
};

export default connect(mapStateToProps, {
  userSignUp,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn,
})(SignUp);
