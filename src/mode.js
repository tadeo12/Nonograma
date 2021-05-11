import React, {Component} from 'react';

class Mode extends Component{
    render(){
        return(
            <button className= "modeButton" >
                <span className = "span top-line paint"></span>
                <span className = "span right-line"></span>
                <span className = "span left-line"></span>
                <span className = "span bottom-line"></span>
            </button>
          
        );
        
    }

}


export default Mode;