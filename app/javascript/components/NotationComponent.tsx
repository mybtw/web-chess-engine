import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";


const Notation = (props) => {
    return (
        <div className={"notation"}>
            {props.nums.map((elem)=>(<div className={"notation-elem"}>{elem}</div>))}
        </div>
    );
};

export default Notation;