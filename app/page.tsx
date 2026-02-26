 'use client';

import { useState } from 'react';
import { PharmaButton } from '@/src/components/PharmaButton/PharmaButton';
import { PharmaRadio } from '@/src/components/PharmaRadio/PharmaRadio';

type PrimitiveColor = {
  token: string;
  variable: string;
  hex: string;
};

const primitiveColorGroups: { name: string; colors: PrimitiveColor[] }[] = [
  {
    name: 'Blue',
    colors: [
      { token: 'color-blue-20', variable: 'var(--color-blue-20)', hex: '#F7FAFF' },
      { token: 'color-blue-50', variable: 'var(--color-blue-50)', hex: '#EBF1FF' },
      { token: 'color-blue-100', variable: 'var(--color-blue-100)', hex: '#DBE4FF' },
      { token: 'color-blue-200', variable: 'var(--color-blue-200)', hex: '#BECDFF' },
      { token: 'color-blue-300', variable: 'var(--color-blue-300)', hex: '#708DFF' },
      { token: 'color-blue-400', variable: 'var(--color-blue-400)', hex: '#6E7CFF' },
      { token: 'color-blue-500', variable: 'var(--color-blue-500)', hex: '#4C50FF' },
      { token: 'color-blue-600', variable: 'var(--color-blue-600)', hex: '#2F22FF' },
      { token: 'color-blue-700', variable: 'var(--color-blue-700)', hex: '#2F20E2' },
      { token: 'color-blue-800', variable: 'var(--color-blue-800)', hex: '#261DB6' },
      { token: 'color-blue-900', variable: 'var(--color-blue-900)', hex: '#24208F' },
      { token: 'color-blue-950', variable: 'var(--color-blue-950)', hex: '#171353' },
    ],
  },
  {
    name: 'Slate',
    colors: [
      { token: 'color-slate-20', variable: 'var(--color-slate-20)', hex: '#FFFFFF' },
      { token: 'color-slate-50', variable: 'var(--color-slate-50)', hex: '#F6F8FB' },
      { token: 'color-slate-100', variable: 'var(--color-slate-100)', hex: '#F3F4F6' },
      { token: 'color-slate-200', variable: 'var(--color-slate-200)', hex: '#ECEEF2' },
      { token: 'color-slate-300', variable: 'var(--color-slate-300)', hex: '#D1D5DB' },
      { token: 'color-slate-400', variable: 'var(--color-slate-400)', hex: '#9CA3AF' },
      { token: 'color-slate-500', variable: 'var(--color-slate-500)', hex: '#7F869F' },
      { token: 'color-slate-600', variable: 'var(--color-slate-600)', hex: '#4B5563' },
      { token: 'color-slate-700', variable: 'var(--color-slate-700)', hex: '#374151' },
      { token: 'color-slate-800', variable: 'var(--color-slate-800)', hex: '#1F2937' },
      { token: 'color-slate-900', variable: 'var(--color-slate-900)', hex: '#111827' },
      { token: 'color-slate-950', variable: 'var(--color-slate-950)', hex: '#121212' },
    ],
  },
  {
    name: 'Green',
    colors: [
      { token: 'color-green-50', variable: 'var(--color-green-50)', hex: '#ECFFF5' },
      { token: 'color-green-100', variable: 'var(--color-green-100)', hex: '#C8F9E0' },
      { token: 'color-green-300', variable: 'var(--color-green-300)', hex: '#74CCA0' },
      { token: 'color-green-500', variable: 'var(--color-green-500)', hex: '#00CC66' },
      { token: 'color-green-600', variable: 'var(--color-green-600)', hex: '#00A854' },
      { token: 'color-green-800', variable: 'var(--color-green-800)', hex: '#006633' },
    ],
  },
  {
    name: 'Amber',
    colors: [
      { token: 'color-amber-50', variable: 'var(--color-amber-50)', hex: '#FFF9E6' },
      { token: 'color-amber-100', variable: 'var(--color-amber-100)', hex: '#FFEFC2' },
      { token: 'color-amber-500', variable: 'var(--color-amber-500)', hex: '#FFCC22' },
      { token: 'color-amber-600', variable: 'var(--color-amber-600)', hex: '#E6B51F' },
      { token: 'color-amber-700', variable: 'var(--color-amber-700)', hex: '#B38E14' },
      { token: 'color-amber-800', variable: 'var(--color-amber-800)', hex: '#8C6F0F' },
    ],
  },
  {
    name: 'Red',
    colors: [
      { token: 'color-red-50', variable: 'var(--color-red-50)', hex: '#FFF0F2' },
      { token: 'color-red-100', variable: 'var(--color-red-100)', hex: '#FFD6DB' },
      { token: 'color-red-500', variable: 'var(--color-red-500)', hex: '#FF2233' },
      { token: 'color-red-600', variable: 'var(--color-red-600)', hex: '#D71D2D' },
      { token: 'color-red-800', variable: 'var(--color-red-800)', hex: '#8A1018' },
    ],
  },
];

export default function Home() {
  const [isSelected, setIsSelected] = useState(false);

  const toggleRadio = () => {
    setIsSelected((previous) => !previous);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: 'var(--color-slate-50)',
      }}
    >
      <section
        style={{
          display: 'grid',
          gap: 64,
          padding: 24,
          borderRadius: 12,
          background: 'var(--color-white)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ display: 'grid', gap: 32 }}>
          <h2 className="h4" style={{ margin: 0, fontWeight: 700 }}>
            Primitive Colors
          </h2>

          <div style={{ display: 'grid', gap: 20 }}>
            {primitiveColorGroups.map((group) => (
              <div key={group.name} style={{ display: 'grid', gap: 12 }}>
                <h3 className="h5" style={{ margin: 0, fontWeight: 700 }}>
                  {group.name}
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: 12,
                  }}
                >
                  {group.colors.map((color) => (
                    <div key={color.token} style={{ display: 'grid', gap: 6 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 4,
                          border: '1px solid var(--color-slate-300)',
                          background: color.variable,
                        }}
                      />
                      <span style={{ fontSize: 12, lineHeight: '16px' }}>{color.token}</span>
                      <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--color-slate-600)' }}>
                        {color.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 32 }}>
          <h1 className="h4" style={{ margin: 0, fontWeight: 700 }}>
            Pharma Button
          </h1>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <PharmaButton variant="primary">Primary</PharmaButton>
            <PharmaButton variant="secondary">Secondary</PharmaButton>
            <PharmaButton variant="tertiary">Tertiary</PharmaButton>
            <PharmaButton variant="primary" isDisabled>
              Disabled
            </PharmaButton>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 32 }}>
          <h2 className="h4" style={{ margin: 0, fontWeight: 700 }}>
            Pharma Radio
          </h2>

          <PharmaRadio
            state={isSelected ? 'pressed' : 'default'}
            label
            description
            labelText="Medication reminders"
            descriptionText="Enable daily reminder notifications"
            onClick={toggleRadio}
          />
        </div>
      </section>
    </main>
  );
}
