import React from "react";
import { connect } from "react-redux";
import { userSignOut } from "actions/Auth";
import IntlMessages from "util/IntlMessages";
import _ from "lodash";
import { withRouter } from "react-router-dom";

class UserInfoPopup extends React.Component {
  
  getUserRole(roles) {
    const role = _.includes(roles, "ROLE_ADMIN")
      ? "Administrator"
      : "XChangeIt Member";
    return role;
  }

  render() {
    const user = this.props.authUser;
    console.log("pop up user", user);
    let profilePictureSrc = "https://via.placeholder.com/150x150";
    if (user) {
      if (user.profilePictureUrl) {
        profilePictureSrc = user.profilePictureUrl;
      } else if (user.profilePicture) {
        profilePictureSrc = "data:image/jpeg;base64," + user.profilePicture;
      }
    }
    console.log("popup src", profilePictureSrc);

    return (
      <div>
        <div className="user-profile">
          <img
            className="user-avatar border-0 size-40 rounded-circle"
            src={profilePictureSrc}
            alt="User"
          />
          <div className="user-detail ml-2">
            <h4 className="user-name mb-0">
              {user.firstName + " " + user.lastName}
            </h4>
            <small>{this.getUserRole(user.roles)}</small>
          </div>
        </div>
        <span
          className="jr-link dropdown-item text-muted"
          onClick={() => {
            console.log("Go to profile page");
            this.props.history.push("/app/profile");
          }}
        >
          <i className="zmdi zmdi-face zmdi-hc-fw mr-1" />
          <IntlMessages id="popup.profile" />
        </span>

        <span
          className="jr-link dropdown-item text-muted"
          onClick={() => {
            console.log("Try to logoput");
            this.props.userSignOut();
          }}
        >
          <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-1" />
          <IntlMessages id="popup.logout" />
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    authUser: auth.authUser,
  };
};

export default withRouter(connect(mapStateToProps, { userSignOut })(UserInfoPopup));
