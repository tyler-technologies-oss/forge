export const AutocompleteDefaultCodeHtml = () => {
  return `
<forge-autocomplete>
  <forge-text-field>
    <label for="state">Choose state</label>
    <input type="text" id="state" />
    
    <!-- You can optionally provide a clear button with a data-forge-autocomplete-clear attribute that will be detected automatically. -->
    <forge-icon-button data-forge-autocomplete-clear slot="trailing" dense density="3">
      <forge-icon name="close"></forge-icon>
    </forge-icon-button>

    <!-- The existence of the data-forge-dropdown-icon attribute controls the open state rotation automatically. -->
    <forge-icon slot="trailing" name="arrow_drop_down" data-forge-dropdown-icon></forge-icon>
  </forge-text-field>
</forge-autocomplete>
  `;
};

export const AutocompleteDefaultCodeTs = () => {
  return `
const states = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  // etc...
];
autocomplete.value = states;
const filter = (filterText, value) => {
  return states.filter(item  => item.label.toLowerCase().includes(filterText.toLowerCase()));
};
autocomplete.filter = filter;
// Return the data as an array of IOption types
//    - Could call a service here and return a promise to the autocomplete
//    - Could filter static data and return it directly here.
//    - If no filter value is provided, return a sub-set of pre-filtered data (for initial load).
  `;
};
