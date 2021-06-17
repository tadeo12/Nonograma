import React, {Component} from 'react';

class ShowHelp extends Component{
   
    render(){
        
        return(
            <button disabled={this.props.gano ||this.props.showSolve} title="Usar pista" className= {this.props.help? " helpButton activeButtton " : "helpButton"} onClick={this.props.onClick}>
            </button>          
        );
        
    }

}
export default ShowHelp;