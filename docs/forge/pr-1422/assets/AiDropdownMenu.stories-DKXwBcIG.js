import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{o as i,t as a}from"./icon-CdA8CuQQ.js";import{p as o,rn as s,t as c,zt as l}from"./tyler-icons-kuH1S-j5.js";import{t as u}from"./ai-dropdown-menu-C57ueHh9.js";var d=t({Demo:()=>g,WithGroups:()=>_,WithNestedMenus:()=>v,__namedExportsOrder:()=>y,default:()=>h}),f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{r(),u(),a(),c(),{action:f}=__STORYBOOK_MODULE_ACTIONS__,i.define([s,o,l]),p=`forge-ai-dropdown-menu`,m=f(`forge-ai-dropdown-menu-change`),h={title:`AI/Components/Primitives/Dropdown Menu`,component:p,argTypes:{variant:{control:`select`,options:[`button`,`icon-button`,`icon-button-squared`],description:`The variant of the dropdown menu trigger button`},selectionMode:{control:`select`,options:[`none`,`single`,`multi`],description:`The selection mode for the dropdown menu`},text:{control:`text`,description:`The text content of the trigger button`},triggerLabel:{control:`text`,description:`Accessible label for the trigger button. Set this for icon-only triggers with no visible text.`},disabled:{control:`boolean`,description:`Whether the dropdown menu is disabled`},popoverPlacement:{control:`select`,options:[`top`,`top-start`,`top-end`,`bottom`,`bottom-start`,`bottom-end`,`left`,`left-start`,`left-end`,`right`,`right-start`,`right-end`],description:`The placement of the popover relative to the trigger button`}},args:{open:!1,variant:`button`,selectionMode:`none`,text:`Choose model...`,triggerLabel:``,disabled:!1,popoverPlacement:`bottom-start`},render:e=>n`
    <forge-ai-dropdown-menu
      .open=${e.open}
      variant=${e.variant}
      selection-mode=${e.selectionMode}
      popover-placement=${e.popoverPlacement}
      trigger-label=${e.triggerLabel||void 0}
      ?disabled=${e.disabled}
      @forge-ai-dropdown-menu-change=${e=>m(e.detail)}>
      ${e.variant===`button`?n`<span slot="trigger-content">${e.text}</span> <forge-icon name="arrow_drop_down" slot="end"></forge-icon>`:n`<forge-icon name="more_vert" slot="trigger-content"></forge-icon>`}

      <forge-ai-dropdown-menu-item value="gpt-4.1">
        <span>GPT-4.1</span>
        <!-- <span slot="description">More capable, advanced reasoning</span> -->
        <forge-icon name="sparkles" slot="start"></forge-icon>
      </forge-ai-dropdown-menu-item>

      <forge-ai-dropdown-menu-item value="gpt-4">
        <span>GPT-4</span>
        <!-- <span slot="description">Advanced reasoning capabilities</span> -->
        <forge-icon name="sparkles" slot="start"></forge-icon>
      </forge-ai-dropdown-menu-item>

      <forge-ai-dropdown-menu-item value="claude-sonnet-4">
        <span>Claude Sonnet 4</span>
        <!-- <span slot="description">Powerful and steerable</span> -->
        <forge-icon name="sparkles" slot="start"></forge-icon>
      </forge-ai-dropdown-menu-item>

      <forge-ai-dropdown-menu-item value="claude-sonnet-4.5">
        <span>Claude Sonnet 4.5</span>
        <!-- <span slot="description">Improved steerability and creativity</span> -->
        <forge-icon name="sparkles" slot="start"></forge-icon>
      </forge-ai-dropdown-menu-item>
    </forge-ai-dropdown-menu>
  `},g={},_={args:{selectionMode:`single`,text:`Select model...`},parameters:{docs:{description:{story:`Demonstrate item groups with labels and separators. Groups organize related items together with optional labels, while separators provide visual division between sections.`}}},render:e=>n`
    <forge-ai-dropdown-menu
      .open=${e.open}
      variant=${e.variant}
      selection-mode=${e.selectionMode}
      popover-placement=${e.popoverPlacement}
      ?disabled=${e.disabled}
      @forge-ai-dropdown-menu-change=${e=>m(e.detail)}>
      <span slot="header">Models</span>
      <span slot="trigger-content">${e.text}</span>
      <forge-icon name="arrow_drop_down" slot="end"></forge-icon>

      <forge-ai-dropdown-menu-item-group>
        <span slot="label">OpenAI</span>
        <forge-ai-dropdown-menu-item value="gpt-4.1">GPT-4.1<forge-icon name="sparkles" slot="start"></forge-icon> </forge-ai-dropdown-menu-item>
        <forge-ai-dropdown-menu-item value="gpt-4">GPT-4<forge-icon name="sparkles" slot="start"></forge-icon> </forge-ai-dropdown-menu-item>
        <forge-ai-dropdown-menu-item value="gpt-5">GPT-5<forge-icon name="sparkles" slot="start"></forge-icon> </forge-ai-dropdown-menu-item>
      </forge-ai-dropdown-menu-item-group>

      <forge-ai-dropdown-menu-item-group>
        <span slot="label">Anthropic</span>
        <forge-ai-dropdown-menu-item value="claude-sonnet-4"
          >Claude Sonnet 4<forge-icon name="sparkles" slot="start"></forge-icon>
        </forge-ai-dropdown-menu-item>
        <forge-ai-dropdown-menu-item value="claude-sonnet-4.5"
          >Claude Sonnet 4.5<forge-icon name="sparkles" slot="start"></forge-icon>
        </forge-ai-dropdown-menu-item>
      </forge-ai-dropdown-menu-item-group>
    </forge-ai-dropdown-menu>
  `},v={parameters:{controls:{disable:!0},docs:{description:{story:`Demonstrate cascading nested menus. Parent menu items can contain child dropdown menus that automatically position to the right (or left if no space). Includes proper ARIA attributes and keyboard navigation support.`}}},render:e=>n`
    <forge-ai-dropdown-menu .open=${e.open} @forge-ai-dropdown-menu-change=${e=>m(e.detail)}>
      <span slot="trigger-content">File</span>
      <forge-icon name="arrow_drop_down" slot="end"></forge-icon>

      <forge-ai-dropdown-menu-item value="new">
        New
        <forge-ai-dropdown-menu selection-mode="none">
          <forge-ai-dropdown-menu-item value="file">New File</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-item value="folder">New Folder</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-item value="project">
            New Project
            <forge-ai-dropdown-menu selection-mode="none">
              <forge-ai-dropdown-menu-item value="react">React App</forge-ai-dropdown-menu-item>
              <forge-ai-dropdown-menu-item value="vue">Vue App</forge-ai-dropdown-menu-item>
              <forge-ai-dropdown-menu-item value="angular">Angular App</forge-ai-dropdown-menu-item>
            </forge-ai-dropdown-menu>
          </forge-ai-dropdown-menu-item>
        </forge-ai-dropdown-menu>
      </forge-ai-dropdown-menu-item>

      <forge-ai-dropdown-menu-item value="open">Open File</forge-ai-dropdown-menu-item>
      <forge-ai-dropdown-menu-item value="recent">
        Recent Files
        <forge-ai-dropdown-menu selection-mode="none">
          <forge-ai-dropdown-menu-item value="doc1">Document 1.txt</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-item value="doc2">Document 2.txt</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-item value="doc3">Document 3.txt</forge-ai-dropdown-menu-item>
        </forge-ai-dropdown-menu>
      </forge-ai-dropdown-menu-item>

      <forge-ai-dropdown-menu-separator></forge-ai-dropdown-menu-separator>

      <forge-ai-dropdown-menu-item value="exit">Exit</forge-ai-dropdown-menu-item>
    </forge-ai-dropdown-menu>
  `},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    selectionMode: 'single',
    text: 'Select model...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrate item groups with labels and separators. Groups organize related items together with optional labels, while separators provide visual division between sections.'
      }
    }
  },
  render: (args: any) => html\`
    <forge-ai-dropdown-menu
      .open=\${args.open}
      variant=\${args.variant}
      selection-mode=\${args.selectionMode}
      popover-placement=\${args.popoverPlacement}
      ?disabled=\${args.disabled}
      @forge-ai-dropdown-menu-change=\${(evt: CustomEvent) => changeAction(evt.detail)}>
      <span slot="header">Models</span>
      <span slot="trigger-content">\${args.text}</span>
      <forge-icon name="arrow_drop_down" slot="end"></forge-icon>

      <forge-ai-dropdown-menu-item-group>
        <span slot="label">OpenAI</span>
        <forge-ai-dropdown-menu-item value="gpt-4.1">GPT-4.1<forge-icon name="sparkles" slot="start"></forge-icon> </forge-ai-dropdown-menu-item>
        <forge-ai-dropdown-menu-item value="gpt-4">GPT-4<forge-icon name="sparkles" slot="start"></forge-icon> </forge-ai-dropdown-menu-item>
        <forge-ai-dropdown-menu-item value="gpt-5">GPT-5<forge-icon name="sparkles" slot="start"></forge-icon> </forge-ai-dropdown-menu-item>
      </forge-ai-dropdown-menu-item-group>

      <forge-ai-dropdown-menu-item-group>
        <span slot="label">Anthropic</span>
        <forge-ai-dropdown-menu-item value="claude-sonnet-4"
          >Claude Sonnet 4<forge-icon name="sparkles" slot="start"></forge-icon>
        </forge-ai-dropdown-menu-item>
        <forge-ai-dropdown-menu-item value="claude-sonnet-4.5"
          >Claude Sonnet 4.5<forge-icon name="sparkles" slot="start"></forge-icon>
        </forge-ai-dropdown-menu-item>
      </forge-ai-dropdown-menu-item-group>
    </forge-ai-dropdown-menu>
  \`
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: 'Demonstrate cascading nested menus. Parent menu items can contain child dropdown menus that automatically position to the right (or left if no space). Includes proper ARIA attributes and keyboard navigation support.'
      }
    }
  },
  render: (args: any) => html\`
    <forge-ai-dropdown-menu .open=\${args.open} @forge-ai-dropdown-menu-change=\${(evt: CustomEvent) => changeAction(evt.detail)}>
      <span slot="trigger-content">File</span>
      <forge-icon name="arrow_drop_down" slot="end"></forge-icon>

      <forge-ai-dropdown-menu-item value="new">
        New
        <forge-ai-dropdown-menu selection-mode="none">
          <forge-ai-dropdown-menu-item value="file">New File</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-item value="folder">New Folder</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-item value="project">
            New Project
            <forge-ai-dropdown-menu selection-mode="none">
              <forge-ai-dropdown-menu-item value="react">React App</forge-ai-dropdown-menu-item>
              <forge-ai-dropdown-menu-item value="vue">Vue App</forge-ai-dropdown-menu-item>
              <forge-ai-dropdown-menu-item value="angular">Angular App</forge-ai-dropdown-menu-item>
            </forge-ai-dropdown-menu>
          </forge-ai-dropdown-menu-item>
        </forge-ai-dropdown-menu>
      </forge-ai-dropdown-menu-item>

      <forge-ai-dropdown-menu-item value="open">Open File</forge-ai-dropdown-menu-item>
      <forge-ai-dropdown-menu-item value="recent">
        Recent Files
        <forge-ai-dropdown-menu selection-mode="none">
          <forge-ai-dropdown-menu-item value="doc1">Document 1.txt</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-item value="doc2">Document 2.txt</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-item value="doc3">Document 3.txt</forge-ai-dropdown-menu-item>
        </forge-ai-dropdown-menu>
      </forge-ai-dropdown-menu-item>

      <forge-ai-dropdown-menu-separator></forge-ai-dropdown-menu-separator>

      <forge-ai-dropdown-menu-item value="exit">Exit</forge-ai-dropdown-menu-item>
    </forge-ai-dropdown-menu>
  \`
}`,...v.parameters?.docs?.source}}},y=[`Demo`,`WithGroups`,`WithNestedMenus`]})))()}export{b as a,v as i,g as n,_ as r,d as t};