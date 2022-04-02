import React from 'react'
import styles from "../index.module.css";

export class Opciones extends React.Component  {

  //En el siguiente constructor en this state cada variable significa:
  //opcionA indica la opción A que el usuario tiene posibilidad de elegir en la posición actual de la historia
  //opcionB indica la opción B que el usuario tiene posibilidad de elegir en la posición actual de la historia
  //posicionActual indica la posición actual en la que el usuario se encuentra en la historia
  //tamanioHistoria indica el tamaño total que tiene el array en donde se encuentran todas las partes de la historia

  constructor(props){
     super(props)
     this.state = ({
        opcionA: this.props.opciones.a,
        opcionB: this.props.opciones.b,
        posicionActual: this.props.posicionActual,
        tamanioHisoria: this.props.tamanioHistoria
     })
     this.cambiarPosicionA = this.cambiarPosicionA.bind(this);
     this.cambiarPosicionB = this.cambiarPosicionB.bind(this);
     
   }

   //cambiarPosicionA es el método que ayuda al usuario a cambiar la historia tomando como base la posición actual
   //  y llevándolo a la siguiente porción de historia de camino A

   cambiarPosicionA(){
       let pos = this.props.posicionActual;
       if(pos===0 || pos%2===0){
           pos++;
        }else{
            if(pos%2!==0){
                pos = pos + 2;
            }else{
                pos = pos + 3;
            }
        }
        this.props.posicionSiguiente(pos,true);
   }

   //cambiarPosicionB es el método que ayuda al usuario a cambiar la historia tomando como base la posición actual
   //  y llevándolo a la siguiente porción de historia de camino B

   cambiarPosicionB(){
       let pos = this.props.posicionActual;
       if(pos%2===0 || pos===0){
           pos = pos + 2;
       }else{
           pos = pos + 3;
        }
       this.props.posicionSiguiente(pos,true);
   }

   //iniciarDeNuevo es el método que ayuda al usuario a iniciar de nuevo la historia tomando como base su elección
   //  de si seguir o no por lo que posiciona al array a la posición inicial que sería la 0

   iniciarDeNuevo(){
       this.props.posicionSiguiente(0,true);
   }

   //componentWillUnmount es el método que ayuda al usuario a comenzar nuevamente la historia o terminarla, por lo
   //  que si su desición es negativa se desmontará el comonente, quitando así las opciones y dejando así en pantalla
   //  el último pedazo de historia y el recuento de las opciones elegidas

   componentWillUnmount(){
     let desicion = false;
     if(this.state.posicionActual>=this.state.tamanioHisoria-2){
      desicion = window.confirm("¿Desea comenzar nuevamente la historia?");
      desicion ? this.iniciarDeNuevo() : alert("¡Nos vemos en otra ocasión!")
     }
  }

  //En este render se muestra el fragmento de historia con base a la posición en la que vaya el usuario, a la vez
  //  que se muestran las opciones a elegir

  render() {
    return (
      <div>
        <section className={styles.opcion}>
             <button className={styles.botones}
                    onClick={this.cambiarPosicionA}>A</button>
             <h3 className={styles.opciones}>{this.state.opcionA}</h3>
             <button className={styles.botones}
                    onClick={this.cambiarPosicionB}>B</button>
             <h3 className={styles.opciones}>{this.state.opcionB}</h3>
        </section>
      </div>
    )
  }
}

export default Opciones