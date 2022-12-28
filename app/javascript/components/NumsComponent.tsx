import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";


const Nums = (props) => {
    return (
        <div className={"nums-container"} >
            {props.nums.map((elem)=>(<div key = {Math.random()} className={"notation-elem"}>{elem}</div>))}
        </div>
    );
};

export default Nums;