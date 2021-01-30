import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import { connect } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { userSignOut } from 'actions/Auth';
import IntlMessages from 'util/IntlMessages';
import _ from "lodash";
import { withRouter } from "react-router-dom";


class UserInfo extends React.Component {

  getUserRole(roles) {
    const role = _.includes(roles, "ROLE_ADMIN")
      ? "Administrator"
      : "XChangeIt Member";
    return role;
  }

  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {

    const user = this.props.authUser;
    console.log("side user info", user);
    let profilePictureSrc = "https://via.placeholder.com/150x150";
    if (user) {
      if (user.profilePictureUrl) {
        profilePictureSrc = user.profilePictureUrl;
      } else if (user.profilePicture) {
        profilePictureSrc = "data:image/jpeg;base64," + user.profilePicture;
      }
    }
    console.log("side user info img src", profilePictureSrc);

    return (
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt='...'
          src={profilePictureSrc}
          className="user-avatar "
        />
        {user && (<div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}>{user.firstName + " " + user.lastName} <i
            className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
          </h4>
          <small>{this.getUserRole(user.roles)}</small>
        </div>)}

        <Menu className="user-info"
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              minWidth: 120,
              paddingTop: 0,
              paddingBottom: 0
            }
          }}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <span
              onClick={() => {
                console.log("Go to profile page");
                this.props.history.push("/app/profile");
              }}
            > <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
              <IntlMessages id="popup.profile" />
              </span>
          </MenuItem>

          <MenuItem onClick={() => {
            this.handleRequestClose();
            this.props.userSignOut()
          }}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />

            <IntlMessages id="popup.logout" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { locale } = settings;
  return { locale, authUser: auth.authUser }
};


export default withRouter(connect(mapStateToProps, { userSignOut })(UserInfo));


