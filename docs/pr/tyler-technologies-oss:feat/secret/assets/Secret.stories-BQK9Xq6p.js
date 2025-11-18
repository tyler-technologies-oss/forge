import{g as h,c as f}from"./utils-CW5S_tZJ.js";import"./service-adapter-CffG5Lhq.js";import"./secret-CHGnbafv.js";import"./focus-indicator-D44tT1xv.js";import"./icon-8E01u_jy.js";import"./index-5CPwzmQS.js";import"./state-layer-BEEsPoZf.js";import"./tooltip-B59ljHGY.js";import"./overlay-B5pGv-rV.js";const b="forge-secret",x={title:"Components/Secret",render:e=>{const r=f(b,e);if(e.label){const t=document.createElement("span");t.setAttribute("slot","label"),t.textContent=e.label,r.appendChild(t)}if(e.customIcons){const t=document.createElement("span");t.setAttribute("slot","hidden-icon"),t.textContent="🔒",r.appendChild(t);const v=document.createElement("span");v.setAttribute("slot","visible-icon"),v.textContent="🔓",r.appendChild(v)}return r.appendChild(document.createTextNode(e.text||"Secret content")),r},component:b,parameters:{actions:{disable:!0}},argTypes:{...h({tagName:b,controls:{visible:{control:"boolean"},variant:{control:"select",options:["blur","dots"]},showOnHover:{control:"boolean"},icon:{control:"boolean"},name:{control:"text"}},exclude:["customIcons","label","text"]}),text:{control:"text",description:"The secret text content"},label:{control:"text",description:"Optional label text (label slot)"},customIcons:{control:"boolean",description:"Use custom icons via slots"}},args:{visible:!1,variant:"blur",showOnHover:!1,icon:!1,name:"",text:"Secret content",label:"",customIcons:!1}},n={args:{text:"This is secret content",icon:!0}},o={args:{text:"This content is blurred when hidden",variant:"blur",icon:!0}},s={args:{text:"This content is replaced by dots when hidden",variant:"dots",icon:!0}},c={args:{label:"Password: ",text:"my_secret_password",icon:!0}},a={args:{text:"Hover over me to reveal",showOnHover:!0,icon:!0}},i={args:{text:"Secret with custom icons",icon:!0,customIcons:!0}},l={args:{text:"Secret without visible icon",icon:!1}},d={render:()=>{const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.gap="16px";const r=document.createElement("forge-secret");r.setAttribute("icon",""),r.textContent="Programmable secret content";const t=document.createElement("button");return t.textContent="Toggle Visibility",t.style.width="fit-content",t.onclick=()=>{r.visible=!r.visible},e.appendChild(t),e.appendChild(r),e}},m={render:()=>{const e=document.createElement("div");return e.style.display="flex",e.style.flexDirection="column",e.style.gap="12px",e.innerHTML=`
      <p>Click on any secret to reveal it. Only one can be visible at a time:</p>
      <div>
        <strong>Username:</strong>
        <forge-secret name="credentials" icon>john_doe</forge-secret>
      </div>
      <div>
        <strong>Password:</strong>
        <forge-secret name="credentials" icon>my_secret_password</forge-secret>
      </div>
      <div>
        <strong>API Key:</strong>
        <forge-secret name="credentials" icon>sk_test_1234567890abcdef</forge-secret>
      </div>
    `,e}},u={render:()=>{const e=document.createElement("div");return e.innerHTML=`
      <p>
        The user's email is
        <forge-secret icon>user@example.com</forge-secret>
        and their phone number is
        <forge-secret icon variant="dots">555-1234</forge-secret>.
      </p>
    `,e}},p={args:{text:"This is a much longer secret that contains sensitive information which should be carefully protected and only revealed when the user explicitly requests it.",variant:"blur",icon:!0}},g={render:()=>{const e=document.createElement("div");return e.style.display="flex",e.style.flexDirection="column",e.style.gap="16px",e.innerHTML=`
      <div>
        <strong>Blur variant:</strong>
        <forge-secret variant="blur" icon>secret_blur</forge-secret>
      </div>
      <div>
        <strong>Dots variant:</strong>
        <forge-secret variant="dots" icon>secret_dots</forge-secret>
      </div>
      <div>
        <strong>Hover reveal (blur):</strong>
        <forge-secret variant="blur" show-on-hover icon>hover_me_blur</forge-secret>
      </div>
      <div>
        <strong>Hover reveal (dots):</strong>
        <forge-secret variant="dots" show-on-hover icon>hover_me_dots</forge-secret>
      </div>
    `,e}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'This is secret content',
    icon: true
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'This content is blurred when hidden',
    variant: 'blur',
    icon: true
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'This content is replaced by dots when hidden',
    variant: 'dots',
    icon: true
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password: ',
    text: 'my_secret_password',
    icon: true
  }
}`,...c.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Hover over me to reveal',
    showOnHover: true,
    icon: true
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Secret with custom icons',
    icon: true,
    customIcons: true
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Secret without visible icon',
    icon: false
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    const secret = document.createElement('forge-secret');
    secret.setAttribute('icon', '');
    secret.textContent = 'Programmable secret content';
    const button = document.createElement('button');
    button.textContent = 'Toggle Visibility';
    button.style.width = 'fit-content';
    button.onclick = () => {
      (secret as any).visible = !(secret as any).visible;
    };
    container.appendChild(button);
    container.appendChild(secret);
    return container;
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '12px';
    container.innerHTML = \`
      <p>Click on any secret to reveal it. Only one can be visible at a time:</p>
      <div>
        <strong>Username:</strong>
        <forge-secret name="credentials" icon>john_doe</forge-secret>
      </div>
      <div>
        <strong>Password:</strong>
        <forge-secret name="credentials" icon>my_secret_password</forge-secret>
      </div>
      <div>
        <strong>API Key:</strong>
        <forge-secret name="credentials" icon>sk_test_1234567890abcdef</forge-secret>
      </div>
    \`;
    return container;
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = \`
      <p>
        The user's email is
        <forge-secret icon>user@example.com</forge-secret>
        and their phone number is
        <forge-secret icon variant="dots">555-1234</forge-secret>.
      </p>
    \`;
    return container;
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'This is a much longer secret that contains sensitive information which should be carefully protected and only revealed when the user explicitly requests it.',
    variant: 'blur',
    icon: true
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    container.innerHTML = \`
      <div>
        <strong>Blur variant:</strong>
        <forge-secret variant="blur" icon>secret_blur</forge-secret>
      </div>
      <div>
        <strong>Dots variant:</strong>
        <forge-secret variant="dots" icon>secret_dots</forge-secret>
      </div>
      <div>
        <strong>Hover reveal (blur):</strong>
        <forge-secret variant="blur" show-on-hover icon>hover_me_blur</forge-secret>
      </div>
      <div>
        <strong>Hover reveal (dots):</strong>
        <forge-secret variant="dots" show-on-hover icon>hover_me_dots</forge-secret>
      </div>
    \`;
    return container;
  }
}`,...g.parameters?.docs?.source}}};const y=["Demo","BlurVariant","DotsVariant","WithLabel","ShowOnHover","CustomIcons","NoIcon","ProgrammaticControl","RadioGroup","InlineUsage","LongContent","MultipleVariants"],O=Object.freeze(Object.defineProperty({__proto__:null,BlurVariant:o,CustomIcons:i,Demo:n,DotsVariant:s,InlineUsage:u,LongContent:p,MultipleVariants:g,NoIcon:l,ProgrammaticControl:d,RadioGroup:m,ShowOnHover:a,WithLabel:c,__namedExportsOrder:y,default:x},Symbol.toStringTag,{value:"Module"}));export{o as B,i as C,n as D,u as I,l as N,d as P,m as R,O as S,c as W,s as a,a as b};
