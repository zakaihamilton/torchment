import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
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

export default function PushCard() {
  const classes = useStyles();
  const [payload, setPayload] = useState('This is an example of a push notification');
  const [delay, setDelay] = useState('1000');
  const [ttl, setTtl] = useState('0');

  const handlePayload = event => {
    setTitle(event.target.value);
  };

  const handleDelay = event => {
    setText(event.target.value);
  };

  const handleTtl = event => {
    setUrl(event.target.value);
  };

  const pushNotification = () => {
    window.pushNotification(payload, delay, ttl);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <ShareIcon />
          </Avatar>
        }
        title="Push Notifications"
        subheader="Push API"
      />
      <CardContent>
        <form className={classes.form} noValidate autoComplete="off">
          <div>
            <TextField
              className={classes.textField}
              label="Ttl"
              margin="normal"
              value={ttl}
              onChange={handleTtl}
            />
          </div>
          <div>
            <TextField
              className={classes.textField}
              label="Delay"
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
              label="Payload"
              margin="normal"
              variant="outlined"
              value={payload}
              onChange={handlePayload}
            />
          </div>
          <Button variant="contained" color="primary" id="pushNotification" className={classes.button} onClick={pushNotification}>
            Push Notification
          </Button>
        </form>
        <Typography variant="body2" color="textSecondary" component="p">
          This feature sends a push notification to the device
        </Typography>
      </CardContent>
    </Card>
  );
}
