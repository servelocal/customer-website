import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  className?: string;
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
  ...props
}: ButtonProps) {
  const buttonClass = `${styles.button} ${variants[variant]} ${className}`;

  return <button {...props} className={buttonClass}></button>;
}
