import { ForgeBadge } from '@tylertech/forge-react';

import './BadgeDemo.scss';

export function BadgeDemo(): JSX.Element {
  return (
    <>
      <h2 className="forge-typography--subheading4">Avatar</h2>
      <div className="badge-row">
        <div className="badge-column">
          <h4 className="forge-typography--subheading2">Default theme</h4>
          <ForgeBadge>Default</ForgeBadge>
          <ForgeBadge theme="danger">Danger</ForgeBadge>
          <ForgeBadge theme="warning">Warning</ForgeBadge>
          <ForgeBadge theme="success">Success</ForgeBadge>
          <ForgeBadge theme="info-primary">Info (primary)</ForgeBadge>
          <ForgeBadge theme="info-secondary">Info (secondary)</ForgeBadge>
        </div>
        <div className="badge-column">
          <h4 className="forge-typography--subheading2">Strong theme</h4>
          <ForgeBadge strong>Default</ForgeBadge>
          <ForgeBadge theme="danger" strong>
            Danger
          </ForgeBadge>
          <ForgeBadge theme="warning" strong>
            Warning
          </ForgeBadge>
          <ForgeBadge theme="success" strong>
            Success
          </ForgeBadge>
          <ForgeBadge theme="info-primary" strong>
            Info (primary)
          </ForgeBadge>
          <ForgeBadge theme="info-secondary" strong>
            Info (secondary)
          </ForgeBadge>
        </div>
      </div>
    </>
  );
}
