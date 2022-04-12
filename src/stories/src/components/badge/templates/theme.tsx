import { Story } from '@storybook/react';
import { ForgeBadge } from '@tylertech/forge-react';
import React, { CSSProperties } from 'react';
import { IBadgeProps } from '../badge-arg-types';

export const ThemeTemplate: Story<IBadgeProps> = props => {
  const containerStyles: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
  };
  const styles: any = {
    'marginRight': '16px',
    'marginBottom': '16px',
    '--forge-badge-background-color': props.badgeBackgroundColor === '--mdc-theme-secondary' 
      ? 'var(--mdc-theme-secondary)'
      : 'var(--forge-theme-tertiary)',
  };
  const badgeProps = {
    dot: props.dot, 
    open: props.open, 
    positioned: props.positioned, 
    strong: props.strong
  };
  return (
    <div style={containerStyles}>
      <ForgeBadge 
        {...badgeProps}
        theme={'danger'}
        style={styles}>Danger</ForgeBadge>

      <ForgeBadge 
        {...badgeProps}
        theme={'warning'}
        style={styles}>Warning</ForgeBadge>

      <ForgeBadge 
        {...badgeProps}
        theme={'success'}
        style={styles}>Success</ForgeBadge>

      <ForgeBadge 
        {...badgeProps}
        theme={'info-primary'}
        style={styles}>Info (primary)</ForgeBadge>

      <ForgeBadge 
        {...badgeProps}
        theme={'info-secondary'}
        style={styles}>Info (secondary)</ForgeBadge>            
    </div>
  );
};
