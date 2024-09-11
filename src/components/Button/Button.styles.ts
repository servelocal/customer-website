'use client';
import styled from 'styled-components';
import { ButtonProps } from './Button';

const getBackgroundColor = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return '#0070f3';
    case 'secondary':
      return '#6c757d';
    case 'outline':
      return 'transparent';
    default:
      return 'transparent';
  }
};

const getColor = (variant: ButtonProps['variant']) => {
  return variant === 'outline' ? '#0070f3' : '#fff';
};

const getBorder = (variant: ButtonProps['variant']) => {
  return variant === 'outline' ? '2px solid #0070f3' : 'none';
};

const getHoverBackgroundColor = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return '#005bb5';
    case 'secondary':
      return '#5a6268';
    case 'outline':
      return '#0070f31a';
    default:
      return 'transparent';
  }
};

// Styled Button component
export const StyledButton = styled.button<ButtonProps>`
  display: inline-block;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.4rem 0.8rem';
      case 'large':
        return '0.8rem 1.6rem';
      default:
        return '0.6rem 1.2rem';
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.8rem';
      case 'large':
        return '1rem';
      default:
        return '0.9rem';
    }
  }};
  background-color: ${({ variant }) => getBackgroundColor(variant)};
  color: ${({ variant }) => getColor(variant)};
  border: ${({ variant }) => getBorder(variant)};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ variant, disabled }) =>
      !disabled && getHoverBackgroundColor(variant)};
    color: ${({ variant, disabled }) =>
      variant === 'outline' && !disabled ? '#005bb5' : undefined};
  }
`;
