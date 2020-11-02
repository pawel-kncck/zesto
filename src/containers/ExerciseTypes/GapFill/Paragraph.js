import React, { useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import Pspan from './Pspan';
import Gap from './Gap';
import { connect } from 'react-redux';
import { removeParagraphInGapFill } from '../../../store/quiz.actions'; 
import ParagraphOptionsMenu from './ParagraphOptions';
import MoreIcon from '@material-ui/icons/MoreHoriz';

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
        lineHeight: '24px',
    },
    number: {
        minWidth: '36px',
        textAlign: 'center'
    },
    delete: {
        width: '48px',
        height: '48px'
    },
    focus: {
        outline: '1px solid #ccc'
    },
    startDiv: {
        height: '18px',
        width: '1px',
        background: 'inherit',
        border: 'none',
        display: 'inline-block'
    }
}))

const Paragraph = (props) => {
    const [focus, setFocus] = useState(true);
    const [anchorEl, setAnchorEl] = useState(false);
    const classes = useStyles();
    const wrapperClasses = [classes.content, focus ? classes.focus : '']

    const handleFocus = () => {
        setFocus(true);
    }

    const handleBlur = () => {
        setFocus(true);
    }

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <div className={classes.number}>{props.exercises[props.exIndex].is_numbered ? (props.pgIndex + 1) + '.' : null}</div>
            <div className={wrapperClasses.join(' ')} onFocus={handleFocus} onBlur={handleBlur}>
                <div className={classes.startDiv} />
                { props.paragraph.elements.map((element, elIndex) => {
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
                                    <Gap key={element.id} id={element.id} exIndex={props.exIndex} pgIndex={props.pgIndex} />
                                )
                            default:
                                return null;
                        }
                    })
                }
            </div>
            <div className={classes.delete} onClick={(e) => handleOpenMenu(e)}>{focus ? <IconButton><MoreIcon /></IconButton> : null}</div>
            <ParagraphOptionsMenu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleCloseMenu} exIndex={props.exIndex} pgIndex={props.pgIndex} />
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
      removeParagraph: (exIndex, pgIndex) => {dispatch(removeParagraphInGapFill(exIndex, pgIndex))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Paragraph);