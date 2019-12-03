import React from 'react';
import ShareCard from './Demo/ShareCard';
import NotificationCard from './Demo/NotificationCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        display: "flex"
    }
}));

export default function Demo() {
    const classes = useStyles();
    return (
        <div className={classes.list}>
            <ShareCard />
            <NotificationCard />
        </div>
    );
}
