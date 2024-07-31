export default function (plop) {
  // Create a new component
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/lib/{{dashCase name}}',
        base: 'templates/component',
        templateFiles: 'templates/component/**'
      }
    ]
  });
}
