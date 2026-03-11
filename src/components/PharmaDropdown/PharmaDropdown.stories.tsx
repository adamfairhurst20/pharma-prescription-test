import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { PharmaDropdown } from './PharmaDropdown';
import type { DropdownState } from './PharmaDropdown';

const states: DropdownState[] = [
  'default',
  'hover',
  'pressed',
  'focused',
  'disabled',
  'error',
];

const sampleOptions = [
  { value: 'amoxicillin', label: 'Amoxicillin 500mg' },
  { value: 'ibuprofen', label: 'Ibuprofen 400mg' },
  { value: 'paracetamol', label: 'Paracetamol 500mg' },
  { value: 'lisinopril', label: 'Lisinopril 10mg' },
];

const meta = {
  title: 'Components/PharmaDropdown',
  component: PharmaDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    state: 'default',
    showMessage: true,
    isDisabled: false,
    labelText: 'Label',
    placeholderText: 'Select...',
    helperText: 'Helper text',
    options: sampleOptions,
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
} satisfies Meta<typeof PharmaDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Per-state stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: { state: 'default' },
  play: async ({ canvasElement, args }) => {
    const wrapper = canvasElement.querySelector('.pharma-dropdown') as HTMLElement;
    const select = canvasElement.querySelector('.pharma-dropdown__select') as HTMLSelectElement;

    // Click fires the wrapper onClick handler
    await userEvent.click(wrapper);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Select receives focus on click
    await expect(select).toHaveFocus();

    // Tab moves focus away
    await userEvent.tab();
    await expect(select).not.toHaveFocus();
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
  args: { state: 'error', helperText: 'Please select a medication' },
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
  args: { state: 'error', helperText: 'Invalid selection' },
};

// ── All states side by side ───────────────────────────────────────────────────

export const AllStatesSideBySide: Story = {
  name: 'All states — side by side',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {states.map((state) => (
        <PharmaDropdown key={state} {...args} state={state} isDisabled={state === 'disabled'} />
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
      {/* With helper text — all states */}
      {states.map((state) => (
        <div key={`${state}-helper`} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#7f869f' }}>{state}</span>
          <PharmaDropdown
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
          <PharmaDropdown
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
        <PharmaDropdown {...args} state="error" helperText="Please select a medication" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#7f869f' }}>error / invalid</span>
        <PharmaDropdown {...args} state="error" helperText="Selection is not available" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#7f869f' }}>error / no message</span>
        <PharmaDropdown {...args} state="error" showMessage={false} />
      </div>
    </div>
  ),
};

// ── Edge cases ────────────────────────────────────────────────────────────────

export const WithSelectedValue: Story = {
  name: 'With a pre-selected value',
  args: {
    selectProps: { defaultValue: 'amoxicillin' },
  },
};

export const InsideForm: Story = {
  name: 'Inside a form context',
  render: (args) => (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}
    >
      <PharmaDropdown
        {...args}
        labelText="Medication"
        placeholderText="Select a medication"
        helperText="Choose from the approved formulary"
        options={sampleOptions}
        selectProps={{ name: 'medication' }}
      />
      <PharmaDropdown
        {...args}
        labelText="Dosage frequency"
        placeholderText="Select frequency"
        helperText="As directed by your prescriber"
        options={[
          { value: 'once', label: 'Once daily' },
          { value: 'twice', label: 'Twice daily' },
          { value: 'three', label: 'Three times daily' },
        ]}
        selectProps={{ name: 'frequency' }}
      />
      <PharmaDropdown
        {...args}
        state="error"
        labelText="Prescriber"
        placeholderText="Select prescriber"
        helperText="Please select a prescriber"
        options={[
          { value: 'dr-smith', label: 'Dr. Smith' },
          { value: 'dr-jones', label: 'Dr. Jones' },
        ]}
        selectProps={{ name: 'prescriber' }}
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
