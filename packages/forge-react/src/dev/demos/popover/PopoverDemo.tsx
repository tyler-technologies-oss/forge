import { ForgeButton, ForgePopover, useForgePopover } from '@tylertech/forge-react';
import { useContext, useRef, useState } from 'react';
import { TestContext } from '../../App';
import { IPopoverToggleEventData } from '@tylertech/forge';

const PopoverBody = ({ hide }: { hide: () => void }): JSX.Element => {
  const testContext = useContext(TestContext);

  return (
    <div style={{ padding: '16px', maxWidth: '256px' }}>
      <p>Value from TestContext: {testContext ? <code>{testContext.value}</code> : <code>N/A</code>}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quia veniam omnis labore voluptatem doloribus voluptatibus maxime nisi libero
        debitis quis porro modi, quos quod obcaecati repudiandae ut voluptatum distinctio!
      </p>
      <ForgeButton slot="end" variant="raised" onClick={hide}>
        Close
      </ForgeButton>
    </div>
  );
};

export function PopoverDemo(): JSX.Element {
  const componentButtonRef = useRef<HTMLButtonElement>(null);
  const hookButtonRef = useRef<HTMLButtonElement>(null);
  const [showPopover, hidePopover] = useForgePopover(PopoverBody, { hide: () => hidePopover() });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h2 className="forge-typography--subheading4">Popover ({isOpen ? 'open' : 'closed'})</h2>
      <ForgeButton id="popover-target" variant="raised" ref={componentButtonRef} onClick={() => setIsOpen(true)}>
        Show popover (component)
      </ForgeButton>
      <ForgePopover open={isOpen} on-forge-popover-toggle={(evt: CustomEvent<IPopoverToggleEventData>) => setIsOpen(evt.detail.newState === 'open')}>
        <PopoverBody hide={() => setIsOpen(false)} />
      </ForgePopover>
      <ForgeButton style={{ marginLeft: '16px' }} variant="raised" ref={hookButtonRef} onClick={() => showPopover(hookButtonRef)}>
        Show popover (hook)
      </ForgeButton>
    </>
  );
}
