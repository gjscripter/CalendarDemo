//This component displays the buttons and drop down controls for the calendar

var React = require('react');
var ShiftMonth = require('./ShiftMonth.react');
var YearDropDown = require('./YearDropDown.react');
var MonthDropDown = require('./MonthDropDown.react');

var CalendarControls = React.createClass({
		
	render: function (){
		var dateCurrentCalendar = new Date(this.props.strCurrentCalendar);
		var aryMonthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		var strMonthName = aryMonthNames[dateCurrentCalendar.getMonth()];
		var intYear = dateCurrentCalendar.getFullYear();
		return (
			<div>
				<ShiftMonth handleClick={this.props.previousMonth} label="<" />&nbsp;
				<MonthDropDown handleChange={this.props.setMonth} monthName={strMonthName} />&nbsp;
				<YearDropDown handleChange={this.props.setYear} year={intYear} />&nbsp;
				<ShiftMonth handleClick={this.props.nextMonth} label=">" />&nbsp;
			</div>
		);
	}
});

module.exports = CalendarControls;
		
	