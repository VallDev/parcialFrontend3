import React from 'react';
import styles from "./index.module.css";
import {data} from "./components/data.js";
import Historia from './ClassComponents/Historia';
import Opciones from './ClassComponents/Opciones';
import Recuento from './ClassComponents/Recuento';


class App extends React.Component{
  
  //En el siguiente constructor en this state cada variable significa:
  //pos indica la posición actual en el array en la que se encuentra el usuario en la historia, inicia en la 0
  //dato indica la porción de historia que esta viendo el usuario en el momento
  //respuestas es un array que nos ayuda a almacenar y llevar el recuento de las respuestas dadas por el usuario
  //opcionesVisibles es un booleano que nos ayuda a desmontar las opciones en caso tal de que el usuario no desee
  //                 participar en la historia nuevamente, en caso de que sí no se desmonta y empieza nuevamente la historia

  constructor(){
    super();
    this.state = ({
      pos: 0,
      dato: data[0],
      respuestas:[],
      opcionesVisibles: true
    })
    this.handlerPosiciones = this.handlerPosiciones.bind(this);
    
  }

  //handlerPosiciones es el método encargado de llevar el control de la historia tomando como referencia la posición
  //  actual. De este modo, puede ir cambiando de posición tomando como base la opción elegida por el usuario.
  //  También va guardando en un array el registro de las respuestas brindadas por el usuario.
  //  En caso tal de que ya no haya más historia que contar con base en la opción elegida por el usuario en el componente
  //  de opciones se desmonta (se hace visible o no) las opciones de A y B

  handlerPosiciones(posi){
    if(posi<data.length){
      this.setState({
        pos: posi,
        dato: data[posi],
        respuestas: [...this.state.respuestas, (this.registradorRespuestas())],
        opcionesVisibles: true
      });
    }
    else{
      this.setState({
        pos: posi,
        opcionesVisibles: false
      });
    }
  }
  
  //registradorRespuestas es el método encargado de retornar la opción elegida del usuario en la historia con base
  //  a la posición actual en la que se encuentra, siendo un número par la opción B e impar la opción A en el array
  //  de datos de la historia

  registradorRespuestas(){
    let respuesta = "";
    if((this.state.pos)===0){
      respuesta = " ";
    }else if((this.state.pos)%2===0){
        respuesta = "B";
      }else{
          respuesta = "A";
        }
    return respuesta;
  }

  render(){
    //Se crea el array que nos ayudará a guardar el registro de todas las respuestas
    let respuestas = this.state.respuestas?.map((res, index)=> ({ id: index, responses: res}));

    return(
      <div className={styles.layout}>
  
          <Historia
              key={(this.state.dato.id)+"h"}
              id={(this.state.dato.id)+"h"}
              historia={this.state.dato.historia}
          />
          
          {
            this.state.opcionesVisibles && 
            <Opciones
                key={(this.state.dato.id)+"o"}
                id={(this.state.dato.id)+"o"}
                opciones={this.state.dato.opciones}
                posicionSiguiente={this.handlerPosiciones}
                posicionActual={this.state.pos}
                tamanioHistoria={data.length}
            />
          }
            
          <div className={styles.recordatorio}>
              <h4 >
                Selección anterior:  {this.registradorRespuestas()}
              </h4>

              <ul>Historial de opciones elegidas:
                { 
                  respuestas?.map(res=>
                    <Recuento
                        key={res.id}
                        respuesta={res.responses}
                    />  
                  )
                }
              </ul>
          </div>

      </div>

    );

  }

};

export default App;
