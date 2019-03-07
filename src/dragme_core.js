import React from 'react';
import ReactDOM from 'react-dom';
import { convertPXtoNum } from './utils.js';

export default class DragCore extends React.Component {
    constructor(props) {
        super(props);
        // fixes this to the DragCore component class
        this.clickHandler = this.clickHandler.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);

        let keysChild = this.props.children.map(child => {
            let keys = {}; //TODO: change this attribute name
            keys[child.props.something] = child;
            return keys;
        })

        this.state = {
            children : this.props.children.map(child => child),
            childRefs : new Array(this.props.children.length).map(() => {
                return React.createRef(); //populate with refs later assigned from child components
            }),
            currentSelected : null,
            refs : Object.assign({}, ...keysChild)
        }
    }

    // checks if click within children's area
    checkIfClickedChild(x, y){
        let clickedChild;
        React.Children.forEach(this.state.children, child => {
            let { x: xChild, y: yChild, width, height } = ReactDOM.findDOMNode(this.state.refs[child.props.something]).getBoundingClientRect();
            
            xChild = this.state.x(xChild);
            yChild = this.state.y(yChild);
        
            // TODO: need to handle the case where both elements are overlapped;
            // take the one with the highest Z-score
            if (x >= xChild && x <= xChild + width && y >= yChild && y <= yChild + height) {
                clickedChild = child;
                console.log("clicked: ", child.props.children.props.className);
            }

        })
        return clickedChild;
    }

    componentDidMount(){
        this.realignAxis();
    }

    // returns 2 functions that when, given x and y relative to the window object(screen?)
    // will instead return coordinates relative to the top left corner of DragCore container
    // TODO: these values need to change in response to container being resized
    realignAxis(){
        const element = this.containerRef;
        const { borderTopWidth, borderLeftWidth } = element.style; 
        const { x: x_window, y: y_window } = element.getBoundingClientRect();
        this.state.x = (x) => x - parseFloat(x_window) - convertPXtoNum(borderLeftWidth);
        this.state.y = (y) => y - parseFloat(y_window) - convertPXtoNum(borderTopWidth);
    }

    resizeHandler(event) {
        this.realignAxis();
    }
    // main event handler class; converts click coordinates and passes the event to other handlers
    clickHandler(event) {
        const x = this.state.x(event.clientX);
        const y = this.state.y(event.clientY);
        const child = this.checkIfClickedChild(x, y);

        return
        // console.log("sucesccfully loaded")
        // const selectme = document.querySelector("#selectMe")
        // function onmouseup() {
        //     console.log("mouse up");
        //     selectme.removeEventListener("mouseup", onmouseup);
        //     selectme.removeEventListener("mousemove", onmousemove);
        // }
        // selectme.addEventListener("mouseup", onmouseup); 
        // function onmousemove(event) {
        //     console.log("X: ", event.clientX);
        //     console.log("Y: ", event.clientY);
        // }
        // selectme.addEventListener("mousemove", onmousemove); 
    }

    // TODO: change React cloneElement
    render(){
        return (
            // ref returns a callback function with the reference to the element as the only parameter
            <div ref={elRef => this.containerRef = elRef} onMouseDown={this.clickHandler} style={this.props.style}>
                {React.Children.map(this.props.children, (child, i) => {
                    const key = Math.random()*149358;
                    const clone = React.cloneElement(child, {
                        ref : r => this.state.refs[key] = r,
                        something : key,
                        selfRef : this.state.refs[key]
                    })
                    // need to reassign new ref returned from cloneElement to children
                    this.state.children[i] = clone;
                    return clone;
                })}
            </div>
        ) 
    }
}
