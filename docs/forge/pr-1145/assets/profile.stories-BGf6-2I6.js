import{b as d}from"./iframe-C327hvo9.js";import{s as u,g as f}from"./utils-C5IA10r7.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BY43sGQN.js";import"./app-bar-profile-button-C6hIvx_Q.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BB4gv-aU.js";import"./menu-rbkG6qd5.js";import"./linear-progress-CsGp1g6o.js";import"./list-CWyJ3w_6.js";import"./popover-m1791iHL.js";import"./overlay-xxnOCE5v.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DFXzpPoH.js";import"./avatar-CVP0qRFH.js";import"./icon-button-C3w-tJNs.js";import"./focus-indicator-CC5ZO39G.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-Dwfl3rBU.js";import"./label-tlgsttVC.js";import"./base-field-COm0Lf_w.js";import"./text-field-CElGqUjI.js";import"./backdrop-3KzDwztH.js";import"./badge-CnBZsMuv.js";import"./banner-H_5TxJd_.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-BGTZfPaa.js";import"./button-toggle-group-C5eKsVbM.js";import"./button-DJMrSepR.js";import"./calendar-D9INqG_j.js";import"./card-D210I_oC.js";import"./checkbox-CBOsklVm.js";import"./chip-set-BhlNeEUz.js";import"./circular-progress-DIduwjig.js";import"./color-picker-B7H-L6YJ.js";import"./date-picker-tAGA16xK.js";import"./date-range-picker-DJlUvRkc.js";import"./divider-D04rINzl.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-BiYK9idJ.js";import"./open-icon-DNb8wJJ7.js";import"./file-picker-DjNYvL6k.js";import"./floating-action-button-OwJuhE7X.js";import"./inline-message-fj34p3Px.js";import"./key-item-PYEulTYb.js";import"./keyboard-shortcut-kHzj1dH0.js";import"./label-value-cTsUvwyw.js";import"./meter-group-DiOP4LbP.js";import"./page-state-DDjhdZbK.js";import"./paginator-C-ogfluV.js";import"./radio-group-CF6ECAB4.js";import"./scaffold-CufLEZ-a.js";import"./secret-CE2mvkzH.js";import"./select-dropdown-CLooG_im.js";import"./select-BK_3eCql.js";import"./skip-link-DZWBrHcn.js";import"./slider-DwhcbB7L.js";import"./split-view-BXvDftUv.js";import"./stack-Bc7kWG9C.js";import"./stepper-DlNVjkQP.js";import"./switch-BZdfeBGV.js";import"./table-DeQD2QAE.js";import"./tab-panel-CEeioyF7.js";import"./time-picker-D95enHi3.js";import"./timestamp-iQvk9OtA.js";import"./toast-DKkzsGDr.js";import"./toolbar-B3i-JtVE.js";import"./tooltip-D2aN2ihQ.js";import"./tree-item-DjIZrdkZ.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-BpHY7uTh.js";import"./split-button-DemeiRWZ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};
