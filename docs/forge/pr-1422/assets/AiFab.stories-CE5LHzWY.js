import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{t as i}from"./ai-fab-vpZj4hbJ.js";var a=t({Branded:()=>p,Demo:()=>d,Disabled:()=>f,__namedExportsOrder:()=>m,default:()=>u}),o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{r(),i(),{action:o}=__STORYBOOK_MODULE_ACTIONS__,s=`forge-ai-fab`,c=n`<style>
  .fab-story-logo {
    inline-size: 24px;
    block-size: 24px;
    border-radius: 50%;
  }
</style>`,l=o(`click`),u={title:`AI/Components/Primitives/FAB`,component:s,render:e=>n`
    <forge-ai-fab .disabled=${e.disabled} .extended=${e.extended} .label=${e.label} @click=${l}> ${e.content} </forge-ai-fab>
  `,argTypes:{disabled:{control:`boolean`,description:`Whether the button is disabled`},extended:{control:`boolean`,description:`Whether the button is extended`},content:{control:`text`,description:`The text content of the button`},label:{control:`text`,description:`Accessible label for the button, announced by screen readers`}},args:{disabled:!1,extended:!1,content:`AI Assistant`,label:`Open AI assistant`}},d={},f={args:{disabled:!0}},p={parameters:{controls:{include:[`backgroundColor`,`textColor`,`outlineColor`]}},argTypes:{backgroundColor:{control:`color`,description:`Background color (--forge-ai-fab-background)`},textColor:{control:`color`,description:`Text color (--forge-ai-fab-text-color)`},outlineColor:{control:`color`,description:`Outline color (--forge-ai-fab-outline-color)`}},args:{backgroundColor:``,textColor:``,outlineColor:``},render:e=>{let t={};e.backgroundColor&&(t[`--forge-ai-fab-background`]=e.backgroundColor),e.textColor&&(t[`--forge-ai-fab-text-color`]=e.textColor),e.outlineColor&&(t[`--forge-ai-fab-outline-color`]=e.outlineColor);let r=Object.entries(t).map(([e,t])=>`${e}: ${t}`).join(`; `);return n`
      ${c}
      <forge-ai-fab .extended=${!0} @click=${l} style=${r}>
        <img slot="icon" src="${`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Crect width='24' height='24' fill='%234A90E2'/%3E%3Ctext x='12' y='16' font-family='Arial, sans-serif' font-size='12' font-weight='bold' fill='white' text-anchor='middle'%3EAC%3C/text%3E%3C/svg%3E`}" alt="Acme Corp" class="fab-story-logo" />
        Acme Support
      </forge-ai-fab>
    `}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['backgroundColor', 'textColor', 'outlineColor']
    }
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
      description: 'Background color (--forge-ai-fab-background)'
    },
    textColor: {
      control: 'color',
      description: 'Text color (--forge-ai-fab-text-color)'
    },
    outlineColor: {
      control: 'color',
      description: 'Outline color (--forge-ai-fab-outline-color)'
    }
  },
  args: {
    backgroundColor: '',
    textColor: '',
    outlineColor: ''
  },
  render: args => {
    const fabLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Crect width='24' height='24' fill='%234A90E2'/%3E%3Ctext x='12' y='16' font-family='Arial, sans-serif' font-size='12' font-weight='bold' fill='white' text-anchor='middle'%3EAC%3C/text%3E%3C/svg%3E";
    const styles: Record<string, string> = {};
    if (args.backgroundColor) {
      styles['--forge-ai-fab-background'] = args.backgroundColor;
    }
    if (args.textColor) {
      styles['--forge-ai-fab-text-color'] = args.textColor;
    }
    if (args.outlineColor) {
      styles['--forge-ai-fab-outline-color'] = args.outlineColor;
    }
    const styleString = Object.entries(styles).map(([key, value]) => \`\${key}: \${value}\`).join('; ');
    return html\`
      \${storyStyles}
      <forge-ai-fab .extended=\${true} @click=\${clickAction} style=\${styleString}>
        <img slot="icon" src="\${fabLogo}" alt="Acme Corp" class="fab-story-logo" />
        Acme Support
      </forge-ai-fab>
    \`;
  }
}`,...p.parameters?.docs?.source}}},m=[`Demo`,`Disabled`,`Branded`]})))()}export{h as a,f as i,p as n,d as r,a as t};