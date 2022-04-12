import { Story } from '@storybook/react';
import { ForgeCard } from '@tylertech/forge-react';
import React from 'react';
import { ICardProps } from '../card-args';

export const DefaultTemplate: Story<ICardProps> = ({
  outlined = false,
}) => {
  return (
    <ForgeCard style={{width: '400px'}} {...{ outlined }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
      aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
      enim sint nesciunt provident excepturi dolorum pariatur illum?  
    </ForgeCard>
  );
}
