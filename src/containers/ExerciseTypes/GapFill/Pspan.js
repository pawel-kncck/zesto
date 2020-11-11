import React from 'react';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import { updateElement } from '../../../store/quiz.actions';
import { setCaretPosition, setParagraphEditMode } from '../../../store/editMode.actions';
import { withStyles } from '@material-ui/core';

// Build with react-contenteditable 
// https://github.com/lovasoa/react-contenteditable
// https://www.npmjs.com/package/react-contenteditable

const styles = ({
  root: {
    border: 'none',
    outline: 'none',
    height: '21px'
  }
})

class Pspan extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
  };

  strip = html => {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022

  getCaretCharacterOffsetWithin = element => {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection !== "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ( (sel = doc.selection) && sel.type !== "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  };
   
  handleChange = evt => {
    this.props.updateElement(this.props.exIndex, this.props.pgIndex, this.props.elIndex, this.strip(evt.target.value))
  };

  handleFocus = () => {
    this.props.activateEditMode()
    this.handleCaretPosition()
  }

  handleCaretPosition = () => {
    var bodyRect = document.body.getBoundingClientRect();
    var elemRect = this.contentEditable.current.getBoundingClientRect();
    var offset   = elemRect.top - bodyRect.top;
    this.props.setCaretPosition(this.props.exIndex, this.props.pgIndex, this.props.elIndex, this.getCaretCharacterOffsetWithin(this.contentEditable.current), offset)
  };
   
  render = () => {
    const { classes } = this.props;
    return (
      <ContentEditable
        // style={{ marginRight: '5px' }}
        className={classes.root}
        innerRef={this.contentEditable}
        html={this.props.exercises[this.props.exIndex].paragraphs[this.props.pgIndex].elements[this.props.elIndex].content || '&nbsp'} // innerHTML of There  editable div
        disabled={false}       // use true to disable editing
        onChange={this.handleChange} // handle innerHTML change
        onKeyUp={this.handleCaretPosition} // handle innerHTML change
        onMouseUp={this.handleCaretPosition} // handle innerHTML change
        onBlur={() => this.props.deactivateEditMode()}
        onFocus={() => this.handleFocus()}
        tagName='span' // Use a custom HTML tag (uses a div by default)
      />
      )
  };
};

const mapStateToProps = state => {
  return {
    exercises: state.quiz.sections[0].exercises,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateElement: (exIndex, pgIndex, elIndex, content ) => {dispatch(updateElement(exIndex, pgIndex, elIndex, content))},
    setCaretPosition: (exIndex, pgIndex, elIndex, caretIndex, containerPositionY) => {dispatch(setCaretPosition(exIndex, pgIndex, elIndex, caretIndex, containerPositionY))},
    deactivateEditMode: () => {dispatch(setParagraphEditMode(false, 100))},
    activateEditMode: () => {dispatch(setParagraphEditMode(true, 200))},
  }
}

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Pspan));
