import React, { useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const DrawerComponent: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)} anchor={'top'}>
        <List>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText>Login</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText>Register</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        sx={{ marginLeft: 'auto' }}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
