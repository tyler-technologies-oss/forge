import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{t as i}from"./ai-context-chip-BddR6gXa.js";var a=t({Demo:()=>c,File:()=>l,Loading:()=>u,__namedExportsOrder:()=>d,default:()=>s}),o,s,c,l,u,d;function f(){return(f=e((()=>{r(),i(),{action:o}=__STORYBOOK_MODULE_ACTIONS__,s={title:`AI/Components/Input & Context/Context Chip`,component:`forge-ai-context-chip`,argTypes:{id:{control:`text`,description:`Identifier for the chip, included in the remove event`},label:{control:`text`,description:`The text shown in the chip`},sublabel:{control:`text`,description:"Secondary text shown after the label. Hidden while `loading` is set"},type:{control:`select`,options:[void 0,`context`,`file`],description:"Selects the icon. `file` shows a document icon; anything else shows a context icon"},removable:{control:`boolean`,description:`Whether the remove button is shown`},loading:{control:`boolean`,description:`Replaces the sublabel with a spinner`}},args:{id:`context-1`,label:`Selected case`,sublabel:``,type:void 0,removable:!0,loading:!1},render:e=>n`
    <forge-ai-context-chip
      .id=${e.id}
      .label=${e.label}
      .sublabel=${e.sublabel||void 0}
      .type=${e.type}
      .removable=${e.removable}
      .loading=${e.loading}
      @forge-ai-context-chip-remove=${o(`forge-ai-context-chip-remove`)}>
    </forge-ai-context-chip>
  `},c={},l={args:{id:`file-1`,label:`quarterly-report.pdf`,sublabel:`2.4 MB`,type:`file`}},u={args:{id:`file-2`,label:`permits.csv`,type:`file`,loading:!0}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'file-1',
    label: 'quarterly-report.pdf',
    sublabel: '2.4 MB',
    type: 'file'
  }
}`,...l.parameters?.docs?.source},description:{story:`A file chip with a sublabel, such as a file size.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'file-2',
    label: 'permits.csv',
    type: 'file',
    loading: true
  }
}`,...u.parameters?.docs?.source},description:{story:`Shows a spinner while the context is being prepared.`,...u.parameters?.docs?.description}}},d=[`Demo`,`File`,`Loading`]})))()}export{f as a,u as i,c as n,l as r,a as t};