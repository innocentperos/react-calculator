import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Pallete from "./components/Pallete"
class Calculator extends React.Component{
    constructor(props){
        super(props)

        this.handleKeyPress = this.handleKeyPress.bind(this)
    }
    handleKeyPress(e){
       
    }
    render(props){

        return (
            <div  onKeyUp={this.handleKeyPress}>
            <App></App>
            <Pallete></Pallete>
            <div className="author">
            Innocent Saidu Peros</div>
            </div>
        )
    }
}

ReactDOM.render(
    <Calculator></Calculator>, document.getElementById("app")
)