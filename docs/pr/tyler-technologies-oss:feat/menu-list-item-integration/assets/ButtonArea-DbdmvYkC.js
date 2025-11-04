import{j as e,M as r,T as a,C as s}from"./blocks-DhDmOgNW.js";import{useMDXComponents as o}from"./index-CT_T4fzd.js";import{C as l}from"./CustomArgTypes-BxRLTXJZ.js";import{B as c,D as h}from"./ButtonArea.stories-B07ouEe_.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-ud64zO_u.js";import"./utils-BbCJfv7X.js";import"./style-map-BGGxShtt.js";import"./directive-CJw_OlP2.js";import"./service-adapter-CffG5Lhq.js";import"./icon-kuXwuZAY.js";import"./constants-DzQy6WDX.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./card-Cwn7CUJI.js";import"./base-lit-element-yrWJxQek.js";import"./utils-Bd6MGx91.js";import"./button-area-BU4R42g6.js";import"./focus-indicator-CQxGFI1Q.js";import"./state-layer-gAgMwMHF.js";import"./event-utils-C1SDeUaq.js";import"./icon-button-OWCAyDQZ.js";import"./base-button-adapter-v_tYDhVa.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./tooltip-B59ljHGY.js";import"./overlay-B5pGv-rV.js";import"./with-longpress-listener-DtGZwA0v.js";import"./dismissible-stack-TpzCxM2R.js";import"./decorators-CZ_YdMu5.js";function i(n){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:`The button area is a container element for an interactive "area" of the page. It's common to make larger sections of the page (such as individual cards)
interactive and respond to user pointer events. The button area provides an accessible way to do this.`}),`
`,e.jsxs(t.p,{children:[`It works by wrapping the content you want to visually appear interactive, and then provide a slotted button element that will be used to control the
interactive behavior while the state layer fills the parent container size. The `,e.jsx(t.code,{children:"<button>"}),` is visually hidden from the page, but it can still receive
focus which the button area will handle and make it appear as if the full content is interactive to the user. When clicking anywhere in the button area,
the component will dispatch a `,e.jsx(t.code,{children:"click"})," event to the slotted ",e.jsx(t.code,{children:"<button>"})," itself, allowing you to listen for the event and respond accordingly."]}),`
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
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Always include a slotted ",e.jsx(t.code,{children:"<button>"})," element."]}),`
`,e.jsxs(t.li,{children:["Add a concise, descriptive description of the button area's action as the text content of the slotted button.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The button's text content should preferably be the same as the visible text within the button area to reduce confusion. This can a portion of the content if long."}),`
`]}),`
`]}),`
`,e.jsxs(t.li,{children:["Set any accessible attributes on the slotted button.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"aria-controls"})," if the button controls another element on the page."]}),`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"aria-expanded"})," to reflect the state of the controlled element if appropriate."]}),`
`]}),`
`]}),`
`,e.jsxs(t.li,{children:["Verify that you can reach every nested button by keyboard navigation.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure that there is a visual cue that the nested button is currently in focus."}),`
`]}),`
`]}),`
`,e.jsx(t.li,{children:"Verify that pressing the space bar or enter key while focused on a button will activate the button area in the same manner as if it had been clicked with a mouse."}),`
`,e.jsx(t.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements."}),`
`]})]})}function L(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{L as default};
