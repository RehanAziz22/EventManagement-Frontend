import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterExpo = ({ router }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const{name, email} = user
    const [formData, setFormData] = useState({
        companyName: '',
        productsServices: '',
        documents: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/expo/exporegisterrequest', {
                expoId: router.params.id,
                name,
                email,
                ...formData
            });

            console.log(response.data);
            if (response.data.status) {
                toast.success('Expo registration request submitted successfully!')
                router.navigate('/expos');
            } else {
                toast.error('Failed to submit registration request.');
            }
        } catch (error) {
            alert('Error submitting the request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center">
            <Card sx={{ maxWidth: 500, mt: 5 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Register for Expo
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Products/Services"
                            name="productsServices"
                            value={formData.productsServices}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Required Documents (Links or Descriptions)"
                            name="documents"
                            value={formData.documents}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? 'Submitting...' : 'Submit Registration'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default RegisterExpo;
