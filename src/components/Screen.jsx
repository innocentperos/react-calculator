import React,{ Component } from "react";


class EquationSegment extends Component{
    render(props){
        var content = this.props.content.map(
            (operation,index) => <span key={`fig-${index}`}>{operation.value}</span>
        )   
    
        
        return(
            <div className="equation-segment"> 
            { content.length>0 && this.props.lastAnswer==null?content:`Answer = ${this.props.lastAnswer}`}
            </div>
        )
    }
}
class LCDScreen extends Component{

    render(props){
       
        return (
            <div className="screen">
                <EquationSegment content={this.props.operations} lastAnswer={this.props.lastAnswer}></EquationSegment>
                
            </div>
        )
    }
}
export default LCDScreen;