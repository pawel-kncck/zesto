import { makeStyles, useMediaQuery } from '@material-ui/core';
import React from 'react';
import Gap from '../../containers/StandardMode/Gap';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: useMediaQuery(theme.breakpoints.up('sm'))
      ? theme.indent.secondIndent
      : theme.indent.secondIndentMobile,
    fontSize: 'inherit',
    fontFamily: 'inherit',
  },
  number: {
    width: '18px',
  },
}));

const GapFillParagraph = ({ paragraph, pgIndex, isNumbered }) => {
  const elements = paragraph.elements;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {isNumbered ? (
        <div className={classes.number}>{pgIndex + 1}.&nbsp;</div>
      ) : null}
      {elements.map((element, index) => {
        if (element.type === 'text_run') {
          return <span key={'s' + index}>{element.content}</span>;
        } else if (element.type === 'gap') {
          return <Gap key={'g' + index} id={element.id} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default GapFillParagraph;
