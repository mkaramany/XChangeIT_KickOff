import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../../../actions/index";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";


class ItemInfoPage extends React.Component {

  state = {
    selectedSlotId: "",
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { id } = params;
    console.log("componentDidMount Info page", id);
    this.props.onSetItemAsTaken(id);
  }



  render() {

    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">
              <div animated slideInUpTiny animation-duration-3>
                <ContainerHeader
                  title={<IntlMessages id="item.infoPage.header" />}
                  match={this.props.match}
                />


                <div className="jr-card">
                  <h2><IntlMessages id="item.infoPage.thankYouMsg" /> </h2>  
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
    itemDetails: state.items.itemDetails,
    loggedInUser: state.auth.authUser,
    taskCompleted: state.items.taskCompleted
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetItemAsTaken: (id) => dispatch(actions.setItemAsTaken(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemInfoPage));
