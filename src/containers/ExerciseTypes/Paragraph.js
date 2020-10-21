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
        <div className={classes.root}>
            {
                props.exercises[props.exIndex].paragraphs[props.pIndex].elements.map((element, index) => {
                    switch (element.type) {
                        case 'text_run':
                            return (
                                <Pspan key={index} content={element.content} />
                            )
                        case 'gap':
                            return (
                                <input key={index} type='text' />
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

export default connect(mapStateToProps,null)(Paragraph);