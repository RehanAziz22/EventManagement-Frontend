import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, Grid, CardMedia, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent";
import NavbarComponent from "../../components/NavbarComponent";
import { toast } from "react-toastify";

export default function EventDetails({ router }) {
  const { id } = useParams(); // Access dynamic ID
  const navigate = useNavigate(); // Access the navigation object from props
  const [eventData, setEventData] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    // Fetch event data from the API
    axios
      .get(`http://localhost:3000/api/expo/${id}`)
      .then((response) => {
        if (response.data.status) {
          setEventData(response.data.data); // Store the event data in state
        }
      })
      .catch((error) => {
        console.error("Error fetching expo data:", error);
      });
  }, [id]);

  if (!eventData) return <Typography>Loading...</Typography>;

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
    <Box display="flex" justifyContent="center" mt={4} sx={{ height: "70vh", alignItems: "center" }}>
      <Grid container spacing={3} maxWidth={900}>
        {/* Left: Event Image */}
        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              borderRadius: 2,
            }}
            image={eventData.imgUrl}
            alt={eventData.title}
          />
        </Grid>

        {/* Right: Event Details */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            {eventData.title}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Date:</strong> {new Date(eventData.date).toLocaleDateString()}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Time:</strong> {eventData.time}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Location:</strong> {eventData.location}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Speaker:</strong> {eventData.speaker}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong> {eventData.description}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Booth:</strong> {eventData.booth}
          </Typography>

          <Box mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => registerEvent(eventData.id)} // Navigate to registration page
            >
              Register Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
