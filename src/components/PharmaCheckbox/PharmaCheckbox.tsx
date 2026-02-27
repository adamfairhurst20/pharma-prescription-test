import type { KeyboardEvent, HTMLAttributes } from 'react';
import './PharmaCheckbox.css';

export type CheckboxButtonState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'pressed'
  | 'disabled';

export interface PharmaCheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Visual interaction state from Figma.
   * Available options: 'default' | 'hover' | 'focus' | 'pressed' | 'disabled'.
   * Default value: 'default'.
   */
  state?: CheckboxButtonState;

  /**
   * Label visibility on/off state.
   * Available options: true | false.
   * Default value: true.
   */
  label?: boolean;

  /**
   * Boolean convenience for checked on/off behavior.
   * Available options: true | false.
   * Default value: false.
   */
  isChecked?: boolean;

  /**
   * Boolean convenience for disabled on/off behavior.
   * Available options: true | false.
   * Default value: false.
   */
  isDisabled?: boolean;

  /**
   * Label content rendered when label is visible.
   * Available options: any string.
   * Default value: 'Label'.
   */
  labelText?: string;

  /**
   * Additional CSS class names for custom styling.
   * Available options: any valid class name string.
   * Default value: undefined.
   */
  className?: string;
}

/**
 * Checkbox component generated from Figma variants.
 */
export const PharmaCheckbox = ({
  state = 'default',
  label = true,
  isChecked = false,
  isDisabled = false,
  labelText = 'Label',
  className,
  tabIndex,
  onClick,
  onKeyDown,
  ...props
}: PharmaCheckboxProps) => {
  const resolvedState: CheckboxButtonState = isDisabled ? 'disabled' : state;
  const showLabel = label;
  const isPressed = resolvedState === 'pressed';
  const isDisabledState = resolvedState === 'disabled';
  const isCheckedState = isPressed || isChecked;
  const resolvedTabIndex = isDisabledState ? -1 : (tabIndex ?? 0);

  const rootClasses = [
    'pharma-checkbox',
    `pharma-checkbox--${resolvedState}`,
    showLabel ? 'pharma-checkbox--label-visible' : 'pharma-checkbox--label-hidden',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);

    if (isDisabledState) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <div
      className={rootClasses}
      role="checkbox"
      tabIndex={resolvedTabIndex}
      aria-disabled={isDisabledState}
      aria-checked={isCheckedState}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="pharma-checkbox__control" aria-hidden="true">
        {isCheckedState ? <span className="pharma-checkbox__check" /> : null}
      </span>

      {showLabel ? <span className="pharma-checkbox__label">{labelText}</span> : null}
    </div>
  );
};

export default PharmaCheckbox;
