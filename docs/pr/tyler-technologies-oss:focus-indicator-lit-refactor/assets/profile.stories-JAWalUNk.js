import{x as b}from"./iframe-B_AFpbKZ.js";import{g as y,s as I}from"./utils-D0zOu5id.js";import"./service-adapter-BykFeYYZ.js";import"./accordion-Dj-01N5e.js";import"./expansion-panel-BBO7eYZa.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-DK5zji9b.js";import"./state-layer-BRTtEqto.js";import"./focus-indicator-CyTlhlQD.js";import{I as h,t as v,a as x,b as L,c as _}from"./icon-eJOvSyyv.js";import"./menu-CrovJr5c.js";import"./linear-progress-BTaob5x2.js";import"./list-BKcKppFQ.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./skeleton-fsmWNbya.js";import"./avatar-DD7NlKxa.js";import"./icon-button-U4pg755t.js";import"./autocomplete-Bwlq9PS4.js";import"./label-8C4joo3A.js";import"./button-BjTHYlPk.js";import"./button-toggle-group-BkTZIXUI.js";import"./checkbox-BwaxslW8.js";import"./switch-BxEMfYtZ.js";import"./base-field-CspDK4qd.js";import"./text-field-Ckbn5Mre.js";import"./backdrop-BqEK3-r8.js";import"./badge-C4YDm1UO.js";import"./banner-DwUstg-t.js";import"./bottom-sheet-B0-LCUir.js";import"./dialog-bZFrz6KW.js";import"./button-area-BIwvdsYT.js";import"./calendar-xAIqpgLo.js";import"./card-DWXijWME.js";import"./chip-set-DHKYydN0.js";import"./circular-progress-CZq2hNtE.js";import"./color-picker-Dp18frBk.js";import"./date-picker-B0IhPCwT.js";import"./date-range-picker-CdRZ1M2r.js";import"./divider-BT9ZT4ca.js";import"./base-drawer-DpzFm5sn.js";import"./drawer-CMJX_VXP.js";import"./modal-drawer-BcW7ce7M.js";import"./mini-drawer-DlIAARO3.js";import"./file-picker-M4MPS0hz.js";import"./floating-action-button-BF9AKdiX.js";import"./inline-message-Dq5-MYZT.js";import"./key-item-BKIvLr6d.js";import"./keyboard-shortcut-BkPHDYRH.js";import"./label-value-D_q4g7yi.js";import"./meter-group-CxgztAjx.js";import"./page-state-CHc7wzFU.js";import"./paginator-W8pWflX6.js";import"./scaffold-DGBqen_X.js";import"./select-dropdown-DnF3Eeir.js";import"./select-Bz6noCUM.js";import"./skip-link-BrjEJRJ6.js";import"./slider-B-AH6EQj.js";import"./split-view-CgwXHpZR.js";import"./stack-D7mJ6aR0.js";import"./stepper-BMrWK6Pl.js";import"./table-DkogYtO9.js";import"./tab-bar-BjM0EErf.js";import"./time-picker-D74lFKBf.js";import"./toast-DqQZLmAb.js";import"./toolbar-Bv8KpWT6.js";import"./tooltip-CRaofu57.js";import"./view-switcher-DSx2dL0c.js";import"./deprecated-icon-button-CkXXg8Aq.js";import"./split-button-BIpabqLp.js";const{action:C}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",O=C("forge-profile-card-profile"),P=C("forge-profile-card-sign-out");h.define([v,x,L,_]);const S={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>b`
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
