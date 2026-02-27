import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent } from 'storybook/test';

import { PharmaCheckbox } from './PharmaCheckbox';
import type { CheckboxButtonState } from './PharmaCheckbox';

const states: CheckboxButtonState[] = ['default', 'hover', 'focus', 'pressed', 'disabled'];

const meta = {
  title: 'Components/PharmaCheckbox',
  component: PharmaCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    state: 'default',
    label: true,
    isChecked: false,
    isDisabled: false,
    labelText: 'Label',
    tabIndex: 0,
    onClick: fn(),
    onKeyDown: fn(),
  },
  argTypes: {
    state: {
      control: 'select',
      options: states,
    },
    label: {
      control: 'boolean',
    },
    isChecked: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof PharmaCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [{ isChecked }, updateArgs] = useArgs<typeof args>();
    const checked = isChecked || args.state === 'pressed';

    return (
      <PharmaCheckbox
        {...args}
        state={checked ? 'pressed' : 'default'}
        isChecked={checked}
        onClick={(event) => {
          args.onClick?.(event);
          updateArgs({ isChecked: !checked });
        }}
      />
    );
  },
  play: async ({ canvasElement, args }) => {
    const checkbox = canvasElement.querySelector('.pharma-checkbox') as HTMLElement;

    await userEvent.click(checkbox);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(checkbox).toHaveAttribute('aria-checked', 'true');

    checkbox.focus();
    await expect(checkbox).toHaveFocus();
  },
};

export const NoLabel: Story = {
  args: {
    label: false,
  },
};

export const States: Story = {
  name: 'Checkbox states',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {states.map((state) => (
        <PharmaCheckbox key={state} {...args} state={state} label={true} />
      ))}
    </div>
  ),
};

export const LabelToggle: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <PharmaCheckbox {...args} label={false} />
      <PharmaCheckbox {...args} label={true} />
    </div>
  ),
};
