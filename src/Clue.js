import React,{Component} from 'react';

class Clue extends Component {
    
    render() {
        const clue = this.props.clue;
        return (
            <div className={this.props.satisface===1||this.props.showSolve?"clue clueSatisface" : "clue"} >
                {clue.map((num, i) =>
                    <div key={i}>
                        {num}
                    </div>
                )}
                
            </div>
        );
    }
}

export default Clue;
