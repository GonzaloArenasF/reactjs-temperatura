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

import Header from '../header/header';
import Footer from '../footer/footer';
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
      actualizando  : true,
      progreso      : { width : 0 },
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

      this.setState({ progreso: { width : 80} });
      this.setState({ actualizando : true });
      this.setState({ error: false });

      fetch(servicio)
      .then((response) => {

        this.setState({ progreso: { width : 100} });
        return response.json();

      })
      .then((places) => {

        this.setState({ actualizando : false });
        this.setState({ progreso: { width : 0} });

        if (places.estado === true) {
          this.setState({ places: places.detalle });
        } else {
          this.setState({ error: true });
          this.setState({ errorMsg: places.mensaje + '. Reintentando...' });
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

      <div className="App">

        <Header />

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 progreso">
              <div className="progress text-center">
                <div className="progress-bar" role="progressbar" style={ this.state.progreso } aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                <span className="text-warning">{ (this.state.actualizando === true) ? 'Recuperando datos' : '' }</span>
                <span className="text-danger">{ (this.state.error === true) ? this.state.errorMsg : '' } </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
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

          <div className="row">
            <div className="col-12">&nbsp;</div>
          </div>

        </div>

        

        <Footer />

      </div>

    );
  }

}

export default App;
