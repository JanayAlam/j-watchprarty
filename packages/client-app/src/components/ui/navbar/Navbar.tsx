import React, { useState } from 'react';
import { v4 as UUID } from 'uuid';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import styles from './navbar.module.css';
import icon from '../../../assets/logo.svg';
import DrawerComponent from './DrawerComponent';
import Button from '../../shared/atoms/button/Button';
import { Link as RouterLink } from 'react-router-dom';

const navButtonsObj = [
  {
    id: UUID(),
    label: 'Register',
    to: '/register',
    endIcon: undefined,
  },
  {
    id: UUID(),
    label: 'Login',
    to: '/login',
    endIcon: <LoginIcon />,
  },
];

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
              <Box
                className={styles.brandLogoContainer}
                component={RouterLink}
                to={'/'}
              >
                <img
                  src={icon}
                  alt={'Brand Logo'}
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
              <DrawerComponent navButtonsObj={navButtonsObj} />
            ) : (
              <Grid item sm={8} md={9} lg={10}>
                {isLoggedIn ? (
                  <Box className={styles.navAuthButtons}>
                    {navButtonsObj.map((btnObj) => (
                      <Button
                        key={btnObj.id}
                        endIcon={btnObj.endIcon ? btnObj.endIcon : undefined}
                        to={btnObj.to}
                        size={'small'}
                        label={btnObj.label}
                      />
                    ))}
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
