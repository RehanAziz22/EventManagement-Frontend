import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Typography } from '@mui/material';

const OrganizerSearch = ({router}) => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredExhibitors, setFilteredExhibitors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/expo')
            .then(response => {
                if (response.data.status) {
                    setEvents(response.data.data);
                    const allExhibitors = response.data.data.flatMap(event =>
                        event.exhibitorList.map(exhibitor => ({ ...exhibitor, booth: event.booth }))
                    );
                    setFilteredExhibitors(allExhibitors);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const allExhibitors = events.flatMap(event =>
            event.exhibitorList.map(exhibitor => ({ ...exhibitor, booth: event.booth }))
        );
        const filtered = allExhibitors.filter(exhibitor =>
            exhibitor.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredExhibitors(filtered);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Exhibitor Search and Interaction</Typography>
            <TextField
                label="Search Exhibitor"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                sx={{ marginBottom: 3 }}
            />

            {filteredExhibitors.length > 0 ? (
                <TableContainer component={Paper} sx={{ maxHeight: 500, overflowY: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                                <TableCell><b>Booth</b></TableCell>
                                <TableCell><b>Contact</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredExhibitors.map((exhibitor, index) => (
                                <TableRow key={index}>
                                    <TableCell>{exhibitor.name}</TableCell>
                                    <TableCell>{exhibitor.email}</TableCell>
                                    <TableCell>{exhibitor.booth}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            onClick={() => window.open(`mailto:${exhibitor.email}`)}
                                        >
                                            Email {exhibitor.name}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="h6" sx={{ marginTop: 3, textAlign: 'center' }}>
                    No results found.
                </Typography>
            )}
        </Box>
    );
};

export default OrganizerSearch;
