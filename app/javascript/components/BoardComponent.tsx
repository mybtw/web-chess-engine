import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";

import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import NotationComponent from "./NotationComponent";
import NumsComponent from "./NumsComponent";
//import {Player} from "../models/Player";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player;
    swapPlayer: ()=>void;
}


const BoardComponent: FC<BoardProps> = ({board,setBoard, currentPlayer,swapPlayer}) => {
    const[selectedCell, setSelectedCell] = useState<Cell|null>(null);
    function click(cell:Cell){
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
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
                 <h3 className={"current-player"}>Текущий игрок: {currentPlayer?.color}</h3>
             </div>
        </div>
    );
};

export default BoardComponent;