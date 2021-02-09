import React from "react";
import IntlMessages from "util/IntlMessages";
import XChangeItDataTable from "./../../../../../../../components/XChangeItDataTable/index";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Create";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

const options = {
  print: false,
  download: false,
  sort: true,
  filter: true,
  viewColumns: false,
  search: true,
  pagination: true,
  selectableRows: "none",
};

const UsersTable = (props) => {
  const columns = [
    {
      name: "username",
      label: "admin.users.username",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      },
    },
    {
      name: "nameEnglish",
      label: "admin.users.englishName",
      options: {
        filter: true,
        filterType: "textField",
        sort: false,
      },
    },
    {
      name: "nameArabic",
      label: "admin.users.arabicName",
      options: {
        filter: true,
        filterType: "textField",
        sort: false,
      },
    },
    {
      name: "entityName",
      label: "admin.users.entityName",
      options: {
        display: props.isSuperAdmin(),
        filter: true,
        filterType: "multiselect",
        sort: true,
      },
    },
    {
      name: "email",
      label: "admin.users.email",
      options: {
        filter: true,
        filterType: "textField",
        sort: true,
      },
    },
    {
      name: "userStatus",
      label: "admin.users.userStatus",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          console.group("customBodyRender",value);
          return (
            <div className="col-lg-3 col-sm-6 col-12">
              <FormControl className="w-100 mb-2" style={{ display: "block" }}>
                <Select
                  value={value}
                  input={<Input id="ageSimple3" />}
                  // width={100} autoWidth
                  // onChange={alert('test')}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </div>
          );
        },
      },
    },
    {
      name: "edit",
      label: "admin.users.edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              aria-label="Description"
              onClick={(event) => {
                props.onEdit();
              }}>
              <EditIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  return (
    <React.Fragment>
      <XChangeItDataTable
        title={<IntlMessages id="admin.users.displayUsers" />}
        columns={columns}
        data={props.data}
        options={options}
      />
    </React.Fragment>
  );
};

export default UsersTable;
