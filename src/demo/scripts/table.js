(function (forge) {
  var tableExample = document.querySelector('#Table');
  var tableScrollContainer = tableExample.querySelector('#table-scroll-container');

  var selectCheckbox = tableExample.querySelector('#table-select-checkbox');
  selectCheckbox.checked = true;
  selectCheckbox.addEventListener('change', function () {
    table.select = selectCheckbox.checked;
  });

  var tooltipSelectCheckbox = tableExample.querySelector('#table-tooltip-select-checkbox');
  tooltipSelectCheckbox.checked = true;
  tooltipSelectCheckbox.addEventListener('change', function () {
    if (table.tooltipSelect) {
      table.tooltipSelect = undefined;
    } else {
      table.tooltipSelect = "Select"
    }
  });

  var tooltipSelectAllCheckbox = tableExample.querySelector('#table-tooltip-selectAll-checkbox');
  tooltipSelectAllCheckbox.checked = true;
  tooltipSelectAllCheckbox.addEventListener('change', function () {
    if (table.tooltipSelectAll) {
      table.tooltipSelectAll = undefined;
    } else {
      table.tooltipSelectAll = "Select All"
    }
  });

  var multiselectCheckbox = tableExample.querySelector('#table-multiselect-checkbox');
  multiselectCheckbox.checked = true;
  multiselectCheckbox.addEventListener('change', function () {
    table.multiselect = multiselectCheckbox.checked;
  });

  var denseCheckbox = tableExample.querySelector('#table-dense-checkbox');
  denseCheckbox.checked = false;
  denseCheckbox.addEventListener('change', function () {
    table.dense = denseCheckbox.checked;
  });

  var roomyCheckbox = tableExample.querySelector('#table-roomy-checkbox');
  roomyCheckbox.checked = false;
  roomyCheckbox.addEventListener('change', function () {
    table.roomy = roomyCheckbox.checked;
  });

  var filterCheckbox = tableExample.querySelector('#table-filter-checkbox');
  filterCheckbox.checked = false;
  filterCheckbox.addEventListener('change', function () {
    table.filter = filterCheckbox.checked;
  });

  var wrapCheckbox = tableExample.querySelector('#table-wrap-checkbox');
  wrapCheckbox.checked = true;
  wrapCheckbox.addEventListener('change', function () {
    table.wrapContent = wrapCheckbox.checked;
  });

  var fixedCheckbox = tableExample.querySelector('#table-fixed-checkbox');
  fixedCheckbox.checked = false;
  fixedCheckbox.addEventListener('change', function () {
    table.fixedHeaders = fixedCheckbox.checked;

    if (fixedCheckbox.checked) {
      tableScrollContainer.style.height = '200px';
      tableScrollContainer.style.overflow = 'auto';
    } else {
      tableScrollContainer.style.removeProperty('height');
      tableScrollContainer.style.removeProperty('overflow');
    }
  });

  var resizableCheckbox = tableExample.querySelector('#table-resize-checkbox');
  resizableCheckbox.addEventListener('change', function (evt) {
    table.resizable = resizableCheckbox.checked;
  });

  var allowRowClickCheckbox = tableExample.querySelector('#table-row-click-checkbox');
  allowRowClickCheckbox.addEventListener('change', function (evt) {
    table.allowRowClick = allowRowClickCheckbox.checked;
  });

  var multiColumnSortCheckbox = tableExample.querySelector('#table-multi-column-sort-checkbox');
  multiColumnSortCheckbox.addEventListener('change', function (evt) {
    table.multiColumnSort = multiColumnSortCheckbox.checked;
  });

  var customSelectAllTemplate = tableExample.querySelector('#table-custom-select-all-template');
  customSelectAllTemplate.addEventListener('change', function (evt) {
    if (customSelectAllTemplate.checked) {
      table.selectAllTemplate = getSelectAllTemplate;
      tableExample.querySelector('#table-select-checkbox-alignment').style.display = '';
    }
    else {
      table.selectAllTemplate = null;
      tableExample.querySelector('#table-select-checkbox-alignment').style.display = 'none';
    }
  });

  var layoutTypeSelect = tableExample.querySelector('#table-layout-type-select');
  layoutTypeSelect.value = 'auto';
  layoutTypeSelect.addEventListener('change', function (evt) {
    table.layoutType = evt.detail;
  });

  var layoutTypeSelect = tableExample.querySelector('#table-select-checkbox-alignment');
  layoutTypeSelect.value = 'center';
  layoutTypeSelect.addEventListener('change', function (evt) {
    table.selectCheckboxAlignment = evt.detail;
  });



  var data = [
    { Id: 1, Name: 'Tom Brady', Age: 1, Position: 'QB' },
    { Id: 3, Name: 'Rob Gronkowski', Age: 1, Position: 'TE' },
    { Id: 2, Name: 'Julian Edelman', Age: 1, Position: 'WR' },
    { Id: 4, Name: 'Stephon Gilmore', Age: 2, Position: 'CB' },
    { Id: 5, Name: 'James White', Age: 2, Position: 'RB' }
  ];

  var displayData = [].concat(data);
  var positionOptions = [
    { label: '', value: '' },
    { label: 'QB', value: 'QB' },
    { label: 'WR', value: 'WR' },
    { label: 'TE', value: 'TE' },
    { label: 'RB', value: 'RB' },
    { label: 'OT', value: 'OT' },
    { label: 'DE', value: 'DE' },
    { label: 'CB', value: 'CB' }
  ];
  var columnConfigurations = [
    {
      header: 'Player Name',
      template: (index, parent, { Name }) => Name,
      sortable: true,
      initialSort: { direction: 'DESC', sortOrder: 1 },
      headerTemplate: function () { return Promise.resolve('<span>Playa Names</span>') },
      filter: true,
      filterDelegate: function () {
        return new forge.TextFieldComponentDelegate({ options: { placeholder: 'Filter name...' }});
      }
    },
    {
      header: 'Age',
      property: 'Age',
      align: forge.CellAlign.Right,
      sortable: true,
      initialSort: true,
      sortDirection: 'DESC',
      filter: true,
      filterDelegate: new forge.TextFieldComponentDelegate({ options: { placeholder: 'Filter age...' }})
    },
    {
      header: 'Position',
      property: 'Position',
      resizable: false,
      sortable: true,
      preventUnsort: true,
      filter: true,
      filterDebounceTime: false,
      filterDelegate: new forge.SelectComponentDelegate({ props: { options: positionOptions, placeholder: 'Filter position...' }})
    },
    { template: getMenuColumnTemplate, resizable: false, align: forge.CellAlign.Center, headerCellStyle: { width: '50px' }, stopCellTemplateClickPropagation: true },
    { template: getExpandRowColumnTemplate, resizable: false, align: forge.CellAlign.Center, headerCellStyle: { width: '50px' } }
  ];

  var sortDirection = 'DESC';
  var sortPropertyName = 'Age';

  var tableFilter = {
    Name: '',
    Age: null,
    Position: ''
  };

  var table = tableExample.querySelector('forge-table');
  table.selectKey = 'Id';
  table.select = true;
  table.data = displayData;
  
  table.tooltipSelectAll = "Select All";
  // table.tooltipSelect = "Select";
  table.tooltipSelect = (rowIndex, rowData) => {
    return rowData.Name;
  }

  table.columnConfigurations = columnConfigurations;
  table.onRowCreated = function (rowElement, rowIndex, rowData) {
    rowElement.id = 'custom-row-id-' + rowIndex;
  };
  table.onCellCreated = (cellElement, rowIndex, columnIndex) => {
    cellElement.id = 'custom-cell-id-' + rowIndex + '-' + columnIndex;
  };

  // Event listeners
  table.addEventListener('forge-table-sort', function (evt) {
    console.log('[table] forge-table-sort:', evt.detail);
    if (Array.isArray(evt.detail)) {
      table.data = sortMultiColumnData(evt.detail)
      return;
    }

    sortDirection = evt.detail.direction;
    sortPropertyName = columnConfigurations[evt.detail.columnIndex].property;
    table.data = sortData();
  });
  table.addEventListener('forge-table-column-resize', function (evt) {
    console.log('[table] forge-table-column-resize:', evt.detail);
  });

  table.addEventListener('forge-table-select', function (evt) {
    console.log('[table] forge-table-select:', evt.detail);
  });

  table.addEventListener('forge-table-select-double', function (evt) {
    console.log('[table] forge-table-select-double:', evt.detail);
    alert('forge-select-double event: ' + evt.detail.index);
  });

  table.addEventListener('forge-table-row-click', function (evt) {
    console.log('[table] forge-table-row-click:', evt.detail);
  });

  table.addEventListener('forge-table-select-all', function (evt) {
    console.log('[table] forge-table-select-all:', evt.detail);
  });

  table.addEventListener('forge-table-filter', function (evt) {
    console.log('[table] forge-table-filter:', evt.detail);

    displayData = [].concat(data);
    switch (evt.detail.columnIndex) {
      case 0:
        if (evt.detail.value.length === 0) {
          tableFilter.Name = '';
        } else {
          tableFilter.Name = evt.detail.value;
        }
        break;
      case 1:
        if (evt.detail.value.length === 0) {
          tableFilter.Age = null;
        } else {
          tableFilter.Age = evt.detail.value;
        }
        break;
      case 2:
        if (evt.detail.value.length === 0) {
          tableFilter.Position = '';
        } else {
          tableFilter.Position = evt.detail.value;
        }
        break;
    }

    if (tableFilter.Name.length || tableFilter.Age !== null || tableFilter.Position.length) {
      displayData = data.filter(function (p) {
        if (tableFilter.Name.length && p.Name.toLowerCase().indexOf(tableFilter.Name.toLowerCase()) === -1) {
          return false;
        }

        if (tableFilter.Age !== null && p.Age.toString().indexOf(tableFilter.Age) === -1) {
          return false;
        }

        if (tableFilter.Position.length && p.Position.toLowerCase().indexOf(tableFilter.Position.toLowerCase()) === -1) {
          return false;
        }

        return true;
      });
    } else {
      displayData = [].concat(data);
    }

    table.data = sortData();
  });

  function getMenuColumnTemplate(rowIndex) {
    var forgeButton = document.createElement('forge-icon-button');
    var button = document.createElement('button');
    button.classList.add('tyler-icons');
    button.innerText = 'more_vert';
    forgeButton.appendChild(button);

    var menu = document.createElement('forge-menu');
    menu.placement = 'bottom-right';
    menu.options = [
      { value: 'delete', label: 'Delete', icon: 'delete' },
      { value: 'edit', label: 'Edit', icon: 'edit' }
    ];
    menu.addEventListener('forge-menu-select', function (evt) {
      console.log('forge-menu-select', rowIndex, evt.detail);
      if (evt.detail.value === 'delete') {
        data.splice(rowIndex, 1);
        table.data = data;
      }
    });
    menu.appendChild(forgeButton);

    return menu;
  }

  function getExpandRowColumnTemplate(rowIndex) {
    var iconButton = document.createElement('forge-icon-button');
    var button = document.createElement('button');
    button.classList.add('tyler-icons');
    button.innerText = 'chevron_right';
    iconButton.appendChild(button);

    button.addEventListener('click', function (evt) {
      if (table.isRowExpanded(rowIndex)) {
        table.collapseRow(rowIndex);
      } else {
        table.expandRow(rowIndex, buildRowTemplate(rowIndex));
      }
    });

    return { 
      content: iconButton,
      stopClickPropagation: true
    };
  }

  function buildRowTemplate(rowIndex) {
    var div = document.createElement('div');
    div.classList.add('forge-table-expandable-row');
    div.textContent = 'Expanded row: ' + rowIndex;
    return div;
  }

  function sortData() {
    if (sortPropertyName.length) {
      return [...displayData].sort(function (a, b) {
        // console.log(displayData);
        // console.log(sortDirection);
        if (sortDirection === 'DESC') {
          return b[sortPropertyName].toString().localeCompare(a[sortPropertyName]);
        } else if (sortDirection === 'ASC') {
          return a[sortPropertyName].toString().localeCompare(b[sortPropertyName]);
        } else {
          return 0;
        }
      });
    } else {
      return displayData;
    }
  }

  function sortMultiColumnData(columns) {
    if (columns.length) {
      return [...displayData].sort(function (a, b) {
        let i = 0, result = 0;
        columns = columns.sort(function (a, b) { a.sortOrder - b.sortOrder });
        while (i < columns.length && result === 0) {
          result = (columns[i].direction === 'ASC' ? -1 : 1) * (a[columns[i].propertyName].toString() < b[columns[i].propertyName].toString() ? -1 : (a[columns[i].propertyName].toString() > b[columns[i].propertyName].toString() ? 1 : 0));
          i++;
        }
        return result;
      });
    } else {
      return displayData;
    }
  }

  function getSelectAllTemplate() { return '<div style="display: flex; flex-direction: row; align-items: center"><forge-checkbox><input type="checkbox" /> </forge-checkbox> <forge-button><button type="button">Custom</button></forge-button></div>' }

  table.data = sortData();
})(window.Forge.lib);
