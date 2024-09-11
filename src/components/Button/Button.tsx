import { ButtonProps } from './Button.types';
import { StyledButton } from './Button.styles';

const Button = ({ children, $variant = 'primary', ...props }: ButtonProps) => {
  return (
    <StyledButton $variant={$variant || 'primary'} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
