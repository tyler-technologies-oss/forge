import { ForgeAccordion, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';

export function AccordionDemo(): JSX.Element {
  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--forge-theme-border-color)'
  };

  return (
    <>
      <h2 className="forge-typography--subheading4">Accordion</h2>
      <ForgeAccordion style={{ display: 'block', width: '175px' }}>
        <ForgeExpansionPanel>
          <div role="button" slot="header" style={headerStyles}>
            <div>Panel One</div>
            <ForgeOpenIcon />
          </div>
          <div>Content for panel one.</div>
        </ForgeExpansionPanel>

        <ForgeExpansionPanel>
          <div role="button" slot="header" style={headerStyles}>
            <div>Panel Two</div>
            <ForgeOpenIcon />
          </div>
          <div>Content for panel two.</div>
        </ForgeExpansionPanel>

        <ForgeExpansionPanel>
          <div role="button" slot="header" style={headerStyles}>
            <div>Panel Three</div>
            <ForgeOpenIcon />
          </div>
          <div>Content for panel three.</div>
        </ForgeExpansionPanel>
      </ForgeAccordion>
    </>
  );
}
