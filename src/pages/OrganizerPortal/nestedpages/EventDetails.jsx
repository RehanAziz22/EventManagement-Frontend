import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";

export default function EventDetails({ router }) {
  const { id } = router.params; // Access dynamic ID
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    imgUrl: "",
    description: "",  
    location: "",
    booth: "",
  });

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`http://localhost:3000/api/expo/${id}`)
      .then((response) => {
        if (response.data.status) {
          const data = response.data.data;
          setFormData({
            title: data.title,
            date: data.date.split("T")[0], // Extract date from ISO string
            imgUrl: data.imgUrl,
            description: data.description,
            location: data.location,
            booth: data.booth,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching expo data:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/api/expo/updateexpo/${id}`, formData)
      .then((response) => {
        console.log("Response:", response.data);
        if (response.status === 200) {
          console.log("Event updated successfully:", response.data.message);
          router.navigate('/expomanagement/events')
          // Optionally redirect or show success message
        } else {
          console.error("Failed to update event:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating event:", error.response?.data?.message || error.message);
      });
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Grid container spacing={2} maxWidth={600}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Update Event
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Booth"
            name="booth"
            value={formData.booth}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
          >
            Update Event
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}