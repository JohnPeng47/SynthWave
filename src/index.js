import React from 'react';
import ReactDOM from 'react-dom';
// import styled from 'styled-components'

import DragCore from './dragme_core.js'
import Draggable from './dragme.js';

import { CreateDraggable, CreateEntity } from './physics.js'

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

const dragConfig = {
    x : Math.random()*178,
    y : Math.random()*178,
    style : canvasStyle
}

const Comp = () => {
    return <div style={{ color: 'black'}} class="hello1"></div>
}

class testComp extends React.Component {
    render() {
        return <div>Helloworld</div>
    }
}
const draconfig2 = Object.assign(dragConfig, { style : canvasStyle2 });
const Div1 = <div className="canvas"></div>
const Div2 = <div className="hello1"></div>
const physics = {
    physics : {
        weight : null,
        x : 0,
        y : 0,
        vx : 0,
        vy : 0,
        ax : 0,
        ay : 0,
        dx : 0,
        dy : 0,
        gravity : 1,
        type : "particle"
    }
}

ReactDOM.render((
    <DragCore style={containerStyle}>
        <Draggable style={canvasStyle} x={Math.random()*178} y={Math.random()*178}>
            <div className="canvas"></div>
        </Draggable>
        <Draggable physicsConfig={physics} style={canvasStyle2} x={Math.random()*178} y={Math.random()*178}>
            <div className="hello1"></div>
        </Draggable>
    </DragCore>
), document.getElementById('app'));