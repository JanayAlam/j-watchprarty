import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import styles from './button.module.css';
import { Link as RouterLink } from 'react-router-dom';

interface ButtonProps extends MuiButtonProps {
  label: React.ReactNode;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({ label, to = null, ...rest }) => {
  const linkProps = {
    to: to ? to : undefined,
    component: to ? RouterLink : undefined,
  };

  rest.sx = {
    px: 2,
    ...rest.sx,
  };

  return (
    <MuiButton className={styles.buttonComponent} {...linkProps} {...rest}>
      {label}
    </MuiButton>
  );
};

export default Button;
