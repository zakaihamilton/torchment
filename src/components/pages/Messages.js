import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import MessageCard from './Messages/MessageCard';
import Permission from './Messages/Permission';
import push from '../utils/notification';
import messages from '../utils/messages';
import serviceWorker from '../utils/serviceWorker';

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

serviceWorker.showLocalNotification.subscribe({
    after: (result, message) => {
        messages.push(message);
    }
});

export default function Messages() {
    const classes = useStyles();
    const items = messages.list();
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const callbacks = {
            after: () => setCounter(counter => counter + 1)
        };
        messages.update.subscribe(callbacks);
        return () => {
            messages.update.unsubscribe(callbacks);
        }
    }, []);

    function renderRow({ index, style }) {
        const classes = useStyles();
        const message = items[index];

        return (
            <ListItem className={classes.item} key={index} style={style}>
                <MessageCard index={index} {...message} />
            </ListItem>
        );
    }

    return (
        <>
            {push.shouldShowPermissionRequest() && <Permission />}
            <div className={classes.root}>
                <AutoSizer>
                    {({ height, width }) => {
                        return (<FixedSizeList height={height} width={width} itemSize={250} itemCount={items.length}>
                            {renderRow}
                        </FixedSizeList>);
                    }}
                </AutoSizer>
            </div>
        </>
    );
}
