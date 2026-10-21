import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-BjnIcTYW.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Getting Started/Customization`}),`
`,(0,c.jsx)(n.h1,{id:`customization`,children:`Customization`}),`
`,(0,c.jsx)(n.p,{children:`There are many ways that Forge components can be customized. Whether you are looking for theming, overriding internal styles
within the Shadow DOM, or looking to extend a component with new functionality you will find information about how to go
about that within this guide.`}),`
`,(0,c.jsx)(n.h2,{id:`theming`,children:`Theming`}),`
`,(0,c.jsxs)(n.p,{children:[`All components within Forge support theming at the core. To view detailed information about theming, please view the `,(0,c.jsx)(n.a,{href:`?path=/docs/getting-started-theming--docs`,children:`theming guide`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`css`,children:`CSS`}),`
`,(0,c.jsxs)(n.p,{children:[`When attempting to customize a component via CSS, you will be using either `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/--*`,rel:`nofollow`,children:`CSS Custom Properties`}),` or `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/--*`,rel:`nofollow`,children:`CSS Shadow Parts`}),`.
Both of these CSS-based solutions will give you access to changing how the internals of a component are rendered without adjusting any functionality.`]}),`
`,(0,c.jsx)(n.p,{children:`For example, Forge provides many CSS custom properties from within specific components to help adjust specific internal styles:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`forge-button {
  --forge-button-background: red;
}
`})}),`
`,(0,c.jsxs)(n.p,{children:[`If you want to have complete control over any of the internal styles within a component, that's where CSS Shadow Parts come in. This feature allows you to target
any named "part" of a component (any element within the components' Shadow DOM that has a `,(0,c.jsx)(n.code,{children:`part`}),` attribute applied) and set any CSS styles on it that you wish:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`forge-button::part(root) {
  height: 100px;
  background-color: red;
  display: grid;
}
`})}),`
`,(0,c.jsx)(n.h2,{id:`html`,children:`HTML`}),`
`,(0,c.jsxs)(n.p,{children:[`You can also customize components via HTML using the provided HTML `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot`,rel:`nofollow`,children:`slot`}),` elements within the Shadow DOM of a component. This allows for you to project
your own content into specifically named locations within the internal template of a component. Typically a component will expect certain elements to be applied
within these slots, but this also allows for you to potentially customize the usage to your needs if you see fit.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-text-field>
  <label for="input">Label</label>
  <input type="text" id="input" />

  <!-- Render a custom element into a slot if desired -->
  <forge-badge slot="helper-text">Custom helper text</forge-badge>
</forge-text-field>
`})}),`
`,(0,c.jsx)(n.p,{children:`So as you can see, you can customize anything you want. Now, would you typically want to do that? Probably not since it doesn't follow proper design guidance, but
these examples show you how you might be able to customize things and how easy that can be achieved.`})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};