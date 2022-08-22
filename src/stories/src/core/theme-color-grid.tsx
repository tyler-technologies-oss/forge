import React, { FC } from 'react';

const colors = {
  '--mdc-theme-primary': {
    value: '#3f51b5'
  },
  '--mdc-theme-secondary': {
    value: '#ffc107'
  },
  '--forge-theme-tertiary': {
    value: '#3d5afe'
  },
  '--mdc-theme-background': {
    value: '#fafafa'
  },
  '--mdc-theme-error': {
    value: '#b00020'
  },
  '--mdc-theme-on-primary': {
    value: '#ffffff'
  },
  '--mdc-theme-on-secondary': {
    value: '#000000'
  },
  '--forge-theme-on-tertiary': {
    value: '#ffffff'
  },
  '--mdc-theme-surface': {
    value: '#ffffff'
  },
  '--mdc-theme-on-surface': {
    value: '#000000'
  },
  '--mdc-theme-on-error': {
    value: '#ffffff'
  },
  '--mdc-theme-text-primary-on-background': {
    value: 'rgba(0, 0, 0, 0.87)'
  },
  '--mdc-theme-text-secondary-on-background': {
    value: 'rgba(0, 0, 0, 0.54)'
  },
  '--mdc-theme-text-hint-on-background': {
    value: 'rgba(0, 0, 0, 0.38)'
  },
  '--mdc-theme-text-disabled-on-background': {
    value: 'rgba(0, 0, 0, 0.12)'
  },

  // Forge-specific
  '--forge-theme-border-color': {
    value: '#e0e0e0'
  },
  '--forge-theme-danger': {
    value: '#b00020'
  },
  '--forge-theme-error-hover': {
    value: '#db8a98'
  },
  '--forge-theme-warning': {
    value: '#d14900'
  },
  '--forge-theme-success': {
    value: '#2e7d32'
  },
  '--forge-theme-info': {
    value: '#424242'
  },
  '--forge-theme-icon-color': {
    value: '#757575'
  },
  '--forge-theme-form-field-label-on-background': {
    value: 'rgba(0, 0, 0, 0.65)'
  },
  '--forge-theme-form-field-icon-disabled-on-background': {
    value: 'rgba(0, 0, 0, 0.26)'
  },
  '--forge-theme-form-field-text-disabled-on-background': {
    value: 'rgba(0, 0, 0, 0.6)'
  },
  '--forge-theme-form-field-disabled-on-background': {
    value: '#f5f5f5'
  },
  '--forge-theme-label-disabled-on-background': {
    value: 'rgba(0, 0, 0, 0.38)'
  },
  '--forge-theme-elevated-surface': {
    value: '#ffffff'
  },
  '--forge-theme-on-elevated-surface': {
    value: 'rgba(0, 0, 0, 0.87)'
  },
  '--forge-theme-scrollbar-thumb': {
    value: '#bdbdbd'
  },
  '--forge-theme-scrollbar-thumb-hover': {
    value: '#9e9e9e'
  },
  '--forge-theme-scrollbar-track': {
    value: '#f0f0f0'
  },
  '--forge-theme-scrollbar-track-hover': {
    value: '#ececec'
  }
};

const ThemeColorGrid: FC = () => (
  <table className="forge-table forge-table--dense">
    <thead>
      <tr className="forge-table-row forge-table-head__row">
        <th className="forge-table-cell forge-table-head__cell">Theme</th>
        <th className="forge-table-cell forge-table-head__cell">Value (light theme)</th>
        <th className="forge-table-cell forge-table-head__cell">Example</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(colors).map(theme => {
        const { value } = colors[theme];
        return (
          <tr key={theme} className="forge-table-row forge-table-body__row">
            <td className="forge-table-cell forge-table-body__cell">
              <code className="forge-docs-core__inline-code">{theme}</code>
            </td>
            <td className="forge-table-cell forge-table-body__cell">
              <code className="forge-docs-core__inline-code">{value}</code>
            </td>
            <td className="forge-table-cell forge-table-body__cell">
              <div style={{ backgroundColor: `var(${theme}, ${value})`, height: '24px', width: '24px', borderRadius: '4px', border: '1px solid var(--forge-theme-border-color)' }}></div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default ThemeColorGrid;

