import{E as l,x as t}from"./iframe-B_AFpbKZ.js";import{g as W,s as X,G as Y,a as P}from"./utils-D0zOu5id.js";import{o as _}from"./style-map-D63BE21Z.js";import{e as L}from"./class-map-B28AMhZr.js";import{n as z,e as k}from"./ref-C21WPZKR.js";import{s as h}from"./decorators-CTyTE-Ei.js";import"./service-adapter-BykFeYYZ.js";import"./base-field-CspDK4qd.js";import"./focus-indicator-CyTlhlQD.js";import"./label-8C4joo3A.js";import"./index-CiLSBptl.js";import"./button-BjTHYlPk.js";import"./state-layer-BRTtEqto.js";import"./button-toggle-group-BkTZIXUI.js";import"./checkbox-BwaxslW8.js";import"./icon-button-U4pg755t.js";import"./icon-eJOvSyyv.js";import"./switch-BxEMfYtZ.js";const w="forge-field",Z={title:"Components/Field",component:w,render:e=>{const a=P(e),d=a?_(a):l,f=k();function c({target:n}){f.value.floatLabel=!!n.value}return t`
      <forge-field
        ${z(f)}
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
    `},parameters:{actions:{disable:!0}},argTypes:{...W({tagName:w,exclude:["popoverTargetElement","focusIndicatorTargetElement","forgeIndicatorFocusMode","focusIndicatorAllowFocus"],controls:{labelPosition:{control:"select",options:["inline-start","inline-end","block-start","inset","none"]},labelAlignment:{control:"select",options:["default","center","baseline","start","end"]},variant:{control:"select",options:["plain","outlined","tonal","filled","raised"]},theme:{control:"select",options:[...Y,"default"]},shape:{control:"select",options:["default","rounded","squared"]},density:{control:"select",options:["default","extra-small","small","medium","large","extra-large"]},supportTextInset:{control:"select",options:["start","end","both","none"]}}}),label:{control:{type:"text"}},value:{control:{type:"text"}},supportText:{control:{type:"text"}},supportTextEnd:{control:{type:"text"}},multiline:{control:{type:"boolean"}}},args:{label:"Label",value:"",supportText:"",supportTextEnd:"",multiline:!1,labelPosition:"inset",labelAlignment:"default",invalid:!1,required:!1,optional:!1,disabled:!1,floatLabel:!1,variant:"outlined",theme:"default",shape:"default",density:"default",dense:!1,popoverIcon:!1,popoverExpanded:!1,supportTextInset:"none"}},i={decorators:[h(`
    forge-field {
      max-width: 320px;
    }
  `)]},r={...X,decorators:[h(`
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
    `)],render:({label:e,value:a,supportText:d,showStartIcon:f,multiline:c,inset:n,invalid:B,disabled:v,variant:u,shape:D,density:m,select:j,...G})=>{const o=k(),y=P(G),N=y?_(y):l,J={"forge-field":!0,"forge-field--invalid":B,"forge-field--rounded":D==="rounded","forge-field--plain":u==="plain","forge-field--tonal":u==="tonal","forge-field--filled":u==="filled","forge-field--raised":u==="raised","forge-field--extra-small":m==="extra-small","forge-field--small":m==="small","forge-field--large":m==="large","forge-field--extra-large":m==="extra-large"},$=t`<label for="my-css-only-input" class=${L({"forge-typography--label2":!n})}>${e}</label>`;function b({target:s}){S(s,{animate:!0})}function S(s,{animate:g=!1}){var E,T,I;const x=!!s.value;(E=o.value)==null||E.classList.toggle("forge-field--float-label",x),g&&((T=o.value)==null||T.classList.toggle("forge-field--float-label-in",x),(I=o.value)==null||I.classList.toggle("forge-field--float-label-out",!x))}a&&requestAnimationFrame(()=>{var g;const s=(g=o.value)==null?void 0:g.querySelector("input,select,textarea");S(s,{animate:!1})});const K=t`<textarea @input=${n?b:l} id="my-css-only-input" .disabled=${v} .value=${a}></textarea>`,Q=t`<input @input=${n?b:l} type="text" id="my-css-only-input" .disabled=${v} value=${a} />`,U=t`
      <select @change=${n?b:l} id="my-css-only-input" .disabled=${v} .value=${a}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    `;return t`
      ${n?l:$}
      <div ${z(o)} class=${L(J)} style=${N}>
        ${n?$:l}
        ${f?t`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>`:l}
        ${c?K:j?U:Q}
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
}`,...(C=(V=r.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};var H,R,q;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(q=(R=p.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};const ee=["Demo","StaticField","CSSOnly"],he=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:p,Demo:i,StaticField:r,__namedExportsOrder:ee,default:Z},Symbol.toStringTag,{value:"Module"}));export{p as C,i as D,he as F,r as S};
