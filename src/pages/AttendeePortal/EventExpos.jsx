import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';

const EventExpos = () => {
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

  return (
    <Grid container spacing={3} justifyContent="center">
      {events.map(event => (
        <Grid item xs={12} sm={6} md={4} key={event._id}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow: 3, borderRadius: 3 }}>
            {/* Left: Image */}
            <CardMedia
              component="img"
              sx={{ width: '100%', height: 200, borderRadius: 2, objectFit: 'cover' }}
              image={event?.imgUrl}
              alt={event.title}
            />

            {/* Center: Details */}
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                {event.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                📅 Date: {new Date(event.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                📍 Location: {event.location}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                🎤 Speaker: {event.speaker}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                🏢 Booth: {event.booth}
              </Typography>
            </CardContent>

            {/* Show Event Details Button */}
            <Box sx={{ padding: 1, width: '100%' }}>
              <Button 
                variant="contained" 
                sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'grey.800' } }}
                onClick={() => navigate(`/event/${event._id}`)}
                fullWidth
              >
                Show Event Details
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventExpos;
