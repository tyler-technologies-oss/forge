export const AutocompleteSearchFieldCodeHtml = () => {
  return `<forge-autocomplete>
  <forge-text-field>
    <input type="text" id="incident" />
    <label for="incident">Search for incidents</label>
    <forge-icon slot="trailing" name="search"></forge-icon
  </forge-text-field>
</forge-autocomplete>`;
};

export const AutocompleteSearchFieldCodeTs = () => {
  return `
  const incidents: IIncidentOption[] = [
    {
      label: 'Downed powerlines',
      incidentNumber: '572',
      assignee: 'Bruce Wayne',
      primaryPerson: 'Mark Graffam',
      value: '572'
    },
    {
      label: 'Graffiti',
      incidentNumber: '632',
      assignee: 'Judy Hopps',
      primaryPerson: 'Flash flash hundred yard dash',
      value: '632'
    },
    {
      label: 'Graffiti',
      incidentNumber: '877',
      assignee: 'Vhils',
      primaryPerson: 'Knight of the Order of Saint James of the Sword',
      value: '877'
    },
    {
      label: 'Downed powerlines',
      incidentNumber: '372',
      assignee: 'Graff Johnson',
      primaryPerson: 'John Smith',
      value: '372'
    },
    // etc...
  ];
const filter = (filterText, value) => {
  return incidents.filter(item  => {
    const number = item.incidentNumber.toLowerCase().includes(filterText.toLowerCase());
      const label = item.label.toLowerCase().includes(filterText.toLowerCase());
      const assignee = item.assignee.toLowerCase().includes(filterText.toLowerCase());
      const primaryPerson = item.primaryPerson.toLowerCase().includes(filterText.toLowerCase());
      const result = !!label
        ? label
        : !!assignee
          ? assignee
            : !!primaryPerson
              ? primaryPerson
              : !!number
                ? number
                : undefined;
      return result;
  });
};
autocomplete.filter = filter;

const optionBuilder = (option: IIncidentOption, filterText: string, listItem: IListItemComponent) => { 
  listItem.twoLine = !!option.assignee || !!option.primaryPerson;  

  const optionDiv = document.createElement('div');
  optionDiv.style.display = 'flex';
  optionDiv.style.flexDirection = 'row';  

  const iconEl = document.createElement('forge-icon');
  iconEl.name = 'assignment';
  iconEl.style.paddingRight = '16px';
  optionDiv.appendChild(iconEl);

  const textContainerDiv = document.createElement('div');
  textContainerDiv.style.flex = '1 1 0.0001px';
  textContainerDiv.style.minWidth = '0';
  optionDiv.appendChild(textContainerDiv);  

  const labelDiv = document.createElement('div');
  labelDiv.classList.add('forge-typography--body1');
  labelDiv.textContent = \`Incident \${option.incidentNumber}: \${option.label}\`;
  textContainerDiv.appendChild(labelDiv);

  if (option.assignee && option.assignee.toLowerCase().includes(filterText.toLowerCase())) {
    const assigneeDiv = document.createElement('div');
    assigneeDiv.classList.add('forge-typography--subtitle2');
    assigneeDiv.style.whiteSpace = 'nowrap';
    assigneeDiv.style.textOverflow = 'ellipsis';
    assigneeDiv.style.overflow = 'hidden';
    assigneeDiv.textContent = \`Assignee: \${option.assignee}\`;
    textContainerDiv.appendChild(assigneeDiv);
  }  
  if (option.primaryPerson && option.primaryPerson.toLowerCase().includes(filterText.toLowerCase())) {
    const primaryPersonDiv = document.createElement('div');
    primaryPersonDiv.classList.add('forge-typography--subtitle2');
    primaryPersonDiv.style.whiteSpace = 'nowrap';
    primaryPersonDiv.style.textOverflow = 'ellipsis';
    primaryPersonDiv.style.overflow = 'hidden';
    primaryPersonDiv.textContent = \`Primary person: \${option.primaryPerson}\`;
    textContainerDiv.appendChild(primaryPersonDiv);
  }  
  return optionDiv;
};
autocomplete.optionBuilder = optionBuilder;`
};