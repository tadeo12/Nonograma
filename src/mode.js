import React, {Component} from 'react';

class Mode extends Component{
   
    constructor(props) {
        super(props);
       // this.state = {isToggleOn: true};        
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            hola: true
        }
    }

    handleClick() {
        // this.setState(state => ({
        //   isToggleOn: !state.isToggleOn
        // }));
        //const nav = document.querySelector('modeButton');
       //this.clas
            this.hola? this.hola = false: this.hola = true;
    //    this.state.isToggleOn? this.className = "modeButton": this.className= "modeButton paint"
        //this.className === "modeButton"? this.className= "modeButton paint"  : this.className = "modeButton"
        console.log('hi')
        console.log(this.hola)
      }
    
    render(){
        return(

            <button className= {this.hola? "modeButton paint":"modeButton" } onClick={this.handleClick}>
                <span className = {this.hola? "span top-line": "span top-line-paint"}></span>
                <span className = {this.hola? "span right-line": "span right-line-paint"}></span>
                <span className = "span left-line"></span>
                <span className = "span bottom-line"></span>
                
            </button>
          
          
        );
        
    }

}



export default Mode;