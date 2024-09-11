import styled, { css } from 'styled-components';
import { ButtonProps } from './Button.types';

const baseStyle = css`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const primaryStyle = css`
  background-color: #0070f3;
  color: white;

  &:hover {
    background-color: #005bb5;
  }
`;

const secondaryStyle = css`
  background-color: #eaeaea;
  color: black;

  &:hover {
    background-color: #cacaca;
  }
`;

const successStyle = css`
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
`;

const dangerStyle = css`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

const warningStyle = css`
  background-color: #ffc107;
  color: black;

  &:hover {
    background-color: #e0a800;
  }
`;

const getVariantStyle = (variant: string = 'primary') => {
  switch (variant) {
    case 'primary':
      return primaryStyle;
    case 'secondary':
      return secondaryStyle;
    case 'success':
      return successStyle;
    case 'danger':
      return dangerStyle;
    case 'warning':
      return warningStyle;
    default:
      return primaryStyle;
  }
};

export const StyledButton = styled.button<ButtonProps>`
  ${baseStyle};
  ${(props) => getVariantStyle(props.$variant)};
`;
