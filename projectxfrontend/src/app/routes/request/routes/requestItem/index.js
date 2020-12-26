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


class RequestItem extends React.Component {
  
  render() {

    return (
      <main className="app-main-content-wrapper">
        <div className="app-main-content">
          <div className="app-wrapper">
            
            Empty Request Page
          </div>
        </div>
      </main>
    );
  }
}


export default RequestItem;
