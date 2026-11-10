import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{o as i,t as a}from"./icon-DTOjPWy9.js";import{_ as o,an as s,t as c}from"./tyler-icons-kuH1S-j5.js";import{t as l}from"./ai-artifact-card-BGnDuJjZ.js";import{r as u,t as d}from"./if-defined-B1ve8lTA.js";var f=t({Active:()=>b,CollapsibleAction:()=>S,CustomAccent:()=>T,DefaultIcon:()=>x,Demo:()=>y,Disabled:()=>C,InTranscript:()=>E,Truncation:()=>w,__namedExportsOrder:()=>D,default:()=>v}),p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{r(),d(),a(),c(),l(),{action:p}=__STORYBOOK_MODULE_ACTIONS__,i.define([o,s]),m=`forge-ai-artifact-card`,h=n`<style>
  .artifact-card-story-accent {
    --forge-ai-artifact-card-accent-color: var(--forge-theme-tertiary);
  }
  .artifact-card-story-list {
    display: flex;
    flex-direction: column;
    gap: var(--forge-spacing-xsmall);
    max-inline-size: 480px;
  }
</style>`,g=n`<forge-icon slot="icon" name="table"></forge-icon>`,_=n`<forge-icon slot="icon" name="bar_chart"></forge-icon>`,v={title:`AI/Components/Artifacts/Artifact Card`,render:e=>n`
    <forge-ai-artifact-card
      title-text=${e.titleText}
      subtitle-text=${e.subtitleText}
      action-label=${u(e.actionLabel||void 0)}
      asset-id=${e.assetId}
      ?active=${e.active}
      ?disabled=${e.disabled}
      @forge-ai-artifact-card-open=${p(`forge-ai-artifact-card-open`)}>
      ${g}
    </forge-ai-artifact-card>
  `,component:m,argTypes:{titleText:{control:`text`,description:`The primary line of text`},subtitleText:{control:`text`,description:`The secondary line of text`},actionLabel:{control:`text`,description:`Appended to the accessible name to describe what activation does; omit when it just opens`},assetId:{control:`text`,description:`An opaque identifier echoed back in the open event detail`},active:{control:`boolean`,description:`Whether the artifact this card points at is the one currently being viewed`},disabled:{control:`boolean`,description:`Whether the card can be activated`}},args:{titleText:`Traffic collisions by intersection`,subtitleText:`Table · 2024 Collision Records · 1,284 rows`,actionLabel:``,assetId:`collisions-2024`,active:!1,disabled:!1}},y={},b={args:{active:!0}},x={render:()=>n`
    <forge-ai-artifact-card
      title-text="Q4 collision summary"
      subtitle-text="Report · 4 charts"
      asset-id="q4-report"
      @forge-ai-artifact-card-open=${p(`forge-ai-artifact-card-open`)}></forge-ai-artifact-card>
  `},S={render:()=>n`
    <forge-ai-artifact-card
      title-text="Traffic collisions by intersection"
      subtitle-text="Table · 2024 Collision Records · 1,284 rows"
      asset-id="collisions-2024"
      action-label="Collapse table"
      active
      @forge-ai-artifact-card-open=${p(`forge-ai-artifact-card-open`)}>
      ${g}
      <svg slot="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22 3.41 16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59z" />
      </svg>
    </forge-ai-artifact-card>
  `},C={args:{disabled:!0}},w={args:{titleText:`Traffic collisions by intersection, severity, weather condition, and time of day`,subtitleText:`Table · 2024 Collision Records · filtered to arterial roads within city limits · 1,284 rows`}},T={render:()=>n`
    ${h}
    <forge-ai-artifact-card
      title-text="Q4 collision summary"
      subtitle-text="Report · 4 charts"
      asset-id="q4-report"
      class="artifact-card-story-accent"
      @forge-ai-artifact-card-open=${p(`forge-ai-artifact-card-open`)}>
      ${_}
    </forge-ai-artifact-card>
  `},E={render:()=>n`
    ${h}
    <div class="artifact-card-story-list">
      <forge-ai-artifact-card
        title-text="Traffic collisions by intersection"
        subtitle-text="Table · 2024 Collision Records · 1,284 rows"
        asset-id="collisions-2024"
        active
        @forge-ai-artifact-card-open=${p(`forge-ai-artifact-card-open`)}>
        ${g}
      </forge-ai-artifact-card>
      <forge-ai-artifact-card
        title-text="Q4 collision summary"
        subtitle-text="Report · 4 charts"
        asset-id="q4-report"
        @forge-ai-artifact-card-open=${p(`forge-ai-artifact-card-open`)}>
        ${_}
      </forge-ai-artifact-card>
    </div>
  `},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    active: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-ai-artifact-card
      title-text="Q4 collision summary"
      subtitle-text="Report · 4 charts"
      asset-id="q4-report"
      @forge-ai-artifact-card-open=\${action('forge-ai-artifact-card-open')}></forge-ai-artifact-card>
  \`
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-ai-artifact-card
      title-text="Traffic collisions by intersection"
      subtitle-text="Table · 2024 Collision Records · 1,284 rows"
      asset-id="collisions-2024"
      action-label="Collapse table"
      active
      @forge-ai-artifact-card-open=\${action('forge-ai-artifact-card-open')}>
      \${tableIcon}
      <svg slot="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M22 3.41 16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59z" />
      </svg>
    </forge-ai-artifact-card>
  \`
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    titleText: 'Traffic collisions by intersection, severity, weather condition, and time of day',
    subtitleText: 'Table · 2024 Collision Records · filtered to arterial roads within city limits · 1,284 rows'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    \${storyStyles}
    <forge-ai-artifact-card
      title-text="Q4 collision summary"
      subtitle-text="Report · 4 charts"
      asset-id="q4-report"
      class="artifact-card-story-accent"
      @forge-ai-artifact-card-open=\${action('forge-ai-artifact-card-open')}>
      \${chartIcon}
    </forge-ai-artifact-card>
  \`
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    \${storyStyles}
    <div class="artifact-card-story-list">
      <forge-ai-artifact-card
        title-text="Traffic collisions by intersection"
        subtitle-text="Table · 2024 Collision Records · 1,284 rows"
        asset-id="collisions-2024"
        active
        @forge-ai-artifact-card-open=\${action('forge-ai-artifact-card-open')}>
        \${tableIcon}
      </forge-ai-artifact-card>
      <forge-ai-artifact-card
        title-text="Q4 collision summary"
        subtitle-text="Report · 4 charts"
        asset-id="q4-report"
        @forge-ai-artifact-card-open=\${action('forge-ai-artifact-card-open')}>
        \${chartIcon}
      </forge-ai-artifact-card>
    </div>
  \`
}`,...E.parameters?.docs?.source}}},D=[`Demo`,`Active`,`DefaultIcon`,`CollapsibleAction`,`Disabled`,`Truncation`,`CustomAccent`,`InTranscript`]})))()}export{E as a,y as i,f as n,O as o,S as r,b as t};