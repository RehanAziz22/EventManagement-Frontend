import React, { useEffect, useState } from 'react';
import OrganizerDashboard from './pages/OrganizerPortal/OrganizerDashboard';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ExhibitorDashboard from './pages/ExhibitorPortal/ExhibitorDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/AttendeePortal/Home';
import EventExpos from './pages/AttendeePortal/EventExpos';
import EventDetails from './pages/AttendeePortal/EventDetails';
import AttendeePage from './pages/AttendeePortal/AttendeePage';
import ScheduleEvents from './pages/AttendeePortal/ScheduledEvents';
import ExhibitorSearch from './pages/AttendeePortal/ExhibitorSearch';
import ProfilePage from './pages/AttendeePortal/ProfilePage';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const role = user?.role;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser || null);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: role === "attendee" || !user ? <AttendeePage /> : <Navigate to={`/${role}`}  />,
      children: [
        { path: "/", element: <Home /> },
        { path: '/event', element: <EventExpos /> },
        { path: '/event/:id', element: <EventDetails /> },
        { path: '/scheduledevents', element: <ScheduleEvents /> },
        { path: '/exhibitorsearch', element: <ExhibitorSearch /> },
        { path: '/profile', element: <ProfilePage /> },
      ]
    },
    { path: '/login', element: !user ? <LoginPage onLogin={(userData) => setUser(userData)} /> : <Navigate to="/" /> },
    { path: '/signup', element: !user ? <SignupPage /> : <Navigate to="/" /> },
    { path: '/organizer', element: role === "organizer" ? <OrganizerDashboard handleLogout={handleLogout} /> : <Navigate to="/" replace /> },
    { path: '/exhibitor', element: role === "exhibitor" ? <ExhibitorDashboard handleLogout={handleLogout}  user={user}/> : <Navigate to="/" replace /> }
  ]);

  return <RouterProvider router={router} />;
}
