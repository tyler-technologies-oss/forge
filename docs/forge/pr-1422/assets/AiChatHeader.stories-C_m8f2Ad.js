import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-BbUsXXnT.js";import{o as i,t as a}from"./icon-CdA8CuQQ.js";import{en as o,t as s,yt as c}from"./tyler-icons-kuH1S-j5.js";import{t as l}from"./ai-chat-header-3ROKo4HO.js";import{t as u}from"./card-fYAE1Lx6.js";import{t as d}from"./icon-button-Cw3e2eGB.js";var f=t({ConversationsError:()=>x,Demo:()=>b,WithAgentInfo:()=>C,WithHeaderActions:()=>S,__namedExportsOrder:()=>w,default:()=>y}),p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{r(),l(),a(),u(),d(),s(),{action:p}=__STORYBOOK_MODULE_ACTIONS__,m=`forge-ai-chat-header`,h=n`<style>
  .chat-header-story-emoji {
    font-size: 24px;
  }
</style>`,g=p(`forge-ai-chat-header-expand`),_=p(`forge-ai-chat-header-minimize`),v=p(`forge-ai-chat-header-clear`),i.define([c,o]),y={title:`AI/Components/Chat/Chat Header`,component:m,argTypes:{titleText:{control:`text`,description:`The title text to display in the header slot`},showExpandButton:{control:`boolean`,description:`Controls whether the expand button is visible`},showMinimizeButton:{control:`boolean`,description:`Controls whether the minimize button is visible`},expanded:{control:`boolean`,description:`Indicates the current expanded state for displaying the appropriate expand/collapse icon`},minimizeIcon:{control:{type:`select`},options:[`default`,`panel`],description:`Controls which minimize icon to display`},customIcon:{control:{type:`select`},options:[`default`,`emoji`,`custom-svg`],description:`Choose icon type to display`},showConversationsButton:{control:`boolean`,description:`Controls whether the conversations button (hamburger menu) is visible`},hasConversationsError:{control:`boolean`,description:`Shows an error badge on the conversations button, indicating a failure inside the conversations panel`},useLongTitle:{control:`boolean`,description:`Toggle to test with a long Lorem Ipsum title for styling`}},args:{titleText:`AI Assistant`,showExpandButton:!1,showMinimizeButton:!1,expanded:!1,minimizeIcon:`default`,customIcon:`default`,showConversationsButton:!1,hasConversationsError:!1,useLongTitle:!1},render:e=>{let t=()=>{switch(e.customIcon){case`emoji`:return n`<div slot="icon" class="chat-header-story-emoji">🤖</div>`;case`custom-svg`:return n`
            <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          `;default:return``}},r=e.useLongTitle?`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`:e.titleText;return n`
      ${h}
      <forge-ai-chat-header
        .titleText=${r}
        .showExpandButton=${e.showExpandButton}
        .showMinimizeButton=${e.showMinimizeButton}
        .expanded=${e.expanded}
        .minimizeIcon=${e.minimizeIcon}
        ?show-conversations-button=${e.showConversationsButton}
        ?has-conversations-error=${e.hasConversationsError}
        heading-level="2"
        @forge-ai-chat-header-expand=${g}
        @forge-ai-chat-header-minimize=${_}
        @forge-ai-chat-header-clear=${v}>
        ${t()}
      </forge-ai-chat-header>
    `}},b={},x={args:{showConversationsButton:!0,hasConversationsError:!0}},S={args:{showMinimizeButton:!0,showExpandButton:!0},render:e=>{let t=e.useLongTitle?`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`:e.titleText;return n`
      <forge-ai-chat-header
        .titleText=${t}
        .showExpandButton=${e.showExpandButton}
        .showMinimizeButton=${e.showMinimizeButton}
        .expanded=${e.expanded}
        .minimizeIcon=${e.minimizeIcon}
        heading-level="2"
        @forge-ai-chat-header-expand=${g}
        @forge-ai-chat-header-minimize=${_}
        @forge-ai-chat-header-clear=${v}>
        <forge-icon-button slot="header-actions" density="medium" aria-label="History">
          <forge-icon name="history"></forge-icon>
        </forge-icon-button>
        <forge-icon-button slot="header-actions" density="medium" aria-label="Settings">
          <forge-icon name="settings"></forge-icon>
        </forge-icon-button>
      </forge-ai-chat-header>
    `}},C={render:e=>n`
    <forge-ai-chat-header
      .titleText=${e.titleText}
      .agentInfo=${{name:`Support Assistant`,description:`Answers questions about accounts, billing and service requests.`,identifier:`support-assistant`,version:`1.2.0`,model:`GPT-4.1`,lastUpdated:`2025-01-15`}}
      heading-level="2">
    </forge-ai-chat-header>
  `},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    showConversationsButton: true,
    hasConversationsError: true
  }
}`,...x.parameters?.docs?.source},description:{story:"`hasConversationsError` badges the conversations button so a failed thread load stays visible while\nthe conversations panel is closed.",...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    showMinimizeButton: true,
    showExpandButton: true
  },
  render: (args: any) => {
    const titleText = args.useLongTitle ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." : args.titleText;
    return html\`
      <forge-ai-chat-header
        .titleText=\${titleText}
        .showExpandButton=\${args.showExpandButton}
        .showMinimizeButton=\${args.showMinimizeButton}
        .expanded=\${args.expanded}
        .minimizeIcon=\${args.minimizeIcon}
        heading-level="2"
        @forge-ai-chat-header-expand=\${expandAction}
        @forge-ai-chat-header-minimize=\${minimizeAction}
        @forge-ai-chat-header-clear=\${clearChatAction}>
        <forge-icon-button slot="header-actions" density="medium" aria-label="History">
          <forge-icon name="history"></forge-icon>
        </forge-icon-button>
        <forge-icon-button slot="header-actions" density="medium" aria-label="Settings">
          <forge-icon name="settings"></forge-icon>
        </forge-icon-button>
      </forge-ai-chat-header>
    \`;
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: (args: any) => html\`
    <forge-ai-chat-header
      .titleText=\${args.titleText}
      .agentInfo=\${{
    name: 'Support Assistant',
    description: 'Answers questions about accounts, billing and service requests.',
    identifier: 'support-assistant',
    version: '1.2.0',
    model: 'GPT-4.1',
    lastUpdated: '2025-01-15'
  }}
      heading-level="2">
    </forge-ai-chat-header>
  \`
}`,...C.parameters?.docs?.source}}},w=[`Demo`,`ConversationsError`,`WithHeaderActions`,`WithAgentInfo`]})))()}export{T as a,C as i,x as n,b as r,f as t};