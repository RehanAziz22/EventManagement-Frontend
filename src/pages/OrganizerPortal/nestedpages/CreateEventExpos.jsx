import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, FormHelperText, Typography } from '@mui/material';
import axios from 'axios';

const CreateEventExpos = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    imgUrl: '',
    title: '',
    date: '',
    location: '',
    description: '',
    booth: '',
  });

  // State to hold error messages
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form
  const validate = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.imgUrl) newErrors.imgUrl = 'ImageUrl is required';
    if (!formData.booth) newErrors.booth = 'Booth role is required';
    else if (formData.booth < 1 || formData.booth > 10) newErrors.booth = 'Booth role must be between 1 and 10';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (validate()) {
      console.log('Form Data:', formData);
      await axios.post('http://localhost:3000/api/expo/create', formData)
        .then(response => {
          alert('Event data submitted successfully!');
        })
        .catch(error => console.error("Error fetching data: ", error));

    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {/* <Typography variant="h4" gutterBottom>
        Create Event
      </Typography> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
          </Grid>

          {/* Date */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="date"
              name="date"
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.date)}
              helperText={errors.date}
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              error={Boolean(errors.location)}
              helperText={errors.location}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="imgUrl"
              name="imgUrl"
              label="Image URL"
              multiline
              rows={4}
              value={formData.imgUrl}
              onChange={handleChange}
              error={Boolean(errors.imgUrl)}
              helperText={errors.imgUrl}
            />
          </Grid>

       

          {/* Booth Role */}
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.booth)}>
              <InputLabel id="booth">Booth Role</InputLabel>
              <Select
                labelId="booth"
                id="booth"
                name="booth"
                value={formData.booth}
                onChange={handleChange}
                label="Booth Role"
              >
                {[...Array(10)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
              {errors.booth && <FormHelperText>{errors.booth}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateEventExpos;