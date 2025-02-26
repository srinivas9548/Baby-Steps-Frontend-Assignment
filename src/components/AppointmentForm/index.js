import React, { Component } from "react";
import "./index.css";
import axios from "axios";

class AppointmentForm extends Component {
    state = {
        patientName: "",
        appointmentType: "",
        notes: "",
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { slot } = this.props;
        const { patientName, appointmentType, notes } = this.state;

        const appointmentData = {
            slot,
            patientName,
            appointmentType,
            notes,
        };

        try {
            await axios.post(
                "https://srinivas-baby-steps-backend-assignment.vercel.app/book",
                appointmentData
            );
            alert("Appointment booked successfully!");
            this.props.onClose(); // Close form after booking
        } catch (error) {
            alert("Failed to book appointment.");
            console.error(error);
        }
    };

    render() {
        const { slot, onClose } = this.props;
        const { patientName, appointmentType, notes } = this.state;

        return (
            <div className="appointment-form">
                <h3>Book Appointment for {slot}</h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="patientName"
                        placeholder="Patient Name"
                        value={patientName}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="appointmentType"
                        placeholder="Appointment Type"
                        value={appointmentType}
                        onChange={this.handleChange}
                        required
                    />
                    <textarea
                        name="notes"
                        placeholder="Notes (Optional)"
                        value={notes}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Confirm Booking</button>
                    <button type="button" onClick={onClose} className="cancel-btn">
                        Cancel
                    </button>
                </form>
            </div>
        );
    }
}

export default AppointmentForm;
