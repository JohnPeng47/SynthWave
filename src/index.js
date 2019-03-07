import React from 'react';
import ReactDOM from 'react-dom';
// import styled from 'styled-components'

import DragCore from './dragme_core.js'
import Draggable from './dragme.js';

// get styled-components working
// const canvas = styled.div`
//     height: 500px;
//     width: 600px;
//     margin: 0 auto;
//     background-color: red;
//     position : absolute;
// `;

const canvasStyle = {
    height: "40px",
    width: "40px",
    margin: "0 auto",
    "backgroundColor": "#c4ff55",
    position : "absolute",
    top: 0,
    left: 0
    // top : (Math.random() + 1) * 100,
    // left : (Math.random() + 1) * 100
}

const canvasStyle2 = {
    height: "40px",
    width: "40px",
    margin: "0 auto",
    "backgroundColor": "blue",
    position : "absolute",
    top: 0,
    left: 0
    // top : (Math.random() + 1) * 100,
    // left : (Math.random() + 1) * 100
}
const containerStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0, 
    left: 0,
    border: "15px solid orange",
    padding: "10px",
    marginTop: "15px 15px"
}

// entry point for out  application
ReactDOM.render((
    <DragCore style={containerStyle}>
        <Draggable style={canvasStyle} x={Math.random()*178} y={Math.random()*178}>
            <div className="canvas"></div>
        </Draggable>
        <Draggable style={canvasStyle2} x={Math.random()*178} y={Math.random()*178}>
            <div className="hello1"></div>
        </Draggable>
    </DragCore>
), document.getElementById('app'));
