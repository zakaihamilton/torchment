import React from 'react';
import ShareCard from './Demo/ShareCard';
import PushCard from './Demo/PushCard';
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
            <PushCard />
        </div>
    );
}
