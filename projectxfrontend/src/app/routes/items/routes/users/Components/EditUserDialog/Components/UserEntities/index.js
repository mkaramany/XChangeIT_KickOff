import React from "react";
import IntlMessages from "util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import XChangeItDataTable from "./../../../../../../../../../components/XChangeItDataTable/index";
import Link from "@material-ui/core/Link";
import _ from "lodash";

const options = {
  print: false,
  download: false,
  sort: false,
  filter: false,
  viewColumns: false,
  search: false,
  pagination: false,
  selectableRows: "none",
};

const UserEntities = (props) => {
  const columns = [
    {
      name: "id",
      label: "admin.users.entity",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return props.selectedEntityId == value? (
            <Link
              index={tableMeta.columnIndex}
              component="button"
              onClick={(event) => {
                alert("Link");
              }}>
              {value}
            </Link>
          ) : (
            <div>{value}</div>
          );
        },
      },
    },
    {
      name: "userType",
      label: "admin.users.userType",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return props.selectedEntityId == tableMeta.rowData[0] ? (
            <FormGroup className="d-flex flex-row">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.checkedA}
                    onChange={props.handleChange}
                    value="checkedA"
                  />
                }
                label="Technical Lead"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={props.checkedB}
                    onChange={props.handleChange}
                    value="checkedB"
                  />
                }
                label="Project Manager"
              />
            </FormGroup>
          ) : (
            <div>{value}</div>
          );
        },
      },
    },
    {
      name: "userPrivileges",
      label: "admin.users.privileges",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return props.selectedEntityId == tableMeta.rowData[0] ? (
            <FormGroup className="d-flex flex-row">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.checkedA}
                    onChange={props.handleChange}
                    value="checkedA"
                  />
                }
                label="Technical Lead"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={props.checkedB}
                    onChange={props.handleChange}
                    value="checkedB"
                  />
                }
                label="Project Manager"
              />
            </FormGroup>
          ) : (
            <div>{value}</div>
          );
        },
      },
    },
    {
      name: "userStatus",
      label: "admin.users.userStatus",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return props.selectedEntityId == tableMeta.rowData[0] ? (
            <FormControl className="w-100 mb-2" style={{ display: "block" }}>
              <Select
                value={value}
                input={<Input id="ageSimple3" />}
                // width={100} autoWidth
                // onChange={alert('test')}
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Inactive"}>Inactive</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <div>{value}</div>
          );
        },
      },
    },
    {
      name: "teams",
      label: "admin.users.team",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return _.map(value, (v) => {
            return<div>{v.name}</div>;
          });
        },
      },
    },
  ];

  return (
    <React.Fragment>
      <XChangeItDataTable
        title={<IntlMessages id="admin.users.belongsToEntities" />}
        columns={columns}
        data={props.data}
        options={options}
      />
    </React.Fragment>
  );
};

export default UserEntities;
