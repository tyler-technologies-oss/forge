import"./service-adapter-8tADcN_b.js";import"./badge-Db9mT6c9.js";import"./card-B_-12FZ6.js";import{I as u,D as h,E as b,v,F as y}from"./tyler-icons-DVutJ-sn.js";import"./timestamp-CzX5TqO_.js";import{b as e}from"./iframe-CJhNcN38.js";import{s as t,g as S,d as k}from"./utils-TiAJY-9P.js";u.define([h,b,v,y]);const d="forge-timeline",T={title:"Components/Timeline",tags:["new"],render:p=>{const g=document.createElement("forge-timeline");return k(g,p),[{content:"Project kickoff meeting completed"},{content:"Initial design mockups reviewed"},{content:"API endpoints finalized"},{content:"Code review session"}].forEach(c=>{const f=document.createElement("forge-timeline-item");f.textContent=c.content,g.appendChild(f)}),g},component:d,subcomponents:{"Timeline Item":"forge-timeline-item","Timeline Break":"forge-timeline-break"},argTypes:{...S({tagName:d})},args:{}},i={},n={...t,render:()=>e`
    <forge-timeline>
      <forge-timeline-item>
        <forge-icon slot="marker" name="check_circle"></forge-icon>
        <span>Feature deployment completed successfully</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <span>Scheduled maintenance at 3:00 PM</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-icon slot="marker" name="star"></forge-icon>
        <span>Product launch</span>
      </forge-timeline-item>
    </forge-timeline>
  `},r={...t,render:()=>e`
    <forge-timeline>
      <forge-timeline-item>
        <forge-badge slot="marker">New</forge-badge>
        <span>Feature Added</span>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <forge-badge slot="marker" theme="error">Error</forge-badge>
        <span>Build Failed</span>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <forge-badge slot="marker" theme="success">Done</forge-badge>
        <span>Tests Passed</span>
      </forge-timeline-item>
    </forge-timeline>
  `},m={...t,render:()=>e`
    <forge-timeline>
      <forge-timeline-item>
        <span>Recent Activity</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Code Review</span>
      </forge-timeline-item>
      <forge-timeline-break></forge-timeline-break>
      <forge-timeline-item>
        <span>Previous Activity</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Initial Commit</span>
      </forge-timeline-item>
    </forge-timeline>
  `},o={...t,render:()=>e`
    <forge-timeline>
      <forge-timeline-item>
        <span>Auto sidebars</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="none">
        <span>No sidebars</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="start">
        <span>Start sidebar</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="end">
        <span>End sidebar</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="both">
        <span>Both sidebars</span>
      </forge-timeline-item>
    </forge-timeline>
  `},a={...t,render:()=>e`
    <forge-timeline>
      <forge-timeline-item theme="primary">
        <span>Primary</span>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <span>Success</span>
      </forge-timeline-item>
      <forge-timeline-item theme="warning">
        <span>Warning</span>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <span>Error</span>
      </forge-timeline-item>
      <forge-timeline-item theme="info">
        <span>Info</span>
      </forge-timeline-item>
    </forge-timeline>
  `},s={...t,render:()=>e`
    <forge-timeline>
      <forge-timeline-item theme="success">
        <forge-icon slot="marker" name="check_circle"></forge-icon>
        <strong>Deployment Successful</strong>
        <forge-card slot="detail">
          <div>Version 2.0.0 has been successfully deployed to production. All services are running normally and health checks are passing.</div>
          <div style="margin-top: 8px; display: flex; gap: 8px;">
            <forge-badge>Production</forge-badge>
            <forge-badge theme="success">v2.0.0</forge-badge>
          </div>
        </forge-card>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <strong>Maintenance Scheduled</strong>
        <div slot="detail">Database migration scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.</div>
      </forge-timeline-item>
      <forge-timeline-item>
        <strong>Code Review Completed</strong>
        <div slot="detail">Pull request #456 has been reviewed and approved by 3 team members.</div>
      </forge-timeline-item>
    </forge-timeline>
  `},l={...t,render:()=>e`
    <forge-timeline>
      <forge-timestamp datetime="2024-03-15"></forge-timestamp>
      <forge-timeline-item>
        <span>Timestamp after</span>
        <forge-timestamp datetime="2024-03-15T14:30:00" format="HH:mm" separator="start"></forge-timestamp>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-timestamp datetime="2024-03-15T12:15:00" format="HH:mm" separator="end"></forge-timestamp>
        <span>Timestamp before</span>
      </forge-timeline-item>
      <forge-timestamp datetime="2024-03-14"></forge-timestamp>
      <forge-timeline-item>
        <span>No timestamp separator</span>
        <forge-timestamp datetime="2024-03-14T16:45:00" format="HH:mm"></forge-timestamp>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Timestamp in detail</span>
        <div slot="detail">Posted at <forge-timestamp slot="detail" datetime="2024-03-14T16:45:00" format="HH:mm"></forge-timestamp></div>
      </forge-timeline-item>
    </forge-timeline>
  `};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{}",...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-timeline>
      <forge-timeline-item>
        <forge-icon slot="marker" name="check_circle"></forge-icon>
        <span>Feature deployment completed successfully</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <span>Scheduled maintenance at 3:00 PM</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-icon slot="marker" name="star"></forge-icon>
        <span>Product launch</span>
      </forge-timeline-item>
    </forge-timeline>
  \`
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-timeline>
      <forge-timeline-item>
        <forge-badge slot="marker">New</forge-badge>
        <span>Feature Added</span>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <forge-badge slot="marker" theme="error">Error</forge-badge>
        <span>Build Failed</span>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <forge-badge slot="marker" theme="success">Done</forge-badge>
        <span>Tests Passed</span>
      </forge-timeline-item>
    </forge-timeline>
  \`
}`,...r.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-timeline>
      <forge-timeline-item>
        <span>Recent Activity</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Code Review</span>
      </forge-timeline-item>
      <forge-timeline-break></forge-timeline-break>
      <forge-timeline-item>
        <span>Previous Activity</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Initial Commit</span>
      </forge-timeline-item>
    </forge-timeline>
  \`
}`,...m.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-timeline>
      <forge-timeline-item>
        <span>Auto sidebars</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="none">
        <span>No sidebars</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="start">
        <span>Start sidebar</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="end">
        <span>End sidebar</span>
      </forge-timeline-item>
      <forge-timeline-item sidebar="both">
        <span>Both sidebars</span>
      </forge-timeline-item>
    </forge-timeline>
  \`
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-timeline>
      <forge-timeline-item theme="primary">
        <span>Primary</span>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <span>Success</span>
      </forge-timeline-item>
      <forge-timeline-item theme="warning">
        <span>Warning</span>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <span>Error</span>
      </forge-timeline-item>
      <forge-timeline-item theme="info">
        <span>Info</span>
      </forge-timeline-item>
    </forge-timeline>
  \`
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-timeline>
      <forge-timeline-item theme="success">
        <forge-icon slot="marker" name="check_circle"></forge-icon>
        <strong>Deployment Successful</strong>
        <forge-card slot="detail">
          <div>Version 2.0.0 has been successfully deployed to production. All services are running normally and health checks are passing.</div>
          <div style="margin-top: 8px; display: flex; gap: 8px;">
            <forge-badge>Production</forge-badge>
            <forge-badge theme="success">v2.0.0</forge-badge>
          </div>
        </forge-card>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <strong>Maintenance Scheduled</strong>
        <div slot="detail">Database migration scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.</div>
      </forge-timeline-item>
      <forge-timeline-item>
        <strong>Code Review Completed</strong>
        <div slot="detail">Pull request #456 has been reviewed and approved by 3 team members.</div>
      </forge-timeline-item>
    </forge-timeline>
  \`
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-timeline>
      <forge-timestamp datetime="2024-03-15"></forge-timestamp>
      <forge-timeline-item>
        <span>Timestamp after</span>
        <forge-timestamp datetime="2024-03-15T14:30:00" format="HH:mm" separator="start"></forge-timestamp>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-timestamp datetime="2024-03-15T12:15:00" format="HH:mm" separator="end"></forge-timestamp>
        <span>Timestamp before</span>
      </forge-timeline-item>
      <forge-timestamp datetime="2024-03-14"></forge-timestamp>
      <forge-timeline-item>
        <span>No timestamp separator</span>
        <forge-timestamp datetime="2024-03-14T16:45:00" format="HH:mm"></forge-timestamp>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Timestamp in detail</span>
        <div slot="detail">Posted at <forge-timestamp slot="detail" datetime="2024-03-14T16:45:00" format="HH:mm"></forge-timestamp></div>
      </forge-timeline-item>
    </forge-timeline>
  \`
}`,...l.parameters?.docs?.source}}};const P=["Demo","WithIcons","WithBadges","WithBreak","SidebarOptions","Themed","WithDetail","WithTimestamps"],x=Object.freeze(Object.defineProperty({__proto__:null,Demo:i,SidebarOptions:o,Themed:a,WithBadges:r,WithBreak:m,WithDetail:s,WithIcons:n,WithTimestamps:l,__namedExportsOrder:P,default:T},Symbol.toStringTag,{value:"Module"}));export{i as D,o as S,x as T,n as W,s as a,m as b,a as c,l as d};
