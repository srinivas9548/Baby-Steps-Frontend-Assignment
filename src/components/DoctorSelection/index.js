import React, { Component } from "react";
import "./index.css";

class DoctorSelection extends Component {
  state = {
    selectedDoctor: "",
  };

  handleChange = (e) => {
    this.setState({ selectedDoctor: e.target.value });
    this.props.onDoctorSelect(e.target.value);
  };

  render() {
    const { doctors } = this.props;
    return (
      <div className="doctor-selection">
        <h2>Select a Doctor</h2>
        <select onChange={this.handleChange} value={this.state.selectedDoctor}>
          <option value="">-- Select Doctor --</option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default DoctorSelection;
