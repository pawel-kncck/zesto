import {
  Button,
  FormControlLabel,
  IconButton,
  makeStyles,
  Switch,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import React, { useContext } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import { setEditMode } from '../store/editMode.actions';
import {
  updateQuizById,
  deleteQuizById,
  deleteFolderFromFileTree,
  updateAnswersByQuizId,
} from '../database/functions';
import { AuthContext } from '../containers/Authentication/contex';
import { useSnackbar } from 'notistack';
import UndoIcon from '@material-ui/icons/Undo';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '52px',
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
}));

const LowerNavbar = (props) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const isOwner =
    props.owners && user ? props.owners.includes(user.uid) : false;
  const isNew = props.metadata.createdAt
    ? JSON.stringify(props.metadata.createdAt) ===
      JSON.stringify(props.metadata.lastUpdatedAt)
    : false;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleSaveChanges = () => {
    updateQuizById(props.quizId, props.quizBodyObject)
      .then((res) => {
        enqueueSnackbar(res, { variant: 'success' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveAnswers = () => {
    updateAnswersByQuizId(props.quizId, props.quizAnswersObject)
      .then((res) => {
        enqueueSnackbar(res, { variant: 'success' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoBackReturn = () => {
    deleteQuizById(props.quizId);
    deleteFolderFromFileTree(user.uid, props.quizId);
    history.push('/');
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
                onChange={() => props.setEditMode(!props.editMode)}
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

      <div className={classes.buttonContainer}>
        {matches ? (
          <Button
            size="small"
            color="primary"
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={props.upToDate}
            onClick={props.editMode ? handleSaveChanges : handleSaveAnswers}
          >
            Save
          </Button>
        ) : (
          <IconButton
            size="small"
            // color="primary"
            onClick={props.editMode ? handleSaveChanges : handleSaveAnswers}
          >
            <SaveIcon />
          </IconButton>
        )}
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
