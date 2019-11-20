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

export default function ShareCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('This is an example');
  const [text, setText] = useState('This is an example of the text that will be shared');
  const [url, setUrl] = useState('');

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleText = event => {
    setText(event.target.value);
  };

  const handleUrl = event => {
    setUrl(event.target.value);
  };

  const canShare = () => {
    return text && title && navigator.share;
  }

  const showShareDialog = () => {
    console.log("Shared title: " + title + " text: " + text);
    if (navigator.share) {
      navigator.share({
        title,
        text,
        url
      });
    }
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <ShareIcon />
          </Avatar>
        }
        title="Share Dialog"
        subheader="Navigator API"
      />
      <CardContent>
        <form className={classes.form} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-basic"
              className={classes.textField}
              label="Title"
              margin="normal"
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              className={classes.textField}
              label="Url"
              margin="normal"
              value={url}
              onChange={handleUrl}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              multiline
              rows="4"
              className={classes.textField}
              label="Text"
              margin="normal"
              variant="outlined"
              value={text}
              onChange={handleText}
            />
          </div>
          <Button variant="contained" color="primary" {...(!canShare()) && { disabled: true }} className={classes.button} onClick={showShareDialog}>
            Share
          </Button>
        </form>
        <Typography variant="body2" color="textSecondary" component="p">
          This feature enables using the native share dialog for mobile devices. Note that this feature only works on mobile devices. see
          <Link target="_blank" rel="noopener" href="https://developers.google.com/web/updates/2019/05/web-share-files" className={classes.link}>
            here
          </Link>
          and
          <Link target="_blank" rel="noopener" href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share" className={classes.link}>
            here
          </Link>
          for more API information.
        </Typography>
      </CardContent>
    </Card>
  );
}
