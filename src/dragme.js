import React from 'react';
import { render } from 'react-dom';

export default class Draggable extends React.Component {
    constructor(props) {
        super(props);

        // bind getters to child
        const getLeft = props.physics.getLeft.bind(this);
        const getRight = props.physics.getRight.bind(this);
        const  getTop = props.physics.getTop.bind(this);
        const getBottom = props.physics.getBottom.bind(this);
        
        const boundGetters = {
            getLeft : getLeft,
            getRight : getRight,
            getTop : getTop,
            getBottom : getBottom
        }

        this.state = {
            x : this.props.x,
            y : this.props.y,
            height : null, // set after Draggable has been rendered on the DOM
            width : null,
            // this represent all values that cud be changed
            physics : Object.assign(props.physics, boundGetters)
        }
        this.queued_state = null;
        this._childRef = null;
    }

    // Design Decision: Encapsulate the movement logic in child so that DragCore can support many
    // types of children (ie. HTML, SVG elements, WebGL elements, etc.)
    getPosition() {
        const { x, y, width, height } = this.state;
        return {
            x : x,
            y : y,
            width : width,
            height : height
        }
    }

    translate(x, y) {
        this.setState({
            x: this.state.x += x,
            y: this.state.y += y
        })
    }
    
    queueTransform(newState) {
        const ogState = this.queued_state ? this.queued_state : this.state.physics;
        const transform =  Object.assign({}, ogState, newState);
        this.queued_state = transform;
    }

    runTransformation() {
        this.setState({
            physics : transform,
            queued_state : null
        });
    }

    componentWillReceiveProps(props) {
        // console.log("executinnng");
        // if(props.physics) {
        //     const boundGetters = {
        //         getLeft : props.physics.getLeft.bind(this),
        //         getRight : props.physics.getRight.bind(this),
        //         getTop : props.physics.getTop.bind(this),
        //         getBottom : props.physics.getBottom.bind(this)
        //     }
        //     this.setState({ physics : Object.assign(props.physics, boundGetters)});
        // }
    }

    componentDidMount() {
        const { width, height } = this._childRef.getBoundingClientRect();
        this.setState({
            width : width,
            height : height
        })
    }

    render() {
        const transform = {
            // state change triggers transformation
            transform : `translateX(${this.state.x}px) translateY(${this.state.y}px)`
        }
        return React.cloneElement(this.props.children, {
            ref : eleRef => this._childRef = eleRef,
            style : Object.assign({}, this.props.style, transform)
        })
    }
}

