const __vite__fileDeps=["./index-paGK19DO.js","./index-BNO0qKPk.js","./index-BUJNsIhJ.js","./iframe-ByyLvck1.js","./_commonjsHelpers-Cpj98o6Y.js","./chunk-QN4WKJDJ-Bf_F3oir.js","./index-DXimoRZY.js","./index-DvzDrELh.js","./index-DrFu-skq.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as h}from"./iframe-ByyLvck1.js";import{h as d,R as o,r as c,i as E,A as R,j as x,D as y}from"./index-BUJNsIhJ.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";var i={},m=d;i.createRoot=m.createRoot,i.hydrateRoot=m.hydrateRoot;var n=new Map,D=({callback:t,children:e})=>{let r=c.useRef();return c.useLayoutEffect(()=>{r.current!==t&&(r.current=t,t())},[t]),e},_=async(t,e,r)=>{let s=await w(e,r);return new Promise(a=>{s.render(o.createElement(D,{callback:()=>a(null)},t))})},v=(t,e)=>{let r=n.get(t);r&&(r.unmount(),n.delete(t))},w=async(t,e)=>{let r=n.get(t);return r||(r=i.createRoot(t,e),n.set(t,r)),r},f={code:E,a:R,...x},g=class extends c.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(t){let{showException:e}=this.props;e(t)}render(){let{hasError:t}=this.state,{children:e}=this.props;return t?null:o.createElement(o.Fragment,null,e)}},j=class{constructor(){this.render=async(t,e,r)=>{let s={...f,...e==null?void 0:e.components},a=y;return new Promise((u,p)=>{h(()=>import("./index-paGK19DO.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url).then(({MDXProvider:l})=>_(o.createElement(g,{showException:p,key:Math.random()},o.createElement(l,{components:s},o.createElement(a,{context:t,docsParameter:e}))),r)).then(()=>u())})},this.unmount=t=>{v(t)}}};export{j as DocsRenderer,f as defaultComponents};
