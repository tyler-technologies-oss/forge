import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-BjnIcTYW.js";import{n as c,t as l}from"./CustomArgTypes-DROUQxDe.js";import{n as u,r as d,t as f}from"./ButtonArea.stories-CtJMOY6-.js";function p(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`The button area is a container element for an interactive "area" of the page. It's common to make larger sections of the page (such as individual cards)
interactive and respond to user pointer events. The button area provides an accessible way to do this.`}),`
`,(0,h.jsxs)(n.p,{children:[`It works by wrapping the content you want to visually appear interactive and then connecting a button element that will be used to control the
interactive behavior while the state layer fills the parent container. When set to the component's `,(0,h.jsx)(n.code,{children:`button`}),` slot, this `,(0,h.jsx)(n.code,{children:`<button>`}),` is visually hidden
from the page, but it can still receive focus which the button area will handle and make it appear as if the full content is interactive to the user. Buttons visible
within the content area of the component can also be connected and used the same way, expanding their interactive area while maintaining simple code and good accessibility.
When clicking anywhere in the button area, the component will dispatch a `,(0,h.jsx)(n.code,{children:`click`}),` event to the connected button, allowing you to listen for the event and respond accordingly.`]}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsxs)(n.h2,{id:`using-the-forge-ignore-attribute`,children:[`Using the `,(0,h.jsx)(n.code,{children:`forge-ignore`}),` attribute`]}),`
`,(0,h.jsxs)(n.p,{children:[`It is common to place multiple interactive elements within a `,(0,h.jsx)(n.code,{children:`<forge-button-area>`}),`. In these cases you will likely want to prevent the button area from
responding when clicking those elements (or any elements within). To do this you can either listen for the click event yourself on the specific elements you care about
and call `,(0,h.jsx)(n.code,{children:`stopPropagation()`}),` on the event, or you can use the `,(0,h.jsx)(n.code,{children:`forge-ignore`}),` attribute for convenience.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-button-area id="button-area">
  <button slot="button" aria-labelledby="button-area-heading"></button>
  <div style="display: flex; justify-content: space-between;">
    <div>
      <div class="forge-typography--heading4" id="button-area-heading">Heading</div>
      <div>Content</div>
    </div>

    <!--
      Using the forge-ignore attribute allows this element to be placed within the
      button area content without interfering or triggering the main button interaction.
    -->
    <forge-icon-button forge-ignore>
      <forge-icon name="favorite"></forge-icon>
    </forge-icon-button>
  </div>
</forge-button-area>
`})}),`
`,(0,h.jsx)(n.h2,{id:`usage-with-anchor-links`,children:`Usage with anchor links`}),`
`,(0,h.jsxs)(n.p,{children:[`The button area can be used with anchor (`,(0,h.jsx)(n.code,{children:`<a>`}),`) elements in addition to buttons:`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-button-area>
  <a slot="button" href="/page" aria-labelledby="heading">
    Navigate to page
  </a>
  <div>
    <div class="forge-typography--heading4" id="heading">Page Title</div>
    <div>Click anywhere to navigate</div>
  </div>
</forge-button-area>
`})}),`
`,(0,h.jsxs)(n.blockquote,{children:[`
`,(0,h.jsxs)(n.p,{children:[(0,h.jsx)(n.strong,{children:`Note:`}),` `,(0,h.jsx)(n.code,{children:`<a>`}),` elements can't be disabled. Attempting to disable a `,(0,h.jsx)(n.code,{children:`<forge-button-area>`}),` with an anchor element will have no effect.`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`state-reflection`,children:`State reflection`}),`
`,(0,h.jsx)(n.p,{children:`The button area observes the connected button and automatically reflects certain ARIA attributes as CSS states that can be styled:`}),`
`,(0,h.jsx)(n.h3,{id:`pressed-state`,children:`Pressed state`}),`
`,(0,h.jsxs)(n.p,{children:[`When the connected button has `,(0,h.jsx)(n.code,{children:`aria-pressed="true"`}),`, the button area applies the `,(0,h.jsx)(n.code,{children:`:state(pressed)`}),` CSS state. This is useful for toggle buttons:`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-button-area>
  <button slot="button" aria-pressed="false">Toggle</button>
  <div>Toggle content</div>
</forge-button-area>
`})}),`
`,(0,h.jsx)(n.h3,{id:`current-state`,children:`Current state`}),`
`,(0,h.jsxs)(n.p,{children:[`When the connected button has `,(0,h.jsx)(n.code,{children:`aria-current`}),` set to a valid value (`,(0,h.jsx)(n.code,{children:`"true"`}),`, `,(0,h.jsx)(n.code,{children:`"page"`}),`, `,(0,h.jsx)(n.code,{children:`"step"`}),`, `,(0,h.jsx)(n.code,{children:`"location"`}),`, `,(0,h.jsx)(n.code,{children:`"date"`}),`, or `,(0,h.jsx)(n.code,{children:`"time"`}),`), the button area applies the
`,(0,h.jsx)(n.code,{children:`:state(current)`}),` CSS state. This is useful for navigation items:`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-button-area>
  <button slot="button" aria-current="page">Home</button>
  <div>Home page</div>
</forge-button-area>
`})}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`Always include a slotted `,(0,h.jsx)(n.code,{children:`<button>`}),` or `,(0,h.jsx)(n.code,{children:`<a>`}),` element or connect a visible button or `,(0,h.jsx)(n.code,{children:`<a>`}),` element with the `,(0,h.jsx)(n.code,{children:`target`}),` or `,(0,h.jsx)(n.code,{children:`targetElement`}),` properties.`]}),`
`,(0,h.jsxs)(n.li,{children:[`Add a concise, descriptive description of the button area's action as the text content of the connected button.`,`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`The button's text content should preferably be the same as the visible text within the button area to reduce confusion. This can a portion of the content if long.`}),`
`]}),`
`]}),`
`,(0,h.jsxs)(n.li,{children:[`Set any accessible attributes on the connected button.`,`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`Set `,(0,h.jsx)(n.code,{children:`aria-controls`}),` if the button controls another element on the page.`]}),`
`,(0,h.jsxs)(n.li,{children:[`Set `,(0,h.jsx)(n.code,{children:`aria-expanded`}),` to reflect the state of the controlled element if appropriate.`]}),`
`,(0,h.jsxs)(n.li,{children:[`Set `,(0,h.jsx)(n.code,{children:`aria-pressed`}),` if the button is a toggle button.`]}),`
`,(0,h.jsxs)(n.li,{children:[`Set `,(0,h.jsx)(n.code,{children:`aria-current`}),` if the button represents the current item within a set of items`]}),`
`]}),`
`]}),`
`,(0,h.jsxs)(n.li,{children:[`Verify that you can reach every nested button by keyboard navigation.`,`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`Ensure that there is a visual cue that the nested button is currently in focus.`}),`
`]}),`
`]}),`
`,(0,h.jsxs)(n.li,{children:[`Verify that pressing the space bar or enter key while focused on a button will activate the button area in the same manner as if it had been clicked with a mouse. When used with an `,(0,h.jsx)(n.code,{children:`<a>`}),` element only the enter key should activate the button area.`]}),`
`,(0,h.jsx)(n.li,{children:`Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements.`}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};