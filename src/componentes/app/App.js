/**
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @version 0.0.2
 * @since 31-0-2018
 *
 * JS del componente principal
 * 
 * @author Gonzalo A. Arenas Flores <gonzalo.arenas.flores@gmail.com>
 * @version 0.0.2
 * @since 06-08-2018
 * - Recuperación de datos cada 10 segundos
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
      places        : [],
      actualizando  : false,
      error         : null,
      errorMsg      : null
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
    
    // Llamada al servicio cada 10 segundos
    setInterval( () => {

      this.setState({ actualizando : true });
      this.setState({ error: false });

      fetch(servicio)
      .then((response) => {
        return response.json();
      })
      .then((places) => {

        this.setState({ actualizando : false });

        if (places.estado === true) {
          this.setState({ places: places.detalle });
        } else {
          this.setState({ error: true });
          this.setState({ errorMsg: places.mensaje + '. Volveremos a reintentar' });
        }

      })

    }, 10000);


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
          <div className="mensajes">
            <small className="text-warning">{ (this.state.actualizando === true) ? 'Recuperando información' : '' }</small>
            <small className="text-danger">{ (this.state.error === true) ? this.state.errorMsg : '' } </small>
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
