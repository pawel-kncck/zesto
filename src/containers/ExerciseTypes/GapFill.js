import { makeStyles, Box, TextField } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react'
import { connect } from 'react-redux';
import Paragraph from './Paragraph';

const useStyles = makeStyles(theme => ({
    topBar: {
        height: '5px',
        margin: 0,
        background: theme.palette.primary.main
    },
    editOptionsContainer: {
        height: '50px',
        margin: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '10px',
    },
    mainContainer: {
        minHeight: '400px',
        padding: '20px',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd'
    },
    titleBox: {
        display: 'flex',
        marginBottom: '20px',
    },
    paragraphBox: {
        marginLeft: '60px',
        marginBottom: '20px',

    },
    exNumber: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        fontWeight: 500,
    }
}))

const GapFill = (props) => {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.topBar}></Box>
            <Box className={classes.editOptionsContainer}>
                <DeleteIcon fontSize='small' />
            </Box>
            <Box className={classes.mainContainer}>
                <Box className={classes.titleBox}>
                    <Box className={classes.exNumber}>{props.exIndex + 1}.</Box>
                    <TextField 
                        fullWidth
                        variant='outlined'
                        label='Title'
                    />
                </Box>
                {
                    props.exercises[props.exIndex].paragraphs.map((paragraph, pIndex) => (
                        <Box key={pIndex} className={classes.paragraphBox}>
                            <Paragraph exIndex={props.exIndex} pIndex={pIndex} />
                        </Box>
                    ))
                }
            </Box>
        </>
    )
}

const mapStateToProps = state => {
    return {
        exercises: state.quiz.sections[0].exercises,
    }
}

export default connect(mapStateToProps,null)(GapFill);