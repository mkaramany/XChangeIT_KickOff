import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Alert } from "reactstrap";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PopUpMessage(props) {
    
  const classes = useStyles();
    const [open, setOpen] = React.useState(false);  

    useEffect(() => {
        console.log("useEffect");
        if(props.open) setOpen(true);
      }, [props.open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} color={props.color}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}