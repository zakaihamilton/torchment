import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import MessageCard from './Messages/MessageCard';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: "6px",
        width: "100%",
        height: "100%",
        position: "fixed"
    },
    inline: {
        display: 'inline',
    },
    item: {
        width: "100%",
        alignItems: "flex-start",
        margin: "6px"
    }
}));

function renderRow(props) {
    const classes = useStyles();
    const { index, style } = props;

    return (
        <ListItem className={classes.item} key={index} style={style}>
            <MessageCard index={index} />
        </ListItem>
    );
}

export default function Messages() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AutoSizer>
                {({ height, width }) => {
                    return (<FixedSizeList height={height} width={width} itemSize={250} itemCount={50}>
                        {renderRow}
                    </FixedSizeList>);
                }}
            </AutoSizer>
        </div>
    );
}
