'use client';
import React, { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} size={size} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
