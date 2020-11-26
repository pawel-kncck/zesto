import { IconButton, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import AssignmentIcon from '@material-ui/icons/Assignment';
import FolderIcon from '@material-ui/icons/Folder';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        maxWidth: '750px',
        margin: 'auto',
        background: theme.palette.common.white,
        borderRadius: '10px',
        marginTop: '10px',
        transition: 'background 0.2s'
    },
    hover: {
        background: theme.palette.primary.light,
    },
    fileIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '56px',
        color: theme.palette.primary.main

    },
    fileName: {
        flexGrow: 1
    }
}))

const FileListItem = ({ /* id, */ name, type, onClick /*lastUpdated, ownerId */ }) => {
    const classes = useStyles();
    const [hover, setHover] = useState(false);
    const wrapperClasses = [classes.root, hover ? classes.hover : null];

    const icon = (typeInput) => {
        if (typeInput === 'folder') {
            return <FolderIcon />
        } else if (typeInput === 'quiz') {
            return <AssignmentIcon />
        } else {
            return <LibraryBooksIcon />
        }
    }

    return (
        <div className={wrapperClasses.join(' ')} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className={classes.fileIcon} onClick={onClick}>{icon(type)}</div>
            <div className={classes.fileName} onClick={onClick}>{name}</div>
            <IconButton><MoreVertIcon /></IconButton>
        </div>
    )
    
}

export default FileListItem;