import { Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconNotifications } from '@tylertech/tyler-icons/standard';
import { ForgeBadge, ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';
import React, { useEffect } from 'react';
import { IBadgeProps } from '../badge-arg-types';

export const IconButtonRecipeTemplate: Story<IBadgeProps> = props => {
  const demoIconButtonStyles = {
    color: 'var(--mdc-theme-on-surface, #000000)',
  };
  const styles = {
    '--forge-badge-background-color': props.badgeBackgroundColor === '--mdc-theme-secondary' 
      ? 'var(--mdc-theme-secondary)'
      : 'var(--forge-theme-tertiary)',
  };
  const badgeProps = {
    dot: props.dot, 
    open: props.open, 
    positioned: props.positioned, 
    strong: props.strong, 
    theme: props.theme
  };

  useEffect(() => {
    IconRegistry.define(tylIconNotifications);
  }, []);

  return (
    <ForgeIconButton style={demoIconButtonStyles} className="forge-icon-button--with-badge">
      <button type="button">
        <ForgeIcon name="notifications"></ForgeIcon>
      </button>
      <ForgeBadge {...badgeProps} style={styles}>{props.text}</ForgeBadge>
    </ForgeIconButton>
  )
};
