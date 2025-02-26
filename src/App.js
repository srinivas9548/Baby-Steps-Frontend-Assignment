import React, { Component } from "react";
import DatePicker from "./components/DatePicker";
import AvailableSlots from "./components/AvailableSlots";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    doctors: [],
    selectedDoctor: "",
    selectedDate: null,
    availableSlots: [],
    selectedSlot: null,
    showForm: false,
    appointments: [],
  };

  componentDidMount() {
    // Fetch the list of doctors from the backend
    axios
      .get("https://srinivas-baby-steps-backend-assignment.vercel.app/doctors")
      .then((response) => {
        this.setState({ doctors: response.data });
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }

  handleDoctorSelect = (event) => {
    this.setState({ selectedDoctor: event.target.value, selectedDate: null, availableSlots: [], showForm: false });
  };

  handleDateSelect = (date) => {
    this.setState({ selectedDate: date, showForm: false });

    // Fetch available slots for the selected date
    axios
      .get(`https://srinivas-baby-steps-backend-assignment.vercel.app/slots?doctor=${this.state.selectedDoctor}&date=${date}`)
      .then((response) => {
        this.setState({ availableSlots: response.data });
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
      });
  };

  handleSlotSelect = (slot) => {
    this.setState({ selectedSlot: slot, showForm: true });
  };

  handleFormSubmit = (appointmentDetails) => {
    const { selectedDoctor, selectedDate, selectedSlot } = this.state;
    const newAppointment = {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedSlot,
      ...appointmentDetails,
    };

    axios
      .post("https://srinivas-baby-steps-backend-assignment.vercel.app/book", newAppointment)
      .then((response) => {
        this.setState((prevState) => ({
          appointments: [...prevState.appointments, response.data],
          showForm: false,
        }));
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
      });
  };

  handleCancelAppointment = (id) => {
    axios
      .delete(`https://srinivas-baby-steps-backend-assignment.vercel.app/cancel/${id}`)
      .then(() => {
        this.setState((prevState) => ({
          appointments: prevState.appointments.filter((appointment) => appointment.id !== id),
        }));
      })
      .catch((error) => {
        console.error("Error cancelling appointment:", error);
      });
  };

  render() {
    const { doctors, selectedDoctor, selectedDate, availableSlots, showForm, appointments } = this.state;

    return (
      <div className="container">
        <h1>Doctor Appointment Booking</h1>

        {/* Doctor Selection (Dropdown) */}
        <div className="doctor-selection">
          <label>Select Doctor:</label>
          <select value={selectedDoctor} onChange={this.handleDoctorSelect}>
            <option value="">-- Choose a Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker - Show after doctor selection */}
        {selectedDoctor && <DatePicker onSelectDate={this.handleDateSelect} />}

        {/* Available Slots - Show after date selection */}
        {selectedDate && <AvailableSlots slots={availableSlots} onSelectSlot={this.handleSlotSelect} />}

        {/* Appointment Form - Show after slot selection */}
        {showForm && <AppointmentForm onSubmit={this.handleFormSubmit} />}

        {/* Appointment List - Show booked appointments */}
        <AppointmentList appointments={appointments} onCancel={this.handleCancelAppointment} />
      </div>
    );
  }
}

export default App;
