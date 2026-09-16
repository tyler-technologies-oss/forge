import { IColumnConfiguration, ITableSelectEventData, ITableSortEventData } from '@tylertech/forge';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { ForgeTable, useForgeToast } from '@tylertech/forge-react';
import { CellButton } from './CellButton';

import '@tylertech/forge/dist/table/forge-table.css';

const componentRefCache = new Map<number, HTMLElement>();
const columns: IColumnConfiguration[] = [
  { header: 'Name', property: 'name', sortable: true, initialSort: true },
  { header: 'Number', property: 'num', sortable: true },
  { header: 'Position', property: 'position', sortable: true },
  {
    template: (index, parent, data) => {
      // Always unmount dynamically rendered components to avoid memory leaks
      if (componentRefCache.has(data.id)) {
        ReactDOM.unmountComponentAtNode(componentRefCache.get(data.id) as HTMLElement);
      }

      // Create a container element for your mount point
      const container = document.createElement('div');

      // Render the dynamic React component inside the mount point container element
      ReactDOM.render(<CellButton {...{ data, index }} />, container);

      // Keep track of our dynamic component references
      componentRefCache.set(data.id, container);

      // Return the container to the Forge table to render this element in the cell
      return container;
    }
  }
];

interface IPlayer {
  [index: string]: any;
  id: number;
  name: string;
  num: number;
  position: string;
}

const players: IPlayer[] = [
  { id: 1, name: 'Tom Brady', num: 12, position: 'QB' },
  { id: 2, name: 'Mac Jones', num: 10, position: 'QB' },
  { id: 3, name: 'Rob Gronkowski', num: 87, position: 'TE' },
  { id: 4, name: 'James White', num: 28, position: 'RB' },
  { id: 5, name: 'Julian Edelman', num: 11, position: 'WR' }
];

export function TableDemo(): JSX.Element {
  const [showToast] = useForgeToast();
  const [data, setData] = useState(players);

  useEffect(
    () => () => {
      componentRefCache.forEach(container => ReactDOM.unmountComponentAtNode(container));
      componentRefCache.clear();
    },
    []
  );

  function onSort({ detail }: CustomEvent<ITableSortEventData>): void {
    const sortPropertyName = columns[detail.columnIndex].property as keyof IPlayer;
    setData([...players.sort(_sortByProperty(sortPropertyName, detail.direction))]);
  }

  function onSelect({ detail }: CustomEvent<ITableSelectEventData>): void {
    showToast({ message: `Row index ${detail.index} ${detail.selected ? 'selected' : 'deselected'}` });
  }

  function _sortByProperty(propertyName: keyof IPlayer, sortDirection: string): (a: IPlayer, b: IPlayer) => number {
    return (a, b) => {
      if (sortDirection === 'DESC') {
        return a[propertyName].toString().localeCompare(b[propertyName]);
      } else {
        return b[propertyName].toString().localeCompare(a[propertyName]);
      }
    };
  }

  return (
    <>
      <h2 className="forge-typography--subheading4">Table</h2>
      <ForgeTable data={data} columnConfigurations={columns} select={true} selectKey="id" on-forge-table-sort={onSort} on-forge-table-select={onSelect} />
    </>
  );
}
