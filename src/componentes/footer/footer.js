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
        <h2>ReactJS - Temperatura</h2>
        </div>
        <div className="col-12 col-md-6">
          <p>
            Esta aplicación fue creada como parte de las etapas para la postulación a un trabajo como desarrollador FullStack.
          </p>
          <p>
            El FrontEnd está construido con:
            <ul>
              <li>ReactJS</li>
              <li>Bootstrap</li>
            </ul>
          </p>
          <p>
            El Backend fue construido con:
            <ul>
              <li>NodeJS</li>
              <li>ExpressJS</li>
              <li>Axios</li>
              <li>Redis</li>
            </ul>
          </p>
        </div>
        <div className="col-12 col-md-6">
          <p>
            Para obtener la información de temperaturas y estado del clima de cada ciudad, se consume el servicio:
            <ul>
              <li>
                <a href="//darksky.net/dev" target="_blank">darksky.net</a>
              </li>
            </ul>
          </p>
          <p>
            Para consultas y opiniones pueden escribir en:
            <ul>
              <li>
                <a href="//linkedin.com/in/gonzaloarenasf" target="_blank">Linkedin</a>
              </li>
              <li>
                <a href="//twitter.com/gonzaloarenasf" target="_blank">Twitter</a>
              </li>
              <li>
                <a href="//github.com/gonzaloarenasf" target="_blank">Github</a>
              </li>
            </ul>
          </p>
          <p>
            <em>Eres libre de usar el código pero no olvides mencionar de donde lo obtuviste</em>
          </p>
        </div>
      </footer>

    );
  }

}

//
// Exportando el módulo
//
export default Footer;
