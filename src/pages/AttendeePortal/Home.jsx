import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import FooterComponent from "../../components/FooterComponent";
import NavbarComponent from "../../components/NavbarComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Avatar } from "@mui/material";

import "swiper/swiper-bundle.css"; // Import Swiper styles

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: "url('https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHxldmVudCUyMGltZ3xlbnwwfHwwfHx8MA%3D%3D')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(4),
}));

const IntroSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(8, 4),
  gap: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

// Styled components
const FeedbackSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 4),
  textAlign: "center",
  backgroundColor: "#f4f4f4",
}));

const ServicesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 4),
  textAlign: "center",
  backgroundColor: "#212121",
}));

const ContactUsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 4),
  textAlign: "center",
}));

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [feedbacks, setFeedbacks] = useState([]);

  console.log(user);
  // State to hold form data
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    message: "",
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const submitfeedback = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (!user) {
      navigate('/login')
    } else {

      try {
        const response = await axios.post("http://localhost:3000/api/feedback/create", formData);
        console.log(response)
        if (response.data.status) {
          toast.success("Feedback submitted successfully");
          setFormData({
            name: "",
            email: "",
            message: "",
          }); // Reset form after successful submission
        }
      } catch (error) {
        console.error("Error submitting feedback", error);
        alert("Error submitting feedback");
      }
    }
  };

  useEffect(() => {
    // Fetch feedbacks from the API on component mount
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/feedback");
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection sx={{ marginTop: -20 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to EventSphere
        </Typography>
        <Typography variant="h5" gutterBottom>
          Your gateway to unforgettable events and seamless planning.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: "linear-gradient(to right, black, maroon)",
            marginTop: 2,
            color: "white",
            "&:hover": {
              background: "linear-gradient(to right, maroon, black)",
            },
          }}
          onClick={()=>navigate('/event')}
        >
          Book Now
        </Button>
      </HeroSection>

      {/* Intro Section */}
      <IntroSection>
        <Box
          component="img"
          src="/memories.jpg"
          alt="Event Image"
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            Crafting Memorable Experiences
          </Typography>
          <Typography variant="body1">
            At EventSphere, we don’t just organize events—we create
            unforgettable moments...
          </Typography>
        </Box>
      </IntroSection>

      {/* Services Section */}
      <ServicesSection>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
  Our Event Services
</Typography>

  <Grid container spacing={4} justifyContent="center">
    {/* Event Planning */}
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={3}>
        <CardContent>
          <Box component="img" 
               src="/Eventplaning.avif" 
               alt="Event Planning" 
               sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 1 }} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Event Planning
          </Typography>
          <Typography variant="body2">
            We offer personalized event planning services to ensure your event is memorable and flawlessly executed.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    {/* Venue Management */}
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={3}>
        <CardContent>
          <Box component="img" 
               src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68" 
               alt="Venue Management" 
               sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 1 }} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Venue Management
          </Typography>
          <Typography variant="body2">
            From selecting the ideal venue to coordinating logistics, we handle it all to make your event perfect.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    {/* Catering & Hospitality */}
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={3}>
        <CardContent>
          <Box component="img" 
               src="/Catering.avif" 
               alt="Catering & Hospitality" 
               sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 1 }} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Catering 
          </Typography>
          <Typography variant="body2">
            Delight your guests with gourmet catering services and exceptional hospitality tailored to your event.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</ServicesSection>



      <Box>
        {/* Feedback Section */}
        <FeedbackSection>
          <Typography variant="h4" gutterBottom>
            User Feedbacks
          </Typography>

          {/* Swiper slider for displaying feedback */}
          <Swiper
            spaceBetween={30} // Space between slides
            slidesPerView={3} // Number of slides visible at once
            loop={true} // Infinite loop
            pagination={{ clickable: true }} // Enable pagination
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
              480: {
                slidesPerView: 1,
              },
            }}
          >
            {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback._id}>
            <Card elevation={3} sx={{ margin: "0 auto", maxWidth: 400 }}>
              <CardContent>
                {/* Avatar with a dummy image */}
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    marginBottom: 1,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  alt={feedback.name}
                  src="/profile.jpg" // Dummy Avatar URL
                />
                <Typography variant="h6" gutterBottom>
                  {feedback.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feedback.email}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  "{feedback.message}"
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          
            ))}
          </Swiper>
        </FeedbackSection>
      </Box>

      {/* Contact Us Section */}
      <ContactUsSection>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          Have questions or need assistance? We’d love to hear from you!
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
            margin: "auto",
          }}
          onSubmit={submitfeedback}
        >
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            required
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "maroon",
                },
              },
            }}
          />
          <TextField
            label="Your Email"
            variant="outlined"
            fullWidth
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "maroon",
                },
              },
            }}
          />
          <TextField
            label="Your Message"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "maroon",
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(to right, black, maroon)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(to right, maroon, black)",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </ContactUsSection>
    </Box>
  );
};

export default Home;
