import React, { FC } from 'react';

const colors = {
  primary: {
    value: '#3f51b5'
  },
  secondary: {
    value: '#ffc107'
  },
  tertiary: {
    value: '#3d5afe'
  },
  background: {
    value: '#fafafa'
  },
  error: {
    value: '#b00020'
  },
  'on-primary': {
    value: '#ffffff'
  },
  'on-secondary': {
    value: '#000000'
  },
  'on-tertiary': {
    value: '#ffffff'
  },
  surface: {
    value: '#ffffff'
  },
  'on-surface': {
    value: '#000000'
  },
  'on-error': {
    value: '#ffffff'
  },
  'text-primary-on-background': {
    value: 'rgba(0, 0, 0, 0.87)'
  },
  'text-secondary-on-background': {
    value: 'rgba(0, 0, 0, 0.54)'
  },
  'text-hint-on-background': {
    value: 'rgba(0, 0, 0, 0.38)'
  },
  'text-disabled-on-background': {
    value: 'rgba(0, 0, 0, 0.12)'
  },

  // Forge-specific
  'border-color': {
    value: '#e0e0e0'
  },
  danger: {
    value: '#b00020'
  },
  'error-hover': {
    value: '#db8a98'
  },
  warning: {
    value: '#d14900'
  },
  success: {
    value: '#2e7d32'
  },
  info: {
    value: '#424242'
  },
  'icon-color': {
    value: '#757575'
  },
  'form-field-label-on-background': {
    value: 'rgba(0, 0, 0, 0.65)'
  },
  'form-field-icon-disabled-on-background': {
    value: 'rgba(0, 0, 0, 0.26)'
  },
  'form-field-text-disabled-on-background': {
    value: 'rgba(0, 0, 0, 0.6)'
  },
  'form-field-disabled-on-background': {
    value: '#f5f5f5'
  },
  'label-disabled-on-background': {
    value: 'rgba(0, 0, 0, 0.38)'
  },
  'elevated-surface': {
    value: '#ffffff'
  },
  'on-elevated-surface': {
    value: 'rgba(0, 0, 0, 0.87)'
  },
  'scrollbar-thumb': {
    value: '#bdbdbd'
  },
  'scrollbar-thumb-hover': {
    value: '#9e9e9e'
  },
  'scrollbar-track': {
    value: '#f0f0f0'
  },
  'scrollbar-track-hover': {
    value: '#ececec'
  }
};

const ThemeColorGrid: FC = () => (
  <table className="forge-table forge-table--dense">
    <thead>
      <tr className="forge-table-row forge-table-head__row">
        <th className="forge-table-cell forge-table-head__cell">Theme</th>
        <th className="forge-table-cell forge-table-head__cell">Value</th>
        <th className="forge-table-cell forge-table-head__cell">Example</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(colors).map(theme => {
        const { value, description } = colors[theme];
        return (
          <tr key={theme} className="forge-table-row forge-table-body__row">
            <td className="forge-table-cell forge-table-body__cell">
              <code className="forge-typography--caption">{theme}</code>
            </td>
            <td className="forge-table-cell forge-table-body__cell">
              <code className="forge-docs-core__inline-code">{value}</code>
            </td>
            <td className="forge-table-cell forge-table-body__cell">
              <div style={{ backgroundColor: value, height: '24px', width: '24px', borderRadius: '4px', border: '1px solid var(--forge-theme-border-color)' }}></div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default ThemeColorGrid;

