import { ForgeStack } from '@tylertech/forge-react';
import './StackDemo.scss';

export function StackDemo(): JSX.Element {
  return (
    <ForgeStack gap="32">
      <h2 className="forge-typography--subheading4">Stack</h2>
      <ForgeStack>
        <div className="box">Box</div>
        <div className="box">Box</div>
        <div className="box">Box</div>
      </ForgeStack>
      <ForgeStack inline>
        <div className="box">Box</div>
        <div className="box">Box</div>
        <div className="box">Box</div>
      </ForgeStack>
      <ForgeStack inline stretch>
        <div className="box">Box</div>
        <div className="box">Box</div>
        <div className="box">Box</div>
      </ForgeStack>
    </ForgeStack>
  );
}
