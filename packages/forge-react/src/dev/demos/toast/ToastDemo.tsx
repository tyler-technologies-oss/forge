import { ToastComponent } from '@tylertech/forge';
import { ForgeButton, ForgeCheckbox, ForgeToast, useForgeToast } from '@tylertech/forge-react';
import { useContext, useState } from 'react';
import { TestContext } from '../../App';

const CustomToastElement = (): JSX.Element => {
  const testContext = useContext(TestContext);

  return (
    <div>
      <p>
        Value from TestContext: <code>{testContext.value}</code>
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quia veniam omnis labore voluptatem doloribus voluptatibus maxime nisi libero
        debitis quis porro modi, quos quod obcaecati repudiandae ut voluptatum distinctio!
      </p>
    </div>
  );
};

export function ToastDemo(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const [showToast] = useForgeToast();

  function showToastDetached(): void {
    ToastComponent.present({ message: 'Toast message! (detached)' });
  }

  function showToastComponent(): void {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setIsOpen(true));
      return;
    }
    setIsOpen(true);
  }

  function showToastHook(): void {
    showToast({ message: 'Toast message! (hook)' });
  }

  return (
    <>
      <h2 className="forge-typography--subheading4">Toast ({isOpen ? 'open' : 'closed'})</h2>
      <div style={{ display: 'flex', gap: '16px' }}>
        <ForgeButton variant="raised" onClick={showToastDetached}>
          Show toast (detached)
        </ForgeButton>
        <ForgeButton variant="raised" onClick={showToastComponent}>
          Show toast (component)
        </ForgeButton>
        <ForgeButton variant="raised" onClick={showToastHook}>
          Show toast (hook)
        </ForgeButton>
      </div>
      <div style={{ marginTop: '16px' }}>
        <ForgeCheckbox id="show-custom-component-checkbox" defaultChecked={showCustomComponent} onChange={() => setShowCustomComponent(!showCustomComponent)}>
          Show custom component
        </ForgeCheckbox>
      </div>
      <ForgeToast open={isOpen} on-forge-toast-dismiss={() => setIsOpen(false)}>
        {showCustomComponent ? <CustomToastElement /> : 'Toast message! (component)'}
      </ForgeToast>
    </>
  );
}
