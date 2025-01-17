import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ScheduleEvents = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/expo')
            .then(response => {
                if (response.data.status) {
                    const sortedEvents = response.data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                    setEvents(sortedEvents);
                    setFilteredEvents(sortedEvents);
                }
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = events.filter(event =>
            event.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredEvents(filtered);
    };

    const handleShowDetails = (event) => {
        setSelectedEvent(event);
    };
const registerEvent = async (id) => {
    if (user) {
      let attendeedata = { expoId: id, name: user.name, email: user.email }
      console.log(attendeedata)
      await axios.post('http://localhost:3000/api/expo/attendeeregister', attendeedata)
        .then(response => {
          if (response.data.status) {
            toast.success("Registration successful!");
            navigate("/event");
          } else {
            toast.error("Already Registered");
          }
        })
        .catch(error => {
          console.error("Error fetching data: ", error)
          // toast.error("Registration failed")
        });

    }
    else {
      navigate("/login")
    }
  }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '70vh', padding: 3 }}>
            <TextField
                label="Search Event by Name"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginBottom: 2, width: '50%' }}
            />

            {selectedEvent && (
                <Box sx={{ marginBottom: 3, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                    <Typography variant="h6">Event Details:</Typography>
                    <Typography><strong>Name:</strong> {selectedEvent.title}</Typography>
                    <Typography><strong>Speaker:</strong> {selectedEvent.speaker}</Typography>
                    <Typography><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</Typography>
                    <Typography><strong>Time:</strong> {selectedEvent.time}</Typography>
                </Box>
            )}
            <TableContainer component={Paper} sx={{ maxWidth: 1300, boxShadow: 3, borderRadius: 2, maxHeight: 400, overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {['Name', 'Speaker', 'Date', 'Time',  'Show Details'].map((header) => (
                                <TableCell key={header} sx={{ backgroundColor: "black", color: 'white', fontWeight: 'bold' }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ cursor: 'pointer',backgroundColor: 'white' }}>
                        {filteredEvents.map((event) => (
                            <TableRow key={event._id}>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.speaker}</TableCell>
                                <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                                <TableCell>{event.time}</TableCell>
                                <TableCell>
                                    <Button variant="text" onClick={() => navigate(`/event/${event._id}`)}>
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ScheduleEvents;
