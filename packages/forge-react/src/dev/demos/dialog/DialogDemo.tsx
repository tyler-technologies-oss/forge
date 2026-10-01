import { ForgeButton, ForgeCheckbox, ForgeDialog, ForgeScaffold, ForgeToolbar, useForgeDialog } from '@tylertech/forge-react';
import { useContext, useState } from 'react';
import { TestContext } from '../../App';

const DialogBody = ({ hide }: { hide: () => void }): JSX.Element => {
  const testContext = useContext(TestContext);

  return (
    <ForgeScaffold>
      <ForgeToolbar slot="header">
        <h1 className="forge-typography--subheading4" slot="start" id="dialog-title">
          Dialog title
        </h1>
      </ForgeToolbar>
      <div slot="body" style={{ padding: '16px', maxWidth: '500px' }}>
        <p>Value from TestContext: {testContext ? <code>{testContext.value}</code> : <code>N/A</code>}</p>
        <p id="dialog-message">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quia veniam omnis labore voluptatem doloribus voluptatibus maxime nisi libero
          debitis quis porro modi, quos quod obcaecati repudiandae ut voluptatum distinctio!
        </p>
      </div>
      <ForgeToolbar slot="footer" inverted>
        <ForgeButton slot="end" variant="raised" onClick={hide} forge-dialog-focus="true">
          Close
        </ForgeButton>
      </ForgeToolbar>
    </ForgeScaffold>
  );
};

export function DialogDemo(): JSX.Element {
  const dialogAttributes = new Map([
    ['aria-labelledby', 'dialog-title'],
    ['aria-describedby', 'dialog-message']
  ]);
  const [persistent, setPersistent] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, hideDialog] = useForgeDialog(DialogBody, { hide: () => hideDialog() });

  function showHookDialog(): void {
    showDialog({ persistent, fullscreen, dialogAttributes });
  }

  return (
    <>
      <h2 className="forge-typography--subheading4">Dialog</h2>
      <ForgeButton variant="raised" onClick={() => setIsOpen(true)}>
        Show dialog (static)
      </ForgeButton>
      <ForgeButton style={{ marginLeft: '16px' }} variant="raised" onClick={showHookDialog}>
        Show dialog (dynamic via hook)
      </ForgeButton>
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column' }}>
        <ForgeCheckbox id="persistent-checkbox" defaultChecked={persistent} onChange={() => setPersistent(!persistent)}>
          Persistent
        </ForgeCheckbox>
        <ForgeCheckbox id="fullscreen-checkbox" defaultChecked={fullscreen} onChange={() => setFullscreen(!fullscreen)}>
          Fullscreen
        </ForgeCheckbox>
      </div>
      <ForgeDialog
        aria-labelledby="dialog-title"
        aria-describedby="dialog-message"
        open={isOpen}
        persistent={persistent}
        fullscreen={fullscreen}
        on-forge-dialog-close={() => setIsOpen(false)}>
        <DialogBody hide={() => setIsOpen(false)} />
      </ForgeDialog>
    </>
  );
}
