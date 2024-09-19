// import { variants } from '@/lib/variants';
import styles from './Button.module.css';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  className?: string;
}

const variants = {
  primary: styles.primary,
  secondary: styles.secondary, // Ensure you have a default variant in the CSS module
};

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const buttonClass = `${styles.button} ${variants[variant]} ${className}`;

  return <button {...props} className={buttonClass}></button>;
}
