// import * as React from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Media, Player, controls } from 'react-media-player';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const drawerWidth = 240;
const { PlayPause, CurrentTime, Progress, SeekBar, Duration, MuteUnmute, Volume, Fullscreen } = controls;
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  const staticContent = [
    { title: 'Adarsh Nagar Police Station', categories: ['Adarsh Nagar'],videoSource:process.env.PUBLIC_URL + '/1.mp4' },
    { title: 'Jawahar Nagar Police Station', categories: ['Adarsh Nagar'],videoSource:process.env.PUBLIC_URL + '/2.mp4' },
    { title: 'Transport Nagar Police Station', categories: ['Adarsh Nagar'],videoSource:process.env.PUBLIC_URL + '/3.mp4' },
    { title: 'Gandhi Nagar Police Station', categories: ['Gandhi Nagar'],videoSource:process.env.PUBLIC_URL + '/4.mp4' },
    { title: 'Moti Dungari Police Station', categories: ['Gandhi Nagar'],videoSource:process.env.PUBLIC_URL + '/3.mp4' },
    { title: 'Mahila Thana East Police Station', categories: ['Gandhi Nagar'],videoSource:process.env.PUBLIC_URL + '/1.mp4' },
    { title: 'Kotwali Police Station', categories: ['Kotwali'] ,videoSource:process.env.PUBLIC_URL + '/2.mp4'},
    { title: 'Sanjay Circle Police Station', categories: ['Kotwali'],videoSource:process.env.PUBLIC_URL + '/4.mp4'},
    { title: 'Nahagarh Police Station', categories: ['Kotwali'],videoSource:process.env.PUBLIC_URL + '/3.mp4' },
    { title: 'Chomu Police Station', categories: ['Chomu'] ,videoSource:process.env.PUBLIC_URL + '/1.mp4'},
    { title: 'Harmara Police Station', categories: ['Chomu'],videoSource:process.env.PUBLIC_URL + '/2.mp4' },
    { title: 'Vishwakarma Police Station', categories: ['Chomu'],videoSource:process.env.PUBLIC_URL + '/4.mp4' },
    // Add more items as needed
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const allCategories = [...new Set(staticContent.flatMap(item => item.categories))];
  const [selectedCategories, setSelectedCategories] = useState(allCategories);

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredContent = staticContent.filter(item =>
    selectedCategories.every(category => item.categories.includes(category))
  );
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
        <center>
            <h1>Filter</h1>
        </center>
      <List >
      {allCategories.map((category, index) => (
        <ListItem key={index} disablePadding style={{backgroundColor:"white"}} >
            <ListItemButton>
              {/* <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              {/* </ListItemIcon> */} 
              {/* <ListItemText primary={text} /> */}
        <label key={index}style={{color:"black"}}>
          <input
            type="checkbox"
            value={category}
            
            checked={selectedCategories.includes(category)}
            onChange={() => handleCheckboxChange(category)}
          />
          {category}
        </label>
            </ListItemButton>
          </ListItem>
      ))}
      </List>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
//   const videoSource = process.env.PUBLIC_URL + '/ak47.mp4';
  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {/* <MenuIcon style={{position:'fixed'}}/> */}
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{position:'fixed'}}>
            Hackathon
          </Typography>
          <Search style={{marginLeft: '700px'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button color="inherit" style={{marginLeft: '75%', position:'fixed'}}>Login</Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
        sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box>
      <Box sx={{ width: '80%' }} style={{marginLeft:'18%',marginTop:'-80px'}}>
      <Grid container rowSpacing={1}>
      {filteredContent.map((item, index) => (
        <Grid item xs={6} key={index}>
          <Item>
          <Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={item.videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls" style={{display:"flex",justifyContent:"space-around"}}>
            <h3>{item.title}</h3>
                  <Fullscreen />
                </div>
              </div>
            </Media>
            </Item>
        </Grid>
      ))}
        {/* <Grid item xs={6}>
        <Item><Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls">
                  <Fullscreen />
                </div>
              </div>
            </Media></Item>
        </Grid>
        <Grid item xs={6}>
        <Item><Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls">
                  <Fullscreen />
                </div>
              </div>
            </Media></Item>
        </Grid>
        <Grid item xs={6}>
        <Item><Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls">
                  <Fullscreen />
                </div>
              </div>
            </Media></Item>
        </Grid>
        <Grid item xs={6}>
        <Item><Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls">
                  <Fullscreen />
                </div>
              </div>
            </Media></Item>
        </Grid>
        <Grid item xs={6}>
        <Item><Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls">
                  <Fullscreen />
                </div>
              </div>
            </Media></Item>
        </Grid>
        <Grid item xs={6}>
        <Item><Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls">
                  <Fullscreen />
                </div>
              </div>
            </Media></Item>
        </Grid>
        <Grid item xs={6}>
        <Item><Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls">
                  <Fullscreen />
                </div>
              </div>
            </Media></Item>
        </Grid>
        <Grid item xs={6}>
        <Item><Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls">
                  <Fullscreen />
                </div>
              </div>
            </Media></Item>
        </Grid>
        <Grid item xs={6}>
        <Item><Media>
              <div className="media">
                <div className="media-player">
                  <Player
                  width="100%"
                    src={videoSource}
                    autoPlay
                  />
                </div>
                <div className="media-controls">
                  <Fullscreen />
                </div>
              </div>
            </Media></Item>
        </Grid> */}
      </Grid>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;