import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { orange } from '@material-ui/core/colors';
import ListIcon from '@material-ui/icons/List';
import { useAPI } from '../../utils/hooks';
import logger from '../../../mgr/core/logger';
import Tree from './Tree';

const useStyles = makeStyles(theme => ({
    card: {
        width: 345,
        height: 600,
        margin: "6px",
        overflowY: "auto"
    },
    avatar: {
        backgroundColor: orange[500]
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    button: {
        margin: theme.spacing(1)
    },
    link: {
        margin: theme.spacing(0.5),
    }
}));

export default function LoggerCard() {
    const classes = useStyles();
    const entries = useAPI(logger.logs) || [];

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        <ListIcon />
                    </Avatar>
                }
                title="Logger"
                subheader="App Logs"
            />
            <CardContent>
                <Tree items={entries} />
            </CardContent>
        </Card>
    );
}
