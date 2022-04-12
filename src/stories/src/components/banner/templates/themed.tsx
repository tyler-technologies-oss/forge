import { Story } from '@storybook/react';
import { ForgeBanner, ForgeButton } from '@tylertech/forge-react';
import React from 'react';
import { IBannerProps } from '../banner-args';

export const ThemedTemplate: Story<IBannerProps> = ({
  dismissed = false,
  canDismiss = true,
  theme = 'default',
  hasIcon = false,
  hasButton = false,
}) => {
  const bannerProps = {
    dismissed,
    canDismiss
  };
  const Button = () => hasButton 
    ? (<ForgeButton type="outlined" slot="button">
          <button type="button" style={{backgroundColor: '#ffffff'}}>Learn more...</button>
      </ForgeButton>) 
    : null;
  const Icon = () => hasIcon 
    ? (<i className="tyler-icons" slot="icon">add_alert</i>) 
    : null;
  const BannerContent = () => (
    <>
      <Icon/>
      <div>Minim sunt eu laborum labore minim.</div>
      <Button/>
    </>
  ); 
  return (
    <>
      <ForgeBanner {...bannerProps} theme="danger">
        <BannerContent/>
      </ForgeBanner>
      <br/>
      <ForgeBanner {...bannerProps} theme="warning">
        <BannerContent/>
      </ForgeBanner>
      <br/>
      <ForgeBanner {...bannerProps} theme="success">
        <BannerContent/>
      </ForgeBanner>
      <br/>
      <ForgeBanner {...bannerProps} theme="info-primary">
        <BannerContent/>
      </ForgeBanner>
      <br/>
      <ForgeBanner {...bannerProps} theme="info-secondary">
        <BannerContent/>
      </ForgeBanner>
    </>
  );
};
