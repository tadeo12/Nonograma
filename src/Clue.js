import React,{Component} from 'react';

class Clue extends Component {
    
    render() {
        const clue = this.props.clue;
        let satisface= this.props.satisface;
        return (
            <div className={"clue"} >
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
