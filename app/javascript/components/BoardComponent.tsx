import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";

import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import NotationComponent from "./NotationComponent";
import {Colors} from "../models/Colors";

//import {Player} from "../models/Player";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player;
    swapPlayer: ()=>void;
}


const BoardComponent: FC<BoardProps> = ({board,setBoard, currentPlayer,swapPlayer}) => {
    const[selectedCell, setSelectedCell] = useState<Cell|null>(null);
    const[gameOver,setGameOver]=useState(false);
    const[winner,setGameWinner]= useState(Colors.WHITE);

    function click(cell:Cell){
            if (cell.figure != null) {
               const [cond,w] = cell.isKingUnderAttack();
                setGameOver(cond);
                setGameWinner(w);
            }
        if(!gameOver) {
            if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
                selectedCell.moveFigure(cell);
                swapPlayer();
                setSelectedCell(null);
            } else {
                if (cell.figure?.color === currentPlayer?.color) {
                    setSelectedCell(cell);
                }
            }
        }
    }
    const numsNotation = [8,7,6,5,4,3,2,1];
    const lettersNotation = ["A","B","C","D","E","F","G","H"];

    useEffect(()=>{highlightCells()},[selectedCell])

    function highlightCells(){
       board.highlightCells(selectedCell);
       updateBoard()
    }
    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }
    return (
        <div>
             <div className="board">
                {board.cells.map((row:Cell[],index:number) =>
                   <React.Fragment key = {index}>
                       {row.map(cell=>
                       <CellComponent
                           click = {click}
                           cell={cell}
                           key = {cell.id}
                           selected={cell.x===selectedCell?.x && cell.y === selectedCell?.y}
                       />)}
                   </React.Fragment>
                )}
                 <NotationComponent nums={lettersNotation}/>
                 <div className={"info"}>
                     <h3 className={"current-player"}>{!gameOver &&`Текущий игрок: ${currentPlayer?.color}`}</h3>
                     <h2> {gameOver && `Победили ${winner}`}</h2>
                 </div>
             </div>
        </div>
    );
};

export default BoardComponent;