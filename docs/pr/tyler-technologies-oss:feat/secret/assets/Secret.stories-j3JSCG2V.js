import{E as v,x as d}from"./iframe-DjbInO_b.js";import{g as h,s as m}from"./utils-CW5S_tZJ.js";import"./service-adapter-CffG5Lhq.js";import"./secret-BI-Ze53G.js";import"./focus-indicator-Cv_1OuCy.js";import"./icon-8E01u_jy.js";import"./index-5CPwzmQS.js";import"./state-layer-BEEsPoZf.js";import"./tooltip-B59ljHGY.js";import"./overlay-B5pGv-rV.js";const b="forge-secret",f={title:"Components/Secret",render:p=>{const{text:g,label:t,...e}=p;return d`
      <forge-secret
        ?visible=${e.visible}
        variant=${e.variant}
        ?show-on-hover=${e.showOnHover}
        ?no-label=${e.noLabel}
        name=${e.name||v}>
        ${t?d`<span slot="label">${t}</span>`:v} ${g}
      </forge-secret>
    `},component:b,parameters:{actions:{disable:!0}},argTypes:{...h({tagName:b,exclude:["text","label"],controls:{visible:{control:"boolean"},variant:{control:"inline-radio",options:["blur","dots"]},showOnHover:{control:"boolean"},noLabel:{control:"boolean"},name:{control:"text"}}}),text:{control:"text",description:"The secret text content"},label:{control:"text",description:"Optional label text (label slot)"}},args:{visible:!1,variant:"blur",showOnHover:!1,noLabel:!1,name:"",text:"Secret content",label:""}},r={args:{text:"This is secret content"}},n={parameters:{controls:{include:["text","visible"]}},args:{text:"This content is blurred when hidden",variant:"blur"}},s={parameters:{controls:{include:["text","visible"]}},args:{text:"This content is replaced by dots when hidden",variant:"dots"}},o={parameters:{controls:{include:["text","label","visible"]}},args:{label:"Password",text:"my_secret_password"}},a={parameters:{controls:{include:["text","showOnHover"]}},args:{text:"Hover over me to reveal",showOnHover:!0}},c={...m,render:()=>d`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <p>Click on any secret to reveal it. Only one can be visible at a time:</p>
        <div>
          <p>Username:</p>
          <forge-secret name="credentials">john_doe</forge-secret>
        </div>
        <div>
          <p>Password:</p>
          <forge-secret name="credentials">my_secret_password</forge-secret>
        </div>
        <div>
          <p>API Key:</p>
          <forge-secret name="credentials">sk_test_1234567890abcdef</forge-secret>
        </div>
      </div>
    `},i={...m,render:()=>d`
      <p>
        The user's email is
        <forge-secret>user@example.com</forge-secret>
        and their phone number is
        <forge-secret variant="dots">555-1234</forge-secret>.
      </p>
    `},l={...m,render:()=>d`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <button @click=${t=>{const u=t.target.nextElementSibling;u.visible=!u.visible}} style="width: fit-content;">Toggle Visibility</button>
        <forge-secret no-label style="width: fit-content;" @forge-secret-change=${t=>{console.log("Visibility changed:",t.detail.visible)}}>Programmable secret content</forge-secret>
      </div>
    `};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'This is secret content'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['text', 'visible']
    }
  },
  args: {
    text: 'This content is blurred when hidden',
    variant: 'blur'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['text', 'visible']
    }
  },
  args: {
    text: 'This content is replaced by dots when hidden',
    variant: 'dots'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['text', 'label', 'visible']
    }
  },
  args: {
    label: 'Password',
    text: 'my_secret_password'
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['text', 'showOnHover']
    }
  },
  args: {
    text: 'Hover over me to reveal',
    showOnHover: true
  }
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <p>Click on any secret to reveal it. Only one can be visible at a time:</p>
        <div>
          <p>Username:</p>
          <forge-secret name="credentials">john_doe</forge-secret>
        </div>
        <div>
          <p>Password:</p>
          <forge-secret name="credentials">my_secret_password</forge-secret>
        </div>
        <div>
          <p>API Key:</p>
          <forge-secret name="credentials">sk_test_1234567890abcdef</forge-secret>
        </div>
      </div>
    \`;
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <p>
        The user's email is
        <forge-secret>user@example.com</forge-secret>
        and their phone number is
        <forge-secret variant="dots">555-1234</forge-secret>.
      </p>
    \`;
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const handleToggle = (event: Event) => {
      const button = event.target as HTMLButtonElement;
      const secret = button.nextElementSibling as SecretComponent;
      secret.visible = !secret.visible;
    };
    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        visible: boolean;
      }>;
      console.log('Visibility changed:', customEvent.detail.visible);
    };
    return html\`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <button @click=\${handleToggle} style="width: fit-content;">Toggle Visibility</button>
        <forge-secret no-label style="width: fit-content;" @forge-secret-change=\${handleChange}>Programmable secret content</forge-secret>
      </div>
    \`;
  }
}`,...l.parameters?.docs?.source}}};const x=["Demo","Blur","Dots","WithLabel","ShowOnHover","LinkedGroup","InlineUsage","Programmatic"],C=Object.freeze(Object.defineProperty({__proto__:null,Blur:n,Demo:r,Dots:s,InlineUsage:i,LinkedGroup:c,Programmatic:l,ShowOnHover:a,WithLabel:o,__namedExportsOrder:x,default:f},Symbol.toStringTag,{value:"Module"}));export{n as B,r as D,i as I,c as L,l as P,C as S,o as W,s as a,a as b};
