import React from 'react';
import { render } from 'react-dom';

export default class Draggable extends React.Component {
    constructor(props) {
        super(props);
        // call this cb to set the refs back on parent
        // this.props.setRefs(React.createRef(), this.props.key);
        console.log("props: ", this.props.something);
        console.log("osme", this.props)
        this.state = {};
    }
    componentDidMount() {
        console.log("child ex")
    }
    render() {
        // return React.Children.only(this.props.children);
        return this.props.children
    }
}

