import{x as b}from"./iframe-D16yKRLu.js";import{g as y,s as I}from"./utils-CwQ2mEzo.js";import"./feature-detection-CY6TVbRZ.js";import"./accordion-COZSrA0o.js";import"./expansion-panel-D1x-X8ND.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-CuaEKUU3.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import{I as h,t as v,a as x,b as L,c as _}from"./icon-Bh1zyXYd.js";import"./menu-Csi4eOUZ.js";import"./linear-progress-CJb_8skk.js";import"./list-DCzhHkfW.js";import"./popover-BUd5kSDj.js";import"./overlay-CmLQVoKV.js";import"./skeleton-DocRecw2.js";import"./avatar-TZLbZmVs.js";import"./icon-button-CuEKyh48.js";import"./autocomplete-DBYYLLIq.js";import"./label-iMGwTRlg.js";import"./button-CLmfPElC.js";import"./button-toggle-group-5BDyeLck.js";import"./checkbox-CF9fzMIR.js";import"./switch-ZI6WyDhE.js";import"./base-field-CF9KCSOy.js";import"./text-field-DcY_OPg2.js";import"./backdrop-Bv12Tb1U.js";import"./badge-BALYpLQK.js";import"./banner-BKOG8-_a.js";import"./bottom-sheet-BUXtQmmm.js";import"./dialog-BAjKLc2i.js";import"./button-area-DkxJjLzq.js";import"./calendar-B-uKCOkn.js";import"./card-C9ZEzKzF.js";import"./chip-set-Ejv2QtPa.js";import"./circular-progress-pTvFqlis.js";import"./color-picker-Lrgn5rZ0.js";import"./date-picker-DFdcDW1O.js";import"./date-range-picker-7Yl-AekY.js";import"./divider-DBTw_7sm.js";import"./base-drawer-C68FwRuM.js";import"./drawer-DpoxQTjp.js";import"./modal-drawer-XYvP5Fib.js";import"./mini-drawer-uH-d4rqn.js";import"./file-picker-Fn3uZUAt.js";import"./floating-action-button-DQ7v5iXC.js";import"./inline-message-CTo_BAYA.js";import"./key-item-CA4noYRt.js";import"./keyboard-shortcut-wz335gzF.js";import"./label-value-BHIrdMWh.js";import"./meter-group-DWDBPggK.js";import"./page-state-Bl7puESY.js";import"./paginator-DMQewZsj.js";import"./scaffold-BjMvQLbF.js";import"./select-dropdown-6wQx9nWS.js";import"./select-YaDYno8K.js";import"./skip-link-CkowTV5X.js";import"./slider-CTd3yYpZ.js";import"./split-view-DAQjWPCR.js";import"./stack-CpbYXLv7.js";import"./stepper-DQj0JQd0.js";import"./table-UHmtL0iM.js";import"./tab-bar-DJS5oYWT.js";import"./time-picker-08RkgsG7.js";import"./toast-r2jOHawb.js";import"./toolbar-CJj-iw1_.js";import"./tooltip-DJb4FXvJ.js";import"./view-switcher-CMdWoHU0.js";import"./deprecated-icon-button-BTh0hzh1.js";import"./split-button-BcynZ6Mg.js";const{action:C}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",O=C("forge-profile-card-profile"),P=C("forge-profile-card-sign-out");h.define([v,x,L,_]);const S={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>b`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button
          slot="end"
          @forge-profile-card-profile=${O}
          @forge-profile-card-sign-out=${P}
          .avatarLetterCount=${n}
          .profileButton=${p}
          .profileButtonText=${e}
          .signOutButton=${t}
          .signOutButtonText=${o}
          .fullName=${r}
          .email=${i}
          .open=${a}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `,component:s,argTypes:{...y({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...I,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return b`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};var c,d,u;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(u=(d=l.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var f,g,E;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder() {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.log('[profile-card] Selected custom item:', detail.value);
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
}`,...(E=(g=m.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};const $=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:$,default:S},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};
