import { useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconMoreVert } from '@tylertech/tyler-icons';
import { ForgeButton, ForgeIcon, ForgeIconButton, ForgeStructuredCard } from '@tylertech/forge-react';

export function StructuredCardDemo(): JSX.Element {
  useEffect(() => {
    IconRegistry.define(tylIconMoreVert);
  }, []);

  return (
    <>
      <h2 className="forge-typography--subheading4">Structured Card</h2>
      <ForgeStructuredCard style={{ maxWidth: '360px' }}>
        <span slot="title">Card title</span>
        <ForgeIconButton slot="header-actions" aria-label="More actions">
          <ForgeIcon name="more_vert" />
        </ForgeIconButton>
        <p slot="body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quia veniam omnis labore voluptatem doloribus.</p>
        <ForgeButton slot="footer-secondary-action" variant="outlined">
          Cancel
        </ForgeButton>
        <ForgeButton slot="footer-primary-action" variant="raised">
          Save
        </ForgeButton>
      </ForgeStructuredCard>
    </>
  );
}
