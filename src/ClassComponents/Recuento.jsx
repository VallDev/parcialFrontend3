import React from 'react'

export class Recuento extends React.Component {
    
    //En esta clase se van redenderizando cada una de las respuestas brindadas por el usuario en forma de lista
    //  no ordenada

    render() {
        return (

            <li>{this.props.respuesta}</li>
        )
    }
}

export default Recuento