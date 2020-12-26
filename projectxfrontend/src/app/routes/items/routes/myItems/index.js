import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../../actions/index";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import Moment from "moment";
import ItemStatus from "../../../../../components/ItemStatus";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from "react-router-dom";
import IntlMessages from "util/IntlMessages";


class MyItems extends React.Component {
  state = {};

  componentDidMount() {
    console.log("componentDidMount MyItems");
      this.props.onGetUserItems(this.props.loggedInUser.id);
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate MyItems");
      if (this.props.taskCompleted !== prevProps.taskCompleted) {
        this.props.onGetUserItems(this.props.loggedInUser.id);
      }
  }

  render() {

    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">
            <div animated slideInUpTiny animation-duration-3>
              <ContainerHeader title={<IntlMessages id="header.items.myItems" />} match={this.props.match} />
              {this.props.myItemsList && (
                <div className="jr-card">
                  <div
                    className="table-responsive-material"
                    style={{ overflow: "auto", height: "600px" }}
                  >
                      <Table>
                        <TableHead> 
                          <TableRow style={{  backgroundColor: "#f5f5f5"}}>
                            <TableCell align="left"><IntlMessages id="items.myItems.id" /></TableCell>
                            <TableCell align="left"><IntlMessages id="items.myItems.thumbnail" /></TableCell>
                            <TableCell align="left"><IntlMessages id="items.myItems.title" /></TableCell>
                            <TableCell align="left"><IntlMessages id="items.myItems.status" /></TableCell>
                            <TableCell align="left"><IntlMessages id="items.myItems.published" /></TableCell>
                            <TableCell align="left"><IntlMessages id="items.myItems.edit" /></TableCell>
                            <TableCell align="left"><IntlMessages id="items.myItems.remove" /></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.props.myItemsList.map((i) => {
                            return (
                              <TableRow key={i.id}>
                                <TableCell align="left">{i.id}</TableCell>
                                <TableCell align="left">
                                  <img
                                    alt="..."
                                    width="90"
                                    height="90"
                                    src={
                                      "data:image/jpeg;base64," + i.thumbnail
                                    }
                                  />
                                </TableCell>
                                <TableCell align="left">{i.title}</TableCell>
                                <TableCell align="left">
                                  <ItemStatus
                                    width={100}
                                    status={i.status}
                                  ></ItemStatus>
                                </TableCell>
                                <TableCell align="left">
                                  {Moment(i.publishDate).format("DD.MM.YYYY")}
                                </TableCell>
                                <TableCell align="left">
                                  {i.status === "AVAILABLE" && (
                                    <Button><EditIcon/></Button>
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {i.status === "AVAILABLE" && (
                                    <Button
                                      onClick={() =>
                                        this.props.onDeleteItem(i.id)
                                      }
                                    >
                                      <DeleteIcon/>
                                    </Button>
                                    
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state from myItems", state.items);
  return {
    myItemsList: state.items.allItems,
    loggedInUser: state.auth.authUser,
    taskCompleted: state.items.taskCompleted,
    error: state.items.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserItems: (userId) => dispatch(actions.getUserItems(userId)),
    onDeleteItem: (itemId) => dispatch(actions.deleteItem(itemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyItems);
