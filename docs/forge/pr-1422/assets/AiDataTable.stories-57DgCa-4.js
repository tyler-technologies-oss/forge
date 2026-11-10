import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-CbV23-8Y.js";import{t as i}from"./tools-Dq-kbb3K.js";var a=t({CustomPageSize:()=>m,Demo:()=>f,SmallTable:()=>p,__namedExportsOrder:()=>h,default:()=>d});function o(e){return{id:`tool-call-1`,messageId:`message-1`,name:`displayDataTable`,args:e,status:`complete`,type:`agent`}}var s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{r(),i(),s=`forge-ai-tool-data-table`,c=[`Department`,`Open permits`,`Overdue`,`Avg. days open`],l=[`Building`,`Zoning`,`Fire`,`Public Works`,`Planning`,`Health`,`Parks`,`Transit`],u=Array.from({length:24},(e,t)=>[`${l[t%l.length]} ${Math.floor(t/l.length)+1}`,100+t*7,10+t*3,12+t%9]),d={title:`AI/Components/Tools & Reasoning/Data Table`,component:s,render:()=>n` <forge-ai-tool-data-table .toolCall=${o({title:`Permits by department`,headers:c,rows:u})}></forge-ai-tool-data-table> `},f={},p={render:()=>n`
    <forge-ai-tool-data-table .toolCall=${o({title:`Top departments`,headers:c,rows:u.slice(0,3)})}></forge-ai-tool-data-table>
  `},m={render:()=>n`
    <forge-ai-tool-data-table .toolCall=${o({title:`Permits by department`,headers:c,rows:u,maxNumberOfRows:5})}></forge-ai-tool-data-table>
  `},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-ai-tool-data-table .toolCall=\${createToolCall({
    title: 'Top departments',
    headers,
    rows: rows.slice(0, 3)
  })}></forge-ai-tool-data-table>
  \`
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-ai-tool-data-table .toolCall=\${createToolCall({
    title: 'Permits by department',
    headers,
    rows,
    maxNumberOfRows: 5
  })}></forge-ai-tool-data-table>
  \`
}`,...m.parameters?.docs?.source}}},h=[`Demo`,`SmallTable`,`CustomPageSize`]})))()}export{g as i,m as n,f as r,a as t};