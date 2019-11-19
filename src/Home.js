import React from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import AppBar from './components/AppBar';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "6px"
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className="Home">
      <AppBar />
      <Box className={classes.root}>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </Box>
    </div>
  );
}
