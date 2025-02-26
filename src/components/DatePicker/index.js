import React, { Component } from "react";
import "./index.css";

class DatePicker extends Component {
  handleChange = (event) => {
    const selectedDate = event.target.value;

    if (typeof this.props.onSelectDate === "function") {
      this.props.onSelectDate(selectedDate);
    } else {
      console.error("Error: onSelectDate prop is not passed correctly.");
    }
  };

  render() {
    return (
      <div className="date-picker">
        <h2>Select a Date</h2>
        <input type="date" onChange={this.handleChange} />
      </div>
    );
  }
}

export default DatePicker;
