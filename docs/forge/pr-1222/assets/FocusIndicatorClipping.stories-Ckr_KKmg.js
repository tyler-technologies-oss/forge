import{b as e}from"./iframe-0q-2v6p2.js";import"./service-adapter-8tADcN_b.js";import"./card-CPxRRzBX.js";import"./scaffold-DlnKxn3X.js";import"./button-DZYdKhTn.js";import"./focus-indicator-CoriJI7e.js";import"./state-layer-mJUCxnSJ.js";import"./text-field-Bq18GTiN.js";import"./base-field-BLyxUt4_.js";import"./label-6L8FSsax.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import{s as n}from"./decorators-BWRjw2Ta.js";import"./preload-helper-PPVm8Dsz.js";import"./base-lit-element-Bvl_v6RJ.js";import"./directive-CwRn8Fwj.js";import"./utils-DU-9AqTO.js";import"./base-component-BcqNuJgA.js";import"./utils-BBsKBbSu.js";import"./constants-C8FIXqZ0.js";import"./feature-detection-CRito7YV.js";import"./platform-C5RrLkNt.js";import"./base-adapter-C389HZc_.js";import"./dom-utils-CRnY3o4F.js";import"./tyler-icons-DfvsIf_8.js";import"./base-button-core-CBbfkbS9.js";import"./with-label-aware-BCtp5F9i.js";import"./with-default-aria-C1zfJxsY.js";import"./a11y-utils-J2po7a_p.js";import"./button-constants-BYc3Vkj-.js";import"./icon-button-wRobUPyU.js";import"./icon-button-constants-CuArO63Z.js";import"./tooltip-D4AerAD0.js";import"./overlay-DD5-5Cd-.js";import"./with-longpress-listener-D2FEOwr-.js";import"./dismissible-stack-xq-0Rg1q.js";import"./button-toggle-group-constants-DEr-8Y2E.js";import"./checkbox-constants-B-M7hLil.js";import"./switch-constants-B2dyMMoE.js";import"./_commonjsHelpers-CqkleIqs.js";const R={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }
    `)],render:()=>e`
    <forge-card>
      <forge-scaffold>
        <div slot="body">
          <forge-text-field>
            <label for="my-input">My Input</label>
            <input id="my-input" type="text" />
          </forge-text-field>
          <forge-button>My Button</forge-button>
        </div>
      </forge-scaffold>
    </forge-card>
  `},r={decorators:[n(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    `)],render:()=>e`
    <forge-card class="my-card">
      <forge-scaffold>
        <div slot="body" class="my-scaffold-body">
          <forge-text-field>
            <label for="my-input">My Input</label>
            <input id="my-input" type="text" />
          </forge-text-field>
          <forge-button>My Button</forge-button>
        </div>
      </forge-scaffold>
    </forge-card>
  `},t={decorators:[n(`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-card {
        --forge-card-padding: 0;
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    `)],render:()=>e`
    <forge-card class="my-card">
      <forge-scaffold>
        <div slot="body" class="my-scaffold-body">
          <forge-text-field>
            <label for="my-input">My Input</label>
            <input id="my-input" type="text" />
          </forge-text-field>
          <forge-button>My Button</forge-button>
        </div>
      </forge-scaffold>
    </forge-card>
  `};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }
    \`)],
  render: () => html\`
    <forge-card>
      <forge-scaffold>
        <div slot="body">
          <forge-text-field>
            <label for="my-input">My Input</label>
            <input id="my-input" type="text" />
          </forge-text-field>
          <forge-button>My Button</forge-button>
        </div>
      </forge-scaffold>
    </forge-card>
  \`
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    \`)],
  render: () => html\`
    <forge-card class="my-card">
      <forge-scaffold>
        <div slot="body" class="my-scaffold-body">
          <forge-text-field>
            <label for="my-input">My Input</label>
            <input id="my-input" type="text" />
          </forge-text-field>
          <forge-button>My Button</forge-button>
        </div>
      </forge-scaffold>
    </forge-card>
  \`
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-card {
        --forge-card-padding: 0;
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    \`)],
  render: () => html\`
    <forge-card class="my-card">
      <forge-scaffold>
        <div slot="body" class="my-scaffold-body">
          <forge-text-field>
            <label for="my-input">My Input</label>
            <input id="my-input" type="text" />
          </forge-text-field>
          <forge-button>My Button</forge-button>
        </div>
      </forge-scaffold>
    </forge-card>
  \`
}`,...t.parameters?.docs?.source}}};const T=["ClippingExample","NoClippingExample","NoClippingFixExample"];export{o as ClippingExample,r as NoClippingExample,t as NoClippingFixExample,T as __namedExportsOrder,R as default};
