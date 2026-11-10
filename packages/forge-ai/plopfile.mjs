const STORY_GROUPS = ['Chat', 'Messages', 'Input & Context', 'Agents', 'Conversations', 'Tools & Reasoning', 'Artifacts', 'Containers', 'Primitives'];

const GROUP_PROMPT = {
  type: 'list',
  name: 'group',
  message: 'Storybook group',
  choices: STORY_GROUPS,
  default: 'Primitives'
};

const STORIES_DESTINATION = '../forge/src/stories/ai/{{dashCase name}}';

function transformComponentName(value) {
  return value.trim();
}

function validateComponentName(value) {
  if (/\S+/.test(value)) {
    return true;
  }
  return 'Component name is required';
}

export default function (plop) {
  // Story titles drop the `ai-` prefix since they already live under the `AI/` group
  plop.setHelper('storyTitle', name => plop.getHelper('titleCase')(plop.getHelper('sentenceCase')(name.replace(/^ai-/, ''))));

  // Scaffold out the file structure for a new component
  plop.setGenerator('component', {
    description: 'Create a new AI component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
        transform: transformComponentName,
        validate: validateComponentName
      },
      {
        type: 'confirm',
        name: 'hasStorybook',
        message: 'Do you want to create a Storybook page?',
        default: true
      },
      { ...GROUP_PROMPT, when: answers => answers.hasStorybook }
    ],
    actions(answers) {
      const actions = [
        {
          type: 'addMany',
          destination: 'src/lib/{{dashCase name}}',
          base: 'templates/component',
          templateFiles: 'templates/component/**'
        },
        {
          type: 'modify',
          path: 'src/lib/index.ts',
          pattern: /(\/\/ -- EXPORTS PLACEHOLDER \(DO NOT REMOVE\) --)/g,
          template: "export * from './{{dashCase name}}/index.js';\n$1"
        }
      ];

      if (answers.hasStorybook) {
        actions.push({
          type: 'addMany',
          destination: STORIES_DESTINATION,
          base: 'templates/storybook',
          templateFiles: 'templates/storybook/**'
        });
      }

      return actions;
    }
  });

  // Scaffold out a new Storybook page for a component (lives in packages/forge)
  plop.setGenerator('story', {
    description: 'Create a new Storybook page for a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
        transform: transformComponentName,
        validate: validateComponentName
      },
      GROUP_PROMPT
    ],
    actions: [
      {
        type: 'addMany',
        destination: STORIES_DESTINATION,
        base: 'templates/storybook',
        templateFiles: 'templates/storybook/**'
      }
    ]
  });
}
