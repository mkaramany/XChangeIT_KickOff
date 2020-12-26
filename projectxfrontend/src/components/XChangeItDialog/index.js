import React from "react";
import IntlMessages from "util/IntlMessages";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Button,
  Toolbar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    flex: 1,
    color: "#FFFFFF",
  },
}));

const XChangeItDialog = (props) => {
  const classes = useStyles();
  const handleClick = () => {
    console.log("in handle click");
    document.getElementById(props.formSubmitionBtn).click();
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        maxWidth={props.maxWidth}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <DialogContentText>{props.content}</DialogContentText>
          {props.children}
        </DialogContent>
        <DialogActions>
          {props.extraActions}
          <Button
            variant="contained"
            className="bg-danger text-white"
            onClick={props.onClose}
          >
            <IntlMessages id="button.close" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default XChangeItDialog;
