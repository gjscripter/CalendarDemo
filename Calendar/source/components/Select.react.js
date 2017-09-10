//This component display a generic drop down control

var React = require('react');

var Select = React.createClass({
	
    handleChange(e){
        var value = e.target.value;
        this.props.select(value);
    },

    render(){
        return (
            <select value={this.props.value} onChange={this.handleChange}>
                {this.props.options.map(
                    (option, i)=>(
                        <option value={option} key={i}>
                            {option}
                        </option>
                    )
                )}              
            </select> 
        );
    }   
});

module.exports = Select;