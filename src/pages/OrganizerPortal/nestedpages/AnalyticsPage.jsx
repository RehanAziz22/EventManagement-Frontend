import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticsPage() {
  const [expoData, setExpoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    axios
      .get("http://localhost:3000/Api/expo")
      .then((response) => {
        if (response.data.status) {
          setExpoData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Prepare data for charts
  const attendeeCountData = expoData.map((event) => event.attendeeCount);
  const exhibitorCountData = expoData.map((event) => event.exhibitorCount);
  const eventTitles = expoData.map((event) => event.title);

  const attendeeChartData = {
    labels: eventTitles,
    datasets: [
      {
        label: "Attendee Count",
        data: attendeeCountData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const exhibitorChartData = {
    labels: eventTitles,
    datasets: [
      {
        label: "Exhibitor Count",
        data: exhibitorCountData,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Expo Analytics Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Attendee Count Analytics
            </Typography>
            <Bar data={attendeeChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Exhibitor Count Analytics
            </Typography>
            <Bar data={exhibitorChartData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AnalyticsPage;
