/**
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @version 0.0.1
 * @since 31-0-2018
 *
 * JS del componente principal
 *
 */

import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import logo from '../../assets/logo.svg';
import Place from '../place/place';
import './App.scss';

class App extends Component {

  /**
   * Constructor
   */
  constructor () {
    super();

    this.socket = socketIOClient('http://localhost:3000', { forceNew: true });

    this.state = {
      places: []
    }

  }

  /**
   * Ejecuciones al iniciar la carga el componente
   */
  componentWillMount () {
    
    this.getPlacesFromRest();

    console.info('Socket Connected');
    this.socket.on('placeResCl', (place) => { console.log(place); });
    this.socket.on('placeResCh', (place) => { console.log(place); });
    this.socket.on('placeResNz', (place) => { console.log(place); });
    this.socket.on('placeResAu', (place) => { console.log(place); });
    this.socket.on('placeResUk', (place) => { console.log(place); });
    this.socket.on('placeResUsa', (place) => { console.log(place); });

  }

   /**
   * Ejecuciones al terminar la cargar el componente
   */
  componentDidMount () {
    
    this.getPlacesFromSocket();

  }

  /**
   * Rescate de los lugares desde el servicio REST
   */
  getPlacesFromRest = () => {

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
   * Rescate de lugares desde Socket
   */
  getPlacesFromSocket = () => {

    console.info('Socket Emit');
    this.socket.emit('placeReq', { place: 'cl' });
    this.socket.emit('placeReq', { place: 'ch' });
    this.socket.emit('placeReq', { place: 'nz' });
    this.socket.emit('placeReq', { place: 'au' });
    this.socket.emit('placeReq', { place: 'uk' });
    this.socket.emit('placeReq', { place: 'usa' });
    
  }
 
  /**
   * Render
   */
  render() {
    return (

      <div className="App container-fluid">

        <header className="App-header row">
          <div className="col-12">
            <img src={ logo } className="App-logo" alt="logo" />
            <h1>React Temperatura</h1>
          </div>
        </header>

        <section className="row">
          <div className="col-12">
            <p>
              Este es el estado del clima en las principales ciudades del planeta
            </p>
          </div>
          { this.state.places.map ( (place) => {
            return <Place
                      key         = { 'place_' + place.abreviado }
                      nombre      = { place.nombre }
                      abreviado   = { place.abreviado }
                      temperatura = { place.clima.temperatura }
                      estado      = { place.clima.estado }
                      icon        = { place.clima.icon }
                    />
          } ) }
        </section>

      </div>

    );
  }

}

export default App;
