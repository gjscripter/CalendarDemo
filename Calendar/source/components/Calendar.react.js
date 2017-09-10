//This is the main Calendar component

var React = require('react');
var CalendarControls = require('./CalendarControls.react');
var CalendarGrid = require('./CalendarGrid.react');

var styleCalendar={
	width: '315px',
	textAlign: 'center'
};
	
var Calendar = React.createClass({
	
	getInitialState: function(){
		//Get the default calendar page from the current URL
		//If not specified in the current URL then default to today's calendar page
		var dateToday = new Date();
		var dateCurrentCalendar = new Date(dateToday.getFullYear(), dateToday.getMonth(), 1);
		var strURLHash = window.location.hash;
		var regex = new RegExp(/^\#\d{4}-\d{2}$/);
		if(regex.test(strURLHash)){
			var aryHash = strURLHash.substr(1).split('-');
			dateCurrentCalendar = new Date(aryHash[0],parseInt(aryHash[1]-1),1)
		}		
		return {
			dateCurrentCalendar: dateCurrentCalendar
		};
	},
	
	applyCalendarPage: function(dateNewCalendar){
		//Set the current calendar page in the URL so state is maintained if page is refreshed
		var year_YYYY = dateNewCalendar.getFullYear();
		var month_MM = ("0" + (dateNewCalendar.getMonth()+1)).substr(-2);
		var strURLHash = "#" + year_YYYY + "-" + month_MM; 
      	if (history.pushState) {
         	var strNewURL = window.location.protocol + "//" + window.location.host + window.location.pathname + strURLHash;
        	window.history.pushState({path:strNewURL},'',strNewURL);
      	};
		
		//Update state in React (and cause it to render again)
		this.setState({dateCurrentCalendar : dateNewCalendar});
	},
	
	doPreviousMonth: function(){
		//This function chsnges the to calendar page to previous month in response to the '<' button being clicked
		
		//Calculate previous month
		var dateNewCalendar = new Date(this.state.dateCurrentCalendar);
		var intYear = dateNewCalendar.getFullYear();
		var intMonth = dateNewCalendar.getMonth();
		if (intMonth==0){
			dateNewCalendar.setFullYear(intYear-1);
			dateNewCalendar.setMonth(11);
		}else{
			dateNewCalendar.setMonth(intMonth-1);
		};
		
		//Update the calendar Page
		this.applyCalendarPage(dateNewCalendar);
	},
	
	doNextMonth: function(){
		//This function chsnges the to calendar page to next month in response to the '>' button being clicked
		
		//Calculate next month
		var dateNewCalendar = new Date(this.state.dateCurrentCalendar);
		var intYear = dateNewCalendar.getFullYear();
		var intMonth = dateNewCalendar.getMonth();
		if (intMonth==11){
			dateNewCalendar.setFullYear(intYear+1);
			dateNewCalendar.setMonth(0);
		}else{
			dateNewCalendar.setMonth(intMonth+1);
		};
		
		//Update the calendar Page
		this.applyCalendarPage(dateNewCalendar);
	},
	
	doSetYear: function(year){
		//This function sets the year in response to the YearDropDown element being changed
		var dateNewCalendar = new Date(this.state.dateCurrentCalendar);
		dateNewCalendar.setFullYear(year);
		//Update the calendar Page
		this.applyCalendarPage(dateNewCalendar);
	},
	
	doSetMonth: function(monthIndex){
		//This function sets the year in response to the MonthDropDown element being changed
		var dateNewCalendar = new Date(this.state.dateCurrentCalendar);
		dateNewCalendar.setMonth(monthIndex)
		//Update the calendar Page
		this.applyCalendarPage(dateNewCalendar);
	},
	
	handleDateBtnClick(dtClickedDate){
		//A date button has been clicked in the grid
        alert("You selected : " + dtClickedDate.toLocaleDateString());
    },
	
	
	render: function (){
		var strCurrentCalendar = this.state.dateCurrentCalendar;
		return (
			<div style={styleCalendar}>
				<CalendarControls 
					previousMonth={this.doPreviousMonth}
					nextMonth={this.doNextMonth}
					setYear={this.doSetYear}
					setMonth={this.doSetMonth}
					strCurrentCalendar={strCurrentCalendar}
				/>
				<CalendarGrid 
					strCurrentCalendar={strCurrentCalendar}
					handleDateBtnClick={this.handleDateBtnClick}
				/>
			</div>
		);
	}
});

module.exports = Calendar;
		
	