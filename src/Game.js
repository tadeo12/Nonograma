import React,{Component} from 'react';
import PengineClient from './PengineClient';
import Board from './Board';
import Mode from './Mode';


class Game extends Component {

  pengine;
  constructor(props) {
    super(props);
    this.state = {
      grid: null,
      rowClues: null,
      colClues: null,
      filaSat: null,
      colSat: null,
      waiting: false,
      modo: "#"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePengineCreate = this.handlePengineCreate.bind(this);
    this.pengine = new PengineClient(this.handlePengineCreate);
  }

  handlePengineCreate() {
    const queryS = 'init(PistasFilas, PistasColumnas, Grilla)';
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        this.setState({
          grid: response['Grilla'],
          rowClues: response['PistasFilas'],
          colClues: response['PistasColumnas'],
          filaSat: [].constructor(response['PistasFilas'].length),
          colSat: [].constructor(response['PistasColumnas'].length)
        });
        

      }
    });
  }

  handleClick(i, j) {
    // No action on click if we are waiting.
    if (this.state.waiting) {
      return;
    }

    // Build Prolog query to make the move, which will look as follows:
    // put("#",[0,1],[], [],[["X",_,_,_,_],["X",_,"X",_,_],["X",_,_,_,_],["#","#","#",_,_],[_,_,"#","#","#"]], GrillaRes, FilaSat, ColSat)
    const squaresS = JSON.stringify(this.state.grid).replaceAll('"_"', "_"); // Remove quotes for variables.
    const pistasF =JSON.stringify(this.state.rowClues);
    const pistasC =JSON.stringify(this.state.colClues);
    const contenido = JSON.stringify(this.state.modo);    

    const queryS = 'put('+contenido+', [' + i + ',' + j + '],'+ pistasF+','+pistasC+',' + squaresS + ', GrillaRes, FilaSat, ColSat)';
    
    this.setState({
      waiting: true
    });
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        const filAux=this.state.filaSat;
        const colAux=this.state.colSat;
        filAux[i]=response['FilaSat'];
        colAux[j]=response['ColSat'];
        this.setState({
          grid: response['GrillaRes'],
          filaSat: filAux,
          colSat: colAux,
          waiting: false
        })
 
   
      } else {
        this.setState({
          waiting: false
          
        });
      }
    });
  }

  handleMode(mod){            
    let aux = document.getElementById("modeId");
    mod === "#" ? mod = "X" : mod = "#"; 
    aux.className === "modeButton"? aux.className= "modeButton paint"  : aux.className = "modeButton"
    
    this.setState({
       modo : mod
    });
  }
  
  render() {
    if (this.state.grid === null) {
      return null;
    }
   
    return (
      <div className="game">
        <h2> Nonogram</h2>        
        <Board
          grid={this.state.grid}
          rowClues={this.state.rowClues}
          colClues={this.state.colClues}
          onClick={(i, j) => this.handleClick(i,j)}
          filaSat={this.state.filaSat}
          colSat={this.state.colSat}          
        />
        <br></br>
        <div className= "barraInf">
          <h3>Modo: {this.state.modo === "#"? "pintar" : "cruz"}</h3>
            <Mode         
              modo = {this.state.modo}     
              onClick = {(modo) => this.handleMode(this.state.modo)}
            />
        </div>
       
      </div>
     
           
    );
  }


}

export default Game;