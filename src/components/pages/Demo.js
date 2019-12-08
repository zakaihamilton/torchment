import React from 'react';
import ShareCard from './Demo/ShareCard';
import NotificationCard from './Demo/NotificationCard';
import ConfigCard from './Demo/ConfigCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        display: "flex",
        flexWrap: "wrap"
    }
}));

export default function Demo() {
    const classes = useStyles();
    return (
        <div className={classes.list}>
            <ShareCard />
            <NotificationCard />
            <ConfigCard />
        </div>
    );
}
