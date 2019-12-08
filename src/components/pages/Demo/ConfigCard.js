import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import { useAPI } from '../../../mgr/core/hooks';
import config from '../../../mgr/core/config';
import Tree from './ConfigCard/Tree';

const useStyles = makeStyles(theme => ({
    card: {
        width: 345,
        height: 515,
        overflowY: "auto"
    },
    avatar: {
        backgroundColor: red[500]
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

export default function ConfigCard() {
    const classes = useStyles();
    const content = useAPI(config.getConfig) || {};

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        <ShareIcon />
                    </Avatar>
                }
                title="Config"
                subheader="App Configuration"
            />
            <CardContent>
                <Tree items={content} />
            </CardContent>
        </Card>
    );
}
