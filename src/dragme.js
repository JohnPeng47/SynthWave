import React from 'react';
import { render } from 'react-dom';

export default class Draggable extends React.Component {
    constructor(props) {
        super(props);
        // call this cb to set the refs back on parent
        // this.props.setRefs(React.createRef(), this.props.key);
        this.state = {};
        this._childRef = null;
        console.log("selfRef: ", this.props.selfRef);
    }
    
    getPosition() {
        // return {
        //     x : this._childRef.style
        // }
    }
    
    // animation callback tied 
    translateX(x) {
        
    }

    componentDidMount() {
        console.log(this._childRef)
        // this._childRef.props.style = {
        //     "background-colour" : "black"
        // }
    }
    render() {
        return React.cloneElement(this.props.children, {
            ref : eleRef => this._childRef = eleRef
        })
    }
}

