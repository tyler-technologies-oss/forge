import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{t as i}from"./ai-client-message-DqgAZpIk.js";var a=t({AllKinds:()=>d,Demo:()=>u,__namedExportsOrder:()=>f,default:()=>l}),o,s,c,l,u,d,f;function p(){return(p=e((()=>{r(),i(),{action:o}=__STORYBOOK_MODULE_ACTIONS__,s=`forge-ai-client-message`,c=n`<style>
  .client-message-story-list {
    display: flex;
    flex-direction: column;
    gap: var(--forge-spacing-medium);
    max-inline-size: 480px;
  }
</style>`,l={title:`AI/Components/Messages/Client Message`,component:s,argTypes:{kind:{control:`select`,options:[`text`,`info`,`warning`,`error`,`success`],description:`Visual treatment. "text" matches the plain, italic system-message style.`},header:{control:`text`,description:`Optional bold title, shown above the content (ignored for kind="text")`},content:{control:`text`,description:`Message text`}},args:{kind:`info`,header:``,content:`Your document finished indexing and is ready to search.`},render:e=>{let t=o(`action-click`);return n`
      <forge-ai-client-message kind=${e.kind} .header=${e.header||void 0} .content=${e.content} .actions=${[{id:`dismiss`,label:`Dismiss`,onClick:()=>t(`dismiss`)},{id:`retry`,label:`Retry`,onClick:()=>t(`retry`)}]}> </forge-ai-client-message>
    `}},u={},d={render:()=>{let e=o(`action-click`);return n`
      ${c}
      <div class="client-message-story-list">
        ${[{kind:`text`,content:`Switched to Research Assistant`},{kind:`info`,header:`Heads up`,content:`This agent has access to your uploaded documents.`},{kind:`warning`,header:`Approaching limit`,content:`You're nearing the monthly usage limit for this agent.`},{kind:`error`,header:`Session expired`,content:`Your session expired. Please refresh the page to re-authenticate.`},{kind:`success`,content:`File uploaded successfully.`}].map(({kind:t,header:r,content:i})=>n` <forge-ai-client-message kind=${t} .header=${r} .content=${i} .actions=${t===`error`?[{id:`refresh`,label:`Refresh`,onClick:()=>e(`refresh`)}]:[]}></forge-ai-client-message> `)}
      </div>
    `}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const onActionClick = action('action-click');
    const kinds: {
      kind: ClientMessageKind;
      header?: string;
      content: string;
    }[] = [{
      kind: 'text',
      content: 'Switched to Research Assistant'
    }, {
      kind: 'info',
      header: 'Heads up',
      content: 'This agent has access to your uploaded documents.'
    }, {
      kind: 'warning',
      header: 'Approaching limit',
      content: "You're nearing the monthly usage limit for this agent."
    }, {
      kind: 'error',
      header: 'Session expired',
      content: 'Your session expired. Please refresh the page to re-authenticate.'
    }, {
      kind: 'success',
      content: 'File uploaded successfully.'
    }];
    return html\`
      \${storyStyles}
      <div class="client-message-story-list">
        \${kinds.map(({
      kind,
      header,
      content
    }) => {
      const actions: ClientMessageAction[] = kind === 'error' ? [{
        id: 'refresh',
        label: 'Refresh',
        onClick: () => onActionClick('refresh')
      }] : [];
      return html\` <forge-ai-client-message kind=\${kind} .header=\${header} .content=\${content} .actions=\${actions}></forge-ai-client-message> \`;
    })}
      </div>
    \`;
  }
}`,...d.parameters?.docs?.source}}},f=[`Demo`,`AllKinds`]})))()}export{p as i,d as n,u as r,a as t};