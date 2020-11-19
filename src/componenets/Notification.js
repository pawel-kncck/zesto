import { Snackbar } from '@material-ui/core'
import React from 'react'

const Notification = ({ open, onClose, message }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            message={message}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    )
}

export default Notification;