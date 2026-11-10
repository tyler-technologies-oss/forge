import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{t as i}from"./ai-context-items-Dv8cTeif.js";var a=t({Demo:()=>c,NotRemovable:()=>l,__namedExportsOrder:()=>u,default:()=>s}),o,s,c,l,u;function d(){return(d=e((()=>{r(),i(),{action:o}=__STORYBOOK_MODULE_ACTIONS__,s={title:`AI/Components/Input & Context/Context Items`,component:`forge-ai-context-items`,argTypes:{items:{control:`object`,description:"The context items to display. Each item supports `id`, `label`, `sublabel`, `type`, `removable`, and `loading`"}},args:{items:[{id:`case-1`,label:`Case CASE-123`,type:`context`},{id:`file-1`,label:`quarterly-report.pdf`,sublabel:`2.4 MB`,type:`file`},{id:`file-2`,label:`permits.csv`,type:`file`,loading:!0}]},render:e=>n`
    <forge-ai-context-items .items=${e.items} @forge-ai-context-items-remove=${o(`forge-ai-context-items-remove`)}></forge-ai-context-items>
  `},c={},l={args:{items:[{id:`case-1`,label:`Case CASE-123`,removable:!1},{id:`case-2`,label:`Case CASE-456`,removable:!1}]}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'case-1',
      label: 'Case CASE-123',
      removable: false
    }, {
      id: 'case-2',
      label: 'Case CASE-456',
      removable: false
    }]
  }
}`,...l.parameters?.docs?.source},description:{story:"Items with `removable: false` do not show a remove button.",...l.parameters?.docs?.description}}},u=[`Demo`,`NotRemovable`]})))()}export{d as i,c as n,l as r,a as t};