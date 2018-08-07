/**
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @version 0.0.1
 * @since 06-08-2018
 *
 * JS del componente de renderización del footer
 *
 */

import React, { Component } from 'react';

import './footer.scss';

class Footer extends Component {

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

      <footer className="container-fluid">
        <div className="row">
          <div className="col-12">
          <h2>ReactJS - Temperatura</h2>
          </div>
          <div className="col-12 col-md-6">
            <p>
              Esta aplicación fue creada como parte de las etapas para la postulación a un trabajo como desarrollador FullStack.
            </p>
            <span>El FrontEnd está construido con:</span>
            <ul>
              <li>ReactJS</li>
              <li>Bootstrap</li>
            </ul>
            <span>El Backend fue construido con:</span>
            <ul>
              <li>NodeJS</li>
              <li>ExpressJS</li>
              <li>Axios</li>
              <li>Redis</li>
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <span>Para obtener la información de temperaturas y estado del clima de cada ciudad, se consume el servicio:</span>
            <ul>
              <li>
                <a href="//darksky.net/dev" target="_blank" rel="noopener noreferrer">darksky.net</a>
              </li>
            </ul>
            <span>Para consultas y opiniones pueden escribir en:</span>
            <ul>
              <li>
                <a href="//linkedin.com/in/gonzaloarenasf" target="_blank" rel="noopener noreferrer">Linkedin</a>
              </li>
              <li>
                <a href="//twitter.com/gonzaloarenasf" target="_blank" rel="noopener noreferrer">Twitter</a>
              </li>
              <li>
                <a href="//github.com/gonzaloarenasf" target="_blank" rel="noopener noreferrer">Github</a>
              </li>
            </ul>
            <hr />
            <em>"Eres libre de usar el código pero no olvides mencionar de donde lo obtuviste"</em>
            <br />
            <strong> - Gonzalo A. Arenas Flores - </strong>
          </div>
        </div>
      </footer>

    );
  }

}

//
// Exportando el módulo
//
export default Footer;
