import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { PharmaButton } from './PharmaButton';

const meta = {
  title: 'Components/PharmaButton',
  component: PharmaButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    state: 'default',
    isDisabled: false,
    onClick: fn(),
  },
  argTypes: {
    children: {
      name: 'label',
      control: 'text',
      description: 'Button label text',
      table: {
        category: 'Content',
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'pressed', 'disabled'],
    },
  },
} satisfies Meta<typeof PharmaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryStates: Story = {
  name: 'Primary states',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <PharmaButton variant="primary" state="default">
        Default
      </PharmaButton>
      <PharmaButton variant="primary" state="hover">
        Hover
      </PharmaButton>
      <PharmaButton variant="primary" state="focus">
        Focus
      </PharmaButton>
      <PharmaButton variant="primary" state="pressed">
        Pressed
      </PharmaButton>
      <PharmaButton variant="primary" state="disabled">
        Disabled
      </PharmaButton>
    </div>
  ),
};

export const SecondaryStates: Story = {
  name: 'Secondary states',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <PharmaButton variant="secondary" state="default">
        Default
      </PharmaButton>
      <PharmaButton variant="secondary" state="hover">
        Hover
      </PharmaButton>
      <PharmaButton variant="secondary" state="focus">
        Focus
      </PharmaButton>
      <PharmaButton variant="secondary" state="pressed">
        Pressed
      </PharmaButton>
      <PharmaButton variant="secondary" state="disabled">
        Disabled
      </PharmaButton>
    </div>
  ),
};

export const TertiaryStates: Story = {
  name: 'Tertiary states',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <PharmaButton variant="tertiary" state="default">
        Default
      </PharmaButton>
      <PharmaButton variant="tertiary" state="hover">
        Hover
      </PharmaButton>
      <PharmaButton variant="tertiary" state="focus">
        Focus
      </PharmaButton>
      <PharmaButton variant="tertiary" state="pressed">
        Pressed
      </PharmaButton>
      <PharmaButton variant="tertiary" state="disabled">
        Disabled
      </PharmaButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, max-content)',
        gap: 16,
        alignItems: 'center',
      }}
    >
      <PharmaButton variant="primary">Primary</PharmaButton>
      <PharmaButton variant="secondary">Secondary</PharmaButton>
      <PharmaButton variant="tertiary">Tertiary</PharmaButton>
    </div>
  ),
};

export const LongTextLabel: Story = {
  args: {
    children: 'Review prescription details before continuing to the next step',
  },
};

export const WithLeadingAndTrailingIcons: Story = {
  args: {
    children: 'Add medication',
    showLeadingIcon: true,
    showTrailingIcon: true,
  } as Story['args'] & { showLeadingIcon: boolean; showTrailingIcon: boolean },
  argTypes: {
    showLeadingIcon: {
      control: 'boolean',
      description: 'Toggle leading icon visibility',
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Toggle trailing icon visibility',
    },
  },
  render: (args) => {
    const { showLeadingIcon = true, showTrailingIcon = true, children, ...buttonArgs } = args as Story['args'] & {
      showLeadingIcon?: boolean;
      showTrailingIcon?: boolean;
    };

    return (
      <PharmaButton {...buttonArgs}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {showLeadingIcon ? <span aria-hidden="true">+</span> : null}
        <span>{children ?? 'Add medication'}</span>
        {showTrailingIcon ? <span aria-hidden="true">→</span> : null}
      </span>
    </PharmaButton>
    );
  },
};
