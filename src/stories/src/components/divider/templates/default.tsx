import { Story } from '@storybook/react';
import { ForgeDivider } from '@tylertech/forge-react';
import React from 'react';
import { IDividerProps } from '../divider-args';

export const DefaultTemplate: Story<IDividerProps> = ({
  vertical = false
}) => {
  const styles = {
    width: !vertical ? '200px' : null,
    height: vertical ? '200px' : null,
  };
  const dividerProps = {
    vertical
  };
  return (
    <ForgeDivider style={styles} {...dividerProps}></ForgeDivider>
  );
};
