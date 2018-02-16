import React, { Component } from 'react';
import Robot from './robot.js';
import logo from './logo.svg';
import './App.css';

class Table extends React.Component{
  render() {
   let rows = []
   for(var i=1;i<=5;i++){
     rows.unshift(<Row number={i} robot={this.props.children} onPlace={this.props.onPlace}/>)
   }
   return <div className="table">{rows}</div>;
  }
}

class Row extends React.Component{
  render() {
    let row=[];
   for (let i=1;i<=5;i++){
     row.push(<Cell number={(this.props.number-1)*5 + i} robot={this.props.robot} onPlace={this.props.onPlace}/>)
   }
   return <div className="row">{row}</div>
  }
}

class Cell extends React.Component {
  render() {
   const robot = this.props;
   const {position: {x, y}, heading} = this.props.robot;
   let rowNumber = Math.ceil(this.props.number/5)-1;
   let colNumber = Math.ceil((this.props.number-1)%5);
   
   let className="cell ";
   if (rowNumber % 2){
     className += 'odd';
     console.log(rowNumber); 
   }else{
     className += 'even';
     console.log('even'); 
   }
   if (rowNumber === y && colNumber === x) {
     className += ' robot';
   }
    
   const arrowHeadingMap = {N: '↑', S: '↓', E: '→', W: '←'};

   return <div className={className} onClick={() => this.props.onPlace(`PLACE ${colNumber},${rowNumber},${heading}`)}>
      {className.includes('robot') && "🤖"+ arrowHeadingMap[ heading[0]]}
    </div>
  }
}

class App extends Component {
  constructor() {
    super();
    this.robot = new Robot();
    this.robot.processCommand('PLACE 0,0,NORTH');
    this.robot.processCommand('REPORT');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Toy Robot App</h1>
        </header>
        <p className="App-intro">
          <button onClick={() => {
            this.robot.processCommand('LEFT');
            this.robot.processCommand('REPORT');
            this.forceUpdate();
          }}>
            LEFT
          </button>
          <button onClick={() => {
            this.robot.processCommand('MOVE');
            this.robot.processCommand('REPORT');
            this.forceUpdate();
          }}>
            MOVE
          </button>
          <button onClick={() => {
            this.robot.processCommand('RIGHT');
            this.robot.processCommand('REPORT');
            this.forceUpdate();
          }}>
            RIGHT
          </button>
        </p>
        <Table onPlace={commandStr => {
          this.robot.processCommand(commandStr);
          this.forceUpdate();
        }}>
          {this.robot}
        </Table>
      </div>
    );
  }
}

export default App;
