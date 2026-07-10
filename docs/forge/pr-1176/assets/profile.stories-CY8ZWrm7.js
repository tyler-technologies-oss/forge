import{b as d}from"./iframe-Hc2vxO-3.js";import{s as u,g as f}from"./utils-Ck-gGzab.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CdtSBUx8.js";import"./app-bar-profile-button-syFfQTxl.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BvDuEu60.js";import"./menu-BaLi85Ee.js";import"./linear-progress-Do3VWKo6.js";import"./list-LZCTD_xB.js";import"./popover-DSD9tpUV.js";import"./overlay-sExqbF4-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-ChM8mDa3.js";import"./avatar-CjBGbrW9.js";import"./icon-button-DrvoDOGf.js";import"./focus-indicator-B1FXTb5O.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-BY6nMtJv.js";import"./label-BQ6Zcfgc.js";import"./button-izRvq-sn.js";import"./button-toggle-group-COtB5IPL.js";import"./checkbox-BIwL8kgt.js";import"./switch-BxdaZ3zk.js";import"./base-field-B6Trs6w0.js";import"./text-field-CAx8lM7f.js";import"./backdrop-B0IRqNVE.js";import"./badge-Dj9DN67U.js";import"./banner-Crt7uQfR.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-Dsjrx5PC.js";import"./calendar-DzRD8pbD.js";import"./card-ooFRJGqH.js";import"./chip-set-D5lTVVnL.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-CYJCD5Mq.js";import"./date-picker-D82PVcO-.js";import"./date-range-picker-C1fMBeEE.js";import"./divider-OH7puZwD.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-Dv4xr34o.js";import"./open-icon-DmeI41T3.js";import"./file-picker-C5Zepj4P.js";import"./floating-action-button-Bd3HNQwZ.js";import"./inline-message-wW24XM3J.js";import"./key-item-D4rSCsdC.js";import"./keyboard-shortcut-BTW1Rqev.js";import"./label-value-DjHFGdMo.js";import"./meter-group-DOQIOuFA.js";import"./page-state-DECQz5Rm.js";import"./paginator-DhFEDguD.js";import"./scaffold-F_aQKixv.js";import"./secret-BOxaZ37H.js";import"./select-dropdown-DLgF2uPz.js";import"./select-7YxbUEnH.js";import"./skip-link-CzjUa65p.js";import"./slider-DpeOtCeX.js";import"./split-view-GEhlViX4.js";import"./stack-DEQW1E_G.js";import"./stepper-mxmQmLzf.js";import"./table-DZHOw0pP.js";import"./tab-bar-DYvMZbKL.js";import"./time-picker-CEL4bzkW.js";import"./timestamp-gfscBUNz.js";import"./toast-BzhfeWsc.js";import"./toolbar-DJ05uX5e.js";import"./tooltip-Zih5Vpcf.js";import"./tree-item-Bqif1_OG.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-6TgqE8cM.js";import"./split-button-DvJl0JSp.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
    <forge-app-bar title-text="Profile">
      <forge-app-bar-profile-button
        slot="end"
        @forge-profile-card-profile=${I}
        @forge-profile-card-sign-out=${h}
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
