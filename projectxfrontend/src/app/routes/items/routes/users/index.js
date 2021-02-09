import React from "react";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import UsersTable from "./Components/UsersTable";
import AddUserDialog from "./Components/AddUserDialog";
import EditUserDialog from "./Components/EditUserDialog";
import * as actions from "../../../../../actions/index";
import axios from "axios";
import { connect } from "react-redux";

class UserAdministration extends React.Component {
  state = {
    openAddDialog: false,
    openEditDialog: false,
   // newUser: {}
  };

  componentDidMount() {
    console.log("componentDidMount", this.props);
    this.props.onFetchAllUsers();
  }

  isSuperAdmin = () => {
    return true;
  };

  openAddUserDialog = () => {
    console.log("openAddUserDialog");
    this.setState({ openAddDialog: true });
  };

  handleCloseAddUserDialog = () => {
    console.log("handleCloseDialog");
    this.setState({ openAddDialog: false });
  };

  handleAddUser = (user) => {
    console.log("handleSaveUserData" ,user);
    this.handleCloseAddUserDialog();
  };

  openEditUserDialog = () => {
    console.log("openEditUserDialog");
    this.setState({ openEditDialog: true });
  };

  handleCloseEditUserDialog = () => {
    console.log("handleCloseEditUserDialog");
    this.setState({ openEditDialog: false });
  };

  handleUpdateUser = () => {
    console.log("handleUpdateUser");
    this.handleCloseEditUserDialog();
  };

  render() {
    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">
            <div animated slideInUpTiny animation-duration-3>
              <ContainerHeader
                title={<IntlMessages id="admin.users.displayUsers" />}
                match={this.props.match}
              />
              <div
                style={{
                  margin: "15px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  className="bg-primary text-white"
                  onClick={() => this.openAddUserDialog()}
                >
                  {<IntlMessages id="admin.users.AddUser" />}
                </Button>
              </div>

              <UsersTable
                data={this.props.userList}
                isSuperAdmin={this.isSuperAdmin}
                onEdit={() => this.openEditUserDialog()}
              />
              <AddUserDialog
                title={<IntlMessages id="admin.users.AddUser" />}
                isSuperAdmin={this.isSuperAdmin}
                openDialog={this.state.openAddDialog}
                onClose={this.handleCloseAddUserDialog}
                handleSaveUserData={this.handleAddUser}
                onSubmit={this.handleAddUser}
              />
              <EditUserDialog
                title={<IntlMessages id="admin.users.viewEditUser" />}
                isSuperAdmin={this.isSuperAdmin}
                openDialog={this.state.openEditDialog}
                onClose={this.handleCloseEditUserDialog}
                onSave={this.handleUpdateUserData}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userAdmin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAllUsers: () =>  dispatch(actions.fetchAllUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAdministration);
