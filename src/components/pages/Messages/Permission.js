import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import push from '../../utils/notification';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles = makeStyles(theme => ({
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    info: {
        backgroundColor: theme.palette.primary.light,
    },
    iconButton: {
        margin: theme.spacing(1)
    },
    iconIcon: {
        fontSize: 20,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none'
    }
}));

export default function Permission() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const enableNotifications = () => {
        push.askForPermission();
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={open}
                onClose={handleClose}
                autoHideDuration={6000}
                variant="info">
                <SnackbarContentWrapper
                    className={classes.margin}
                    message="Notifications are not enabled"
                    actionLabel="Enable Notifications"
                    actionClick={enableNotifications}
                    onClose={handleClose}
                />
            </Snackbar>
            />
        </div>
    );
}

function SnackbarContentWrapper({ className, message, onClose, actionLabel, actionClick }) {
    const classes = useStyles();

    return (
        <SnackbarContent
            className={clsx(classes.info, className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <InfoIcon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <Button key="action" color="primary" variant="contained" onClick={actionClick}>
                    {actionLabel}
                </Button>,
                <IconButton className={classes.iconButton} key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.iconIcon} />
                </IconButton>,
            ]}
        />
    );
}
