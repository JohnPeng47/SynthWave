import React from 'react';
import { render } from 'react-dom';

export default class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x : this.props.x,
            y : this.props.y,
            height : null, // set after Draggable has been rendered on the DOM
            width : null
        }
        this._childRef = null;
    }

    // Design Decision: Encapsulate the movement logic in child so that DragCore can support many
    // types of children (ie. HTML, SVG elements, WebGL elements, etc.)
    getPosition() {
        const { x, y, width, height } = this.state;
        console.log(this.state.physics.getLeft());
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

    componentWillReceiveProps(props) {
        if(props.physics) {
            this.setState({ physics : props.physics });
        }
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
            transform : `translateX(${this.state.x}px) translateY(${this.state.y}px)`
        }
        return React.cloneElement(this.props.children, {
            ref : eleRef => this._childRef = eleRef,
            style : Object.assign({}, this.props.style, transform)
        })
    }
}

