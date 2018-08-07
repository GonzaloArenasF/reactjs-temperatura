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
      progreso      : { width : '10%' },
      error         : null,
      errorMsg      : null
    }

  }

  /**
   * Ejecuciones al iniciar la carga el componente
   */
  componentWillMount () { }

   /**
   * Ejecuciones al terminar la cargar el componente
   */
  componentDidMount () {
    
    this.getPlacesFromSocket();
    // this.getPlacesFromRest();

  }

  /**
   * Rescate de los lugares desde el servicio REST
   */
  getPlacesFromRest = () => {

    let servicio = 'http://localhost:3000/temperatura';
    
    // Llamada al servicio cada 10 segundos
    setInterval( () => {

      this.setState({ progreso: { width : '50%'} });
      this.setState({ actualizando : true });
      this.setState({ error: false });

      fetch(servicio)
      .then((response) => {
        
        this.setState({ progreso: { width : '100%'} });
        return response.json();

      })
      .then((places) => {

        this.setState({ actualizando : false });

        setTimeout(() => {
          if (places.estado === true) {
            this.setState({ places: [] });
            this.setState({ places: places.detalle });
          } else {
            this.setState({ error: true });
            this.setState({ errorMsg: places.mensaje + '. Reintentando...' });
          }
  
          this.setState({ progreso: { width : '0%'} });
        }, 2000);

      })

    }, 10000);


  }


  /**
   * Rescate de lugares desde Socket
   */
  getPlacesFromSocket = () => {

    // Llamada al servicio cada 10 segundos
    setInterval( () => {

      this.setState({ progreso: { width : '100%'} });
      this.setState({ actualizando : true });
      this.setState({ error: false });
      this.socket.emit('placesReq');

    }, 10000);

    // Escucha
    this.socket.on('placesRes', (places) => {

      this.setState({ actualizando : false });

      setTimeout(() => {

        if (places.estado === true) {
          this.setState({ places: [] });
          this.setState({ places: places.detalle });
        } else {
          this.setState({ error: true });
          this.setState({ errorMsg: places.mensaje + '. Reintentando...' });
        }

        this.setState({ progreso: { width : '0%'} });

      }, 1000);
      
    });
    
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
            <div className="col-12 progreso text-center">
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={ this.state.progreso } aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <small className="text-danger">{ (this.state.error === true) ? this.state.errorMsg : '' } </small>
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
            { this.state.places.map ( (place, i) => {
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
