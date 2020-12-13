import {
  Button,
  FormControlLabel,
  makeStyles,
  Switch,
  Typography,
} from '@material-ui/core';
// import ShareIcon from '@material-ui/icons/Share';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { setEditMode } from '../store/editMode.actions';
import {
  deleteQuizById,
  deleteFolderFromFileTree,
} from '../database/functions';
import { AuthContext } from '../containers/Authentication/contex';
import UndoIcon from '@material-ui/icons/Undo';
import { useHistory } from 'react-router';
import DoneIcon from '@material-ui/icons/Done';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '52px',
    position: 'fixed',
    top: '52px',
    width: '100%',
    zIndex: 100,
    background: theme.palette.common.offWhite,
    boxShadow: theme.shadows[1],
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'flex-end',
  },
  buttonContainer: {
    marginLeft: '10px',
    marginRight: '10px',
    // justifySelf: 'left',
  },
  rightButtonContainer: {
    flexGrow: 1,
    marginLeft: '20px',
    // justifySelf: 'right',
  },
  returnButton: {
    backgroundColor: '#d00',
    color: theme.palette.common.offWhite,
  },
  savingStatus: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
  },
}));

const LowerNavbar = ({ onSaveAnswers, onSaveBody, ...props }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const isOwner =
    props.owners && user ? props.owners.includes(user.uid) : false;
  const isNew = props.metadata.createdAt
    ? JSON.stringify(props.metadata.createdAt) ===
      JSON.stringify(props.metadata.lastUpdatedAt)
    : false;

  const handleGoBackReturn = () => {
    deleteQuizById(props.quizId);
    deleteFolderFromFileTree(user.uid, props.quizId);
    history.push('/');
  };

  const handleSwitchMode = () => {
    if (props.editMode) {
      props.setEditMode(false);
      if (!props.isDataSaved) {
        onSaveBody();
      }
    } else {
      props.setEditMode(true);
      if (!props.isDataSaved) {
        onSaveAnswers();
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.rightButtonContainer}>
        {isNew ? (
          <Button
            startIcon={<UndoIcon />}
            variant="contained"
            size="small"
            className={classes.returnButton}
            onClick={handleGoBackReturn}
          >
            Cancel
          </Button>
        ) : null}
      </div>
      {isOwner ? (
        <>
          <FormControlLabel
            className={classes.buttonContainer}
            control={
              <Switch
                checked={props.editMode}
                onChange={handleSwitchMode}
                color="primary"
              />
            }
            label="Editing"
            labelPlacement="start"
          />
          {/* <div className={classes.buttonContainer}>
            <Button
              size="small"
              color="primary"
              variant="contained"
              startIcon={<ShareIcon />}
            >
              Share
            </Button>
          </div> */}
        </>
      ) : null}

      <div className={classes.savingStatus}>
        {props.isDataSaved ? <DoneIcon /> : <AutorenewIcon />}
        <Typography color="textSecondary" variant="body2">
          {props.isDataSaved ? 'Saved' : 'Saving...'}
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    editMode: state.editMode.active,
    quizBodyObject: state.quiz,
    quizAnswersObject: state.answers,
    owners: state.metadata.owners,
    metadata: state.metadata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEditMode: (value) => {
      dispatch(setEditMode(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LowerNavbar);
