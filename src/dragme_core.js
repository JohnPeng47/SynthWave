import React from 'react';
import ReactDOM from 'react-dom';
import { convertPXtoNum, isReactComponent } from './utils.js';
import { PhysicsEngine } from './physics';
import { timingSafeEqual } from 'crypto';

export default class DragCore extends React.Component {
    constructor(props) {
        super(props);
        // fixes this to the DragCore component class
        this.clickHandler = this.clickHandler.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.dragHandler = this.dragHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);

        // create keys mapped to child instances; these are later used to get refs from the child components
        let keysChild = this.props.children instanceof Array ? this.props.children.map(child => {
            let keys = {}; //TODO: change this attribute name
            keys[child.props.something] = child;
            return keys;
        }) : {
            [this.children.props.something] : this.props.children
        }
    
        this.state = {
            children : Object.assign([], this.props.children), // need a mutable version of children
            currentSelected : null,
            refs : Object.assign({}, ...keysChild)
        }

        // initialize physics engine
        if(this.props.physicsEngine) {
            this.physicsEngine = new PhysicsEngine();            
        }

        console.log("state children: ", this.state.children);
    }

    // updates the dimensions of container
    updateDimensions() {        
        // intialize self reference for DOM manipulations
        // can only get node after component mounted
        if (!this.selfRef) {
            this.selfRef = ReactDOM.findDOMNode(this);
        }

        const {x, y, width, height} = this.selfRef.getBoundingClientRect();

        this.setState({
            x : x,
            y : y,
            width : width,
            height : height
        });
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log("ERRORR: ", error, info);
      }
    
    componentDidMount(){
        this.realignAxis();
        this.updateDimensions(); // gets rendered width and height from the DOM
    }

    //TODO: rename
    // which entity is clicked
    checkIfClickedChild(x, y){
        let clickedChild;
        React.Children.forEach(this.state.children, child => {
            let childRef = this.state.refs[child.props.something];
            let { x: xChild, y: yChild, width, height } = ReactDOM.findDOMNode(childRef).getBoundingClientRect();
            
            xChild = this.state.x(xChild);
            yChild = this.state.y(yChild);
        
            // TODO: need to handle the case where both elements are overlapped;
            // take the one with the highest Z-score
            if (x >= xChild && x <= xChild + width && y >= yChild && y <= yChild + height) {
                clickedChild = childRef;
                console.log("clicked : ", child);
            }

        })
        return clickedChild;
    }

    
    // this function because we use getBoundingClient to determine position of components
    // rendered on the DOM, which gives coordinates based on (0,0) at the top left corner of the
    // window. We need to relaign the x-y coordinates based on where the DragCore container was renderd
    realignAxis(){
        console.log("hellllooooo")
        const element = this.containerRef;
        const { borderTopWidth, borderLeftWidth } = element.style; 
        const { x: x_window, y: y_window, width, height } = element.getBoundingClientRect();
        const alignX = function(x) {
            return x - parseFloat(x_window) - convertPXtoNum(borderLeftWidth);
        }
        const alignY = function(y) {
            return y - parseFloat(y_window) - convertPXtoNum(borderTopWidth);
        }
        
        this.setState({
            // TODO: pass x and y to the child component so that bulk of positional logic is performed there
            alignX : alignX, 
            alignY : alignY,
            width : width,
            height : height
        })        
    }

    // TODO: this.x and this.y need to change in response to container being resized
    resizeHandler(event) {
        this.realignAxis();
        this.updateDimensions();
    }

    // main event loop
    // main event handler class; converts click coordinates and passes the event to other handlers
    clickHandler(event) {
        const collisions = [];
        const x = this.state.alignX(event.clientX);
        const y = this.state.alignY(event.clientY);
        const length = this.state.children.length;

        // check element collisions with borders
        /*
         *     1   2   3   4
         * 1  [x] [x] [x] [x]
         * 2  [ ] [x] [x] [x]
         * 3  [ ] [ ] [x] [x]
         * 4  [ ] [ ] [ ] [x]
         * 
         */

        for(let i = 0; i < length; i++) {
            let collide = this.physicsEngine.checkCollisionWithBorders(this.state.children[i]);
            if(collide) {
                collisions.push({
                    child: this.state.children[i]
                    // some other shit
                })
            }

        }
        
        const child = this.checkIfClickedChild(x, y);

        
        if (child) {
            console.log("settinc current child to", child);
            this.setState({
                currentSelected : child
            });
            console.log(this.state.currentSelected);
        }
        return;
    }

    dragHandler(event) {
        const currChild = this.state.currentSelected;
        console.log(currChild);
        if(!currChild) {
            return;
        }

        let { x, y } = currChild.getPosition();
        let deltaX = this.state.alignX(event.clientX - x);
        let deltaY = this.state.alignY(event.clientY - y);

        currChild.queueTransform({
            x : x + deltaX,
            y : y + deltaY
        });
    }

    mouseUpHandler() {
        console.log("mouseup firing");
        this.setState({
            currentSelected : null
        })
    }
    // TODO: change React cloneElement
    render(){        
        return (
            // ref returns a callback function with the reference to the element as the only parameter
            <div ref={elRef => this.containerRef = elRef} onMouseUp={this.mouseUpHandler} onMouseDown={this.clickHandler} onMouseMove={this.dragHandler} style={this.props.style}>
                {this.state.children.map((child, i) => {
                    const key = Math.random()*149358;
                    const clone = React.cloneElement(child, {
                        ref : r => this.state.refs[key] = r, // refs 
                        something : key,
                        selfRef : this.state.refs[key],
                        // Design Decision: originally wanted to delegate physics attribute intialization to child
                        // components constructor but instead opted to control intialization through the parent
                        // 1. More control over initialization process
                        // 2. Adhere to React philosophy of information flowing downward from parent to child
                        // 3. Decoupling the intialization logic from the class constructor allows better
                        // code reuse in the future, when other generic components could be imbued with a physics
                        // attributes
                        physics : this.physicsEngine.initDefaultConfig()
                    })
                    // need to reassign new ref returned from cloneElement to children
                    this.state.children[i] = clone;
                    return clone;
                })}
            </div>
        ) 
    }
}
