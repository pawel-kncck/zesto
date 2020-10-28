import React from 'react';
import { makeStyles } from '@material-ui/core';
import Pspan from './Pspan';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '50px',
        background: 'rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
        padding: '18.5px 14px',
    }
}))

const Paragraph = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root} onClick={() => console.log('paragraph clicked')}>
            {
                props.exercises[props.exIndex].paragraphs[props.pgIndex].elements.map((element, elIndex) => {
                    switch (element.type) {
                        case 'text_run':
                            return (
                                <Pspan 
                                    key={elIndex} 
                                    content={element.content}
                                    exIndex={props.exIndex}
                                    pgIndex={props.pgIndex}
                                    elIndex={elIndex}
                                />
                            )
                        case 'gap':
                            return (
                                <input key={elIndex} type='text' />
                            )
                        default:
                            return null;
                    }
                })
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        exercises: state.quiz.sections[0].exercises,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    //   updateElement: (exIndex, pgIndex, elIndex, content ) => {dispatch(updateElement(exIndex, pgIndex, elIndex, content))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Paragraph);