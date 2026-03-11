import { useId, useState } from 'react';
import type { HTMLAttributes, SelectHTMLAttributes } from 'react';
import './PharmaDropdown.css';

export type DropdownState =
  | 'default'
  | 'hover'
  | 'pressed'
  | 'focused'
  | 'disabled'
  | 'error';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface PharmaDropdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Visual interaction state from Figma.
   * Available options: 'default' | 'hover' | 'pressed' | 'focused' | 'disabled' | 'error'.
   * Default value: 'default'.
   */
  state?: DropdownState;

  /**
   * Controls visibility of the helper or error message below the field.
   * Maps to Figma variant "Show Message".
   * Available options: true | false.
   * Default value: true.
   */
  showMessage?: boolean;

  /**
   * Boolean convenience for disabled on/off behavior.
   * When true, overrides state to 'disabled'.
   * Available options: true | false.
   * Default value: false.
   */
  isDisabled?: boolean;

  /**
   * Text rendered in the label above the field.
   * Available options: any string.
   * Default value: 'Label'.
   */
  labelText?: string;

  /**
   * Text rendered as the unselectable placeholder option.
   * Available options: any string.
   * Default value: 'Placeholder'.
   */
  placeholderText?: string;

  /**
   * Text rendered below the field. Shown as helper text in non-error states,
   * and as error text in the 'error' state.
   * Available options: any string.
   * Default value: 'Helper text'.
   */
  helperText?: string;

  /**
   * Additional CSS class names for custom styling.
   * Available options: any valid class name string.
   * Default value: undefined.
   */
  className?: string;

  /**
   * Array of options rendered inside the select element.
   * Available options: { value: string; label: string }[]
   * Default value: [].
   */
  options?: DropdownOption[];

  /**
   * Props forwarded directly to the underlying <select> element.
   * Available options: any valid select HTML attribute.
   * Default value: undefined.
   */
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>;
}

/**
 * Dropdown component generated from Figma variants.
 * Mirrors PharmaFormField visually and shares the same component tokens.
 */
export const PharmaDropdown = ({
  state = 'default',
  showMessage = true,
  isDisabled = false,
  labelText = 'Label',
  placeholderText = 'Select...',
  helperText = 'Helper text',
  className,
  options = [],
  selectProps,
  ...props
}: PharmaDropdownProps) => {
  const resolvedState: DropdownState = isDisabled ? 'disabled' : state;
  const isError = resolvedState === 'error';
  const isDisabledState = resolvedState === 'disabled';

  const uid = useId();
  const selectId = `${uid}-select`;
  const helperId = `${uid}-helper`;

  // Track whether a real option (not the placeholder) is selected.
  // Supports both controlled (selectProps.value) and uncontrolled usage.
  const isControlled = selectProps !== undefined && 'value' in selectProps;
  const [internalHasValue, setInternalHasValue] = useState(
    Boolean(selectProps?.defaultValue)
  );
  const hasValue = isControlled
    ? Boolean(selectProps!.value)
    : internalHasValue;

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!isControlled) {
      setInternalHasValue(e.target.value !== '');
    }
    selectProps?.onChange?.(e);
  };

  const rootClasses = [
    'pharma-dropdown',
    `pharma-dropdown--${resolvedState}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const selectClasses = [
    'pharma-dropdown__select',
    !hasValue ? 'pharma-dropdown__select--empty' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} {...props}>
      <label className="pharma-dropdown__label" htmlFor={selectId}>
        {labelText}
      </label>

      <div className="pharma-dropdown__select-wrapper">
        <select
          id={selectId}
          className={selectClasses}
          disabled={isDisabledState}
          aria-invalid={isError}
          aria-describedby={showMessage ? helperId : undefined}
          defaultValue={isControlled ? undefined : ''}
          {...selectProps}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            {placeholderText}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="pharma-dropdown__icon" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {showMessage && (
        <span
          id={helperId}
          className={
            isError ? 'pharma-dropdown__error' : 'pharma-dropdown__helper'
          }
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default PharmaDropdown;
