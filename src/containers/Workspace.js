import React from 'react';
import LowerNavbar from './LowerNavbar';
import EditingSpace from './EditingSpace';
import StandardView from './StandardView';
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

function Workspace(props) {
  const classes = useStyles();
  
  return (
    <>
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

export default connect(mapStateToProps,null)(Workspace);
