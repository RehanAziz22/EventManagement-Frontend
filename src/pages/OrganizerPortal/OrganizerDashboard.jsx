import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import CreateEventExpos from './nestedpages/CreateEventExpos';
import ScheduleManagment from './nestedpages/ScheduleManagment';
import EventExpos from './nestedpages/EventExpos';
import UsersPage from './nestedpages/UsersPage';
import EventDetails from './nestedpages/EventDetails';
import AnalyticsPage from './nestedpages/AnalyticsPage';
import ExhibitorRequestsPage from './nestedpages/ExhibitorRequestsPage';
import ExhibitorSearch from './nestedpages/ExhibitorSearch';
import { useNavigate } from 'react-router-dom';
import ChatPage from './nestedpages/ChatPage';
import { Badge, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'expomanagement',
    title: 'Expo Management',
    icon: <LayersIcon />,
    children: [
      {
        segment: 'createexpo',
        title: 'Create Expo',
        icon: <EditCalendarIcon />,
      },
      {
        segment: 'events',
        title: 'Events/Expos',
        icon: <EventIcon />,
      },
    ],
  },
  {
    segment: 'exhibitor',
    title: 'Exhibitor',
    icon: <LayersIcon />,
    children: [
      {
        segment: 'exhibitorrequests',
        title: 'Exhibitor Requests',
        icon: <HowToRegIcon />,
      },
      {
        segment: 'exhibitors',
        title: 'Exhibitors',
        icon: <PersonPinIcon />,
      },
    ],
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <GroupIcon />,
  },
  {
    segment: 'schedule',
    title: 'Schedule',
    icon: <ScheduleIcon />,
  },
  {
    segment: 'analytics',
    title: 'Analytics',
    icon: <BarChartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'User',
  },
  {
    segment: 'chats',
    title: 'Chats',
    icon: <ChatIcon />,
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    const params = {};
    const pathParts = pathname.split('/');

    if (pathParts[1] === 'expomanagement' && pathParts[2] === 'events' && pathParts[3]) {
      params.id = pathParts[3];
    }
    return {
      pathname,
      params,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function OrganizerDashboard(props) {
  const { window, children, handleLogout } = props;
  const router = useDemoRouter('/expomanagement');
  const navigate = useNavigate()
  const [expoData, setExpoData] = React.useState([]);
  const [exhibitorRequestsCount, setExhibitorRequestsCount] = React.useState(0);

  React.useEffect(() => {
    axios.get('http://localhost:3000/api/expo/')
      .then(response => {
        if (response.data.status) {
          setExpoData(response.data.data);
          console.log('Expo data fetched:', response.data.data);
        } else {
          console.error('Error fetching expo data');
        }
      })
      .catch(error => {
        console.error('Error fetching expo data:', error);
      });
  }, []);
  // const handleLogout = () => {
  //   localStorage.removeItem('user');
  //   navigate('/login');
  // };
  // Function to count total exhibitor requests
  const getExhibitorRequestsCount = () => {
    let totalRequests = 0;
    expoData.forEach(expo => {
      totalRequests += expo.exhibitorRequests.length; // Add the length of each exhibitorRequests array
    });
    return totalRequests;
  };

  React.useEffect(() => {
    const count = getExhibitorRequestsCount();
    setExhibitorRequestsCount(count);
    if (count > 0) {
      toast.success(`You have ${count} exhibitor requests to check.`);
    }
  }, [expoData]);
  const renderPage = () => {
    switch (router.pathname) {


      case '/expomanagement':
        return <EventExpos router={router} />;
      case '/expomanagement/createexpo':
        return <CreateEventExpos />;
      case '/expomanagement/events':
        return <EventExpos router={router} />;
      case `/expomanagement/events/${router.params.id}`:
        return <EventDetails router={router} />;
      case '/exhibitor/exhibitorrequests':
        return <ExhibitorRequestsPage />;
      case '/exhibitor/exhibitors':
        return <ExhibitorSearch />;
      case '/schedule':
        return <ScheduleManagment />;
      case '/users':
        return <UsersPage />;
      case '/analytics':
        return <AnalyticsPage />;
      case '/chats':
        return <ChatPage />;
      case '/logout':
        return handleLogout();
      default:
        return <div>Page Not Found</div>;
    }
  };

  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={
        {
          logo: <img src="logo.jpg" alt="MUI logo" />,
          title: '',
          homeUrl: "roommanagement"
        }}
    >
      <DashboardLayout>
        <PageContainer>
          {renderPage()}
          <Box sx={{ position: 'fixed', bottom: '30px', right: '40px', display: 'flex', alignItems: 'center' }}
          onClick={() => router.navigate('/exhibitor/exhibitorrequests')}
          style={{ display: router.pathname === '/chats' ? 'none' : 'flex' }}
          >
            
            <Badge
              badgeContent={getExhibitorRequestsCount()}
              color="error"
              sx={{
                // borderRadius: '50%',
                fontSize: '16px',
                // fontWeight: 'bold',
              }}
            >
              <HowToRegIcon sx={{fontSize:70,padding:1,border:"3px solid",borderRadius:"50%",backgroundColor:"green",color:"white"}} />
            </Badge>
          </Box>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
