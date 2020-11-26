import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAnswer } from '../../store/answers.actions';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 5px',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    outline: 'none',
    fontSize: 'inherit',
  },
  focus: {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
  hover: {
    borderColor: theme.palette.text.primary,
  },
}));

const Gap = (props) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const wrapperClasses = [
    classes.root,
    focus ? classes.focus : null,
    hover && !focus ? classes.hover : null,
  ];
  const id = props.id;

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <input
      className={wrapperClasses.join(' ')}
      type="text"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      value={props.answers[id]}
      onChange={(event) => props.setAnswer(id, event.target.value)}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    answers: state.answers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAnswer: (id, value) => {
      dispatch(setAnswer(id, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gap);
