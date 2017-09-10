//This component display the 'month' drop down control 

var React = require('react');
var Select = require('./Select.react');

var aryMonthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

var MonthDropDown = React.createClass({
	
	handleDropdownChange: function (selectedValue){
		var monthIndex = aryMonthNames.indexOf(selectedValue);
		this.props.handleChange(monthIndex);
	},
	
	render: function (){
		return (
			<Select 
			    value={this.props.monthName} 
			    select={this.handleDropdownChange}
				options={aryMonthNames}>
			</Select>
		);
	}
	
});

module.exports = MonthDropDown;
		
	