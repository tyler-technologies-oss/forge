import React, { FC } from 'react';

interface IAccessibilityDocsProps {
  storyId: string;
}

const AccessibilityDocs: FC<IAccessibilityDocsProps> = ({ storyId }) => (
  <>
    Accessibility

    <div>{storyId}</div>
  </>
);

export default AccessibilityDocs;
