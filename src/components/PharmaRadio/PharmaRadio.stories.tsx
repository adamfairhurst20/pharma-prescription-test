import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { PharmaRadio } from './PharmaRadio';
import type { RadioButtonState } from './PharmaRadio';

const states: RadioButtonState[] = [
  'default',
  'hover',
  'focus',
  'pressed',
  'indeterminate',
  'disabled',
];

const meta = {
  title: 'Components/PharmaRadio',
  component: PharmaRadio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    state: 'default',
    label: true,
    description: false,
    isDisabled: false,
    labelText: 'Label',
    descriptionText: 'Description',
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
    description: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof PharmaRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const radio = canvasElement.querySelector('.pharma-radio') as HTMLElement;

    await userEvent.click(radio);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    await userEvent.tab();
    await expect(radio).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(args.onKeyDown).toHaveBeenCalled();
  },
};

export const NoLabelNoDescription: Story = {
  args: {
    label: false,
    description: false,
  },
};

export const LabelOnly: Story = {
  args: {
    label: true,
    description: false,
  },
};

export const LabelAndDescription: Story = {
  args: {
    label: true,
    description: true,
  },
};

export const VariantsSideBySide: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <PharmaRadio {...args} label={false} description={false} />
      <PharmaRadio {...args} label={true} description={false} />
      <PharmaRadio {...args} label={true} description={true} />
    </div>
  ),
};

export const NoLabelNoDescriptionStates: Story = {
  name: 'No label/no description states',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {states.map((state) => (
        <PharmaRadio
          key={state}
          {...args}
          state={state}
          label={false}
          description={false}
        />
      ))}
    </div>
  ),
};

export const LabelOnlyStates: Story = {
  name: 'Label only states',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {states.map((state) => (
        <PharmaRadio
          key={state}
          {...args}
          state={state}
          label={true}
          description={false}
        />
      ))}
    </div>
  ),
};

export const LabelAndDescriptionStates: Story = {
  name: 'Label and description states',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {states.map((state) => (
        <PharmaRadio
          key={state}
          {...args}
          state={state}
          label={true}
          description={true}
        />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, max-content)',
        gap: 24,
        alignItems: 'flex-start',
      }}
    >
      {states.map((state) => (
        <PharmaRadio
          key={`${state}-none`}
          {...args}
          state={state}
          label={false}
          description={false}
        />
      ))}
      {states.map((state) => (
        <PharmaRadio
          key={`${state}-label`}
          {...args}
          state={state}
          label={true}
          description={false}
        />
      ))}
      {states.map((state) => (
        <PharmaRadio
          key={`${state}-description`}
          {...args}
          state={state}
          label={true}
          description={true}
        />
      ))}
    </div>
  ),
};

export const LongTextLabel: Story = {
  args: {
    label: true,
    description: false,
    labelText:
      'Review prescription details before final submission to the pharmacy team',
  },
};
