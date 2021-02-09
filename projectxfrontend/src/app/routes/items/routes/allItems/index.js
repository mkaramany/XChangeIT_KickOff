import { Grid, TextField } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Alert } from "reactstrap";
import IntlMessages from "util/IntlMessages";
import * as actions from "../../../../../actions/index";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import ItemsCard from "../../../components/routes/dashboard/routes/Listing/ItemsCard";
import ItemsFilter from "components/ItemsFilter";



class Items extends React.Component {

  componentDidMount() {
    console.log("componentDidMount", this.props);
    this.props.onFetchAllItems();
  }

 
  searchItems = (searchCriteria) => {
    this.props.onSearchItems(searchCriteria);
  };

  render() {
    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">
            <div animated slideInUpTiny animation-duration-3>
              <ContainerHeader title={<IntlMessages id="header.items.allItems" />} match={this.props.match} />

            <ItemsFilter onSearch={this.searchItems}/>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <NavLink className="prepend-icon" to={"/app/items/addItem"}>
                  <Fab
                    style={{ backgroundColor: "#00bcd4" }}
                    className="jr-fab-btn text-white"
                  >
                    <i className="zmdi zmdi-plus zmdi-hc-2x" />
                  </Fab>
                </NavLink>
              </div>
              <br></br>
              <br></br>

              {this.props.itemList && this.props.itemList.length === 0 && (
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-6">
                    <Alert className="shadow-lg" color="warning">
                      No Results!
                    </Alert>
                  </div>
                  <div className="col-3"></div>
                </div>
              )}

              <br></br>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid container>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-12 order-lg-1">
                    {this.props.itemList && (<ItemsCard allItems={this.props.itemList} />)}
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemList: state.items.allItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAllItems: () => dispatch(actions.fetchAllItems()),
    onSearchItems: (criteria) => dispatch(actions.searchItems(criteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
