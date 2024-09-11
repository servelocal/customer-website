'use client';
import { ButtonProps } from './Button.types';
import { StyledButton } from './Button.styles';

const Button = ({ children, $variant = 'primary', ...props }: ButtonProps) => {
  return (
    <StyledButton $variant={$variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
