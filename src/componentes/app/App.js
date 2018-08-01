/**
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @version 0.0.1
 * @since 31-0-2018
 *
 * JS del componente principal
 *
 */

import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import Place from '../place/place';
import './App.scss';

class App extends Component {

  /**
   * Constructor
   */
  constructor () {
    super();

    this.state    = {
      places: [] 
    }

  }

  /**
   * Ejecuciones al cargar el componente
   */
  componentWillMount () {

    this.getPlaces();
    
  }

  /**
   * Rescate de los lugares desde el servicio
   */
  getPlaces = () => {

    let servicio = 'http://localhost:3000/temperatura';
    fetch(servicio)
	  .then((response) => {
    	return response.json();
    })
    .then((places) => {
      this.setState({ places: places.detalle })
    })

  }
 
  /**
   * Render
   */
  render() {
    return (

      <div className="App container-fluid">
        <header className="App-header col-12">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1 className="App-title">React Temperatura</h1>
        </header>
        { this.state.places.map ( place => {
          return <Place
                    nombre      = { place.nombre }
                    abreviado   = { place.abreviado }
                    temperatura = { place.clima.temperatura }
                    estado      = { place.clima.estado }
                  />
        } ) }
      </div>

    );
  }

}

export default App;
