import{x as e}from"./iframe-aLJo785t.js";import"./service-adapter-CffG5Lhq.js";import"./card-BAfhtDfB.js";import"./scaffold-BrokB2Ba.js";import"./button-CAXl3FKc.js";import"./focus-indicator-BYHHNw4I.js";import"./state-layer-BEEsPoZf.js";import"./text-field-DTPf9kcV.js";import"./base-field-B0-OG4LL.js";import"./label-BtZLFMp2.js";import"./index-DTwfV0k0.js";import"./button-toggle-group-cmFHWZcw.js";import"./checkbox-DuE98e41.js";import"./icon-button-B9l1618B.js";import"./icon-Uwxy940_.js";import"./switch-im3giyJV.js";import{s as n}from"./decorators-DRUNm1ly.js";import"./preload-helper-PPVm8Dsz.js";import"./property-Btdv5Qza.js";import"./utils-Bd6MGx91.js";import"./base-lit-element-DUSJv6CV.js";import"./constants-DzQy6WDX.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./base-button-adapter-DnQ_SE31.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./tooltip-KOXasit9.js";import"./overlay-DbqVLn-W.js";import"./with-longpress-listener-DtGZwA0v.js";import"./dismissible-stack-TpzCxM2R.js";import"./with-form-associated-DNJXxTFO.js";import"./_commonjsHelpers-CqkleIqs.js";const G={title:"FAQ/Focus Indicator Clipping",tags:["hidden"],parameters:{controls:{disable:!0},actions:{disable:!0}}},o={decorators:[n(`
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
  render: () => {
    return html\`
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
    \`;
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
      forge-scaffold > [slot="body"] > *:not(:last-child) {
        margin-block-end: var(--forge-spacing-medium);
      }

      .my-scaffold-body {
        padding: var(--forge-spacing-medium);
      }
    \`)],
  render: () => {
    return html\`
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
    \`;
  }
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
  render: () => {
    return html\`
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
    \`;
  }
}`,...t.parameters?.docs?.source}}};const H=["ClippingExample","NoClippingExample","NoClippingFixExample"];export{o as ClippingExample,r as NoClippingExample,t as NoClippingFixExample,H as __namedExportsOrder,G as default};
