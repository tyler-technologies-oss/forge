import { Story } from '@storybook/react';
import { ForgeBadge } from '@tylertech/forge-react';
import React from 'react';
import { IBadgeProps } from '../badge-arg-types';

export const DefaultTemplate: Story<IBadgeProps> = ({
  text = '',
  strong = false,
  badgeBackgroundColor = '--mdc-theme-secondary',
  dot = false,
  positioned = false,
  theme = 'default'
}) => {
  const customPropName = `--forge-badge-theme-${strong ? 'strong' : 'muted'}-background`;
  const styles = {
    [customPropName]: badgeBackgroundColor === '--mdc-theme-secondary' 
      ? 'var(--mdc-theme-secondary)'
      : 'var(--forge-theme-tertiary)',
  };
  const badgeProps = { dot, open, positioned, strong, theme };
  return <ForgeBadge {...badgeProps} style={styles}>{text}</ForgeBadge>;
};
