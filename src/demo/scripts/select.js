(function() {
  var example = document.getElementById('Select');
  var selectDropdown = example.querySelector('#select-dropdown');
  var selectGroupComponent = example.querySelector('#select-group');
  var selectAddonAll = example.querySelector('#select-addon-all');
  var selectAllCheckbox = selectAddonAll.querySelector('#select-all');
  var groupData = [
    {
      text: 'Fruits',
      options: [
        { label: 'Apple', value: 'apple'},
        { label: 'Banana', value: 'banana'},
        { label: 'Grapes', value: 'grapes'}
      ]
    },
    { 
      text: 'Grains', 
      options: [
        { label: 'Bread', value: 'bread' },
        { label: 'Cereal', value: 'cereal' },
        { label: 'Rice', value: 'rice' },
        { label: 'Pasta', value: 'pasta' }
      ]
    },
    {
      text: 'Vegetables',
      options: [
        { label: 'Carrot', value: 'carrot'},
        { label: 'Bok choy', value: 'bokChoy'},
        { label: 'Broccoli', value: 'broccoli'}
      ]
    }
  ];
  selectGroupComponent.options = groupData;

  selectAllCheckbox.addEventListener('change', function() {
    if (selectAllCheckbox.checked) {
      selectAddonAll.selectAll();
    } else {
      selectAddonAll.deselectAll();
    }
  });

  selectDropdown.selectedTextBuilder = function(options) {
    var option = options[0];
    return option ? 'Selected: ' + option.label : 'Choose...';
  };
})();