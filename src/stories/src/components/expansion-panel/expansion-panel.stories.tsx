import { Meta, Story } from '@storybook/react';
import { ForgeExpansionPanel } from '@tylertech/forge-react';
import React, { useRef } from 'react';
import { IExpansionPanelProps, argTypes } from './expansion-panel-args';
import './expansion-panel-style.css';

const MDX = require('./expansion-panel.mdx').default;

export default {
  title: 'Components/Expansion Panel',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IExpansionPanelProps> = ({
  open = false,
  orientation = 'vertical',
  useAnimations = true
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function onToggleExpansionPanel({ detail }: CustomEvent<boolean>): void {
    buttonRef.current?.setAttribute('aria-expanded', detail.toString());
  }

  return (
    <ForgeExpansionPanel open={open} orientation={orientation} useAnimations={useAnimations} on-forge-expansion-panel-toggle={onToggleExpansionPanel} style={{ width: '250px' }}>
      <button ref={buttonRef} slot="header" aria-controls="expansion-panel-content" aria-expanded="false" className={'expansion-panel-button expansion-panel-button--default'}>Click me</button>
      <div id="expansion-panel-content" style={{ width: orientation === 'horizontal' ? '250px' : 'auto' }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure
        corporis veritatis ut quod quo libero ea repellendus, consequuntur porro explicabo
        exercitationem minus pariatur debitis nihil at labore!
      </div>
    </ForgeExpansionPanel>
  );
};
Default.args = {
  open: false,
  orientation: 'vertical',
  useAnimations: true
} as IExpansionPanelProps;
