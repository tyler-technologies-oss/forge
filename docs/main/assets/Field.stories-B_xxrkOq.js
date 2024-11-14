import"./lit-element-Dk2-kgKT.js";import{k as t,D as l}from"./lit-html-DZH-Jm0H.js";import{b as P,g as W,G as X,s as Y}from"./utils-BE6XR6X1.js";import{s as _}from"./style-map-DxfbqtuX.js";import{R as L}from"./class-map-D93gIiBE.js";import{K as k,i as z}from"./ref-9TtedaQt.js";import{s as h}from"./decorators-DvEJi2JG.js";import"./constants-DjE6emXm.js";import"./base-field-DjQIigi2.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./label-C3K2Uabu.js";import"./button-CbYZUGFb.js";import"./state-layer-DTKAXCUq.js";import"./button-toggle-group-BJ7gYCrU.js";import"./checkbox-DohAEIBZ.js";import"./icon-button-Bwf4zXUE.js";import"./icon-DHpZ4R73.js";import"./switch-BL3gYf9s.js";const w="forge-field",Z={title:"Components/Field",component:w,render:e=>{const a=P(e),d=a?_(a):l,f=z();function c({target:n}){f.value.floatLabel=!!n.value}return t`
      <forge-field
        ${k(f)}
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
        style=${d}>
        ${e.label.length?t`<label for="my-input">${e.label}</label>`:l}
        ${e.multiline?t`<textarea .value=${e.value} @input=${c}></textarea>`:t`<input id="my-input" type="text" .value=${e.value} @input=${c} />`}
        ${e.supportText.length?t`<span slot="support-text">${e.supportText}</span>`:l}
        ${e.supportTextEnd.length?t`<span slot="support-text-end">${e.supportTextEnd}</span>`:l}
      </forge-field>
    `},parameters:{actions:{disable:!0}},argTypes:{...W({tagName:w,exclude:["popoverTargetElement","focusIndicatorTargetElement","forgeIndicatorFocusMode","focusIndicatorAllowFocus"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...X,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),label:{control:{type:"text"}},value:{control:{type:"text"}},supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},multiline:{control:{type:"boolean"}}},args:{label:"Label",value:"",supportText:"",supportTextEnd:"",multiline:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:"none"}},i={decorators:[h(`
    forge-field {
      max-width: 320px;
    }
  `)]},r={...Y,decorators:[h(`
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
  `},p={parameters:{controls:{include:["label","value","supportText","showStartIcon","inset","invalid","disabled","variant","shape","density","multiline","showStartIcon","select"]}},args:{showStartIcon:!1,inset:!1,select:!1},decorators:[h(`
      .forge-field {
        max-width: 320px;
      }
    `)],render:({label:e,value:a,supportText:d,showStartIcon:f,multiline:c,inset:n,invalid:D,disabled:v,variant:u,shape:B,density:m,select:j,...G})=>{const o=z(),y=P(G),K=y?_(y):l,N={"forge-field":!0,"forge-field--invalid":D,"forge-field--rounded":B==="rounded","forge-field--plain":u==="plain","forge-field--tonal":u==="tonal","forge-field--filled":u==="filled","forge-field--raised":u==="raised","forge-field--extra-small":m==="extra-small","forge-field--small":m==="small","forge-field--large":m==="large","forge-field--extra-large":m==="extra-large"},$=t`<label for="my-css-only-input" class=${L({"forge-typography--label2":!n})}>${e}</label>`;function b({target:s}){S(s,{animate:!0})}function S(s,{animate:g=!1}){var E,T,I;const x=!!s.value;(E=o.value)==null||E.classList.toggle("forge-field--float-label",x),g&&((T=o.value)==null||T.classList.toggle("forge-field--float-label-in",x),(I=o.value)==null||I.classList.toggle("forge-field--float-label-out",!x))}a&&requestAnimationFrame(()=>{var g;const s=(g=o.value)==null?void 0:g.querySelector("input,select,textarea");S(s,{animate:!1})});const J=t`<textarea @input=${n?b:l} id="my-css-only-input" .disabled=${v} .value=${a}></textarea>`,Q=t`<input @input=${n?b:l} type="text" id="my-css-only-input" .disabled=${v} value=${a} />`,U=t`
      <select @change=${n?b:l} id="my-css-only-input" .disabled=${v} .value=${a}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    `;return t`
      ${n?l:$}
      <div ${k(o)} class=${L(N)} style=${K}>
        ${n?$:l}
        ${f?t`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>`:l}
        ${c?J:j?U:Q}
      </div>
      ${d?t`<span class="forge-typography--label1">${d}</span>`:l}
    `}};var A,M,O;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  decorators: [storyStyles(\`
    forge-field {
      max-width: 320px;
    }
  \`)]
}`,...(O=(M=i.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var F,V,C;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(C=(V=r.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};var R,H,q;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
        const input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement = fieldRef.value?.querySelector('input,select,textarea')!;
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
}`,...(q=(H=p.parameters)==null?void 0:H.docs)==null?void 0:q.source}}};const ee=["Demo","StaticField","CSSOnly"],ye=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:p,Demo:i,StaticField:r,__namedExportsOrder:ee,default:Z},Symbol.toStringTag,{value:"Module"}));export{p as C,i as D,ye as F,r as S};
