import { cdp } from 'vitest/browser';

export interface TableAccessibility {
  role: string | undefined;
  name: string | undefined;
  description: string | undefined;
  multiselectable: boolean;
  roles: string[];
}

/**
 * Reads the role, accessible name and description that Chromium computes for the first `table` or `grid` in the test iframe, plus the roles of all of its accessible nodes.
 *
 * The accessibility tree of the top frame does not contain the iframe that vitest renders tests in, so it is requested by frame id.
 */
export async function getTableAccessibility(): Promise<TableAccessibility> {
  const session = cdp();
  await session.send('Page.enable');
  await session.send('Accessibility.enable');
  const { frameTree } = await session.send('Page.getFrameTree');
  const frameId = frameTree.childFrames?.[0]?.frame.id;
  const { nodes } = await session.send('Accessibility.getFullAXTree', { frameId });
  const table = nodes.find(node => node.role?.value === 'table' || node.role?.value === 'grid');
  return {
    role: table?.role?.value ? String(table.role.value) : undefined,
    name: table?.name?.value ? String(table.name.value) : undefined,
    description: table?.description?.value ? String(table.description.value) : undefined,
    multiselectable: table?.properties?.some(property => property.name === 'multiselectable' && property.value.value === true) ?? false,
    roles: nodes.filter(node => !node.ignored).map(node => String(node.role?.value))
  };
}
