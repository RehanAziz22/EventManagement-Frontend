import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  background-color: #000;
  color: #fff;
`;

const ProfilePage = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/api/user/676d053acab0e3e14699af53')
            .then(response => setUser(response.data.data))
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    return (
        <Container>
            <StyledCard>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar src={user.avatarUrl || 'https://static.vecteezy.com/system/resources/thumbnails/013/042/571/small/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg'} alt={user.name} sx={{ width: 200, height: 200, mb: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography sx={{color:"white"}} variant="body1" color="textSecondary">
                        Email: {user.email}
                    </Typography>
                    <Typography sx={{color:"white"}} variant="body1" color="textSecondary">
                        Role: {user.role}
                    </Typography>
                </Box>
            </StyledCard>
        </Container>
    );
};

export default ProfilePage;
