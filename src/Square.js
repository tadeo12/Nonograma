import React, {Component} from 'react';

class Square extends Component {
    render() {
        let val = this.props.value;
        let win = this.props.gano;
        let pint = val === '#' ? " paintedSquare" : "";
        let cru = val === 'X' ? " cruzSquare" : "";
        let gan = win ? " squareGano" : "" ;
    
        return (
            <button disabled = {this.props.gano||this.props.showSolve ? true: false} className= {"square"+pint+cru+gan} onClick={this.props.onClick}>
                {val !== '_' ? val : null }
            </button>
        );
    }
}

export default Square;