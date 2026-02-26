import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './PharmaButton.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonState = 'default' | 'hover' | 'focus' | 'pressed' | 'disabled';

export interface PharmaButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'children'> {
  /**
   * Visual style variant from Figma.
   * Available options: 'primary' | 'secondary' | 'tertiary'.
   * Default value: 'primary'.
   */
  variant?: ButtonVariant;

  /**
   * Interaction state from Figma.
   * Available options: 'default' | 'hover' | 'focus' | 'pressed' | 'disabled'.
   * Default value: 'default'.
   */
  state?: ButtonState;

  /**
   * Boolean convenience for disabled on/off behavior.
   * Available options: true | false.
   * Default value: false.
   */
  isDisabled?: boolean;

  /**
   * Button content.
   * Available options: any valid React node.
   * Default value: 'Button'.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names for custom styling.
   * Available options: any valid class name string.
   * Default value: undefined.
   */
  className?: string;
}

/**
 * Button component generated from Figma variants.
 */
export const PharmaButton = ({
  variant = 'primary',
  state = 'default',
  isDisabled = false,
  children = 'Button',
  className,
  type = 'button',
  ...props
}: PharmaButtonProps) => {
  const resolvedState: ButtonState = isDisabled ? 'disabled' : state;
  const classes = [
    'pharma-button',
    `pharma-button--${variant}`,
    `pharma-button--${resolvedState}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={resolvedState === 'disabled'}
      aria-disabled={resolvedState === 'disabled'}
      {...props}
    >
      <span className="pharma-button__label">{children}</span>
    </button>
  );
};

export default PharmaButton;
