import{b as d}from"./iframe-B1NHwC0_.js";import{s as u,g as f}from"./utils-BzaDkCLg.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B3ULFEvU.js";import"./app-bar-profile-button-A1iHoefB.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-C6cWHI1A.js";import"./menu-B0stW3wi.js";import"./linear-progress-BmTkV8LG.js";import"./list-CifI-izk.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-DBB633E8.js";import"./icon-button-srYMMv1X.js";import"./focus-indicator-BsYlmvD4.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-EtciugmD.js";import"./label-CuTyvnbB.js";import"./button-CLrzbLUD.js";import"./button-toggle-group-CY1bqjfd.js";import"./checkbox-DYjZE3fs.js";import"./switch-DUtY78dW.js";import"./base-field-Cu9APC8D.js";import"./text-field-orEQl3Wg.js";import"./backdrop-B-u3npFo.js";import"./badge-CWzYTB9X.js";import"./banner-tzEiLVAR.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-DrFjP3IE.js";import"./calendar-CP396CWx.js";import"./card-BdIw2hYz.js";import"./chip-set-6RmtjtRa.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-BwasV-Hc.js";import"./date-picker-CnQkI7gi.js";import"./date-range-picker-vo4KZ_fn.js";import"./divider-1b50YxJD.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-B-WN1Ywk.js";import"./open-icon-pvhrQChV.js";import"./file-picker-nZpeko5_.js";import"./floating-action-button-D0T2oQGx.js";import"./inline-message-rggUpLwV.js";import"./key-item-BnvisKN2.js";import"./keyboard-shortcut-Dm0yshwY.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-Cenai9an.js";import"./page-state-B9wnmWpA.js";import"./paginator-CWBHIgYw.js";import"./scaffold-ALuq0Bgn.js";import"./secret-7GL7JyN9.js";import"./select-dropdown-k30SPkbF.js";import"./select-DA_jWfyn.js";import"./skip-link-D_hzA31t.js";import"./slider-CytO8Mu1.js";import"./split-view-OuGpb3bP.js";import"./stack-DGYl-onA.js";import"./stepper-xZ26qDrG.js";import"./table-GC_h3MkE.js";import"./tab-bar-CDFnWIPR.js";import"./time-picker-_V2Yso9L.js";import"./toast-BseDx11z.js";import"./toolbar-HgDVd-F9.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-h5jb3SjP.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-vZ28_am0.js";import"./split-button-93paO-OY.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,zt as P,m as W};
