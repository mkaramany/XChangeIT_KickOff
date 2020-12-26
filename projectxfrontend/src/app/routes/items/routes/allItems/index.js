import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../../actions/index";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import { Grid, TextField } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import _ from "lodash";
import ItemCard from "../../../../../components/Cards/Item";
import { NavLink } from "react-router-dom";
import { Alert } from "reactstrap";
import IntlMessages from "util/IntlMessages";

class Items extends React.Component {
  state = { searchCriteria: { zipCode: "", city: "", textSearch: "" } };

  componentDidMount() {
    console.log("componentDidMount", this.props);
    this.props.onFetchAllItems();
  }

  updateSearchFilter = (event, propertyName) => {
    let tempCriteria = { ...this.state.searchCriteria };
    tempCriteria[propertyName] = event.target.value;
    this.setState({ searchCriteria: tempCriteria });
  };

  searchItems = () => {
    this.props.onSearchItems(this.state.searchCriteria);
  };

  render() {
    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">
            <div animated slideInUpTiny animation-duration-3>
              <ContainerHeader title={<IntlMessages id="header.items.allItems" />} match={this.props.match} />

              <div className="jr-card">
                <h2><IntlMessages id="items.search.Filters" /></h2>
                <Grid container>
                  <Grid item xs={4}>
                    <TextField
                      label={<IntlMessages id="items.search.zipCode" />}
                      placeholder={<IntlMessages id="items.search.zipCode" />}
                      name="zipCode"
                      variant="outlined"
                      size="small"
                      fullwidth
                      onChange={(e) => this.updateSearchFilter(e, "zipCode")}
                      onBlur={this.searchItems}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label={<IntlMessages id="items.search.city" />}
                      placeholder={<IntlMessages id="items.search.city" />}
                      name="city"
                      variant="outlined"
                      size="small"
                      fullwidth
                      onChange={(e) => this.updateSearchFilter(e, "city")}
                      onBlur={this.searchItems}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label={<IntlMessages id="items.search.text" />}
                      placeholder={<IntlMessages id="items.search.text" />}
                      name="textSearch"
                      variant="outlined"
                      size="small"
                      fullwidth
                      onChange={(e) => this.updateSearchFilter(e, "textSearch")}
                      onBlur={this.searchItems}
                    />
                  </Grid>
                </Grid>
              </div>

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
                  {_.map(this.props.itemList, (item, index) => {

                    return (
                      <div
                        key={index}
                        className="col-lg-3 col-lg-3 col-sm-6 col-12 order-xl-3"
                      >
                        <NavLink
                          className="prepend-icon"
                          to={"/app/items/viewItem/" + item.id}
                        >
                          <ItemCard
                            title={item.title}
                            description={item.description}
                            status={item.status}
                            image={item.thumbnail}
                          />
                        </NavLink>
                      </div>
                    );
                  })}
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
