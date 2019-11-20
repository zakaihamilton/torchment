import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    list: {
        width: 250,
    }
});

export default function Menu({ isMenuVisible, toggleMenu, pages, setPage }) {
    const classes = useStyles();

    const toggleDrawer = event => {

        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        toggleMenu();
    };

    return (
        <Drawer open={isMenuVisible} onClose={toggleDrawer}>
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
            >
                <List>
                    {pages.map(page => {
                        return (<ListItem button onClick={() => setPage(page.id)}>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText primary={page.label}></ListItemText>
                        </ListItem>);
                    })}
                </List>
            </div>
        </Drawer>
    );
}
