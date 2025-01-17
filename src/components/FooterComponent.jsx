import React from "react";
import { Box, Typography, Grid, Link, IconButton, Toolbar } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import AnimationIcon from '@mui/icons-material/Animation';

const FooterComponent = () => {
    return (
        <Box
            sx={{
                backgroundColor: "black",
                color: "white",
                padding: "40px 20px",
                // mt: 5,
            }}
        >
            <Grid container spacing={3}>
                {/* Logo and Description */}
                <Grid item xs={12} sm={6} md={6}>
                    <Toolbar disableGutters>
                        <AnimationIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            EventSphere 
                        </Typography>
                    </Toolbar>
                    <Typography variant="body2">
                        Your one-stop shop for all your needs. Quality products at the best
                        prices.
                    </Typography>
                </Grid>

                {/* Navigation Links */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Quick Links
                    </Typography>
                    <Box>
                        <Link href="/" color="inherit" underline="none">
                            Home
                        </Link>
                    </Box>
                    <Box>
                        <Link href="/event" color="inherit" underline="none">
                            Products
                        </Link>
                    </Box>
                    <Box>
                        <Link href="/exhibitorsearch" color="inherit" underline="none">
                        Exhibitor
                        </Link>
                    </Box>
                    <Box>
                        <Link href="/scheduledevents" color="inherit" underline="none">
                        Scheduled Events
                        </Link>
                    </Box>
                </Grid>

                {/* Customer Support */}
                {/* <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Customer Service
                    </Typography>
                    <Box>
                        <Link href="/faq" color="inherit" underline="none">
                            FAQs
                        </Link>
                    </Box>
                    <Box>
                        <Link href="/returns" color="inherit" underline="none">
                            Return Policy
                        </Link>
                    </Box>
                    <Box>
                        <Link href="/shipping" color="inherit" underline="none">
                            Shipping Info
                        </Link>
                    </Box>
                </Grid> */}

                {/* Social Media Links */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Follow Us
                    </Typography>
                    <Box>
                        <IconButton
                            href="https://facebook.com"
                            color="inherit"
                            aria-label="Facebook"
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            href="https://twitter.com"
                            color="inherit"
                            aria-label="Twitter"
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            href="https://instagram.com"
                            color="inherit"
                            aria-label="Instagram"
                        >
                            <InstagramIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            {/* FooterComponent Bottom Section */}
            <Box textAlign="center" mt={4}>
                <Typography variant="body2" color="inherit">
                    © {new Date().getFullYear()} E-Commerce. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default FooterComponent;
