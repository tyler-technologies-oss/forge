import React from 'react';

export function ShapeTokenExample({ borderRadius, shape = 'square' }: { borderRadius: string; shape?: 'square' | 'rect' }) {
  return (
    <div
      style={{
        width: shape === 'square' ? '48px' : '72px',
        height: '48px',
        backgroundColor: 'var(--forge-theme-primary)',
        borderRadius: `var(--forge-shape-${borderRadius})`
      }}
    />
  );
}

export function ElevationTokenExample({ radius }: { radius: string }) {
  return (
    <div
      style={{
        width: '48px',
        height: '48px',
        margin: 'var(--forge-spacing-medium)',
        backgroundColor: 'var(--forge-theme-surface-container-minimum)',
        boxShadow: `var(--forge-elevation-${radius})`,
        borderRadius: 'var(--forge-shape-medium)'
      }}
    />
  );
}
