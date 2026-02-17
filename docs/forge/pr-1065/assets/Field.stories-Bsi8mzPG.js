import{A as l,b as t}from"./iframe-BZH4nlqj.js";import{s as _,b as T,g as z,G as k}from"./utils-Cntew3lg.js";import{o as I}from"./style-map-CtAn6EL2.js";import{e as S}from"./class-map-3viaMiAP.js";import{n as L,e as w}from"./ref-B5HxkRBH.js";import{s as x}from"./decorators-DzVFejwJ.js";import"./service-adapter-CffG5Lhq.js";import"./base-field-0AJkS83p.js";import"./focus-indicator-DA-M5OAc.js";import"./label-DpXwgEPI.js";import"./index-DTwfV0k0.js";import"./button-DETyVr69.js";import"./state-layer-DGD4bZzf.js";import"./button-toggle-group-B-sohdc2.js";import"./checkbox-DWpNTejw.js";import"./icon-button-CZqCErUV.js";import"./tyler-icons-CBdZU-Tr.js";import"./switch-BuDNc7Vm.js";const E="forge-field",B={title:"Components/Field",component:E,render:e=>{const a=T(e),f=a?I(a):l,o=w();function c({target:n}){o.value&&(o.value.floatLabel=!!n.value)}return t`
      <forge-field
        ${L(o)}
        .labelPosition=${e.labelPosition}
        .labelAlignment=${e.labelAlignment}
        .variant=${e.variant}
        .theme=${e.theme}
        .shape=${e.shape}
        .density=${e.density}
        .dense=${e.dense}
        .popoverIcon=${e.popoverIcon}
        .popoverExpanded=${e.popoverExpanded}
        .supportTextInset=${e.supportTextInset}
        .floatLabel=${e.floatLabel||!!e.value}
        .multiline=${e.multiline}
        ?optional=${e.optional}
        ?disabled=${e.disabled}
        ?required=${e.required}
        ?invalid=${e.invalid}
        style=${f}>
        ${e.label.length?t`<label for="my-input">${e.label}</label>`:l}
        ${e.multiline?t`<textarea .value=${e.value} @input=${c}></textarea>`:t`<input id="my-input" type="text" .value=${e.value} @input=${c} />`}
        ${e.supportText.length?t`<span slot="support-text">${e.supportText}</span>`:l}
        ${e.supportTextEnd.length?t`<span slot="support-text-end">${e.supportTextEnd}</span>`:l}
      </forge-field>
    `},parameters:{actions:{disable:!0}},argTypes:{...z({tagName:E,exclude:["popoverTargetElement","focusIndicatorTargetElement","forgeIndicatorFocusMode","focusIndicatorAllowFocus"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...k,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),label:{control:{type:"text"}},value:{control:{type:"text"}},supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},multiline:{control:{type:"boolean"}}},args:{label:"Label",value:"",supportText:"",supportTextEnd:"",multiline:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:"none"}},r={decorators:[x(`
    forge-field {
      max-width: 320px;
    }
  `)]},p={..._,decorators:[x(`
    forge-field {
      max-width: 320px;

      [data-forge-field-input] {
        display: flex;
        align-items: center;
      }
    }
  `)],render:()=>t`
    <forge-field label-position="block-start">
      <span slot="label">Static label</span>
      <span data-forge-field-input>Static value text</span>
    </forge-field>
  `},d={parameters:{controls:{include:["label","value","supportText","showStartIcon","inset","invalid","disabled","variant","shape","density","multiline","showStartIcon","select"]}},args:{showStartIcon:!1,inset:!1,select:!1},decorators:[x(`
      .forge-field {
        max-width: 320px;
      }
    `)],render:({label:e,value:a,supportText:f,showStartIcon:o,multiline:c,inset:n,invalid:A,disabled:g,variant:u,shape:M,density:m,select:O,...F})=>{const s=w(),h=T(F),V=h?I(h):l,C={"forge-field":!0,"forge-field--invalid":A,"forge-field--rounded":M==="rounded","forge-field--plain":u==="plain","forge-field--tonal":u==="tonal","forge-field--filled":u==="filled","forge-field--raised":u==="raised","forge-field--extra-small":m==="extra-small","forge-field--small":m==="small","forge-field--large":m==="large","forge-field--extra-large":m==="extra-large"},y=t`<label for="my-css-only-input" class=${S({"forge-typography--label2":!n})}>${e}</label>`;function v({target:i}){$(i,{animate:!0})}function $(i,{animate:P=!1}){const b=!!i.value;s.value?.classList.toggle("forge-field--float-label",b),P&&(s.value?.classList.toggle("forge-field--float-label-in",b),s.value?.classList.toggle("forge-field--float-label-out",!b))}a&&requestAnimationFrame(()=>{const i=s.value?.querySelector("input,select,textarea");$(i,{animate:!1})});const H=t`<textarea @input=${n?v:l} id="my-css-only-input" .disabled=${g} .value=${a}></textarea>`,R=t`<input @input=${n?v:l} type="text" id="my-css-only-input" .disabled=${g} value=${a} />`,q=t`
      <select @change=${n?v:l} id="my-css-only-input" .disabled=${g} .value=${a}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    `;return t`
      ${n?l:y}
      <div ${L(s)} class=${S(C)} style=${V}>
        ${n?y:l}
        ${o?t`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>`:l}
        ${c?H:O?q:R}
      </div>
      ${f?t`<span class="forge-typography--label1">${f}</span>`:l}
    `}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
    forge-field {
      max-width: 320px;
    }
  \`)]
}`,...r.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  decorators: [storyStyles(\`
    forge-field {
      max-width: 320px;

      [data-forge-field-input] {
        display: flex;
        align-items: center;
      }
    }
  \`)],
  render: () => html\`
    <forge-field label-position="block-start">
      <span slot="label">Static label</span>
      <span data-forge-field-input>Static value text</span>
    </forge-field>
  \`
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['label', 'value', 'supportText', 'showStartIcon', 'inset', 'invalid', 'disabled', 'variant', 'shape', 'density', 'multiline', 'showStartIcon', 'select']
    }
  },
  args: {
    showStartIcon: false,
    inset: false,
    select: false
  },
  decorators: [storyStyles(\`
      .forge-field {
        max-width: 320px;
      }
    \`)],
  render: ({
    label,
    value,
    supportText,
    showStartIcon,
    multiline,
    inset,
    invalid,
    disabled,
    variant,
    shape,
    density,
    select,
    ...args
  }) => {
    const fieldRef = createRef();
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-field': true,
      'forge-field--invalid': invalid,
      'forge-field--rounded': shape === 'rounded',
      'forge-field--plain': variant === 'plain',
      'forge-field--tonal': variant === 'tonal',
      'forge-field--filled': variant === 'filled',
      'forge-field--raised': variant === 'raised',
      'forge-field--extra-small': density === 'extra-small',
      'forge-field--small': density === 'small',
      'forge-field--large': density === 'large',
      'forge-field--extra-large': density === 'extra-large'
    };
    const labelEl = html\`<label for="my-css-only-input" class=\${classMap({
      'forge-typography--label2': !inset
    })}>\${label}</label>\`;
    function handleInput({
      target
    }: InputEvent & {
      target: HTMLInputElement;
    }): void {
      toggleFloatingLabel(target, {
        animate: true
      });
    }
    function toggleFloatingLabel(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, {
      animate = false
    }): void {
      const hasValue = !!input.value;
      fieldRef.value?.classList.toggle('forge-field--float-label', hasValue);
      if (animate) {
        fieldRef.value?.classList.toggle('forge-field--float-label-in', hasValue);
        fieldRef.value?.classList.toggle('forge-field--float-label-out', !hasValue);
      }
    }
    if (value) {
      requestAnimationFrame(() => {
        const input = fieldRef.value?.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input,select,textarea');
        toggleFloatingLabel(input, {
          animate: false
        });
      });
    }
    const textareaEl = html\`<textarea @input=\${inset ? handleInput : nothing} id="my-css-only-input" .disabled=\${disabled} .value=\${value}></textarea>\`;
    const inputEl = html\`<input @input=\${inset ? handleInput : nothing} type="text" id="my-css-only-input" .disabled=\${disabled} value=\${value} />\`;
    const selectEl = html\`
      <select @change=\${inset ? handleInput : nothing} id="my-css-only-input" .disabled=\${disabled} .value=\${value}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    \`;
    return html\`
      \${!inset ? labelEl : nothing}
      <div \${ref(fieldRef)} class=\${classMap(classes)} style=\${style}>
        \${inset ? labelEl : nothing}
        \${showStartIcon ? html\`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>\` : nothing}
        \${multiline ? textareaEl : select ? selectEl : inputEl}
      </div>
      \${supportText ? html\`<span class="forge-typography--label1">\${supportText}</span>\` : nothing}
    \`;
  }
}`,...d.parameters?.docs?.source}}};const D=["Demo","StaticField","CSSOnly"],ie=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:d,Demo:r,StaticField:p,__namedExportsOrder:D,default:B},Symbol.toStringTag,{value:"Module"}));export{d as C,r as D,ie as F,p as S};
