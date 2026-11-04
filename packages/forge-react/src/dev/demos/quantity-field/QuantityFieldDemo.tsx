import { ForgeQuantityField } from '@tylertech/forge-react';

export function QuantityFieldDemo(): JSX.Element {
  return (
    <>
      <h2 className="forge-typography--subheading4">Quantity Field</h2>
      <ForgeQuantityField>
        <span slot="label">Quantity</span>
        <input type="number" defaultValue={1} min={0} max={99} />
        <span slot="support-text">Enter a value between 0 and 99</span>
      </ForgeQuantityField>
    </>
  );
}
