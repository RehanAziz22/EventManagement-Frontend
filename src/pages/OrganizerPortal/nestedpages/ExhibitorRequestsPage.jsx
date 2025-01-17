import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const ExhibitorRequestsPage = () => {
  const [expoData, setExpoData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/expo/')
      .then(response => {
        if (response.data.status) {
          setExpoData(response.data.data);
        } else {
          console.error('Error fetching expo data');
        }
      })
      .catch(error => {
        console.error('Error fetching expo data:', error);
      });
  }, []);

  const handleApprove = async (expoId, exhibitorId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/expo/approve-exhibitor', {
        expoId,
        exhibitorRequestId: exhibitorId
      });

      if (response.status === 200) {
        toast.success('Exhibitor approved successfully!');
        setExpoData((prevData) =>
          prevData.map((expo) => {
            if (expo._id === expoId) {
              return {
                ...expo,
                exhibitorList: [...expo.exhibitorList, response.data.expo.exhibitorList.at(-1)],
                exhibitorRequests: expo.exhibitorRequests.filter((req) => req._id !== exhibitorId),
              };
            }
            return expo;
          })
        );
      } else {
        alert('Failed to approve the exhibitor');
      }
    } catch (error) {
      console.error('Error approving exhibitor:', error);
      alert('An error occurred while approving the exhibitor');
    }
  };

  const handleReject = async (expoId, exhibitorId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/expo/reject-exhibitor', {
        expoId,
        exhibitorRequestId: exhibitorId
      });

      if (response.status === 200) {
        toast.success('Exhibitor request rejected successfully!');
        setExpoData((prevData) =>
          prevData.map((expo) => {
            if (expo._id === expoId) {
              return {
                ...expo,
                exhibitorRequests: expo.exhibitorRequests.filter((req) => req._id !== exhibitorId),
              };
            }
            return expo;
          })
        );
      } else {
        alert('Failed to reject the exhibitor request');
      }
    } catch (error) {
      console.error('Error rejecting exhibitor request:', error);
      alert('An error occurred while rejecting the exhibitor request');
    }
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exhibitor Name</TableCell>
              <TableCell>Expo Name</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Products/Services</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expoData.map((expo) =>
              expo.exhibitorRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{expo.title}</TableCell>
                  <TableCell>{request.companyName}</TableCell>
                  <TableCell>{request.productsServices}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApprove(expo._id, request._id)}
                      style={{ marginRight: '10px' }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleReject(expo._id, request._id)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExhibitorRequestsPage;
