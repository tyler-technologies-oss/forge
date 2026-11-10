import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{t as i}from"./ai-file-picker-ZI_ui4NN.js";var a=t({Button:()=>l,Demo:()=>c,Restricted:()=>u,__namedExportsOrder:()=>d,default:()=>s}),o,s,c,l,u,d;function f(){return(f=e((()=>{r(),i(),{action:o}=__STORYBOOK_MODULE_ACTIONS__,s={title:`AI/Components/Input & Context/File Picker`,component:`forge-ai-file-picker`,argTypes:{variant:{control:{type:`select`},options:[`icon-button`,`button`],description:`Whether the trigger is an icon button or a text button`},disabled:{control:`boolean`,description:`Disables the picker, including drag and drop`},accept:{control:`text`,description:`Accepted file types as comma-separated MIME types or extensions`},multiple:{control:`boolean`,description:`Allows selecting more than one file at a time`},maxSize:{control:`number`,description:`Maximum file size in bytes. Larger files are rejected`},selectedFiles:{control:!1,description:`File names that are already selected. Files with a matching name are rejected as duplicates`}},args:{variant:`icon-button`,disabled:!1,accept:``,multiple:!1,maxSize:10485760,selectedFiles:[]},render:e=>n`
    <forge-ai-file-picker
      variant=${e.variant}
      accept=${e.accept}
      max-size=${e.maxSize}
      ?disabled=${e.disabled}
      ?multiple=${e.multiple}
      .selectedFiles=${e.selectedFiles}
      @forge-ai-file-picker-change=${o(`forge-ai-file-picker-change`)}
      @forge-ai-file-picker-error=${o(`forge-ai-file-picker-error`)}>
    </forge-ai-file-picker>
  `},c={},l={args:{variant:`button`},render:e=>n`
    <forge-ai-file-picker
      variant=${e.variant}
      accept=${e.accept}
      max-size=${e.maxSize}
      ?disabled=${e.disabled}
      ?multiple=${e.multiple}
      .selectedFiles=${e.selectedFiles}
      @forge-ai-file-picker-change=${o(`forge-ai-file-picker-change`)}
      @forge-ai-file-picker-error=${o(`forge-ai-file-picker-error`)}>
      Upload document
    </forge-ai-file-picker>
  `},u={args:{accept:`.pdf,.txt`,multiple:!0,maxSize:1048576}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'button'
  },
  render: args => html\`
    <forge-ai-file-picker
      variant=\${args.variant}
      accept=\${args.accept}
      max-size=\${args.maxSize}
      ?disabled=\${args.disabled}
      ?multiple=\${args.multiple}
      .selectedFiles=\${args.selectedFiles}
      @forge-ai-file-picker-change=\${action('forge-ai-file-picker-change')}
      @forge-ai-file-picker-error=\${action('forge-ai-file-picker-error')}>
      Upload document
    </forge-ai-file-picker>
  \`
}`,...l.parameters?.docs?.source},description:{story:`The default slot sets the label. It falls back to "Choose File".`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    accept: '.pdf,.txt',
    multiple: true,
    maxSize: 1048576
  }
}`,...u.parameters?.docs?.source},description:{story:`Only PDF and plain text files, up to 1 MB each, several at a time. Larger files fire the error event.`,...u.parameters?.docs?.description}}},d=[`Demo`,`Button`,`Restricted`]})))()}export{f as a,u as i,l as n,c as r,a as t};