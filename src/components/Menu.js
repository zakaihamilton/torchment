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
                        if (!page.location || !page.location.includes("Menu")) {
                            return null;
                        }
                        return (<ListItem key={page.id} button onClick={() => setPage(page.id)}>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText primary={page.label}></ListItemText>
                        </ListItem>);
                    }).filter(Boolean)}
                </List>
            </div>
        </Drawer>
    );
}
