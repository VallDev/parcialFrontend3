import React from 'react'
import styles from "../index.module.css";

export class Historia extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      historia: this.props.historia
    })
  }

  //Por medio de nuestros props se muestra cada parte de la historia

  render() {
    return (
      <div >Historia
        <h2 className={styles.historia}> {this.state.historia}</h2>
      </div>
    )
  }
}

export default Historia