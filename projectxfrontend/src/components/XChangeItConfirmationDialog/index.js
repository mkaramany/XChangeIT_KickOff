import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: "relative",
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//     color: "#FFFFFF",
//   },
}));

const XChangeItConfirmationDialog = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Slide}
        onClose={props.onClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onYes} color="primary">
            {props.yesText}
          </Button>
          <Button onClick={props.onNo} color="secondary">
            {props.noText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default XChangeItConfirmationDialog;
