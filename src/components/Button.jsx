import React , {Component} from "react";

class Button extends Component{
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        if(this.props.type=="value"){
            this.props.click({
                value: this.props.value
            })
        }else{
            this.props.click(this.props.type)

        }
    }
    render(props){
        return (
            <button onClick={this.handleClick} className={`btn ` + (this.props.small?`small`:``) +" "  + (this.props.clear?`clear`:``)}>
            {this.props.children}
            </button>
        )
    }
}

export default Button;