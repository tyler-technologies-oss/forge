export default function (plop) {
  // Scaffold out the file structure for a new component
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
        transform: value => value.trim(),
        validate: value => {
          if (/\S+/.test(value)) {
            return true;
          }
          return 'Component name is required';
        }
      },
      {
        type: 'confirm',
        name: 'hasCoreAdapter',
        message: 'Does this component use a core + adapter?',
        default: true
      },
      {
        type: 'confirm',
        name: 'hasStyles',
        message: 'Does this component need styles?',
        default: true
      },
      {
        type: 'confirm',
        name: 'hasTokens',
        message: 'Does this component define its own tokens?',
        default: true,
        when: answers => answers.hasStyles
      },
      {
        type: 'confirm',
        name: 'hasDemo',
        message: 'Do you want to create a demo page?',
        default: true
      },
      {
        type: 'confirm',
        name: 'hasStory',
        message: 'Do you want to create Storybook docs?',
        default: true
      }
    ],
    actions(answers) {
      const actions = [
        {
          type: 'addMany',
          destination: 'src/lib/{{dashCase name}}',
          base: 'templates/component-base',
          templateFiles: 'templates/component-base/**'
        },
        {
          type: 'addMany',
          destination: 'src/lib/{{dashCase name}}',
          base: 'templates/component-test',
          templateFiles: 'templates/component-test/**'
        }
      ];

      if (answers.hasCoreAdapter) {
        actions.push({
          type: 'addMany',
          destination: 'src/lib/{{dashCase name}}',
          base: 'templates/component-core-adapter',
          templateFiles: 'templates/component-core-adapter/**'
        });
      } else {
        actions.push({
          type: 'add',
          path: 'src/lib/{{dashCase name}}/{{dashCase name}}.ts',
          templateFile: 'templates/component-lite/component.ts.hbs'
        });
      }

      if (answers.hasStyles) {
        actions.push({
          type: 'addMany',
          destination: 'src/lib/{{dashCase name}}',
          base: 'templates/component-styles',
          templateFiles: 'templates/component-styles/**'
        });

        if (answers.hasTokens) {
          actions.push({
            type: 'add',
            path: 'src/lib/{{dashCase name}}/_tokens-utils.scss',
            templateFile: 'templates/tokens/_token-utils.scss.hbs'
          });
          actions.push({
            type: 'add',
            path: 'src/lib/core/styles/tokens/{{dashCase name}}/_tokens.scss',
            templateFile: 'templates/tokens/_tokens.scss.hbs'
          });
        }
      }

      if (answers.hasStory) {
        actions.push({
          type: 'addMany',
          destination: 'src/stories/components/{{dashCase name}}',
          base: 'templates/storybook',
          templateFiles: 'templates/storybook/**'
        });
      }

      if (answers.hasDemo) {
        actions.push({
          type: 'addMany',
          destination: 'src/dev/pages/{{dashCase name}}',
          base: 'templates/demo',
          templateFiles: 'templates/demo/**'
        });
      }

      return actions;
    }
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
        path: 'src/lib/{{dashCase name}}/_tokens-utils.scss',
        templateFile: 'templates/tokens/_token-utils.scss.hbs'
      },
      {
        type: 'add',
        path: 'src/lib/core/styles/tokens/{{dashCase name}}/_tokens.scss',
        templateFile: 'templates/tokens/_tokens.scss.hbs'
      }
    ]
  });

  // Scaffold out a new demo page for a component
  plop.setGenerator('demo', {
    description: 'Create a new demo page for a component',
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
        destination: 'src/dev/pages/{{dashCase name}}',
        base: 'templates/demo',
        templateFiles: 'templates/demo/**'
      }
    ]
  });

  // Scaffold out a new storybook page for a component
  plop.setGenerator('story', {
    description: 'Create a new Storybook page for a component',
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
        destination: 'src/stories/components/{{dashCase name}}',
        base: 'templates/storybook',
        templateFiles: 'templates/storybook/**'
      }
    ]
  });
}
