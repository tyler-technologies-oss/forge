import React from 'react';

export function ShapeTokenExample({ borderRadius, shape = 'square' }: { borderRadius: string; shape?: 'square' | 'rect' }) {
  return (
    <div
      style={{
        width: shape === 'square' ? '48px' : '72px',
        height: '48px',
        backgroundColor: 'var(--forge-theme-primary)',
        borderRadius: `var(--forge-shape-${borderRadius})`,
      }}
    />
  );
}