import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnLnh7by.js";import{n as c,t as l}from"./CustomArgTypes-DS7Rl0eI.js";import{n as u,t as d}from"./CssOnlyInformation-LNVWbV40.js";import{a as f,i as p,n as m,o as h,r as g,s as _,t as v}from"./ExpansionPanel.stories-lwDjcYjh.js";function y(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:g}),`
`,(0,x.jsx)(o,{}),`
`,(0,x.jsx)(n.p,{children:`Expansion panels provide progressive disclosure of content. Use them to group and hide content that is not immediately relevant to the user.
They are useful for organizing information and reducing clutter on the screen.`}),`
`,(0,x.jsx)(a,{of:m}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsx)(n.p,{children:`Content within an expansion panel remains findable by the browser. When a user's find-in-page search matches text in a closed expansion panel, the panel will open to reveal the text.`}),`
`]}),`
`,(0,x.jsx)(n.h2,{id:`with-card`,children:`With Card`}),`
`,(0,x.jsx)(n.p,{children:`It's common to compose an expansion panel with a card component to provide a more visually appealing layout.`}),`
`,(0,x.jsx)(a,{of:f}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Tip:`}),` You can provide a `,(0,x.jsx)(n.code,{children:`<forge-open-icon>`}),` to show the open state of the expansion panel, and the icon will be rotated when the panel is opened/closed.`]}),`
`]}),`
`,(0,x.jsx)(n.h2,{id:`trigger-button`,children:`Trigger Button`}),`
`,(0,x.jsxs)(n.p,{children:[`A button in the `,(0,x.jsx)(n.code,{children:`header`}),` slot of the expansion panel will automatically control toggling the `,(0,x.jsx)(n.code,{children:`open`}),` state of the panel.
Setting the `,(0,x.jsx)(n.code,{children:`trigger`}),` attribute/property of the expansion panel to the button's `,(0,x.jsx)(n.code,{children:`id`}),` will also manage its `,(0,x.jsx)(n.code,{children:`aria-expanded`}),` and `,(0,x.jsx)(n.code,{children:`aria-controls`}),` attributes.
You can also set `,(0,x.jsx)(n.code,{children:`trigger`}),` to the `,(0,x.jsx)(n.code,{children:`id`}),` of a button elsewhere in the document to add the toggling and ARIA attribute functionality to it.`]}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Tip:`}),` Make sure the intended trigger element is present in the DOM at the same time the expansion panel initializes or has `,(0,x.jsx)(n.code,{children:`trigger`}),` set. Alternatively, use the `,(0,x.jsx)(n.code,{children:`triggerElement`}),` property to directly pass in the trigger element reference, which is less prone to errors related to incremental rendering.`]}),`
`]}),`
`,(0,x.jsx)(a,{of:h}),`
`,(0,x.jsx)(n.h2,{id:`open-icon`,children:`Open Icon`}),`
`,(0,x.jsxs)(n.p,{children:[`A `,(0,x.jsx)(n.code,{children:`<forge-open-icon>`}),` that's in the `,(0,x.jsx)(n.code,{children:`header`}),` slot of the expansion panel, or that's a child of the expansion panel's trigger button, has its `,(0,x.jsx)(n.code,{children:`open`}),` state automatically synced to the `,(0,x.jsx)(n.code,{children:`open`}),` state of the expansion panel.
You can also set `,(0,x.jsx)(n.code,{children:`openIcon`}),` to the `,(0,x.jsx)(n.code,{children:`id`}),` of a `,(0,x.jsx)(n.code,{children:`<forge-open-icon>`}),` elsewhere in the document.`]}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Tip:`}),` The same guidance about trigger button timing applies here. An `,(0,x.jsx)(n.code,{children:`openIconElement`}),` property exists to pass the open icon by reference as well.`]}),`
`]}),`
`,(0,x.jsxs)(n.h2,{id:`using-the-forge-ignore-attribute`,children:[`Using the `,(0,x.jsx)(n.code,{children:`forge-ignore`}),` Attribute`]}),`
`,(0,x.jsxs)(n.p,{children:[`It is common to place interactive elements within an expansion panel "header" slot. However, you may want to prevent the expansion panel from automatically
expanding/collapsing when the interactive element is clicked. To do this you can use the `,(0,x.jsx)(n.code,{children:`forge-ignore`}),` attribute for convenience. This attribute will
instruct the expansion panel to ignore pointer and keyboard events on that element, allowing it to remain interactive without affecting the expansion panel's state.`]}),`
`,(0,x.jsxs)(n.p,{children:[`The only thing to keep in mind is that ARIA attributes such as `,(0,x.jsx)(n.code,{children:`aria-expanded`}),` and `,(0,x.jsx)(n.code,{children:`aria-controls`}),` will not be automatically managed for elements with the `,(0,x.jsx)(n.code,{children:`forge-ignore`}),` attribute,
and you will need to control the open state of the expansion panel manually.`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-expansion-panel>
  <div slot="header" style="display: flex; justify-content: space-between;">
    <button type="button">Toggle Panel</button>

    <!--
      Using the forge-ignore attribute allows this element to be placed within the
      expansion panel header without causing the panel to expand/collapse when clicked.
    -->
    <forge-icon-button forge-ignore>
      <forge-icon name="forge_logo"></forge-icon>
    </forge-icon-button>
  </div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</forge-expansion-panel>
`})}),`
`,(0,x.jsx)(n.h2,{id:`named-groups`,children:`Named Groups`}),`
`,(0,x.jsxs)(n.p,{children:[`Expansion panels with the same `,(0,x.jsx)(n.code,{children:`name`}),` attribute will form a named group, where only one panel can be open at a time. When a panel in the group is opened, any other open panel in the group will automatically close.`]}),`
`,(0,x.jsx)(a,{of:p}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Tip:`}),` Named groups can be used to create accordion behavior without using a `,(0,x.jsx)(n.code,{children:`<forge-accordion>`}),` component.`]}),`
`]}),`
`,(0,x.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,x.jsx)(l,{}),`
`,(0,x.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[`If the user is able to click the expansion panel to toggle its state, ensure that a `,(0,x.jsx)(n.code,{children:`<button>`}),` element is present and clearly labeled to serve as an accessible point of interaction.`,`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsx)(n.li,{children:`Do not place complex or interactive elements within a button. If your design requires such content in the expansion panel header, place a button in the header alongside that content instead of enclosing it.`}),`
`]}),`
`]}),`
`,(0,x.jsx)(n.li,{children:`Ensure that the user can focus on the element which activates and deactivates the expansion panel.`}),`
`,(0,x.jsxs)(n.li,{children:[`Ensure `,(0,x.jsx)(n.code,{children:`aria-expanded`}),` is set on the button to reflect the state of the component. Update it when the panel opens or closes.`]}),`
`,(0,x.jsxs)(n.li,{children:[`Ensure `,(0,x.jsx)(n.code,{children:`aria-controls`}),` is set on the button to reference the id of the expandable content.`]}),`
`,(0,x.jsxs)(n.li,{children:[`Enclose the expandable content in an element with `,(0,x.jsx)(n.code,{children:`role="group"`}),` or another non-generic role.`]}),`
`,(0,x.jsx)(n.li,{children:`Ensure that the expansion panel can be activated by keyboard.`}),`
`,(0,x.jsx)(n.li,{children:`Here is an example of a properly marked up expansion panel:`}),`
`]}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Tip:`}),` A button associated with the expansion panel via `,(0,x.jsx)(n.code,{children:`trigger`}),` will automatically have its `,(0,x.jsx)(n.code,{children:`aria-expanded`}),` and `,(0,x.jsx)(n.code,{children:`aria-controls`}),` values managed.`]}),`
`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-expansion-panel trigger="button-id">
  <button slot="header" id="button-id">Toggle panel</button>
  <div id="expandable-content" role="group">Expandable content</div>
