export const AutocompleteDefaultCodeHtml = () => {
  return `<forge-autocomplete>
  <forge-text-field>
    <input type="text" id="state" />
    <label for="state">Choose state</label>
    <forge-icon slot="trailing" name="arrow_drop_down" data-forge-dropdown-icon></forge-icon
  </forge-text-field>
</forge-autocomplete>`;
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
//    - If no filter value is provided, return a sub-set of pre-filtered data (for initial load).`
};

export const AutocompleteDefaultCodeBlazor = () => {
  return `<ForgeAutoComplete FilterFunc="AutoCompleteFilter">
  <ForgeTextField Label="Choose State" TrailingIcon="arrow_drop_down" />
</ForgeAutoComplete>

@code {
  Task<List<Option<string>> AutoCompleteFilter(AutoCompleteFilterData data)
  {
    var options = new List<Option<string>>();
    options.Add(new Option<string>() { Label = "Alabama", Value = "AL" });
    options.Add(new Option<string>() { Label = "Alaska", Value = "AK" });
    options.Add(new Option<string>() { Label = "Arizona", Value = "AZ" });
    return Task.FromResult(options);
  }
}`;
};
