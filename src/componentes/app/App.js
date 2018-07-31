import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.scss';

class App extends Component {

  // HTML
  htmlCode = <div className="App">
                <header className="App-header">
                  <img src={ logo } className="App-logo" alt="logo" />
                  <h1 className="App-title">React Temperatura</h1>
                </header>
                <p className="App-intro">
                  To get started, edit <code>src/App.js</code> and save to reload.
                </p>
              </div>
 
  render() {
    return ( this.htmlCode );
  }

}

export default App;
