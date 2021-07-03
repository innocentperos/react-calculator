import React from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";
import ButtonGroup from "./components/ButtonGroup";
import LCDScreen from "./components/Screen";
import Controls from "./components/Controls"
import "./scss/build.scss";
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            operations: [],
            lastAnswer: null,
            color:"red",
        }

        this.ButtonCLick = this.ButtonCLick.bind(this)
        this.updateColor = this.updateColor.bind(this)
    }
    updateColor(color){
        
        this.setState(state=>({color}))
    }
    calculate() {
        var lastfigure = '';

        var accumulate = '';
        this.state.operations.forEach((operation, index) => {
            
            if (operation.type != "operator") {
                lastfigure = lastfigure + operation.value;
                
            } else {

                accumulate = accumulate + lastfigure + operation.value
                lastfigure = ''
            }

            if (index == this.state.operations.length - 1) {

                if (lastfigure != '') {
                    accumulate = accumulate + lastfigure
                }
            }

        });
        try{
            var ans = eval(accumulate)
            
            this.setState(state =>{
                return {lastAnswer: ans}
            })
        }catch(e){
            this.setState(state =>{
                return {lastAnswer: "Error"}
            })
        }
        
    }
    pushOperation(operation) {
        
        
        if (operation.type == "operator") {
            if(this.state.operations.length ==0 && operation.level ==2){
                return
            }
            if (operation.operator == "equal") {
                this.calculate()
            } else {
                var len = this.state.operations.length
                if (len > 0 && this.state.operations[len - 1].type == "operator") {
                    if (operation.level !== this.state.operations[len - 1].level) {

                        if (operation.level >= this.state.operations[len - 1].level) {
                            this.setState(previousState => {
                                var newstate = previousState.operations;
                                newstate.pop();
                                newstate.push(operation);
                                return {
                                    operations: newstate
                                }
                            })

                        } else {
                            this.setState(previousState => {
                                var newstate = previousState.operations;
                                newstate.push(operation);
                                return {
                                    operations: newstate
                                }

                            })
                        }
                    }
                } else {
                    this.setState(previousState => {
                        var newstate = previousState.operations;
                        newstate.push(operation);
                        return {
                            operations: newstate
                        }
                    })
                }
            }
        } else {
            this.setState(previousState => {
                var newstate = previousState.operations;
                newstate.push(operation);
                return {
                    operations: newstate
                }
            })
        }
    }
    ButtonCLick(btn) {
        
        switch (btn) {
            case "subtract":
                
                this.pushOperation({
                    type: "operator",
                    operator: "subtract",
                    value: "-",
                    level: 1
                })
                break;
            case "add":
                this.pushOperation({
                    type: "operator",
                    operator: "add",
                    value: "+",
                    level: 0
                })
                break;
            case "multi":
                this.pushOperation({
                    type: "operator",
                    operator: "multi",
                    value: "*",
                    level: 2
                })
                break
            case "divide":
                this.pushOperation({
                    type: "operator",
                    operator: "divide",
                    value: "/",
                    level: 2
                })
                break
            case "dot":
                this.pushOperation({
                    type: "value",
                    value: ".",
                    level: 3
                })
                break
            case "equal":
                this.calculate()
                break;

            case "clear":

                if(this.state.lastAnswer == null){
                    this.setState(previousState => {
                        var operations = previousState.operations;
                        operations.pop();
    
                        return {
                            operations
                        }
                    })
                }else{
                    this.setState(state=>{
                        return {lastAnswer:null}
                    })
                }
                break;
            default:
                if(this.state.lastAnswer != null){
                    this.setState(state=>({lastAnswer:null,operations:[]}))
                
                }
                this.pushOperation({
                    type: "operate",
                    operator: "value",
                    value: btn.value
                })
                break;
        }
    }
    render() {
        return (
            <div className={`calculator ${this.state.color}`}>
                <Controls updateColor={this.updateColor}></Controls>
                <LCDScreen operations={this.state.operations} lastAnswer={this.state.lastAnswer}>123</LCDScreen>
                <div>
                    <ButtonGroup direction="row">
                        <Button small clear click={this.ButtonCLick} type="clear">C</Button>
                        <Button small click={this.ButtonCLick} type="add">+</Button>
                        <Button small click={this.ButtonCLick} type="subtract">-</Button>
                        <Button small click={this.ButtonCLick} type="multi">*</Button>
                        <Button small click={this.ButtonCLick} type="divide">/</Button>

                    </ButtonGroup>
                    <ButtonGroup direction="row">
                        <Button click={this.ButtonCLick} type="value" value="7">7</Button>
                        <Button click={this.ButtonCLick} type="value" value="8">8</Button>
                        <Button click={this.ButtonCLick} type="value" value="9">9</Button>
                    </ButtonGroup>
                    <ButtonGroup direction="row">
                        <Button click={this.ButtonCLick} type="value" value="4">4</Button>
                        <Button click={this.ButtonCLick} type="value" value="5">5</Button>
                        <Button click={this.ButtonCLick} type="value" value="6">6</Button>
                    </ButtonGroup>
                    <ButtonGroup direction="row">
                        <Button click={this.ButtonCLick} type="value" value="1">1</Button>
                        <Button click={this.ButtonCLick} type="value" value="2">2</Button>
                        <Button click={this.ButtonCLick} type="value" value="3">3</Button>
                    </ButtonGroup>
                    <ButtonGroup direction="row">
                        <Button click={this.ButtonCLick} type="dot" value=".">.</Button>
                        <Button click={this.ButtonCLick} type="value" value="0">0</Button>
                        <Button click={this.ButtonCLick} type="equal" >=</Button>
                    </ButtonGroup></div>
            </div>
        )
    }
}

// ReactDOM.render(
//     <App></App>, document.getElementById("app")
// )

export default App;