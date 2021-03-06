import {
  makeStyles,
  Box,
  Button,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { insertButtonHoverState } from '../../../store/editMode.actions';
import {
  addParagraph,
  insertGap,
  toggleIsNumbered,
  updateExerciseTitle,
} from '../../../store/quiz.actions';
import Paragraph from './Paragraph';
import TitleField from '../../../componenets/EditMode/TitleField';
import ExerciseCardMain from '../../../componenets/EditMode/ExerciseCardMain';
import ExerciseCardOptions from '../../../componenets/EditMode/ExerciseCardOptions';
import ExerciseCardInsideButtons from '../../../componenets/EditMode/ExerciseCardInsideButtons';

const useStyles = makeStyles({
  exerciseOptionsContainer: {
    height: '50px',
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10px',
  },
  paragraphBox: {
    marginLeft: '60px',
    marginBottom: '10px',
  },
});

const GapFill = (props) => {
  const classes = useStyles();
  const isNumbered = props.exercises[props.exIndex].isNumbered;

  const handleInsertGap = () => {
    const exIndex = props.caretPosition.exIndex;
    const pgIndex = props.caretPosition.pgIndex;
    const elIndex = props.caretPosition.elIndex;
    const splitIndex = props.caretPosition.caretIndex;

    props.insertGap(exIndex, pgIndex, elIndex, splitIndex);
  };

  return (
    <>
      <ExerciseCardMain>
        <TitleField
          value={props.exercises[props.exIndex].title}
          onChange={(e) =>
            props.updateExerciseTitle(props.exIndex, e.target.value)
          }
          number={props.exIndex + 1}
        />
        {props.exercises[props.exIndex].paragraphs.map((paragraph, pgIndex) => (
          <Box key={pgIndex} className={classes.paragraphBox}>
            <Paragraph
              exIndex={props.exIndex}
              pgIndex={pgIndex}
              paragraph={paragraph}
            />
          </Box>
        ))}
        <ExerciseCardInsideButtons>
          <Button
            variant="outlined"
            onClick={() => props.addParagraph(props.exIndex)}
          >
            + Add item
          </Button>
          <Button
            disabled={
              !(
                props.caretPosition.active &&
                props.caretPosition.exIndex === props.exIndex
              )
            }
            style={{ marginLeft: '15px' }}
            variant="outlined"
            onClick={handleInsertGap}
          >
            + Insert gap
          </Button>
        </ExerciseCardInsideButtons>
      </ExerciseCardMain>
      <ExerciseCardOptions>
        <FormControlLabel
          control={
            <Switch
              checked={isNumbered}
              onChange={() => props.toggleIsNumbered(props.exIndex)}
              color="primary"
            />
          }
          label="Numbered"
          labelPlacement="start"
        />
      </ExerciseCardOptions>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    exercises: state.quiz.sections[0].exercises,
    caretPosition: state.editMode.caretPosition,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addParagraph: (exIndex) => {
      dispatch(addParagraph(exIndex));
    },
    insertGap: (exIndex, pgIndex, elIndex, splitIndex) => {
      dispatch(insertGap(exIndex, pgIndex, elIndex, splitIndex));
    },
    insertButtonSetState: (is_active) => {
      dispatch(insertButtonHoverState(is_active));
    },
    toggleIsNumbered: (exIndex) => {
      dispatch(toggleIsNumbered(exIndex));
    },
    updateExerciseTitle: (exIndex, value) => {
      dispatch(updateExerciseTitle(exIndex, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GapFill);
