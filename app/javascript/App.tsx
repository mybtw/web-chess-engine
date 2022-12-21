import React, {useEffect, useState} from "react"
import "./App.css"
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFiguresComponent from "./components/LostFiguresComponent";


const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    useEffect(()=>{
        restart()
        setCurrentPlayer(whitePlayer);
    },[])

    function restart(){
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    function swapPlayer(){
        setCurrentPlayer(currentPlayer?.color ===Colors.WHITE ? blackPlayer:whitePlayer);
    }
    return (
        <div className="app">
            <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer = {currentPlayer}
            swapPlayer = {swapPlayer}/>
            <div>
                <LostFiguresComponent title="Потери черных:" figures={board.lostBlackFigures} />
                <LostFiguresComponent title="Потери белых:" figures={board.lostWhiteFigures} />
            </div>
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
