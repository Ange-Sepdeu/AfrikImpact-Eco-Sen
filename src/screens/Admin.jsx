import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logoWithOutBackground from "../assets/logo_without.png"
import { Avatar, Tooltip } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FeedIcon from '@mui/icons-material/Feed';
import EventIcon from '@mui/icons-material/Event';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPublication from "../components/AdminPublication";
import AdminActualite from "../components/AdminActualite";
import AdminAgenda from "../components/AdminAgenda";
import AdminVideo from "../components/AdminVideo";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAuthToken, selectUserName, setSignOutState } from '../redux/app/app.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import {persistor} from "../redux/store/store";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Admin() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const username = useSelector(selectUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [activeTab, setActiveTab] = React.useState("Publication");
  const tabs = [
    {
      name:'Publication',
      icon: <NewspaperIcon />
    }, 
    {
      name:'Actualite',
      icon: <FeedIcon />
    }, 
    {
      name:'Agenda',
      icon: <EventIcon />
    }, 
    {
      name:'Videos',
      icon: <VideoLibraryIcon />
    }
  ]

  const handleLogOut = () => {
      dispatch(setSignOutState());
      persistor.purge();
      navigate("/connexion");
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="inherit" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logoWithOutBackground} alt="AfikImpact Logo" className='w-14 h-15' srcset="" />
          <div className='flex flex-row justify-between items-center cursor-pointer'>
            <Tooltip title={username}>
            <Avatar sx={{width:40, height:40, bgcolor: green[700], marginLeft: 5}}>{username ? username[0].toUpperCase():""}{username ? username[1].toUpperCase():""}</Avatar>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {tabs.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => setActiveTab(text.name) }
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: (activeTab==text.name ? "darkgreen":"grey"),
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 , color: (activeTab==text.name ? green[900]:grey[800]), fontWeight: 800 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            onClick={() => handleLogOut()}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="se deconnecter" sx={{ opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {activeTab==tabs[0].name && <AdminPublication />}
        {activeTab==tabs[1].name && <AdminActualite />}
        {activeTab==tabs[2].name && <AdminAgenda />}
        {activeTab==tabs[3].name && <AdminVideo />}
      </Box>
    </Box>
  );
}
