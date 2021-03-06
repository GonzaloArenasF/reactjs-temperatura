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
      temperatura : this.props.temperatura,
      icon        : this.props.icon
    };

  }
 
  /**
   * Render
   */
  render() {
    return ( 

      <div className="col-6 col-md-3">
        <article className="card place">
          <div className={ this.state.icon }></div>
          <section className="card-body">
            <h5 className="card-title">{ this.state.nombre }</h5>
            <span>{ this.state.estado }</span>
            <p className="card-text">
              { this.state.temperatura }
              <sup>o</sup>
            </p>
          </section>
        </article>
      </div>

    );
  }

}

export default Place;
