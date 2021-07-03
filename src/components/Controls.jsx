import React,{ Component } from "react";

class Controls extends Component{
    
    constructor(props){
        super(props)

        this.changeColor = this.changeColor.bind(this)
    }
    changeColor(color){
        this.props.updateColor(color)
    }
    render(props){
        return (
            <div className="controls">
            <div onClick={e=>{
                this.changeColor("purple")
            }} className="control purple"></div>
            <div onClick={e=>{
                this.changeColor("green")
            }} className="control green"></div>
            <div onClick={e=>{
                this.changeColor("red")
            }} className="control"></div>
        </div>
        )
    }
}

export default Controls;