import React, { Component } from "react";
import "./index.css";
import AppointmentForm from "../AppointmentForm";
import axios from "axios";

class AvailableSlots extends Component {
  state = {
    slots: [],
    selectedSlot: null,
    loading: false,
    error: null,
  };

  fetchSlots = async () => {
    const { selectedDoctor, selectedDate } = this.props;

    if (!selectedDoctor || !selectedDate) return;

    this.setState({ loading: true, error: null });

    try {
      const response = await axios.get(
        `https://srinivas-baby-steps-backend-assignment.vercel.app/available-slots?doctor=${selectedDoctor}&date=${selectedDate}`
      );
      this.setState({ slots: response.data.slots || [], loading: false });
    } catch (error) {
      this.setState({ error: "Failed to fetch slots", loading: false });
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedDoctor !== this.props.selectedDoctor ||
      prevProps.selectedDate !== this.props.selectedDate
    ) {
      this.fetchSlots();
    }
  }

  handleSlotClick = (slot) => {
    this.setState({ selectedSlot: slot });
  };

  handleCloseForm = () => {
    this.setState({ selectedSlot: null });
  };

  render() {
    const { slots, selectedSlot, loading, error } = this.state;

    return (
      <div className="available-slots">
        <h2>Available Slots</h2>

        {loading && <p>Loading slots...</p>}
        {error && <p className="error">{error}</p>}

        <div className="slot-container">
          {slots.length > 0 ? (
            slots.map((slot, index) => (
              <button
                key={index}
                className="slot"
                onClick={() => this.handleSlotClick(slot)}
              >
                {slot}
              </button>
            ))
          ) : (
            !loading && <p>No available slots</p>
          )}
        </div>

        {selectedSlot && (
          <AppointmentForm slot={selectedSlot} onClose={this.handleCloseForm} />
        )}
      </div>
    );
  }
}

export default AvailableSlots;
