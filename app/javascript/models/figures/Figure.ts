import {Colors} from "../Colors";
import logo from '.../../assets/Chess_rdt60.png'
import {Cell} from "../Cell";

export enum FigureNames{
    FIGURE = "Фигура",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    BISHOP = "Слон",
}

export class Figure{
    color: Colors;
    logo:typeof  logo|null;
    cell:Cell;
    name: FigureNames;
    id:number;


    constructor(color:Colors, cell: Cell) {
        this.cell = cell;
        this.color = color;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMoveCheck(target: Cell): boolean{
        if(target.figure?.color === this.color){
            return false;
        }
        return true;
    }


    // может ли двигаться фигура на эту ячейку или нет
    canMove(target: Cell): boolean{
        if(target.figure?.color === this.color){
            return false;
        }
        if(target.figure?.name === FigureNames.KING){
            return false;
        }

        if(this.cell.isKingUnderAttack() && !this.cell.canHandleCheck(target)){
            return false;
        }
      /*  if(this.cell.isKingUnderAttack() && !this.cell.isSaveMove(target)){
            return false;
        }*/
        return true;
    }

    canMoveHandle(target:Cell):boolean{
        if(target.figure?.color === this.color){
            return false;
        }
        if(target.figure?.name === FigureNames.KING){
            return false;
        }
        return true;
    }

    moveFigure(target:Cell){}
    moveFigureHandle(target:Cell){}
}