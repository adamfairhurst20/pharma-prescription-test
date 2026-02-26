import type { KeyboardEvent, HTMLAttributes } from 'react';
import './PharmaRadio.css';

export type RadioButtonState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'pressed'
  | 'indeterminate'
  | 'disabled';

export interface PharmaRadioProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Visual interaction state from Figma.
   * Available options: 'default' | 'hover' | 'focus' | 'pressed' | 'indeterminate' | 'disabled'.
   * Default value: 'default'.
   */
  state?: RadioButtonState;

  /**
   * Label visibility on/off state.
   * Available options: true | false.
   * Default value: true.
   */
  label?: boolean;

  /**
   * Description visibility on/off state.
   * Available options: true | false.
   * Default value: false.
   */
  description?: boolean;

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
   * Description content rendered when description is visible.
   * Available options: any string.
   * Default value: 'Description'.
   */
  descriptionText?: string;

  /**
   * Additional CSS class names for custom styling.
   * Available options: any valid class name string.
   * Default value: undefined.
   */
  className?: string;
}

/**
 * Radio + Text component generated from Figma variants.
 */
export const PharmaRadio = ({
  state = 'default',
  label = true,
  description = false,
  isDisabled = false,
  labelText = 'Label',
  descriptionText = 'Description',
  className,
  tabIndex,
  onClick,
  onKeyDown,
  ...props
}: PharmaRadioProps) => {
  const resolvedState: RadioButtonState = isDisabled ? 'disabled' : state;
  const showLabel = label;
  const showDescription = description;
  const isPressed = resolvedState === 'pressed';
  const isIndeterminate = resolvedState === 'indeterminate';
  const isDisabledState = resolvedState === 'disabled';
  const resolvedTabIndex = isDisabledState ? -1 : (tabIndex ?? 0);

  const rootClasses = [
    'pharma-radio',
    `pharma-radio--${resolvedState}`,
    showLabel ? 'pharma-radio--label-visible' : 'pharma-radio--label-hidden',
    showDescription
      ? 'pharma-radio--description-visible'
      : 'pharma-radio--description-hidden',
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
      role="radio"
      tabIndex={resolvedTabIndex}
      aria-disabled={isDisabledState}
      aria-checked={isPressed}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="pharma-radio__control" aria-hidden="true">
        {isPressed ? <span className="pharma-radio__dot" /> : null}
        {isIndeterminate ? <span className="pharma-radio__minus" /> : null}
      </span>

      {showLabel ? (
        <span className="pharma-radio__text">
          <span className="pharma-radio__label">{labelText}</span>
          {showDescription ? (
            <span className="pharma-radio__description">{descriptionText}</span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
};
export default PharmaRadio;
