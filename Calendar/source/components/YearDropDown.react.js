//This component display the 'year' drop down control 

var React = require('react');

var YearDropDown = React.createClass({
		
	handleDropdownChange: function (event){
		var selectValue = event.target.value;
		this.props.handleChange(selectValue);
	},
	
	render: function (){
		var aryOptions = new Array(11);
		for (var n=0;n<11;n++){
			aryOptions[n] = this.props.year-5+n;
		}
		//var aryOptions = ["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"];
		return (
			<select value={this.props.year} onChange={this.handleDropdownChange}>
				{aryOptions.map((option) => {	
					return <option value={option} key={option} >{option}</option>
				})}
			</select>
		);
	}
	
});

module.exports = YearDropDown;
		
	