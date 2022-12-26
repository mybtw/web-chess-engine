import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface  TimerProps{
    currentPlayer: Player | null;
    restart:()=>void;
}

const Timer:FC<TimerProps> = ({currentPlayer,restart}) => {
    const [blackTime,setBlackTime] = useState(300);
    const [whiteTime,setWhiteTime] = useState(300);
    const timer = useRef<null| ReturnType<typeof setInterval>>(null)
    useEffect(()=>{startTimer()},[currentPlayer])
    function startTimer(){
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback,1000)

    }
    function checkTimer(){
        if(blackTime === 0){
           // alert("WHITE WON!");
            handleRestart();
        }
        else if(whiteTime){
          //  alert("BLACK WON!");
            handleRestart();
        }
    }
    function decrementBlackTimer(){
        setBlackTime(prev=>prev>1? prev-1:0)
    }
    function decrementWhiteTimer(){
        setWhiteTime(prev=>prev>1? prev-1:0)
    }

    const handleRestart = () => {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    }
    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <h2>Черные: {blackTime}</h2>
            <h2>Белые: {whiteTime}</h2>
        </div>
    );
};

export default Timer;