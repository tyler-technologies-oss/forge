import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CebKObJP.js";import{_ as i,m as a,s as o}from"./utils-C3ow8Ikc.js";import{o as s}from"./icon-DTQwimRS.js";import{Jt as c,an as l,m as u,rn as d,t as f}from"./tyler-icons-CLXzO0Q_.js";import{t as p}from"./app-bar-DKrD_pGW.js";import{t as m}from"./lib-z4PBpJl_.js";var h=t({Demo:()=>x,WithCustomContent:()=>S,__namedExportsOrder:()=>C,default:()=>b}),g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{r(),a(),m(),f(),p(),{action:g}=__STORYBOOK_MODULE_ACTIONS__,_=`forge-app-bar-profile-button`,v=g(`forge-profile-card-profile`),y=g(`forge-profile-card-sign-out`),s.define([u,l,d,c]),b={title:`Components/App Bar/Profile`,render:({profileButton:e,profileButtonText:t,signOutButton:r,signOutButtonText:i,open:a,fullName:o,email:s,avatarLetterCount:c=2})=>n`
    <forge-app-bar title-text="Profile">
      <forge-app-bar-profile-button
        slot="end"
        @forge-profile-card-profile=${v}
        @forge-profile-card-sign-out=${y}
        .avatarLetterCount=${c}
        .profileButton=${e}
        .profileButtonText=${t}
        .signOutButton=${r}
        .signOutButtonText=${i}
        .fullName=${o}
        .email=${s}
        .open=${a}>
      </forge-app-bar-profile-button>
    </forge-app-bar>
  `,component:_,argTypes:{...o({tagName:_,exclude:[`avatarIcon`,`avatarImageUrl`,`avatarText`,`popupElement`,`profileCardBuilder`]})},args:{email:`first.last@tylertech.com`,fullName:`First Last`,open:!1,profileButton:!1,signOutButton:!0}},x={},S={...i,render:()=>{function e(){let e=document.createElement(`forge-list`);return e.addEventListener(`forge-list-item-select`,({detail:e})=>{console.warn(`[profile-card] Selected custom item:`,e.value)}),e.style.setProperty(`--forge-list-padding`,`0`),e.appendChild(document.createElement(`forge-divider`)),e.appendChild(t(`My Reports`,`assignment`,`reports`)),e.appendChild(t(`My Workflow`,`work_outline`,`workflow`)),e.appendChild(t(`My Alerts`,`warning`,`alerts`)),e.appendChild(t(`My Preferences`,`settings`,`preferences`)),e}function t(e,t,n){let r=document.createElement(`forge-list-item`);r.value=n;let i=document.createElement(`forge-icon`);i.slot=`leading`,i.name=t,r.appendChild(i);let a=document.createElement(`button`);return a.type=`button`,a.innerText=e,r.appendChild(a),r}return n`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${e}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder(): HTMLElement {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.warn('[profile-card] Selected custom item:', detail.value);
      });
      listElement.style.setProperty('--forge-list-padding', '0');
      listElement.appendChild(document.createElement('forge-divider'));
      listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
      listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
      listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
      listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
      return listElement;
    }
    function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
      const listItemElement = document.createElement('forge-list-item');
      listItemElement.value = value;
      const iconElement = document.createElement('forge-icon');
      iconElement.slot = 'leading';
      iconElement.name = icon;
      listItemElement.appendChild(iconElement);
      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.innerText = text;
      listItemElement.appendChild(buttonElement);
      return listItemElement;
    }
    return html\`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=\${builder}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    \`;
  }
}`,...S.parameters?.docs?.source}}},C=[`Demo`,`WithCustomContent`]})))()}export{h as i,S as n,w as r,x as t};