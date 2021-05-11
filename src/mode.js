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
        const nav = document.querySelector('modeButton');
        this.className= isToggleOn? "modeBotton":"modeButton paint"
      }
    
    render(){
        return(
            <button className= "modeButton" onClick={this.handleClick}>
                <span className = "span top-line"></span>
                <span className = "span right-line"></span>
                <span className = "span left-line"></span>
                <span className = "span bottom-line"></span>
            </button>
          
        );
        
    }

}



export default Mode;