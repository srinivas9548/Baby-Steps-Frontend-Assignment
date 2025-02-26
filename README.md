## Backend Github Link: https://github.com/srinivas9548/Baby-steps-backend-assignment
### Frontend Published Link: https://baby-steps-frontend-assignment.vercel.app/
### Backend Published Link: https://srinivas-baby-steps-backend-assignment.vercel.app/

# Doctor Appointment Booking System

This is a simple Doctor Appointment Booking application built with React. It allows users to select a doctor, choose an available date, pick a time slot, and book an appointment. Users can also view and manage their upcoming appointments.

## Features

- **Doctor Selection:** Users can select a doctor from a dropdown list.
- **Date Picker:** Users can choose an available date from a calendar input.
- **Available Slots:** The system fetches and displays available time slots for the selected doctor and date.
- **Appointment Booking:** Users can book an appointment by filling in details.
- **Appointment Management:** Users can view, edit, or cancel their booked appointments.

## Tech Stack

- **Frontend:** React (Class Components)
- **Backend:** Node.js, Express.js (Deployed at [Backend API](https://srinivas-baby-steps-backend-assignment.vercel.app/))
- **Database:** SQLite (Handled by the backend)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/srinivas9548/Baby-Steps-Frontend-Assignment.git
   cd Baby-Steps-Frontend-Assignment
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

## API Endpoints

The application interacts with the following API endpoints:

- **Fetch Doctors:** `GET /doctors`
- **Fetch Available Slots:** `GET /slots?doctor={doctor_name}&date={YYYY-MM-DD}`
- **Book Appointment:** `POST /book`
- **Cancel Appointment:** `DELETE /cancel/{appointment_id}`

## Project Structure

```
doctor-appointment-app/
│── src/
│   ├── components/
│   │   ├── DoctorSelection/
│   │   │   ├── index.js
│   │   │   ├── index.css
│   │   ├── DatePicker/
│   │   │   ├── index.js
│   │   │   ├── index.css
│   │   ├── AvailableSlots/
│   │   │   ├── index.js
│   │   │   ├── index.css
│   │   ├── AppointmentForm/
│   │   │   ├── index.js
│   │   │   ├── index.css
│   │   ├── AppointmentList/
│   │   │   ├── index.js
│   │   │   ├── index.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│── package.json
│── README.md
```

## How to Use

1. **Select a Doctor** from the dropdown.
2. **Pick a Date** using the date picker.
3. **Choose an Available Slot** from the displayed options.
4. **Fill in the Appointment Form** and submit.
5. **View or Manage Appointments** from the appointment list.
