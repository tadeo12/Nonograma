import React, {Component} from 'react';

class ShowSolve extends Component{
   
    render(){
        
        return(
            <button title="Mostrar solución" className= {this.props.showSolve? " solveButton activeButtton " : "solveButton"} onClick={this.props.onClick}>
                    ?
            </button>          
          
        );
        
    }

}
export default ShowSolve;