import styles from './Button.module.scss';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string; // Optional aria-label for better accessibility
}

const variants = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
};

export default function Button({
  variant = 'primary',
  className = '',
  icon,
  iconPosition = 'left',
  ariaLabel,
  children,
  ...props
}: ButtonProps) {
  const buttonClass = `${styles.button} ${variants[variant]} ${className}`;

  const renderContent = () => {
    const hasChildren = !!children;

    return (
      <>
        {icon && iconPosition === 'left' && (
          <span
            className={`${styles.icon} ${hasChildren ? styles.iconLeft : ''}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span
            className={`${styles.icon} ${hasChildren ? styles.iconRight : ''}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </>
    );
  };

  return (
    <button {...props} className={buttonClass} aria-label={ariaLabel}>
      {renderContent()}
    </button>
  );
}
