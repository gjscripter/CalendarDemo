//This component display the calendar grid

var React = require('react');

//Style Calendar Grid
var styleCurrentMonth = {
	width: '40px',
	fontWeight: 'bold'
};

var styleOtherMonth = {
	width: '40px',
	color: '#888888'
};


var CalendarGrid = React.createClass({
	
	getLastDateInMonth: function(dtDate){
		//Returns the last date in the month as an integer
		var intYear = dtDate.getFullYear();
		var intMonth = dtDate.getMonth();
		return (new Date(intYear, intMonth + 1, 0).getDate());
	},
	
	getPreviousMonth: function(dtDate){
		//Returns a date representing the previous month 
		var intYear = dtDate.getFullYear();
		var intMonth = dtDate.getMonth();
		if (intMonth==0){
			return new Date(intYear-1,11,1);
		}else{
			return new Date(intYear,intMonth-1,1);
		};
	},

	getNextMonth: function(dtDate){
		//Returns a date representing the previous month 
		var intYear = dtDate.getFullYear();
		var intMonth = dtDate.getMonth();
		if (intMonth==11){
			return new Date(intYear+1,0,1);
		}else{
			return new Date(intYear,intMonth+1,1);
		};
	},
	
	getCalendarDates: function(dateCurrentMonth){
		
		//This function is used to calculate an array containing all dates for the current calendar.
		//That is, all dates for the current month plus overflow dates from previous/next months.
		//The dates are stored in the array together with a 'currentCalendarMonth' boolean to indicate 
		//whether this is a date related to the current month or an overflow date.
		
		//Calculate current month's dates
		var intDaysInCurrentMonth = this.getLastDateInMonth(dateCurrentMonth);
		var intFirstWeekDayInCurrentMonth = dateCurrentMonth.getDay();
		var aryCurrentMonthDates = new Array(intDaysInCurrentMonth);
		for(var i=0;i<intDaysInCurrentMonth;i++){
			aryCurrentMonthDates[i]={year:dateCurrentMonth.getFullYear(), month:dateCurrentMonth.getMonth(), dateNum:i+1, currentCalendarMonth:true};
		};
		
		//Calculate previous month's dates
		var datePreviousMonth = this.getPreviousMonth(dateCurrentMonth);
		var intDaysInPreviousMonth = this.getLastDateInMonth(datePreviousMonth);
		var aryPreviousMonthDates = new Array(intDaysInPreviousMonth);
		for(var i=0;i<intDaysInPreviousMonth;i++){
			aryPreviousMonthDates[i]={year:datePreviousMonth.getFullYear(), month:datePreviousMonth.getMonth(), dateNum:i+1, currentCalendarMonth:false};
		};		
		
		//Calculate next month's dates
		var dateNextMonth = this.getNextMonth(dateCurrentMonth);
		var intDaysInNextMonth = this.getLastDateInMonth(dateNextMonth);
		var aryNextMonthDates = new Array(intDaysInNextMonth);
		for(var i=0;i<intDaysInNextMonth;i++){
			aryNextMonthDates[i]={year:dateNextMonth.getFullYear(), month:dateNextMonth.getMonth(), dateNum:i+1, currentCalendarMonth:false};
		};	
				
		//Calculate how many overflow spaces exist at the start of the current month. 
		//Then fill those spaces with dates taken from previous month
		var intOverflowDaysAtStartOfMonth = (intFirstWeekDayInCurrentMonth==0)?6:intFirstWeekDayInCurrentMonth-1;
		var aryNewCalendar = (intOverflowDaysAtStartOfMonth==0)? aryCurrentMonthDates : (aryPreviousMonthDates.slice(-intOverflowDaysAtStartOfMonth)).concat(aryCurrentMonthDates);
		
		//Calculate how many overflow spaces exist at the end of the current month
		//Then fill those spaces with dates taken from next month
		var intOverflowDaysAtEndOfMonth = 42-(aryNewCalendar.length);
		var aryNewCalendar = aryNewCalendar.concat(aryNextMonthDates.slice(0, intOverflowDaysAtEndOfMonth));
		
		return aryNewCalendar;
		
	},
	
	getDatesForRow: function(aryDates, row){
		//Returns the dates relating to a specific row of the calendar grid
		return aryDates.slice(row*7,(row*7)+7);
	},
	
	getDateCellHTML: function(dateObj){
		//Returns the HTML for a table cell (containing a button on which the date is displayed)
		var strBtnValue=dateObj.year+"-"+dateObj.month+"-"+dateObj.dateNum;
		if(dateObj.currentCalendarMonth){
			return <td key={dateObj.dateNum}><button type="button" value={strBtnValue} onClick={this.handleDateBtnClick} style={styleCurrentMonth}>{dateObj.dateNum}</button></td>;
		}else{
			return <td key={dateObj.dateNum}><button type="button" value={strBtnValue} onClick={this.handleDateBtnClick} style={styleOtherMonth} >{dateObj.dateNum}</button></td>;
		}
	},
		
	handleDateBtnClick(e){
		//A date button has been clicked in the grid
        var aryValues = e.target.value.split('-');
		var dtClickedDate = new Date(aryValues[0],aryValues[1],aryValues[2]);
		this.props.handleDateBtnClick(dtClickedDate);
    },
	
	getHeaderCellHTML: function(dayIndex){
		//Returns the HTML for a table header cell
		var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu","Fri", "Sat"];
		return <th key={dayIndex}>{dayNames[dayIndex]}</th>;
	},
	
	getWeekDays: function(){
		return  [1, 2, 3, 4, 5, 6, 0];
	},
	
	render: function (){
		var aryCalendarDates = this.getCalendarDates( new Date(this.props.strCurrentCalendar) );
		var sHeaderRowHTML = this.getWeekDays().map(this.getHeaderCellHTML);
		var sRow1HTML = this.getDatesForRow(aryCalendarDates, 0).map(this.getDateCellHTML);
		var sRow2HTML = this.getDatesForRow(aryCalendarDates, 1).map(this.getDateCellHTML);
		var sRow3HTML = this.getDatesForRow(aryCalendarDates, 2).map(this.getDateCellHTML);
		var sRow4HTML = this.getDatesForRow(aryCalendarDates, 3).map(this.getDateCellHTML);
		var sRow5HTML = this.getDatesForRow(aryCalendarDates, 4).map(this.getDateCellHTML);
		var sRow6HTML = this.getDatesForRow(aryCalendarDates, 5).map(this.getDateCellHTML);
		return (
			<div>
				<table>
					<thead>
						<tr>{sHeaderRowHTML}</tr>
					</thead>
					<tbody>
						<tr>{sRow1HTML}</tr>
						<tr>{sRow2HTML}</tr>
						<tr>{sRow3HTML}</tr>
						<tr>{sRow4HTML}</tr>
						<tr>{sRow5HTML}</tr>
						<tr>{sRow6HTML}</tr>
					</tbody>
				</table>
			</div>
		);
	}
	
});

module.exports = CalendarGrid;
		
	