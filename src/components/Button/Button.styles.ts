import styled, { css } from 'styled-components';
// import { ButtonProps } from './Button.types';

const baseStyle = css`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const variantStyles = {
  primary: css`
    background-color: #0070f3;
    color: white;

    &:hover {
      background-color: #005bb5;
    }
  `,
  secondary: css`
    background-color: #eaeaea;
    color: black;

    &:hover {
      background-color: #cacaca;
    }
  `,
  success: css`
    background-color: #28a745;
    color: white;

    &:hover {
      background-color: #218838;
    }
  `,
  danger: css`
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  `,
  warning: css`
    background-color: #ffc107;
    color: black;

    &:hover {
      background-color: #e0a800;
    }
  `,
};

export const StyledButton = styled.button<ButtonProps>`
  ${baseStyle};
  ${({ $variant = 'primary' }) => variantStyles[$variant]}
`;
