import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const AppointmentList = ({ userId }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get(`https://srinivas-baby-steps-backend-assignment.vercel.app/appointments?userId=${userId}`)
            .then(response => setAppointments(response.data))
            .catch(error => console.error("Error fetching appointments:", error));
    }, [userId]);

    const handleCancel = (id) => {
        axios.delete(`https://srinivas-baby-steps-backend-assignment.vercel.app/appointments/${id}`)
            .then(() => {
                alert("Appointment canceled");
                setAppointments(appointments.filter(appt => appt.id !== id));
            })
            .catch(error => console.error("Error cancelling appointment:", error));
    };

    return (
        <div className="appointment-list">
            <h3>My Appointments</h3>
            <ul>
                {appointments.map(appt => (
                    <li key={appt.id}>
                        {appt.date} | {appt.time} with {appt.doctorName}
                        <button onClick={() => handleCancel(appt.id)}>Cancel</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
