import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShareCard from './Demo/ShareCard';
import NotificationCard from './Demo/NotificationCard';
import ConfigCard from './Demo/ConfigCard';
import LoggerCard from "./Demo/LoggerCard";

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
            <LoggerCard />
        </div>
    );
}
