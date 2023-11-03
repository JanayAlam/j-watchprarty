import React, { useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

interface NavButtonObjectProps {
  id: string;
  label: string;
  to: string;
  endIcon: React.ReactNode;
}

interface DrawerComponentProps {
  navButtonsObj: Array<NavButtonObjectProps>;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ navButtonsObj }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <>
      <Drawer open={open} onClose={closeModal} anchor={'top'}>
        <List>
          {navButtonsObj.map((btnObj) => {
            const linkProps = {
              to: btnObj.to ? btnObj.to : undefined,
              component: btnObj.to ? RouterLink : undefined,
            };
            return (
              <ListItemButton
                key={btnObj.id}
                sx={{ textAlign: 'center' }}
                {...linkProps}
                onClick={closeModal}
              >
                <ListItemText>{btnObj.label}</ListItemText>
              </ListItemButton>
            );
          })}
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
