import React, {Component} from 'react';

class Mode extends Component{
   
    render(){
        return(
            <button id = "modeId" className= {this.props.modo === "#" ? "modeButton paint" : "modeButton" } onClick={this.props.onClick}>
                <span className =  "span top-line"></span>
                <span className = "span right-line"></span>
                <span className = "span left-line"></span>
                <span className = "span bottom-line"></span>                
            </button>          
          
        );
        
    }

}



export default Mode;