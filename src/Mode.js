import React, {Component} from 'react';

class Mode extends Component{
   
    render(){
        
        return(
            <button title="Cambiar modo" disabled = {this.props.gano ||this.props.showSolve} className= {this.props.modo === "#" ? " button paint" : "button" } onClick={this.props.onClick}>
                
                <span className =  {this.props.modo === "#" ? "span paint-top-line" : "span top-line" }></span>
                <span className = {this.props.modo === "#" ? "span paint-right-line" : "span right-line" }></span>
                <span className = {this.props.modo === "#" ? "span paint-left-line" : "span left-line" }></span>
                <span className = {this.props.modo === "#" ? "span paint-bottom-line" : "span bottom-line" }></span>                
            </button>          
          
        );
        
    }

}
export default Mode;