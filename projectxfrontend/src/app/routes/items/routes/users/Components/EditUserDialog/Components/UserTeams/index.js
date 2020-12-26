import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import IntlMessages from "util/IntlMessages";
import XChangeItDataTable from "./../../../../../../../../../components/XChangeItDataTable/index";

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

const UserTeams = (props) => {
  const columns = [
    {
      name: "team",
      label: "admin.users.team"
    },
    {
      name: "userType",
      label: "admin.users.userType",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
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
          );
        },
      },
    },
    {
      name: "userPrivileges",
      label: "admin.users.privileges",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
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
          );
        },
      },
    },
    {
      name: "userStatus",
      label: "admin.users.userStatus",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="col-lg-3 col-sm-6 col-12">
              <FormControl className="w-100 mb-2" style={{ display: "block" }}>
                <Select value={value} input={<Input id="ageSimple3" />}>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </div>
          );
        },
      },
    }
  ];

  return (
    <React.Fragment>
      <XChangeItDataTable
        title={<IntlMessages id="admin.users.workTeams" />}
        columns={columns}
        data={props.data}
        options={options}
      />
    </React.Fragment>
  );
};

export default UserTeams;
