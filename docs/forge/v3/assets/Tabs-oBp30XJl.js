import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Byzp6JFn.js";import{n as c,t as l}from"./CustomArgTypes-QAslgvtG.js";import{a as u,c as d,i as f,n as p,o as m,r as h,s as g,t as _}from"./Tabs.stories-ClO1anX0.js";function v(e){let n={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(s,{of:f}),`
`,(0,b.jsx)(o,{}),`
`,(0,b.jsx)(n.p,{children:`Tabs are used to quickly navigate between different views, and group related content any level of hierarchy. They may be used as primary
or secondary navigation within a page.`}),`
`,(0,b.jsx)(n.h2,{id:`variants`,children:`Variants`}),`
`,(0,b.jsx)(n.p,{children:`Tabs can be displayed in a number of different ways, including horizontal, vertical, and clustered layouts. The default layout is horizontal.`}),`
`,(0,b.jsx)(n.h3,{id:`default`,children:`Default`}),`
`,(0,b.jsx)(n.p,{children:`By default tabs are displayed in a horizontal layout. This is the most common use case for tabs:`}),`
`,(0,b.jsx)(a,{of:p}),`
`,(0,b.jsx)(n.h3,{id:`clustered`,children:`Clustered`}),`
`,(0,b.jsx)(n.p,{children:`Clustered tabs are displayed in a horizontal orientation, but instead of spanning the full width of their container, they are grouped together
and can be aligned to the left, center, or right of the container:`}),`
`,(0,b.jsx)(a,{of:_}),`
`,(0,b.jsx)(n.h3,{id:`vertical`,children:`Vertical`}),`
`,(0,b.jsx)(n.p,{children:`Vertical tabs are displayed in a vertical orientation. This is useful when you have a large number of tabs, or when you want to save horizontal
space:`}),`
`,(0,b.jsx)(a,{of:u}),`
`,(0,b.jsx)(n.h3,{id:`with-icons`,children:`With Icons`}),`
`,(0,b.jsx)(n.p,{children:`Tabs can also include icons to help users quickly identify the content of each tab. Icons can be displayed to the left (start) or right (end) of the tab label:`}),`
`,(0,b.jsx)(a,{of:m}),`
`,(0,b.jsx)(n.h2,{id:`scrolling`,children:`Scrolling`}),`
`,(0,b.jsxs)(n.p,{children:[`The `,(0,b.jsx)(n.code,{children:`<forge-tab-bar>`}),` element supports scrolling when the tabs overflow the container. This is useful when you have a large number of tabs and
want to ensure that all tabs are accessible to the user. The tabs will automatically scroll when the user switches tabs, or when the
user clicks on the scroll buttons.`]}),`
`,(0,b.jsx)(a,{of:h}),`
`,(0,b.jsx)(n.h2,{id:`disabled-state`,children:`Disabled State`}),`
`,(0,b.jsxs)(n.p,{children:[`When disabling tabs you should either choose to disable all tabs together through the `,(0,b.jsx)(n.code,{children:`<forge-tab-bar>`}),` element, or disable individual tabs for
each `,(0,b.jsx)(n.code,{children:`<forge-tab>`}),` element. Do not mix the two approaches. This is recommended because if you attempt to use both at the same time, the two
disabled states can conflict with each other leading to unexpected behavior.`]}),`
`,(0,b.jsx)(n.h2,{id:`named-tabs`,children:`Named Tabs`}),`
`,(0,b.jsxs)(n.p,{children:[`The active tab can be set or retrieved by its name through the `,(0,b.jsx)(n.code,{children:`activeTabName`}),` property on the `,(0,b.jsx)(n.code,{children:`<forge-tab-bar>`}),` element.`]}),`
`,(0,b.jsx)(n.pre,{children:(0,b.jsx)(n.code,{className:`language-html`,children:`<!-- Tab two will be active -->
<forge-tab-bar active-tab-name="two">
  <forge-tab name="one">Tab one</forge-tab>
  <forge-tab name="two">Tab two</forge-tab>
  <forge-tab name="three">Tab three</forge-tab>
  <forge-tab name="four">Tab four</forge-tab>
</forge-tab-bar>
`})}),`
`,(0,b.jsxs)(n.p,{children:[`To get the name of the active tab when the active tab changes, listen for the `,(0,b.jsx)(n.code,{children:`forge-tab-bar-change`}),`
event on the `,(0,b.jsx)(n.code,{children:`<forge-tab-bar>`}),` element and access the `,(0,b.jsx)(n.code,{children:`name`}),` property on the event's detail.`]}),`
`,(0,b.jsx)(n.pre,{children:(0,b.jsx)(n.code,{className:`language-ts`,children:`const tabBar = document.querySelector('forge-tab-bar');
tabBar?.addEventListener('forge-tab-bar-change', (event) => {
  const activeTabName = event.detail.name;
  console.log('Active tab name:', activeTabName);
});
`})}),`
`,(0,b.jsx)(n.h2,{id:`tab-panels`,children:`Tab Panels`}),`
`,(0,b.jsxs)(n.p,{children:[`The `,(0,b.jsx)(n.code,{children:`<forge-tab-panel>`}),` element can be used to associate content with a specific tab. The `,(0,b.jsx)(n.code,{children:`for`}),`
attribute on the `,(0,b.jsx)(n.code,{children:`<forge-tab-panel>`}),` element should match the `,(0,b.jsx)(n.code,{children:`id`}),` of the corresponding
`,(0,b.jsx)(n.code,{children:`<forge-tab>`}),` element. When a tab is selected, the corresponding tab panel will be displayed and all
other tab panels will be hidden. The `,(0,b.jsx)(n.code,{children:`<forge-tab-panel>`}),` element will also automatically manage ARIA
relationships and focus to ensure that the tab pattern is fully accessible.`]}),`
`,(0,b.jsx)(a,{of:g}),`
`,(0,b.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,b.jsx)(l,{}),`
`,(0,b.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsxs)(n.ul,{children:[`
`,(0,b.jsx)(n.li,{children:`Ensure that all of the controls that are accessible by a mouse are also accessible by keyboard.`}),`
`,(0,b.jsx)(n.li,{children:`Ensure each control can be updated or activated by the keyboard.`}),`
`,(0,b.jsx)(n.li,{children:`Ensure that only the selected tab content is reachable by keyboard.`}),`
`]}),`
`,(0,b.jsxs)(n.p,{children:[`It's expected that you will need to provide the `,(0,b.jsx)(n.code,{children:`tablist`}),` and `,(0,b.jsx)(n.code,{children:`tabpanel`}),` roles to your elements to
indicate to assistive technologies which elements are responsible for the tabs and tab content
respectively. Each tab should contain an `,(0,b.jsx)(n.code,{children:`aria-controls`}),` property identifying its corresponding tab
content. In addition, each tab content element should be labelled by a tab. These elements need to
be wrapped in an element containing a `,(0,b.jsx)(n.code,{children:`tablist`}),` role:`]})]})}function y(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,b.jsx)(n,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;function x(){return(x=e((()=>{b=r(),n(),i(),c(),d()})))()}x();export{y as default};