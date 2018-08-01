/**
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @version 0.0.1
 * @since 01-08-2018
 *
 * JS del componente de renderización de un lugar y sus datos de clima
 *
 */

import React, { Component } from 'react';
import './place.scss';

class Place extends Component {

  /**
   * Constructor
   * @param {Obtect} props 
   */
  constructor(props) {
    super(props);
    
    this.state = {
      abreviado   : this.props.abreviado,
      nombre      : this.props.nombre,
      estado      : this.props.estado,
      temperatura : this.props.temperatura
    };

    

  }
 
  /**
   * Render
   */
  render() {
    return ( 

      <article className="place col-4">
        <figure>
          <img src="" alt={ this.state.estado } />
          <figcaption>{ this.state.estado }</figcaption>
        </figure>
        <h3>
          { this.state.nombre }
          <small>{ this.state.abreviado }</small>
        </h3>
        <p>{ this.state.temperatura }</p>
      </article>

    );
  }

}

export default Place;
