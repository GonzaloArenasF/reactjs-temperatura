/**
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @version 0.0.1
 * @since 06-08-2018
 *
 * JS del componente de renderización del footer
 *
 */

import React, { Component } from 'react';

import logo from '../../assets/logo.svg';
import './footer.scss';

class Footer extends Component {

  /**
   * Constructor
   * @param {Obtect} props 
   */
  constructor(props) {
    super(props);
    
    this.state = {
      
    };

  }
 
  /**
   * Render
   */
  render() {

    return ( 

      <footer className="row">
        <div className="col-12">
          
        </div>
      </footer>

    );
  }

}

export default Footer;
