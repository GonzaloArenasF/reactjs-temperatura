/**
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @version 0.0.1
 * @since 06-08-2018
 *
 * JS del componente de renderización del header
 *
 */

import React, { Component } from 'react';

import logo from '../../assets/logo.svg';
import './header.scss';

class Header extends Component {

  /**
   * Constructor
   * @param {Obtect} props 
   */
  constructor(props) {
    super(props);
    
    this.state = {};

  }
 
  /**
   * Render
   */
  render() {

    return ( 

      <header className="container-fluid">
        <div className="row">
          <div className="col-12">
            <img src={ logo } className='App-logo activo' alt="logo" />
            <h1>React Temperatura</h1>
          </div>
        </div>
      </header>

    );
  }

}

export default Header;
