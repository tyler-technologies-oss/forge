import { Story } from '@storybook/react';
import { ForgeButton, ForgeCard, ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';
import { tylIconMoreVert } from '@tylertech/tyler-icons/standard';
import React, { useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
import { LOREM_IPSUM } from '../../../mock/lorem-ipsum';
import { ICardProps } from '../card-args';

export const StyledTemplate: Story<ICardProps> = ({
  outlined = false,
}) => {
  const containerStyle = {
    maxWidth: '400px'
  };
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  };
  const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end'
  };

  useEffect(() => {
    IconRegistry.define(tylIconMoreVert);
  }, []);

  return (
    <div style={containerStyle}>
      <ForgeCard outlined={outlined}>
        <div style={headerStyle}>
          <h3 className="forge-typography--headline6">This is the card title</h3>
          <ForgeIconButton>
            <button type="button">
              <ForgeIcon name="more_vert" />
            </button>
          </ForgeIconButton>
        </div>
        <div>
          <p className="forge-typography--body2">{LOREM_IPSUM.p1}</p>
        </div>
        <div style={footerStyle}>
          <div>
            <ForgeButton>
              <button type="button">Ok</button>
            </ForgeButton>
            <ForgeButton>
              <button type="button">Cancel</button>
            </ForgeButton>
          </div>
        </div>
      </ForgeCard>
    </div>
  );
};