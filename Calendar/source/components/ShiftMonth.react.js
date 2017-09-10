//This component displays a button used for shifting the calendar forward/back

var React = require('react');

var ShiftMonth = React.createClass({
	
	render: function (){
		return (
			<button onClick={this.props.handleClick}>{this.props.label}</button>
		);
	}
	
});

module.exports = ShiftMonth;
		
	