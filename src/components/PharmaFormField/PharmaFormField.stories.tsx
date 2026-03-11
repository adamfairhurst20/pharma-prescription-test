import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { PharmaFormField } from './PharmaFormField';
import type { FormFieldState } from './PharmaFormField';

const states: FormFieldState[] = [
  'default',
  'hover',
  'pressed',
  'focused',
  'disabled',
  'error',
];

const meta = {
  title: 'Components/PharmaFormField',
  component: PharmaFormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    state: 'default',
    showMessage: true,
    isDisabled: false,
    labelText: 'Label',
    placeholderText: 'Placeholder',
    helperText: 'Helper text',
    onClick: fn(),
  },
  argTypes: {
    state: {
      control: 'select',
      options: states,
    },
    showMessage: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof PharmaFormField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Per-state stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: { state: 'default' },
  play: async ({ canvasElement, args }) => {
    const wrapper = canvasElement.querySelector('.pharma-form-field') as HTMLElement;
    const input = canvasElement.querySelector('.pharma-form-field__input') as HTMLInputElement;

    // Click fires the wrapper onClick handler
    await userEvent.click(wrapper);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Input receives focus on click
    await expect(input).toHaveFocus();

    // Keyboard: type text into the input
    await userEvent.type(input, 'Amoxicillin');
    await expect(input).toHaveValue('Amoxicillin');

    // Keyboard: Tab moves focus away
    await userEvent.tab();
    await expect(input).not.toHaveFocus();
  },
};

export const Hover: Story = {
  args: { state: 'hover' },
};

export const Pressed: Story = {
  args: { state: 'pressed' },
};

export const Focused: Story = {
  args: { state: 'focused' },
};

export const Disabled: Story = {
  args: { state: 'disabled', isDisabled: true },
};

export const Error: Story = {
  args: { state: 'error', helperText: 'This field is required' },
};

// ── Boolean state stories ────────────────────────────────────────────────────

export const WithHelperText: Story = {
  args: { showMessage: true },
};

export const WithoutHelperText: Story = {
  args: { showMessage: false },
};

export const IsDisabled: Story = {
  args: { isDisabled: true },
};

export const IsError: Story = {
  args: { state: 'error', helperText: 'Invalid prescription number' },
};

// ── All states side by side ───────────────────────────────────────────────────

export const AllStatesSideBySide: Story = {
  name: 'All states — side by side',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {states.map((state) => (
        <PharmaFormField key={state} {...args} state={state} isDisabled={state === 'disabled'} />
      ))}
    </div>
  ),
};

// ── AllVariants grid ─────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, max-content)',
        gap: '24px 32px',
        alignItems: 'flex-start',
      }}
    >
      {/* Row labels */}
      {['With helper text', 'Without helper text', 'Error message'].map((label) => (
        <span
          key={label}
          style={{
            gridColumn: 'span 3',
            fontFamily: 'sans-serif',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#7f869f',
            paddingTop: 8,
          }}
        >
          {label}
        </span>
      )).slice(0, 1)}

      {/* With helper text — all states */}
      {states.map((state) => (
        <div key={`${state}-helper`} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#7f869f' }}>{state}</span>
          <PharmaFormField
            {...args}
            state={state}
            isDisabled={state === 'disabled'}
            showMessage={true}
          />
        </div>
      ))}

      {/* Without helper text — all states */}
      {states.map((state) => (
        <div key={`${state}-no-helper`} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#7f869f' }}>{state} / no message</span>
          <PharmaFormField
            {...args}
            state={state}
            isDisabled={state === 'disabled'}
            showMessage={false}
          />
        </div>
      ))}

      {/* Error state with custom error messages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#7f869f' }}>error / required</span>
        <PharmaFormField {...args} state="error" helperText="This field is required" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#7f869f' }}>error / invalid format</span>
        <PharmaFormField {...args} state="error" helperText="Enter a valid prescription ID" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#7f869f' }}>error / no message</span>
        <PharmaFormField {...args} state="error" showMessage={false} />
      </div>
    </div>
  ),
};

// ── Edge cases ────────────────────────────────────────────────────────────────

export const LongTextLabel: Story = {
  args: {
    labelText: 'Enter the full name of the medication as listed on the prescription',
    placeholderText: 'e.g. Amoxicillin 500mg Capsules',
    helperText: 'Include strength and form as printed on the original prescription',
  },
};

export const InputTypes: Story = {
  name: 'Input types (email, password, number)',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PharmaFormField
        {...args}
        labelText="Email address"
        placeholderText="patient@example.com"
        helperText="Used for prescription notifications"
        inputProps={{ type: 'email' }}
      />
      <PharmaFormField
        {...args}
        labelText="Access code"
        placeholderText="••••••••"
        helperText="Provided by your pharmacist"
        inputProps={{ type: 'password' }}
      />
      <PharmaFormField
        {...args}
        labelText="Quantity"
        placeholderText="0"
        helperText="Number of units prescribed"
        inputProps={{ type: 'number', min: 1, max: 999 }}
      />
    </div>
  ),
};

export const InsideForm: Story = {
  name: 'Inside a form context',
  render: (args) => (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}
    >
      <PharmaFormField
        {...args}
        labelText="Patient name"
        placeholderText="Full name"
        helperText="As it appears on the prescription"
        inputProps={{ name: 'patientName', autoComplete: 'name' }}
      />
      <PharmaFormField
        {...args}
        labelText="Prescription ID"
        placeholderText="RX-000000"
        helperText="Found on your prescription slip"
        inputProps={{ name: 'prescriptionId' }}
      />
      <PharmaFormField
        {...args}
        state="error"
        labelText="Date of birth"
        placeholderText="DD/MM/YYYY"
        helperText="Date format is invalid"
        inputProps={{ name: 'dob', autoComplete: 'bday' }}
      />
      <button
        type="submit"
        style={{
          alignSelf: 'flex-start',
          padding: '10px 20px',
          borderRadius: 4,
          border: 'none',
          background: '#261db6',
          color: '#fff',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
        }}
      >
        Submit prescription
      </button>
    </form>
  ),
};
