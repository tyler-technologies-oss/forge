import { ForgeBottomSheet, ForgeButton, ForgeScaffold, ForgeToolbar, useForgeBottomSheet } from '@tylertech/forge-react';
import { useContext, useState } from 'react';
import { TestContext } from '../../App';

const BottomSheetBody = ({ hide }: { hide: () => void }): JSX.Element => {
  const testContext = useContext(TestContext);

  return (
    <ForgeScaffold>
      <ForgeToolbar slot="header">
        <h1 className="forge-typography--subheading4" slot="start" id="bottom-sheet-title">
          Bottom sheet title
        </h1>
      </ForgeToolbar>
      <div slot="body" style={{ padding: '16px' }}>
        <p>Value from TestContext: {testContext ? <code>{testContext.value}</code> : <code>N/A</code>}</p>
        <p id="bottom-sheet-message">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quia veniam omnis labore voluptatem doloribus voluptatibus maxime nisi libero
          debitis quis porro modi, quos quod obcaecati repudiandae ut voluptatum distinctio!
        </p>
      </div>
      <ForgeToolbar slot="footer" inverted>
        <ForgeButton slot="end" variant="raised" onClick={hide}>
          Close
        </ForgeButton>
      </ForgeToolbar>
    </ForgeScaffold>
  );
};

export function BottomSheetDemo(): JSX.Element {
  const bottomSheetAttributes = new Map([
    ['aria-labelledby', 'bottom-sheet-title'],
    ['aria-describedby', 'bottom-sheet-message']
  ]);
  const [showBottomSheet, hideBottomSheet] = useForgeBottomSheet(BottomSheetBody, { hide: () => hideBottomSheet() });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h2 className="forge-typography--subheading4">Bottom sheet</h2>
      <ForgeButton variant="raised" onClick={() => showBottomSheet({ persistent: true, bottomSheetAttributes })}>
        Show bottom sheet (hooks)
      </ForgeButton>
      <ForgeButton style={{ marginLeft: '16px' }} variant="raised" onClick={() => setIsOpen(true)}>
        Show bottom sheet (component)
      </ForgeButton>
      <ForgeBottomSheet open={isOpen} mode="modal" on-forge-bottom-sheet-close={() => setIsOpen(false)}>
        <BottomSheetBody hide={() => setIsOpen(false)} />
      </ForgeBottomSheet>
    </>
  );
}
