import React from 'react';

import Demo from './pages/Demo';
import Dashboard from './pages/Dashboard';
import Ads from './pages/Ads';
import Wallet from './pages/Wallet';
import MyAds from './pages/MyAds';
import Messages from './pages/Messages';

import DashboardIcon from '@material-ui/icons/Home';
import AdsIcon from '@material-ui/icons/Assessment';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MyAdsIcon from '@material-ui/icons/History';
import DemoIcon from '@material-ui/icons/EmojiObjects';
import MessagesIcon from '@material-ui/icons/Mail';

import messages from '../mgr/push/messages';

export default [
    {
        id: "dashboard",
        label: "Dashboard",
        component: <Dashboard />,
        icon: <DashboardIcon />,
        location: ["NavBar"]
    },
    {
        id: "ads",
        label: "Ads",
        component: <Ads />,
        icon: <AdsIcon />,
        location: ["NavBar"]
    },
    {
        id: "wallet",
        label: "Wallet",
        component: <Wallet />,
        icon: <WalletIcon />,
        location: ["NavBar"]
    },
    {
        id: "myads",
        label: "My Ads",
        component: <MyAds />,
        icon: <MyAdsIcon />,
        location: ["NavBar"]
    },
    {
        id: "demo",
        label: "Demo",
        component: <Demo />,
        icon: <DemoIcon />,
        location: ["Menu"]
    },
    {
        id: "messages",
        label: "Messages",
        component: <Messages />,
        icon: <MessagesIcon />,
        location: ["AppBar"],
        badgeContent: messages.count,
        hook: hook => {
            const callbacks = {
                after: hook
            };
            messages.update.subscribe(callbacks);
            return () => {
                messages.update.unsubscribe(callbacks);
            };
        }
    }
];
