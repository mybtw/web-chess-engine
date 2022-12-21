import React, {Component, useEffect, useState} from "react"
import "./App.css"
import PropTypes from "prop-types"
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";



const App = () => {
    const [board, setBoard] = useState(new Board())
    useEffect(()=>{
        restart()
    },[])

    function restart(){
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }
    return (
        <div className="app">
            <BoardComponent
            board={board}
            setBoard={setBoard}/>
        </div>
    );
};
/*class App extends Component {
  render () {
    return (
      <div> THis is your app speaking</div>
    );
  }
}*/

export default App