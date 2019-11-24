import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
        position: "absolute",
        width: "100%",
        bottom: "0px"
    },
});

export default function NavBar({ pages, setPage, currentPage }) {
    const classes = useStyles();

    return (
        <BottomNavigation
            value={currentPage.id}
            onChange={(event, newValue) => {
                setPage(newValue);
            }}
            showLabels
            className={classes.root}
        >
            {pages.map(page => {
                if (!page.location || !page.location.includes("NavBar")) {
                    return null;
                }
                return (<BottomNavigationAction label={page.label} value={page.id} icon={page.icon} />);
            }).filter(Boolean)}
        </BottomNavigation>
    );
}
