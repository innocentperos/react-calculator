import React,{ Component } from "react";

class ButtonGroup extends Component{

    render(props){
        return (
            <div className={`btn-group ${this.props.direction}`}>
            {this.props.children}
            </div>
        )
    }
}

export default ButtonGroup;