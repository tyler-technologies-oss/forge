(function() {
  var tylIconActionLauncher = {
    name: 'action_launcher',
    data: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M19.4 8.9h-6.3L17.5 2H9.4L4.6 13.7h5.6L7.3 22z"/></svg>'
  };
  Forge.lib.IconRegistry.define(tylIconActionLauncher);

  var example = document.querySelector('#Icon');
  var registryIcon = example.querySelector('#late-registry-icon');

  // For icons that are loaded after initial render, we need to manually call layout on them...
  registryIcon.layout();
})();
