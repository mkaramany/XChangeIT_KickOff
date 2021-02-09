import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import XChangeItDialog from "../../../../../../../components/XChangeItDialog/index";
import IntlMessages from "../../../../../../../util/IntlMessages";
import UserEntities from "./Components/UserEntities";
import UserTeams from "./Components/UserTeams";

const entityList = [
  {
    id: "1",
    userType: "2",
    userPrivileges: "2",
    userStatus: "3",
    teams: [{ id: "12", name: "x" }, { id: "13", name: "y" }],
  },
  {
    id: "2",
    userType: "2",
    userPrivileges: "2",
    userStatus: "3",
    teams: [{ id: "12", name: "k" }, { id: "13", name: "M" }],
  },
  {
    id: "3",
    userType: "2",
    userPrivileges: "2",
    userStatus: "3",
    teams: [{ id: "12", name: "b" }, { id: "13", name: "c" }],
  },
];

const teamList = [
  {
    team: "TeamAAAAAAAAA",
    userType: "2",
    userPrivileges: "2",
    userStatus: "3",
  },
  {
    team: "TeamB",
    userType: "2",
    userPrivileges: "2",
    userStatus: "3",
  },
  {
    team: "TeamC",
    userType: "2",
    userPrivileges: "2",
    userStatus: "3",
  },
];

const getExtraActions = (props) => (
  <Button
    variant="contained"
    className="bg-danger text-white"
    onClick={props.onClose}>
    <IntlMessages id="admin.users.delete" />
  </Button>
);

const EditUserDialog = (props) => {
  console.log("props.openDialog", props.openDialog);

  return (
    <XChangeItDialog
      maxWidth="md"
      title={props.title}
      open={props.openDialog}
      onClose={props.onClose}
      onSave={props.onSave}
      extraActions={getExtraActions(props)}>
      <Grid container>
        <Grid item xs={12}>
          {props.isSuperAdmin() && (
            <FormControl className="w-100 mb-2" variant="outlined" disabled>
              <InputLabel htmlFor="age-simple">
                {<IntlMessages id="admin.users.entityName" />}
              </InputLabel>
              <Select
                fullWidth
                margin="dense"
                value={""}
                onChange={props.handleChange}
                displayEmpty
                className="mt-3">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid container>
          <Grid item xs={5}>
            <TextField
              autoFocus
              disabled
              value="test value"
              margin="dense"
              id="name"
              label={<IntlMessages id="admin.users.username" />}
              type="text"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <TextField
              autoFocus
              disabled
              value="cpr value"
              margin="dense"
              id="name"
              label={<IntlMessages id="admin.users.cpr" />}
              type="text"
              variant="filled"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5}>
            <TextField
              autoFocus
              disabled
              value="test value"
              margin="dense"
              id="name"
              label={<IntlMessages id="admin.users.englishName" />}
              type="email"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <TextField
              autoFocus
              disabled
              value="test value"
              margin="dense"
              id="name"
              label={<IntlMessages id="admin.users.arabicName" />}
              type="text"
              variant="filled"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={<IntlMessages id="admin.users.englishJobTitle" />}
              type="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={<IntlMessages id="admin.users.arabicJobTitle" />}
              type="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={<IntlMessages id="admin.users.phoneNumber" />}
              type="text"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={<IntlMessages id="admin.users.officeNumber" />}
              type="text"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={<IntlMessages id="admin.users.email" />}
            type="email"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      {props.isSuperAdmin() && (
        <div>
          <UserEntities data={entityList} selectedEntityId={1} />
        </div>
      )}

      {!props.isSuperAdmin() && (
        <div>
          <UserTeams data={teamList} />
        </div>
      )}
    </XChangeItDialog>
  );
};

export default EditUserDialog;
