import{u,j as s,S as p}from"./index-BrKdG6nK.js";import{a as i}from"./utils-Do5MGSMS.js";import{U as g,S as h,N as C}from"./CustomArgTypes-b1aUZ4kk.js";function d(e){return e.toLowerCase().replace(/^forge-/g,"").replace(/-/g," ")}function j(e){const t=e.replace(/^forge-/g,"");return`${t}/forge-${t}.css`}function x({name:e,path:t}){const n=`@use '@tylertech/forge/dist/${t}';`;return s.jsxs(s.Fragment,{children:[s.jsxs("p",{children:["To use the CSS-only ",e," component, include the following CSS file in your project:"]}),s.jsx(p,{code:n,dark:!1})]})}function y({items:e}){return s.jsx(h,{title:"CSS Classes",name:"css-classes",children:s.jsx(C,{items:e})})}function O(){var c;const e=u("story",["story"]),t=e.story.component;if(!t||typeof t!="string")return null;const n=i(t),m=((c=n.cssFilePath)==null?void 0:c.name)??j(t),r=n.cssClasses??[],a=e.story.subcomponents??{};return Object.keys(a).length&&Object.values(a).forEach(f=>{var l;const o=i(f);(l=o==null?void 0:o.cssClasses)!=null&&l.length&&r.push(...o.cssClasses)}),s.jsxs(s.Fragment,{children:[s.jsx(x,{name:d(t),path:m}),s.jsx(g,{text:"CSS-Only Components",href:"?path=/docs/getting-started-css-only-components--docs"}),r.length?s.jsx(y,{items:r}):null]})}export{O as C};
