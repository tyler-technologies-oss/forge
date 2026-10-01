import { useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconPeople } from '@tylertech/tyler-icons';
import { ForgeCountCard, ForgeIcon } from '@tylertech/forge-react';
import type { CountCardTheme } from '@tylertech/forge/count-card';

const themes: CountCardTheme[] = ['none', 'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];

export function CountCardDemo(): JSX.Element {
  useEffect(() => {
    IconRegistry.define(tylIconPeople);
  }, []);

  return (
    <>
      <h2 className="forge-typography--subheading4">Count Card</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {themes.map(theme => (
          <ForgeCountCard key={theme} theme={theme} style={{ width: '160px' }}>
            <ForgeIcon slot="icon" name="people" />
            <span slot="label">{theme}</span>
            <span slot="count">128</span>
          </ForgeCountCard>
        ))}
      </div>
    </>
  );
}
