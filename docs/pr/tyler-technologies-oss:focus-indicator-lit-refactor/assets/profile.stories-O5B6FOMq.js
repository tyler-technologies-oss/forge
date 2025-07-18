import{x as b}from"./iframe-Dusku7t3.js";import{g as y,s as I}from"./utils-D0zOu5id.js";import"./service-adapter-BykFeYYZ.js";import"./accordion-Dj-01N5e.js";import"./expansion-panel-BBO7eYZa.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-Dcq-TOdG.js";import"./state-layer-BRTtEqto.js";import"./focus-indicator-B6EU3cOJ.js";import{I as h,t as v,a as x,b as L,c as _}from"./icon-eJOvSyyv.js";import"./menu-D7rIM4h4.js";import"./linear-progress-BTaob5x2.js";import"./list-7I7_pQzb.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./skeleton-fsmWNbya.js";import"./avatar-0EdaxfI5.js";import"./icon-button-CbIuTIAL.js";import"./autocomplete-D0F2TSRS.js";import"./label-DKzNMyNt.js";import"./button-DNlRsDtE.js";import"./button-toggle-group-CUk-cDcn.js";import"./checkbox-BkhlnQoo.js";import"./switch-CYButROR.js";import"./base-field-CzHOwklE.js";import"./text-field-iNawn74f.js";import"./backdrop-BqEK3-r8.js";import"./badge-Cu0Ba4Nc.js";import"./banner-CFVFjuP9.js";import"./bottom-sheet-B0-LCUir.js";import"./dialog-bZFrz6KW.js";import"./button-area-CflB2lXQ.js";import"./calendar-ZNv-XmpJ.js";import"./card-CJvhXslB.js";import"./chip-set-CIrW0t-F.js";import"./circular-progress-CZq2hNtE.js";import"./color-picker-CRyz1fdV.js";import"./date-picker-BUwFsN1B.js";import"./date-range-picker-BiS2e5xQ.js";import"./divider-BT9ZT4ca.js";import"./base-drawer-DpzFm5sn.js";import"./drawer-CMJX_VXP.js";import"./modal-drawer-BcW7ce7M.js";import"./mini-drawer-DlIAARO3.js";import"./file-picker-DY9YFoGf.js";import"./floating-action-button-PVWkVoy8.js";import"./inline-message-Dq5-MYZT.js";import"./key-item-fezV9Ez8.js";import"./keyboard-shortcut-BkPHDYRH.js";import"./label-value-D_q4g7yi.js";import"./meter-group-CVd-gNLT.js";import"./page-state-CHc7wzFU.js";import"./paginator-B6pmuy_v.js";import"./scaffold-DGBqen_X.js";import"./select-dropdown-CqU2jalO.js";import"./select-C1-_T87e.js";import"./skip-link-CK1TOyBG.js";import"./slider-BoD4WHcK.js";import"./split-view-4a_6cT5w.js";import"./stack-D7mJ6aR0.js";import"./stepper-CM0gCK9J.js";import"./table-CPT1Vut_.js";import"./tab-bar-bVu6Pbsb.js";import"./time-picker-DQUZu4A9.js";import"./toast-BfDzlqdE.js";import"./toolbar-Bv8KpWT6.js";import"./tooltip-CRaofu57.js";import"./view-switcher-DSx2dL0c.js";import"./deprecated-icon-button-C2Oix3qA.js";import"./split-button-CI746Qz8.js";const{action:C}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",O=C("forge-profile-card-profile"),P=C("forge-profile-card-sign-out");h.define([v,x,L,_]);const S={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>b`
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
