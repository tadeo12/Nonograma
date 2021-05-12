import React, {Component} from 'react';

class Mode extends Component{
   
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
       
            this.hola? this.hola = false: this.hola = true;
    //  this.state.isToggleOn? this.className = "modeButton": this.className= "modeButton paint"
        this.className === "modeButton"? this.className= "modeButton paint"  : this.className = "modeButton"
        console.log('hi')
        console.log(this.className)
      }
    
    render(){
        return(

            <button className= {this.state.isToggleOn? "modeButton paint" : "modeButton" } onClick={this.handleClick}>
                <span className =  "span top-line"></span>
                <span className = "span right-line"></span>
                <span className = "span left-line"></span>
                <span className = "span bottom-line"></span>                
            </button>          
          
        );
        
    }

}



export default Mode;