</forge-expansion-panel>
`})}),`
`,(0,x.jsx)(n.p,{children:`The button can also be placed elsewhere in the document, outside the expansion panel:`}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<button id="button-id">Toggle panel</button>

<forge-expansion-panel trigger="button-id">
  <div role="group">Expandable content</div>
</forge-expansion-panel>
`})}),`
`,(0,x.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,x.jsx)(n.p,{children:`The expansion-panel component is also available as a CSS-only component, but it does require a small amount of JavaScript to toggle the expanded state.`}),`
`,(0,x.jsx)(a,{of:v}),`
`,(0,x.jsx)(n.p,{children:`Below is an example JavaScript snippet that toggles the expanded state of the CSS-only expansion panel:`}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-js`,children:`// Get the button element
const button = expansionPanel.querySelector('#my-button');

// Get the expansion panel element
const expansionPanel = document.querySelector('#my-button + .forge-expansion-panel');

// Toggle the expanded state when the button is clicked
button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !expanded);
  expansionPanel.classList.toggle('forge-expansion-panel--open', !expanded);
});
`})}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Note:`}),` This is a simple example. You may need to adjust the JavaScript to fit your specific use case, or to fit framework-specific usage.`]}),`
`]}),`
`,(0,x.jsx)(d,{})]})}function b(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,x.jsx)(n,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=r(),n(),i(),c(),u(),_()})))()}S();export{b as default};