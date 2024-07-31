export default function (plop) {
  // Scaffold out the file structure for a new component
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
      },
      {
        type: 'add',
        path: 'src/lib/core/styles/tokens/{{dashCase name}}/_tokens.scss',
        templateFile: 'templates/tokens/_tokens.scss.hbs'
      }
    ]
  });

  // Scaffold out a new tokens file in core styles for a component
  plop.setGenerator('tokens', {
    description: 'Create a new tokens file for a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/lib/core/styles/tokens/{{dashCase name}}/_tokens.scss',
        templateFile: 'templates/tokens/_tokens.scss.hbs'
      }
    ]
  });
}
