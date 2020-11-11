import React from 'react';
import NavBar from './containers/NavBar';
import LowerNavbar from './containers/LowerNavbar';
import EditingSpace from './containers/EditingSpace';
import StandardView from './containers/StandardView';
import { makeStyles, Paper } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  main: {
      width: '795px',
      minHeight: '500px',
      margin: 'auto',
      marginTop: '30px',
      padding: '30px',
  },
}))

function App(props) {
  const classes = useStyles();
  
  return (
    <>
      <NavBar />
      <LowerNavbar />
      <Paper elevation={3} className={classes.main}>
        { props.editMode ? <EditingSpace /> : <StandardView /> }
      </Paper>
    </>
  )
}

const mapStateToProps = state => {
  return {
    editMode: state.editMode.active
  }
}

export default connect(mapStateToProps,null)(App);
