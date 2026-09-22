import{b as d}from"./iframe-BTsZxqzu.js";import{s as u,g as f}from"./utils-B0J9t6hU.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-CjVBnotg.js";import"./app-bar-menu-button-CFiTdJpq.js";import"./app-bar-profile-button-DoGxqipC.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DhRbvloE.js";import"./menu-D5KoOrqK.js";import"./linear-progress-VpC6qUWa.js";import"./list-DxnPa9SU.js";import"./popover-CdNzs7fC.js";import"./overlay-knVFCZgv.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DBZT6LKu.js";import"./list-item-BTfzPPjj.js";import"./avatar-DoSh_Dn-.js";import"./icon-button-CSxHjIC-.js";import"./autocomplete-hXsQWRXE.js";import"./label-OjWKjQls.js";import"./base-field-CobvQUzz.js";import"./focus-indicator-BxamY3-n.js";import"./text-field-Ch1FWqHZ.js";import"./backdrop-Dvs4MPLP.js";import"./badge-DDQskPzl.js";import"./banner-Dm9dhMPo.js";import"./bottom-sheet-C7_rHYEu.js";import"./dialog-DxXf_Dbp.js";import"./button-area-4bI26jRa.js";import"./button-toggle-group-BFEOiNHv.js";import"./button-ClyH3Yl3.js";import"./calendar-EKqwaDxI.js";import"./card-Qhb2yYy0.js";import"./checkbox-DVtidS7M.js";import"./chip-set-D_vH5iS6.js";import"./state-layer-UyeTOOS1.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-CKIyPXzm.js";import"./date-picker-p-6IrbFy.js";import"./date-range-picker-aiXks6tR.js";import"./divider-Dg5OevOB.js";import"./base-drawer-BUa_Gi5V.js";import"./drawer-DmGwXUG9.js";import"./modal-drawer-CKqZfbJJ.js";import"./mini-drawer-BrHB6nIf.js";import"./expansion-panel-BbI0pkhF.js";import"./open-icon-BwO0GMIm.js";import"./file-picker-CtOJktyP.js";import"./floating-action-button-4KD-XSG5.js";import"./inline-message-BXrlbIvc.js";import"./key-item-Cwp8M_5_.js";import"./keyboard-shortcut-mXtlvBJF.js";import"./label-value-CDNJ622N.js";import"./meter-group-Bnnr3Hry.js";import"./page-state-C_fHeyC9.js";import"./paginator-B3As9dPL.js";import"./radio-group-D1m04xtX.js";import"./scaffold-D8DtzjhO.js";import"./secret-D9qW-V8N.js";import"./select-dropdown-BdiZ4bOb.js";import"./select-Bwz3DagM.js";import"./skip-link-3BiqU279.js";import"./slider-ojE6Aw4y.js";import"./split-view-CiqHmrFI.js";import"./stack-E4V9OTtJ.js";import"./stepper-H99SvyzG.js";import"./switch-BYCVeuO7.js";import"./table-DpM5Ey70.js";import"./tab-panel-CtZ60m4t.js";import"./time-picker-B_FvMdr4.js";import"./timestamp-dOqt_oXq.js";import"./toast-C42nowyP.js";import"./toolbar-BrM6y13y.js";import"./tooltip-DAcILSGy.js";import"./tree-item-Ds7WR_SG.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-FHI3ZZnx.js";import"./split-button-Bes8qIKO.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Gt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Gt as P,m as W};
