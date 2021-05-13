import React, {Component} from 'react';

class Mode extends Component{
   
    render(){
        return(
            <button id = "modeId" className= {this.props.modo === "#" ? "modeButton paint" : "modeButton" } onClick={this.props.onClick}>
                <span className =  {this.props.modo === "#" ? "span paint-top-line" : "span top-line" }></span>
                <span className = {this.props.modo === "#" ? "span paint-right-line" : "span right-line" }></span>
                <span className = {this.props.modo === "#" ? "span paint-left-line" : "span left-line" }></span>
                <span className = {this.props.modo === "#" ? "span paint-bottom-line" : "span bottom-line" }></span>                
            </button>          
          
        );
        
    }

}



export default Mode;