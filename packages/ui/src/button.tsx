import { forwardRef, type ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger' | 'danger-solid' | 'link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primary,
  outline: styles.outline,
  ghost: styles.ghost,
  danger: styles.danger,
  'danger-solid': styles.dangerSolid,
  link: styles.link,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', className, type = 'button', ...rest },
  ref,
) {
  const classes = [styles.base, variantClass[variant], className].filter(Boolean).join(' ');
  return <button ref={ref} type={type} className={classes} {...rest} />;
});
