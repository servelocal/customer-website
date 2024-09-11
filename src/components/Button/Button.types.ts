export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}
