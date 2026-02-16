import{j as e,M as r,T as a,C as s}from"./blocks-oRvhozmv.js";import{useMDXComponents as o}from"./index-CovlyB-K.js";import{C as c}from"./CustomArgTypes-BbEVeoR0.js";import{B as l,D as h}from"./ButtonArea.stories-DFpQP6-_.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-B5XvQRU6.js";import"./utils-CbU1ENex.js";import"./style-map-FQ6vWITG.js";import"./directive-jorct-Oe.js";import"./service-adapter-CffG5Lhq.js";import"./tyler-icons-CBdZU-Tr.js";import"./base-component-DDNjpQtJ.js";import"./feature-detection-DBWkqjAp.js";import"./base-adapter-j11ZPrFD.js";import"./index-DTwfV0k0.js";import"./card-Db8mAYK4.js";import"./property-Couz3Ovy.js";import"./utils-DU-9AqTO.js";import"./base-lit-element-CGVJzDwD.js";import"./button-area-IgIjiG64.js";import"./event-utils-C1SDeUaq.js";import"./query-assigned-elements-43hYArgI.js";import"./base-DVmwUFg0.js";import"./ref-CvJ6FY9G.js";import"./icon-button-CZj7QIrK.js";import"./base-button-core-808Ja3Z5.js";import"./with-label-aware-Ef9Lm0aI.js";import"./with-default-aria-BJTWd1sB.js";import"./a11y-utils-Bk90r5kb.js";import"./focus-indicator-BCZS7QTD.js";import"./state-layer-DGD4bZzf.js";import"./tooltip-DxbQteKS.js";import"./overlay-B2P-gJmC.js";import"./with-longpress-listener-BpF482dW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./decorators-D96Mc7ku.js";function i(n){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:`The button area is a container element for an interactive "area" of the page. It's common to make larger sections of the page (such as individual cards)
interactive and respond to user pointer events. The button area provides an accessible way to do this.`}),`
`,e.jsxs(t.p,{children:[`It works by wrapping the content you want to visually appear interactive and then connecting a button element that will be used to control the
interactive behavior while the state layer fills the parent container. When set to the component's `,e.jsx(t.code,{children:"button"})," slot, this ",e.jsx(t.code,{children:"<button>"}),` is visually hidden
from the page, but it can still receive focus which the button area will handle and make it appear as if the full content is interactive to the user. Buttons visible
within the content area of the component can also be connected and used the same way, expanding their interactive area while maintaining simple code and good accessibility.
When clicking anywhere in the button area, the component will dispatch a `,e.jsx(t.code,{children:"click"})," event to the connected button, allowing you to listen for the event and respond accordingly."]}),`
`,e.jsx(s,{of:h}),`
`,e.jsxs(t.h2,{id:"using-the-forge-ignore-attribute",children:["Using the ",e.jsx(t.code,{children:"forge-ignore"})," attribute"]}),`
`,e.jsxs(t.p,{children:["It is common to place multiple interactive elements within a ",e.jsx(t.code,{children:"<forge-button-area>"}),`. In these cases you will likely want to prevent the button area from
responding when clicking those elements (or any elements within). To do this you can either listen for the click event yourself on the specific elements you care about
and call `,e.jsx(t.code,{children:"stopPropagation()"})," on the event, or you can use the ",e.jsx(t.code,{children:"forge-ignore"})," attribute for convenience."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-button-area id="button-area">
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
`,e.jsx(t.h2,{id:"state-reflection",children:"State reflection"}),`
`,e.jsx(t.p,{children:"The button area observes the connected button and automatically reflects certain ARIA attributes as CSS states that can be styled:"}),`
`,e.jsx(t.h3,{id:"pressed-state",children:"Pressed state"}),`
`,e.jsxs(t.p,{children:["When the connected button has ",e.jsx(t.code,{children:'aria-pressed="true"'}),", the button area applies the ",e.jsx(t.code,{children:":state(pressed)"})," CSS state. This is useful for toggle buttons:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-button-area>
  <button slot="button" aria-pressed="false">Toggle</button>
  <div>Toggle content</div>
</forge-button-area>
`})}),`
`,e.jsx(t.h3,{id:"current-state",children:"Current state"}),`
`,e.jsxs(t.p,{children:["When the connected button has ",e.jsx(t.code,{children:"aria-current"})," set to a valid value (",e.jsx(t.code,{children:'"true"'}),", ",e.jsx(t.code,{children:'"page"'}),", ",e.jsx(t.code,{children:'"step"'}),", ",e.jsx(t.code,{children:'"location"'}),", ",e.jsx(t.code,{children:'"date"'}),", or ",e.jsx(t.code,{children:'"time"'}),`), the button area applies the
`,e.jsx(t.code,{children:":state(current)"})," CSS state. This is useful for navigation items:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-button-area>
  <button slot="button" aria-current="page">Home</button>
  <div>Home page</div>
</forge-button-area>
`})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Always include a slotted ",e.jsx(t.code,{children:"<button>"})," element or connect a visble button with the ",e.jsx(t.code,{children:"target"})," or ",e.jsx(t.code,{children:"targetElement"})," properties."]}),`
`,e.jsxs(t.li,{children:["Add a concise, descriptive description of the button area's action as the text content of the connected button.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The button's text content should preferably be the same as the visible text within the button area to reduce confusion. This can a portion of the content if long."}),`
`]}),`
`]}),`
`,e.jsxs(t.li,{children:["Set any accessible attributes on the connected button.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"aria-controls"})," if the button controls another element on the page."]}),`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"aria-expanded"})," to reflect the state of the controlled element if appropriate."]}),`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"aria-pressed"})," if the button is a toggle button."]}),`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"aria-current"})," if the button represents the current item within a set of items"]}),`
`]}),`
`]}),`
`,e.jsxs(t.li,{children:["Verify that you can reach every nested button by keyboard navigation.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure that there is a visual cue that the nested button is currently in focus."}),`
`]}),`
`]}),`
`,e.jsx(t.li,{children:"Verify that pressing the space bar or enter key while focused on a button will activate the button area in the same manner as if it had been clicked with a mouse."}),`
`,e.jsx(t.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements."}),`
`]})]})}function K(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{K as default};
