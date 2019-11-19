import React from 'react';
import logo from './react.svg';
import './Home.css';
import Button from '@material-ui/core/Button';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className="Home-intro">
          Torchment
        </p>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export default Home;
