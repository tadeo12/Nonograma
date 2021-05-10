import React, {Component} from 'react';

class Square extends Component {
    render() {
        return (
            <button className={this.props.value=='#'?"square paintedSquare":"square"} onClick={this.props.onClick}>
                {this.props.value !== '_' ? this.props.value : null }
            </button>
        );
    }
}

export default Square;