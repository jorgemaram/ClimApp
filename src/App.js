import React, {useState, useEffect} from 'react';

import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consulta, guardarConsulta] = useState(false)
  const [resultado, guardarResultado] = useState(false)
  const [error, guardarError] = useState(false)

  const { ciudad, pais } = busqueda;
  
  useEffect(() => {
    const consultarAPI = async () => {

      if (consulta) {        
        const appId = 'd854eeb61ee2e2d0a5c993900d990ab1';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        guardarResultado(resultado);
        guardarConsulta(false)

        //Detecta si hubo error en la consulta
        if (resultado.cod === '404') {
          guardarError(true);
        } else {
          guardarError(false);
        }

      }

    }
    consultarAPI();
    //eslint-disable-next-line
  }, [consulta])

  let componente
  if (error) {
    componente = <Error mensaje='No hay resultados'/>
  } else {
    componente = <Clima resultado={resultado}/>
  }
  
  return (
    <>
      <Header titulo='ClimApp' />
      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>
            <div className='col m6 s12'>
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
            <div className='col m6 s12'>
              {componente}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
