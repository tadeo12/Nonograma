import React, {Component} from 'react';

class ShowHelp extends Component{
   
    render(){
        
        return(
            <button  className= {this.props.help? " helpButton activeButttonHelp " : "helpButton"} onClick={this.props.onClick}>
                       
            </button>          
          
        );
        
    }

}
export default ShowHelp;