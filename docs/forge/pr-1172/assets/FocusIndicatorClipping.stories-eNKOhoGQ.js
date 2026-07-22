import{b as e}from"./iframe-CjzVpfqS.js";import"./service-adapter-8tADcN_b.js";import"./card-lohytUav.js";import"./scaffold-B3wC-6gb.js";import"./button-RZbwlICz.js";import"./text-field-B9xZ2Bp8.js";import"./base-field-Cab5qth9.js";import"./focus-indicator-DHikC1Y8.js";import"./label-DcyIgUN2.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-toggle-group-CizYn0Bm.js";import"./checkbox-px03cLLv.js";import"./icon-button-Y8A9ultm.js";import"./tyler-icons-J8-UQPDE.js";import"./switch-xZjZ3ZX2.js";import{s as n}from"./decorators-Cehc2pnO.js";import"./preload-helper-PPVm8Dsz.js";import"./base-lit-element-D28pwoeu.js";import"./directive-CwRn8Fwj.js";import"./utils-DU-9AqTO.js";import"./base-component-CYrqcnEP.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./constants-scFqwPpP.js";import"./feature-detection-CvbR5w2Z.js";import"./state-layer-BCX73D4o.js";import"./base-adapter-Dc6xHI12.js";import"./base-button-BqGhclOZ.js";import"./base-Dnf9m7-Y.js";import"./query-assigned-elements-BiGvSZm7.js";import"./a11y-utils-BtLz16ul.js";import"./class-map-BraAMXTq.js";import"./tooltip-DD6ZsOiy.js";import"./overlay-BUaUM1sf.js";import"./with-longpress-listener-5SwIGzn_.js";import"./dismissible-stack-xq-0Rg1q.js";import"./with-default-aria-Bs3XhyPE.js";import"./with-label-aware-Cv_TQB0N.js";import"./_commonjsHelpers-CqkleIqs.js";const R={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
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
