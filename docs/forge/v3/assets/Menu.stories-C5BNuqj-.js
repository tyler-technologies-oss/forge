import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CebKObJP.js";import{_ as a,i as o,l as s,m as c,s as l}from"./utils-C3ow8Ikc.js";import{t as u}from"./menu-Co8ULcUo.js";import{t as d}from"./button-DoiHRyaz.js";import{r as f,t as p}from"./style-map-C_WKUe4Y.js";import{i as m,n as h,t as g}from"./ref-DN8O4ptj.js";var _=t({Cascading:()=>x,Demo:()=>b,Grouped:()=>S,__namedExportsOrder:()=>C,default:()=>y}),v,y,b,x,S,C;function w(){return(w=e((()=>{i(),c(),p(),g(),u(),d(),v=`forge-menu`,y={title:`Components/Menu`,render:e=>{let t=s(e),i=t?f(t):r,a=[{label:`Save`,value:`save`},{label:`Edit`,value:`edit`},{label:`Delete`,value:`delete`}];return e.mode===`cascade`&&(a[1]={...a[1],options:[{label:`As New`,value:`asNew`},{label:`Overwrite`,value:`overwrite`},{label:`More`,value:`more`,options:[{label:`Option 1`,value:`option1`},{label:`Option 2`,value:`option2`},{label:`Option 3`,value:`option3`}]}]}),n`
      <forge-menu
        .open=${e.open}
        .placement=${e.placement}
        .persistSelection=${e.persistSelection}
        .mode=${e.mode}
        .options=${a}
        style=${i}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `},component:v,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:v,include:[`open`,`placement`,`persistSelection`,`mode`],controls:{placement:{control:`select`,options:[...o]},persistSelection:{type:`boolean`},mode:{control:`select`,options:[`click`,`cascade`]}}})},args:{open:!1,placement:`bottom-start`,persistSelection:!1,mode:`click`}},b={},x={args:{mode:`cascade`}},S={...a,render:()=>{let e=h();return window.requestAnimationFrame(()=>{e.value&&(e.value.options=[{text:`Group 1`,options:[{label:`Option 1`,value:`option1`},{label:`Option 2`,value:`option2`}]},{text:`Group 2`,options:[{label:`Option 3`,value:`option3`},{label:`Option 4`,value:`option4`}]}])}),n`
      <forge-menu ${m(e)}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'cascade'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const menuRef = createRef<IMenuComponent>();
    window.requestAnimationFrame(() => {
      if (!menuRef.value) {
        return;
      }
      menuRef.value.options = [{
        text: 'Group 1',
        options: [{
          label: 'Option 1',
          value: 'option1'
        }, {
          label: 'Option 2',
          value: 'option2'
        }]
      }, {
        text: 'Group 2',
        options: [{
          label: 'Option 3',
          value: 'option3'
        }, {
          label: 'Option 4',
          value: 'option4'
        }]
      }] as IMenuOptionGroup[];
    });
    return html\`
      <forge-menu \${ref(menuRef)}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    \`;
  }
}`,...S.parameters?.docs?.source}}},C=[`Demo`,`Cascading`,`Grouped`]})))()}export{w as a,_ as i,b as n,S as r,x as t};