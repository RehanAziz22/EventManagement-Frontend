import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import EventExpos from './EventExpos';
import RegisterExpo from './RegisterExpo';
import OrganizerSearch from './OrganizerSearch';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';
import ContactlessIcon from '@mui/icons-material/Contactless';

// Dummy Components for Pages
const DashboardPage = () => <div>Dashboard Page</div>;




const NAVIGATION = [
 
  {
    kind: 'header',
    title: 'Exhibitpr Portal',
  },
  {
    segment: 'expos',
    title: 'Expos',
    icon: <EventIcon />,

  },

  {
    segment: 'contact',
    title: 'Contact',
    icon: <ContactlessIcon />,
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

    if (pathParts[1] === 'expos' && pathParts[2] === 'register') {
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

export default function ExhibitorDashboard(props) {
  const { window, children ,handleLogout } = props;

  const router = useDemoRouter('/expos');
  const navigate = useNavigate()
  
    // const handleLogout = () => {
    //   localStorage.removeItem('user');
    //   navigate('/login');
    // };

  // Map routes to components
  const renderPage = () => {
    switch (router.pathname) {
      case '/expos':
        return <EventExpos router={router} />;
      case '/contact':
        return <OrganizerSearch router={router} />;
      case `/expos/register/${router.params.id}`:
        return <RegisterExpo router={router} />;
        case '/logout':
          return handleLogout();
      default:
        return <div>Page Not Found</div>;
    }
  };

  // Remove this const when copying and pasting into your project.
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
          homeUrl:"expos"
         } }
    >
      <DashboardLayout>
        <PageContainer>
          {renderPage()}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}