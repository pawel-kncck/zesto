import React from 'react';
import { makeStyles } from '@material-ui/core';
import Pspan from './Pspan';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '30px',
        background: 'inherit',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        background: 'rgb(255, 255, 255)',
        flexGrow: 1,
        padding: '9px 12px',
    },
    number: {
        minWidth: '36px',
        textAlign: 'center'
    }
}))

const Paragraph = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.number}>{props.exercises[props.exIndex].is_numbered ? (props.pgIndex + 1) + '.' : null}</div>
            <div className={classes.content}>
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