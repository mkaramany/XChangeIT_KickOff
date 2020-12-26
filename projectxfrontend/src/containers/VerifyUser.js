import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import { hideMessage, showAuthLoader, userVerification } from "actions/Auth";
import { Alert } from "reactstrap";


class VerifyUser extends React.Component {
  state = { email: this.props.emailToVerify, verificationCode: "" };

  render() {
    const { email, verificationCode } = this.state;
    const { showMessage, loader, alertMessage } = this.props;

    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny">
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
            <div className="app-login-header mb-4">
              <Alert color="warning">
              <IntlMessages id="verification.msg" /> {this.state.email}.
              </Alert>
            </div>
            <div className="app-login-header mb-4">
              <h1>{ <IntlMessages id="verification.header" />}</h1>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label={ <IntlMessages id="verification.email" />}
                    fullWidth
                    value={this.state.email}
                    margin="normal"
                    className="mt-1 my-sm-4"
                  />

                  <TextField
                    label={ <IntlMessages id="verification.code" />}
                    fullWidth
                    onChange={(event) =>
                      this.setState({ verificationCode: event.target.value })
                    }
                    defaultValue={verificationCode}
                    margin="normal"
                    className="mt-1 my-sm-4"
                  />

                  <div className="mb-4 d-flex align-items-center justify-content-between">
                    <Button
                      onClick={() => {
                        this.props.showAuthLoader();
                        this.props.userVerification({
                          email,
                          verificationCode,
                        });
                      }}
                      variant="contained"
                      color="primary"
                    >
                      { <IntlMessages id="verification.btn" />}
                    </Button>
                  </div>
                </fieldset>
              </form>
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
  const { loader, alertMessage, showMessage, emailToVerify } = auth;
  return { loader, alertMessage, showMessage, emailToVerify };
};

export default connect(mapStateToProps, {
  hideMessage,
  showAuthLoader,
  userVerification,
})(VerifyUser);
