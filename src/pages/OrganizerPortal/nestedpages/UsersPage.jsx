import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const UsersPage = () => {
    // State to store the data and loading state
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API when the component mounts

    const getUsers = async () => {
        await axios.get('http://localhost:3000/api/user')
            .then(response => {
                if (response.data.status) {
                    setUsers(response.data.data); // Set user data in state
                    console.log(response.data.data); // Set user data in state
                }
            })
            .catch(error => {
                console.error('Error fetching the data: ', error);
            })
            .finally(() => {
                setLoading(false); // Stop loading after data is fetched
            });
    }
    useEffect(() => {
        getUsers()
    }, []);

    return (
        <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress style={{ display: 'block', margin: 'auto', padding: '20px' }} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    );

    
};

export default UsersPage;
