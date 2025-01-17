import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuItem, Select, Button, Grid, Typography, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const ScheduleManagment = () => {
  const [expos, setExpos] = useState([]);
  const [selectedExpo, setSelectedExpo] = useState('');
  const [selectedExpoData, setSelectedExpoData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    speaker: '',
    location: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/expo')
      .then(response => {
        if (response.data.status) {
          setExpos(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching expos: ", error));
  }, []);

  const handleChange = (event) => {
    setSelectedExpo(event.target.value);
  };

  const handleSearch = () => {
    if (selectedExpo) {
      const expo = expos.find(expo => expo._id === selectedExpo);
      setSelectedExpoData(expo);
      setFormData({
        title: expo.title,
        date: expo.date.split('T')[0],
        time: expo.time,
        speaker: expo.speaker,
        location: expo.location,
      });
    } else {
      console.log("No expo selected");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    if (!selectedExpo) {
      console.error("No expo selected for update.");
      return;
    }

    console.log(selectedExpoData._id);
    axios.post(`http://localhost:3000/api/expo/schedule/${selectedExpoData._id}`, formData)
      .then(response => {
        console.log("Update response:", response.data);
        toast("Expo details updated successfully!");
        setSelectedExpoData(null);
      })
      .catch(error => {
        console.error("Error updating expo:", error);
        alert("Failed to update expo details.");
      });
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h5" align="center">Expo Search</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Select
          value={selectedExpo}
          onChange={handleChange}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>Select an Expo</MenuItem>
          {expos.map(expo => (
            <MenuItem key={expo._id} value={expo._id}>
              {expo.title}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} md={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>

      {selectedExpoData && (
        <Grid item xs={12}>
          <Typography variant="h6">Update Expo Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Time"
                name="time"
                  type="time"
                value={formData.time}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Speaker"
                name="speaker"
                value={formData.speaker}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ScheduleManagment;