import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import serviceWorker from '../../../mgr/serviceWorker/serviceWorker';
import push from '../../../mgr/push/push';

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
    height: 515
  },
  avatar: {
    backgroundColor: green[500]
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

export default function NotificationCard() {
  const classes = useStyles();
  const [body, setBody] = useState('This is an example of a local notification');
  const [delay, setDelay] = useState('1000');
  const [title, setTitle] = useState('Local notification');
  const [counter, setCounter] = useState(0);

  const handleBody = event => {
    setBody(event.target.value);
  };

  const handleDelay = event => {
    setDelay(event.target.value);
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const showNotification = () => {
    setTimeout(() => {
      serviceWorker.showLocalNotification({ title, body });
    }, delay);
  };

  const enableNotifications = () => {
    push.askForPermission().then(() => {
      setCounter(counter + 1);
    });
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <NotificationsIcon />
          </Avatar>
        }
        title="Local Notifications"
        subheader="Service Worker API"
      />
      <CardContent>
        <form className={classes.form} noValidate autoComplete="off">
          <div>
            <TextField
              className={classes.textField}
              label="Title"
              margin="normal"
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div>
            <TextField
              className={classes.textField}
              label="Delay (msec)"
              margin="normal"
              value={delay}
              onChange={handleDelay}
            />
          </div>
          <div>
            <TextField
              multiline
              rows="4"
              className={classes.textField}
              label="Body"
              margin="normal"
              variant="outlined"
              value={body}
              onChange={handleBody}
            />
          </div>
          <Button variant="contained" color="primary" id="showNotification" className={classes.button} onClick={showNotification}>
            Show Local Notification
          </Button>
          {push.shouldShowPermissionRequest() && <Button variant="contained" color="primary" id="showNotification" className={classes.button} onClick={enableNotifications}>
            Enable Notifications
          </Button>}
        </form>
        <Typography variant="body2" color="textSecondary" component="p">
          This feature sends a local notification to the device
        </Typography>
      </CardContent>
    </Card>
  );
}
