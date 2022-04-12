import React from 'react';
import { ForgeIcon } from '@tylertech/forge-react';
import { tylIconFace } from '@tylertech/tyler-icons/standard';
import { Story } from '@storybook/react';

export const DefaultTemplate: Story = () => <ForgeIcon src={tylIconFace.data}></ForgeIcon>;
