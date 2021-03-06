import React,{Component} from 'react';
import PengineClient from './PengineClient';
import Board from './Board';
import Mode from './Mode';
import ShowHelp from './ShowHelp';
import ShowSolve from './ShowSolve';

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
      gano: false,
      waiting: false,
      help: false,
      solucion:null,
      modo: "#",
      showSolve: false,
      showedGrid : null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePengineCreate = this.handlePengineCreate.bind(this);
    this.pengine = new PengineClient(this.handlePengineCreate);
  }

  handlePengineCreate() {
    if (this.state.waiting) {
      return;
    }
    const queryS = 'init(PistasFilas, PistasColumnas, Grid),controlInicial(Grid,PistasFilas, PistasColumnas,LSatF,LSatC)';
    this.setState({
      waiting: true
    });
    this.pengine.query(queryS, (success, response) => {
      if (success) {
        this.setState({
          grid: response['Grid'],
          rowClues: response['PistasFilas'],
          colClues: response['PistasColumnas'],
          filaSat: response['LSatF'],
          colSat: response['LSatC'],
          showedGrid : response['Grid'],
          gano: false,
          help: false,
        });
    }
    if(this.state.solucion===null){
      const solutionQuery = 'init(PistasFilas,PistasColumnas,Grid), getSolution(PistasFilas,PistasColumnas,Grid)'
      this.pengine.query(solutionQuery, (success, response) => {
        if(success){
          this.setState({
            solucion: response['Grid']
          })
        }
      });
    }
      this.setState({
        waiting: false
      });
    });
  }

  finalizoJuego(){
    const lf=this.state.filaSat.length;
    const lc=this.state.colSat.length;
    let ganoAux=true
    for(let i=0;i<lf && ganoAux;i++){
      ganoAux=(this.state.filaSat[i]===1);
    }
    for(let i=0;i<lc && ganoAux;i++){
      ganoAux=(this.state.colSat[i]===1);
    }
    this.setState({
      gano:ganoAux
    })
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
    
    let contenido;
    if(this.state.help){
      contenido=JSON.stringify(this.state.solucion[i][j]);
    }
    else contenido = JSON.stringify(this.state.modo);    
    if(!this.state.help || this.state.solucion[i][j]!==this.state.grid[i][j]){
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
          showedGrid:response['GrillaRes']
        })

        this.finalizoJuego();
      } 
        this.setState({
          waiting: false
        });
    });
    }
  }

  
  handleShowHelp(){
    let helpAux=this.state.help;
    helpAux=!helpAux; 
    this.setState({
       help : helpAux
    });
  }

  handleShowSolve(){
    if(this.state.solucion !== null && !this.state.waiting){
      if(!this.state.showSolve){
        this.setState({
          showedGrid : this.state.solucion,
          showSolve : true
        });
      }else{
        this.setState({
          showedGrid : this.state.grid,
          showSolve : false
        });
      }
   }
  }
  handleMode(){            
    let mod=this.state.modo;
    mod === "#" ? mod = "X" : mod = "#";    
    this.setState({
       modo : mod
    });
  }
  
  render() {
    if (this.state.solucion === null) {
      return (
        <div id="pantallaCarga">
          <h1 id = "textoLoading" >cargando...</h1>
          <div   id = "loading" />
        </div>
      );
    }
   
    return (
      <div className="game" >
        <h2 id={this.state.gano === true? "tituloWin" : "titulo"}>{this.state.gano === true? "Ganaste!" : "Nonogram"}</h2> 
        <Board
          grid={this.state.showedGrid}
          showSolve={this.state.showSolve}
          rowClues={this.state.rowClues}
          colClues={this.state.colClues}
          onClick={(i, j) => this.handleClick(i,j)}
          filaSat={this.state.filaSat}
          colSat={this.state.colSat}  
          gano = {this.state.gano}
        />
        <div  className= "barraInferior">
          <h3 id='modoMarcado'>Modo: {this.state.modo === "#"? "pintar" : "cruz"} </h3>
          <div className= "barraBotones">
            <button disabled ={this.state.showSolve} title="Reiniciar partida" className= "button restartButton" onClick={()=>this.handlePengineCreate()} > 
            </button>
            <Mode      
              modo = {this.state.modo}   
              gano = {this.state.gano}
              showSolve={this.state.showSolve}
              onClick = {() => this.handleMode()}
            />
            <ShowHelp
              help= {this.state.help}
              showSolve={this.state.showSolve}
              gano = {this.state.gano}
              onClick= {() => this.handleShowHelp()}
            />

            <ShowSolve
              showSolve={this.state.showSolve}
              gano = {this.state.gano}
              onClick= {() => this.handleShowSolve()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;