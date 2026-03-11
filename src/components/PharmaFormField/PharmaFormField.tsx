import { useId } from 'react';
import type { HTMLAttributes, InputHTMLAttributes } from 'react';
import './PharmaFormField.css';

export type FormFieldState =
  | 'default'
  | 'hover'
  | 'pressed'
  | 'focused'
  | 'disabled'
  | 'error';

export interface PharmaFormFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Visual interaction state from Figma.
   * Available options: 'default' | 'hover' | 'pressed' | 'focused' | 'disabled' | 'error'.
   * Default value: 'default'.
   */
  state?: FormFieldState;

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
   * Text rendered inside the field as a placeholder.
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
   * Props forwarded directly to the underlying <input> element.
   * Available options: any valid input HTML attribute.
   * Default value: undefined.
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

/**
 * Form field component generated from Figma variants.
 */
export const PharmaFormField = ({
  state = 'default',
  showMessage = true,
  isDisabled = false,
  labelText = 'Label',
  placeholderText = 'Placeholder',
  helperText = 'Helper text',
  className,
  inputProps,
  ...props
}: PharmaFormFieldProps) => {
  const resolvedState: FormFieldState = isDisabled ? 'disabled' : state;
  const isError = resolvedState === 'error';
  const isDisabledState = resolvedState === 'disabled';

  const uid = useId();
  const inputId = `${uid}-input`;
  const helperId = `${uid}-helper`;

  const rootClasses = [
    'pharma-form-field',
    `pharma-form-field--${resolvedState}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} {...props}>
      <label className="pharma-form-field__label" htmlFor={inputId}>
        {labelText}
      </label>

      <input
        id={inputId}
        className="pharma-form-field__input"
        placeholder={placeholderText}
        disabled={isDisabledState}
        aria-invalid={isError}
        aria-describedby={showMessage ? helperId : undefined}
        {...inputProps}
      />

      {showMessage && (
        <span
          id={helperId}
          className={
            isError
              ? 'pharma-form-field__error'
              : 'pharma-form-field__helper'
          }
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default PharmaFormField;
