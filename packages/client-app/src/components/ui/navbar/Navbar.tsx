import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './navbar.module.css';
import icon from '../../../assets/logo.svg';
import DrawerComponent from './DrawerComponent';
import { useTheme, useMediaQuery } from '@mui/material';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const smallSizeScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position={'sticky'} color={'inherit'} className={styles.navAppBar}>
      <Toolbar>
        <Container maxWidth={'xl'}>
          <Grid container>
            <Grid item sm={4} md={3} lg={2}>
              <Box className={styles.brandLogoContainer}>
                <img
                  src={icon}
                  alt="Brand Logo"
                  className={styles.brandLogoImage}
                />
                <Typography
                  variant={'h6'}
                  component={'div'}
                  noWrap
                  className={styles.brandLogoText}
                >
                  J Watchparty
                </Typography>
              </Box>
            </Grid>
            {smallSizeScreen ? (
              <DrawerComponent />
            ) : (
              <Grid item sm={8} md={9} lg={10}>
                {isLoggedIn ? (
                  <Box className={styles.navAuthButtons}>
                    <Button variant={'text'} sx={{ px: 3 }}>
                      Register
                    </Button>
                    <Button variant={'contained'} sx={{ px: 3 }}>
                      Login
                    </Button>
                  </Box>
                ) : (
                  <Box>LoggedIn</Box>
                )}
              </Grid>
            )}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
