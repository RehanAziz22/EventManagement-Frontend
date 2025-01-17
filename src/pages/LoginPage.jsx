import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BackgroundVideo = styled("video")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
});

const FormWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: "auto",
  position: "relative",
  zIndex: 1,
  borderRadius: theme.shape.borderRadius,
}));

const LoginPage = ({onLogin}) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      await axios.post('http://localhost:3000/api/user/login', formData)
        .then(response => {
          if (response.data.status) {
            localStorage.setItem('user', JSON.stringify(response.data.data))
            setFormData({ email: "", password: "" });
            toast.success("Login successful!");
            onLogin(response.data.data);
            const { role } = response.data.data;
            if (role === "organizer") {
              navigate("/organizer");
            } else if (role === "exhibitor") {
              navigate("/exhibitor");
            } else {
              navigate("/");
            }
          } else {
            toast.error(response.data.message);
          }
        })
        .catch(error => console.error("Error fetching data: ", error));
    } else {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) =>
        toast.error(error)
      );
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <BackgroundVideo autoPlay loop muted>
        <source src={"/video.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      <FormWrapper
        sx={{ width: "400px", backgroundColor: "rgba(234, 234, 242, 0.7)" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button variant="contained" type="submit" size="large" fullWidth>
            Login
          </Button>
        </Box>
      </FormWrapper>
    </Box>
  );
};

export default LoginPage;
