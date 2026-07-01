import{b as e}from"./iframe-BgHZI532.js";import"./service-adapter-8tADcN_b.js";import"./card-DU5j9pEq.js";import"./scaffold-BAVRvYZ-.js";import"./button-D4I2Jx_K.js";import"./focus-indicator-CCrT9cli.js";import"./state-layer-CKPcsXao.js";import"./text-field-Q4OOc2wN.js";import"./base-field-PHdCEj9t.js";import"./label-CCJpr-qV.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import{s as n}from"./decorators-DKm5eYjY.js";import"./preload-helper-PPVm8Dsz.js";import"./base-lit-element-Be-M9uuG.js";import"./directive-jorct-Oe.js";import"./utils-DU-9AqTO.js";import"./base-component-CjLGUkBU.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./constants-mjcpBxJK.js";import"./feature-detection-DaAsmZBy.js";import"./base-adapter-CWZvffxF.js";import"./tyler-icons-CsheopFW.js";import"./base-button-core-BFaUUBKm.js";import"./with-label-aware-BTfOA73Y.js";import"./with-default-aria-B469Hs3U.js";import"./a11y-utils-Cc0M_rsz.js";import"./button-constants-BCAqtVHo.js";import"./icon-button-n3fs9knp.js";import"./icon-button-constants-CcGPrq8W.js";import"./tooltip-CE7u4Ary.js";import"./overlay-CX_m1mvq.js";import"./with-longpress-listener-D3f6tu0y.js";import"./dismissible-stack-xq-0Rg1q.js";import"./button-toggle-group-constants-CeBNz6Zr.js";import"./checkbox-constants-C4OOV8dY.js";import"./switch-constants-BYeSq8KE.js";import"./_commonjsHelpers-CqkleIqs.js";const P={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
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
}`,...t.parameters?.docs?.source}}};const R=["ClippingExample","NoClippingExample","NoClippingFixExample"];export{o as ClippingExample,r as NoClippingExample,t as NoClippingFixExample,R as __namedExportsOrder,P as default};
