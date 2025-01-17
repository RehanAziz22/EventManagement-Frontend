import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EventExpos = ({router}) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:3000/api/expo')
      .then(response => {
        if (response.data.status) {
          setEvents(response.data.data); // Set events data into state
        }
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  // Delete Event
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/expo/${id}`);
      
      if (response.data.status) {
        console.log('Expo deleted successfully:', response.data.message);
        setEvents(events.filter(event => event._id !== id));
        // Handle success, e.g., refresh the list of expos
      } else {
        console.error('Failed to delete expo:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting expo:', error.response?.data?.message || error.message);
    }
  };

  return (
    <Grid container spacing={3} direction="column">
      {events.map(event => (
        <Grid item key={event._id}>
          <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            {/* Left: Image */}
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120, borderRadius: 2 }}
              image={event?.imgUrl}
              alt={event.title}
            />

            {/* Center: Details */}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div">
                {event.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {new Date(event.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Location: {event.location}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Speaker: {event.speaker}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Booth: {event.booth}
              </Typography>
            </CardContent>

            {/* Right: Buttons */}
            <Box>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ marginRight: 1 }} 
                onClick={() => router.navigate(`/expomanagement/events/${event._id}`)}
              >
                Edit
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventExpos;