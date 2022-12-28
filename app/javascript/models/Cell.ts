import {Colors} from "./Colors";
import {Figure, FigureNames} from "./figures/Figure";
import {Board} from "./Board";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";

export class Cell{
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean; // можно ли сюда переместить
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board= board;
        this.available = false;
        this.id = Math.random();
    }
    isEmpty():boolean{
        return this.figure === null;
    }
    isEnemy(target:Cell):boolean{
        if(target.figure) {
            return target.figure.color !== this.figure?.color;
        }
        return false;
    }
    isGameOver():boolean{
        const [x,y] = this.getKingPos();
        if(!this.isKingUnderAttack()){
            return false;
        }
      /*  for(let i =0;i<8;i++){
            for(let j =0;j<8;j++){
                const c = this.board.getCell(i,j);
                if(c.figure!=null){
                    if(c.figure.color===this.figure.color) {
                        for (let k = 0; k < 8; i++) {
                            for (let m = 0; m < 8; j++) {
                                if (c.canHandleCheck(this.board.getCell(k, m))) {
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
        }*/
        return true;
    }
    getKingPos():number[]{
        let kingX = 0;
        let kingY = 0;
        for(let i = 0; i<8;i++){
            for(let j = 0;j <8 ;j++) {
                const c = this.board.getCell(i,j);
                if(c.figure !== null && c.figure.name===FigureNames.KING && c.figure?.color === this.figure?.color) {
                    kingX = i;
                    kingY = j;
                }
            }
        }
        console.log(kingX,kingY);
        return [kingX,kingY];
    }

    anotherKingPos():number[]{
        let kingX = 0;
        let kingY = 0;
        for(let i = 0; i<8;i++){
            for(let j = 0;j <8 ;j++) {
                const c = this.board.getCell(i,j);
                if(c.figure !== null && c.figure.name===FigureNames.KING && c.figure?.color !== this.figure?.color) {
                    kingX = i;
                    kingY = j;
                }
            }
        }
        console.log(kingX,kingY);
        return [kingX,kingY];

    }
    isSaveMove(target:Cell):boolean{
        if(this.figure!=null && this.figure.canMoveHandle(target)){
            console.log("checking",this.figure.name,this.figure?.color);
            const prevFigure = target.figure;
            this.board.getCell(target.x,target.y).setFigure(this.board.getCell(this.x,this.y).figure);
            this.board.getCell(this.x,this.y).setFigure(null);
            if (!this.board.getCell(this.x,this.y).isKingUnderAttack()) {
                this.board.getCell(this.x,this.y).setFigure(prevFigure);
                this.board.getCell(target.x,target.y).setFigure(null);
                return true;
            }
            this.board.getCell(this.x,this.y).setFigure(prevFigure);
            this.board.getCell(target.x,target.y).setFigure(null);
        }
        return false;

    }
    canHandleCheck(target:Cell):boolean{
        console.log("canHandleCheck?");
       /* for(let i = 0; i<8; i++){
            for(let j =0; j<8;j++){
                const x = this.board.getCell(i,j);
                if(x.figure !== null &&  x.figure?.color === this.figure?.color&&x.figure.canMoveHandle(target)) {
                    console.log("checking",x.figure.name,x.figure?.color);
                    const checkBoard = this.board.getCopyBoard();
                    //console.log(this.board.lostBlackFigures==checkBoard.lostBlackFigures)
                    checkBoard.getCell(i,j).moveFigureHandle(target);
                    if (!checkBoard.getCell(i,j).isKingUnderAttack()) {
                        return true;
                    }
                }
            }
        }
        return false;*/
        if(this.figure!=null && this.figure.canMoveHandle(target)){
            console.log("checking",this.figure.name,this.figure?.color);
            const prevFigure = target.figure;
            this.board.getCell(target.x,target.y).setFigure(new Pawn(this.color,target));
            if (!this.board.getCell(this.x,this.y).isKingUnderAttack()) {
                console.log( this.figure?.name, this.figure?.color, "can save king", target.x, target.y);
                this.board.getCell(target.x,target.y).figure=prevFigure;
                return true;
            }
            this.board.getCell(target.x,target.y).figure=prevFigure;
        }
        return false;
    }
    isKingUnderAttack():[boolean,Colors]{
        let [kingX,kingY] = this.getKingPos();
        let [anKingX,anKingY] = this.anotherKingPos();
        for(let i = 0; i<8;i++){
            for(let j = 0;j <8 ;j++) {
                const x = this.board.getCell(i,j);
                if(x.figure !== null &&  x.figure?.color !== this.figure?.color && x.figure.canMoveCheck(this.board.getCell(kingX,kingY))) {
                    console.log(x.figure.name,x.figure?.color, " attacks ",this.figure?.color, "king");
                    return [true,x.figure?.color];
                }
                if(x.figure !== null &&  x.figure?.color === this.figure?.color && x.figure.canMoveCheck(this.board.getCell(anKingX,anKingY))) {
                    console.log(x.figure.name,x.figure?.color, " attacks ",this.figure?.color, "king");
                    return [true,x.figure?.color];
                }
            }
        }
      return [false,Colors.BLACK];
    }

    isEmptyVertical(target:Cell):boolean{
        if(this.x !== target.x){
            return false;
        }
        const min = Math.min(this.y,target.y);
        const max = Math.max(this.y,target.y);
        for(let y = min + 1; y < max; y++){
            if(!this.board.getCell(this.x,y).isEmpty()){
                return false;
            }
        }
        return true;
    }
    isEmptyHorizontal(target:Cell):boolean{
        if(this.y !== target.y){
            return false;
        }
        const min = Math.min(this.x,target.x);
        const max = Math.max(this.x,target.x);
        for(let x = min + 1; x < max; x++){
            if(!this.board.getCell(x,this.y).isEmpty()){
                return false;
            }
        }
        return true;
    }
    isEmptyDiagonal(target:Cell):boolean{
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if(absX!==absY){
            return false;
        }
        const dy = this.y < target.y ? 1: -1;
        const dx = this.x < target.x ? 1: -1;
        for (let i = 1; i < absY; i++){
            if(!this.board.getCell(this.x+dx*i,this.y+dy*i).isEmpty()){
                return false;
            }
        }
        return true;
    }

    setFigure(figure: Figure){
        this.figure = figure;
        this.figure.cell = this;
    }
    moveFigureHandle(target: Cell){
        if(this.figure && this.figure?.canMoveHandle(target)){
            this.figure.moveFigureHandle(target)
            if(target.figure){
                this.addLostFigure(target.figure)
            }
            target.setFigure(this.figure);
            this.figure = null;
        }
    }

    moveFigure(target: Cell){
       if(this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure(target)
            if(target.figure){
                this.addLostFigure(target.figure)
            }
            target.setFigure(this.figure);
            this.figure = null;
        }
    }

    private addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK ?
            this.board.lostBlackFigures.push(figure):
            this.board.lostWhiteFigures.push(figure);
    }
}