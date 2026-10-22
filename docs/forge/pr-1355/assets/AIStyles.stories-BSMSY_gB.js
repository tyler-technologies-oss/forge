import{b as t}from"./iframe-B2G4zKPj.js";import{s as r}from"./utils-2_OYILP2.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-Llo7YDQM.js";import"./label-D1p99XXI.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./base-field-i1QPAbu6.js";import"./focus-indicator-bDn075UK.js";import"./linear-progress-BNAgl3n6.js";import"./list-CWBEI486.js";import"./popover-l-fAYctd.js";import"./overlay-DWH89yjz.js";import"./skeleton-HIoiQfSw.js";import"./icon-CzY8gUKj.js";import"./list-item-Cy6LxyEf.js";import"./text-field-CStdahpR.js";import"./checkbox-BAoyAqJd.js";import"./chip-set-CEmIH3lk.js";import"./state-layer-oVncPkRT.js";import"./date-picker-CwA54Kus.js";import"./calendar-BDLG8XWU.js";import"./icon-button-Dd9p4EqL.js";import"./date-range-picker-BA4jnfo9.js";import"./radio-group-CSGkvXVs.js";import"./option-group-CNQVuVA6.js";import"./select-dropdown-lAUiWRBT.js";import"./select-DXofdOy4.js";import"./stack-p3E4so40.js";import"./switch-DsxJTttj.js";import"./time-picker-CzcPht0z.js";import"./preload-helper-PPVm8Dsz.js";import"./custom-element-DR9AFpIK.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./core-property-Co8uF8PW.js";import"./dom-utils-DExKgbbf.js";import"./tyler-icons-6f2n3B-C.js";import"./divider-Bq2uY91e.js";import"./property-SPSYPiJ5.js";import"./base-lit-element-jhkq3ECX.js";import"./async-directive-BP2vb57q.js";import"./directive-CwRn8Fwj.js";import"./utils-srtmqB2N.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./list-dropdown-aware-core-C1ioOSLR.js";import"./base-component-BFu9bkgC.js";import"./list-dropdown-CkrN6GbZ.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./scroll-axis-observer-DmuibK9q.js";import"./object-utils-CUPteeNI.js";import"./base-adapter-CG4WlmkL.js";import"./button-constants-DRqTH6Pv.js";import"./button-toggle-group-constants-CvfmN-z8.js";import"./checkbox-constants-BJ3elUIK.js";import"./icon-button-constants-JHHxiN9v.js";import"./switch-constants-BZVST_qJ.js";import"./with-label-aware-B4Q13qtt.js";import"./floating-ui.dom-DaMtbvS2.js";import"./with-element-internals-DChZslLI.js";import"./a11y-utils-D_hXjxHZ.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-j9Qzt-d1.js";import"./event-utils-zQ4FLDwK.js";import"./tooltip-DdRl_dqo.js";import"./with-form-associated-BszPp0MC.js";import"./base-date-picker-core-DJZgXOW6.js";import"./button-CrQUc-I0.js";import"./class-map-BsyfRX0P.js";import"./base-button-DTSPJNju.js";import"./state-D0NMu0LN.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./context-root-BrWOZWcP.js";import"./consume-DtITIqjN.js";import"./custom-element-C-crYl4r.js";import"./circular-progress-BAYLkjmK.js";import"./scaffold-Ca9xBuAs.js";import"./toolbar-C4ep4NAp.js";import"./style-map-eDl7Fh05.js";import"./dialog-DoQxHo6b.js";import"./backdrop-ngk7d2eo.js";const p=["Summarize","Translate","Rewrite","Explain"].map(e=>({label:e,value:e})),c=["outlined","tonal","filled","raised","plain"],g=e=>p.filter(({label:n})=>n.toLowerCase().includes((e??"").toLowerCase())),He={title:"Getting Started/AI Styles Examples",tags:["hidden"]},o={...r,render:()=>t`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-text-field">Prompt</label>
        <input type="text" id="ai-text-field" value="Summarize this document" />
        <span slot="support-text">Describe what you want to generate</span>
      </forge-text-field>

      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-textarea">Notes</label>
        <textarea id="ai-textarea">Keep it short and friendly.</textarea>
      </forge-text-field>

      <forge-select class="forge-ai" label="Tone" value="friendly">
        <forge-option value="friendly">Friendly</forge-option>
        <forge-option value="formal">Formal</forge-option>
        <forge-option value="concise">Concise</forge-option>
      </forge-select>

      <forge-chip-field class="forge-ai">
        <label slot="label" for="ai-chip-field">Topics</label>
        <input type="text" id="ai-chip-field" />
        <forge-chip slot="member" type="field">Reports</forge-chip>
        <forge-chip slot="member" type="field">Budgets</forge-chip>
      </forge-chip-field>
    </forge-stack>
  `},a={...r,render:()=>t`
    <forge-stack gap="24" style="max-width: 400px">
      ${c.map(e=>t`
          <forge-text-field class="forge-ai" variant=${e}>
            <label slot="label" for=${`ai-variant-${e}`}>${e[0].toUpperCase()}${e.slice(1)}</label>
            <input type="text" id=${`ai-variant-${e}`} />
          </forge-text-field>
        `)}
    </forge-stack>
  `},i={...r,render:()=>t`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai" invalid>
        <label slot="label" for="ai-invalid">Invalid</label>
        <input type="text" id="ai-invalid" />
        <span slot="support-text">Invalid fields keep their error styling</span>
      </forge-text-field>

      <forge-text-field class="forge-ai" disabled>
        <label slot="label" for="ai-disabled">Disabled</label>
        <input type="text" id="ai-disabled" disabled />
      </forge-text-field>
    </forge-stack>
  `},l={...r,render:()=>t`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-autocomplete class="forge-ai" .filter=${g}>
        <forge-text-field popover-icon>
          <label for="ai-autocomplete">Suggested action</label>
          <input type="text" id="ai-autocomplete" />
        </forge-text-field>
      </forge-autocomplete>

      <forge-date-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-picker">Date</label>
          <input type="text" id="ai-date-picker" autocomplete="off" />
        </forge-text-field>
      </forge-date-picker>

      <forge-date-range-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-range-start">Date range</label>
          <input type="text" id="ai-date-range-start" autocomplete="off" />
          <input type="text" id="ai-date-range-end" autocomplete="off" />
        </forge-text-field>
      </forge-date-range-picker>

      <forge-time-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-time-picker">Time</label>
          <input type="text" id="ai-time-picker" autocomplete="off" />
        </forge-text-field>
      </forge-time-picker>
    </forge-stack>
  `},s={...r,render:()=>t`
    <forge-stack gap="24">
      <forge-stack inline wrap gap="16">
        <forge-checkbox class="forge-ai">Unchecked</forge-checkbox>
        <forge-checkbox class="forge-ai" checked>Checked</forge-checkbox>
        <forge-checkbox class="forge-ai" indeterminate>Indeterminate</forge-checkbox>
      </forge-stack>

      <forge-radio-group class="forge-ai" name="ai-radio">
        <forge-stack inline wrap gap="16">
          <forge-radio value="1">One</forge-radio>
          <forge-radio value="2" checked>Two</forge-radio>
          <forge-radio value="3">Three</forge-radio>
        </forge-stack>
      </forge-radio-group>

      <forge-stack inline wrap gap="16">
        <forge-switch class="forge-ai">Off</forge-switch>
        <forge-switch class="forge-ai" on>On</forge-switch>
      </forge-stack>
    </forge-stack>
  `},f={...r,render:()=>t`
    <forge-stack gap="24" style="max-width: 400px; --forge-ai-gradient-start: #ffd8a8; --forge-ai-gradient-end: #a5d8ff">
      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-custom">Custom colors</label>
        <input type="text" id="ai-custom" />
      </forge-text-field>

      <forge-stack inline wrap gap="16">
        <forge-checkbox class="forge-ai" checked>Checkbox</forge-checkbox>
        <forge-switch class="forge-ai" on>Switch</forge-switch>
      </forge-stack>
    </forge-stack>
  `};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-text-field">Prompt</label>
        <input type="text" id="ai-text-field" value="Summarize this document" />
        <span slot="support-text">Describe what you want to generate</span>
      </forge-text-field>

      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-textarea">Notes</label>
        <textarea id="ai-textarea">Keep it short and friendly.</textarea>
      </forge-text-field>

      <forge-select class="forge-ai" label="Tone" value="friendly">
        <forge-option value="friendly">Friendly</forge-option>
        <forge-option value="formal">Formal</forge-option>
        <forge-option value="concise">Concise</forge-option>
      </forge-select>

      <forge-chip-field class="forge-ai">
        <label slot="label" for="ai-chip-field">Topics</label>
        <input type="text" id="ai-chip-field" />
        <forge-chip slot="member" type="field">Reports</forge-chip>
        <forge-chip slot="member" type="field">Budgets</forge-chip>
      </forge-chip-field>
    </forge-stack>
  \`
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:'{\n  ...standaloneStoryParams,\n  render: () => html`\n    <forge-stack gap="24" style="max-width: 400px">\n      ${VARIANTS.map(variant => html`\n          <forge-text-field class="forge-ai" variant=${variant}>\n            <label slot="label" for=${`ai-variant-${variant}`}>${variant[0].toUpperCase()}${variant.slice(1)}</label>\n            <input type="text" id=${`ai-variant-${variant}`} />\n          </forge-text-field>\n        `)}\n    </forge-stack>\n  `\n}',...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai" invalid>
        <label slot="label" for="ai-invalid">Invalid</label>
        <input type="text" id="ai-invalid" />
        <span slot="support-text">Invalid fields keep their error styling</span>
      </forge-text-field>

      <forge-text-field class="forge-ai" disabled>
        <label slot="label" for="ai-disabled">Disabled</label>
        <input type="text" id="ai-disabled" disabled />
      </forge-text-field>
    </forge-stack>
  \`
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-autocomplete class="forge-ai" .filter=\${filterSuggestions}>
        <forge-text-field popover-icon>
          <label for="ai-autocomplete">Suggested action</label>
          <input type="text" id="ai-autocomplete" />
        </forge-text-field>
      </forge-autocomplete>

      <forge-date-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-picker">Date</label>
          <input type="text" id="ai-date-picker" autocomplete="off" />
        </forge-text-field>
      </forge-date-picker>

      <forge-date-range-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-range-start">Date range</label>
          <input type="text" id="ai-date-range-start" autocomplete="off" />
          <input type="text" id="ai-date-range-end" autocomplete="off" />
        </forge-text-field>
      </forge-date-range-picker>

      <forge-time-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-time-picker">Time</label>
          <input type="text" id="ai-time-picker" autocomplete="off" />
        </forge-text-field>
      </forge-time-picker>
    </forge-stack>
  \`
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-stack gap="24">
      <forge-stack inline wrap gap="16">
        <forge-checkbox class="forge-ai">Unchecked</forge-checkbox>
        <forge-checkbox class="forge-ai" checked>Checked</forge-checkbox>
        <forge-checkbox class="forge-ai" indeterminate>Indeterminate</forge-checkbox>
      </forge-stack>

      <forge-radio-group class="forge-ai" name="ai-radio">
        <forge-stack inline wrap gap="16">
          <forge-radio value="1">One</forge-radio>
          <forge-radio value="2" checked>Two</forge-radio>
          <forge-radio value="3">Three</forge-radio>
        </forge-stack>
      </forge-radio-group>

      <forge-stack inline wrap gap="16">
        <forge-switch class="forge-ai">Off</forge-switch>
        <forge-switch class="forge-ai" on>On</forge-switch>
      </forge-stack>
    </forge-stack>
  \`
}`,...s.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-stack gap="24" style="max-width: 400px; --forge-ai-gradient-start: #ffd8a8; --forge-ai-gradient-end: #a5d8ff">
      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-custom">Custom colors</label>
        <input type="text" id="ai-custom" />
      </forge-text-field>

      <forge-stack inline wrap gap="16">
        <forge-checkbox class="forge-ai" checked>Checkbox</forge-checkbox>
        <forge-switch class="forge-ai" on>Switch</forge-switch>
      </forge-stack>
    </forge-stack>
  \`
}`,...f.parameters?.docs?.source}}};const Je=["Fields","Variants","States","Pickers","Controls","Customization"];export{s as Controls,f as Customization,o as Fields,l as Pickers,i as States,a as Variants,Je as __namedExportsOrder,He as default};
