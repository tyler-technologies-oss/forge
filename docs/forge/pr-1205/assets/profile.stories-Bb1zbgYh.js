import{b as d}from"./iframe-BblV6lM6.js";import{s as u,g as f}from"./utils-BUKDVvEj.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DyCAmrOH.js";import"./app-bar-profile-button-BwGqUaUj.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DRA6bGfg.js";import"./menu-FZTqW-M6.js";import"./linear-progress-D4Cj2MuD.js";import"./list-CCvIoFn6.js";import"./popover-Bh05NAXp.js";import"./overlay-DitP1Bcd.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-B7MCDoop.js";import"./avatar-BzcoZcCt.js";import"./icon-button-C64ITINA.js";import"./focus-indicator-CJ06cRFQ.js";import"./state-layer-BkRErCgp.js";import"./autocomplete-mcR7ddP1.js";import"./label-DgtLlFt3.js";import"./base-field-DI4hIcqj.js";import"./text-field-CoxHFm95.js";import"./backdrop-DWOkfyRe.js";import"./badge-D1mWFmFY.js";import"./banner-C93XYg3x.js";import"./bottom-sheet-Io029VJ6.js";import"./dialog-Dsaa2gTD.js";import"./button-area-CaCZJR-6.js";import"./button-toggle-group-M180YuqW.js";import"./button-D6HkJmFA.js";import"./calendar-DPxRaNkJ.js";import"./card-ecxLMRer.js";import"./checkbox-C3IVmT_N.js";import"./chip-set-CfnKJWVU.js";import"./circular-progress-3kKN4QWU.js";import"./color-picker-BYRpUe-V.js";import"./date-picker-CGzZFZxN.js";import"./date-range-picker-DHXuCIan.js";import"./divider-DYs1bahi.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DUVGp38y.js";import"./modal-drawer-Dj3OThKy.js";import"./mini-drawer-BRD3ce3r.js";import"./expansion-panel-CsNu_zGa.js";import"./open-icon-ejJ-3oqd.js";import"./file-picker-DXBJn6JG.js";import"./floating-action-button-CxwL6GF_.js";import"./inline-message-MRVYAzAu.js";import"./key-item-BmCLLyPg.js";import"./keyboard-shortcut-Bf4tIEHk.js";import"./label-value-CWmtlzqa.js";import"./option-group-L79y3Jcb.js";import"./meter-group-CRddPegR.js";import"./page-state-j1LLkVCi.js";import"./paginator-CTYmqLFP.js";import"./radio-group-2wbcHX_A.js";import"./scaffold-CssrLcVP.js";import"./secret-Pa9Q7GFj.js";import"./select-dropdown-CgLlLwcB.js";import"./select-BEm_mk-O.js";import"./skip-link-CLBNAST_.js";import"./slider-BqlOZw-0.js";import"./split-view-uwsBzyaD.js";import"./stack-Cu7r2NOS.js";import"./stepper-B3eSPYfT.js";import"./switch-ItbIKIMG.js";import"./table-vf8tCVDG.js";import"./tab-panel-RqDD2zgC.js";import"./time-picker-C9oyujmQ.js";import"./timestamp-CNRI7vML.js";import"./toast-Unu0PY3e.js";import"./toolbar-VQ731ONo.js";import"./tooltip-BCLlLAa8.js";import"./tree-item-DDz1tsv2.js";import"./view-switcher-Xboobifv.js";import"./deprecated-icon-button-BbQtZKpv.js";import"./split-button-DO01OlVj.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,qt as P,m as W};
