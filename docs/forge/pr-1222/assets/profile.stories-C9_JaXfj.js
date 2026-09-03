import{b as d}from"./iframe-ZebJRd2k.js";import{s as u,g as f}from"./utils-DYC_LATD.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Ug8gcxpy.js";import"./app-bar-profile-button-JOnMlEdZ.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CvAFZSnF.js";import"./menu-Dh27MJLl.js";import"./linear-progress-Dh__ll_M.js";import"./list-N8ASX7X4.js";import"./popover-DJnfQE5v.js";import"./overlay-CZiEinF4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-q0AxETeF.js";import"./avatar-CG30mfRF.js";import"./icon-button-DCXr5XdP.js";import"./focus-indicator-vAXHGgAC.js";import"./state-layer-mJUCxnSJ.js";import"./autocomplete-Bk2_gtxY.js";import"./label-f55TS_D7.js";import"./base-field-DsCdnF0Y.js";import"./text-field-ucavXP17.js";import"./backdrop-6rFKosil.js";import"./badge-CeZia43N.js";import"./banner-s3g7c_IX.js";import"./bottom-sheet-DGmGkCpG.js";import"./dialog-IHMyQNAY.js";import"./button-area-C2in_mHz.js";import"./button-toggle-group-17YBKD5R.js";import"./button-BpytEDv8.js";import"./calendar-B_QUkRP1.js";import"./card-DfkIdtZw.js";import"./checkbox-Bc849Iht.js";import"./chip-set-BOwG39zE.js";import"./circular-progress-CNehBhf0.js";import"./color-picker-CSMUFsoe.js";import"./date-picker-DcomIif4.js";import"./date-range-picker-BikdNtKV.js";import"./divider-y91p-zHY.js";import"./base-drawer-7Wh9lkkV.js";import"./drawer-CRT3lE2E.js";import"./modal-drawer-BijuI8cC.js";import"./mini-drawer-BD00MKTN.js";import"./expansion-panel-DeavQ187.js";import"./open-icon-CIKLB1JF.js";import"./file-picker-DeC74yhf.js";import"./floating-action-button-edT7p-6w.js";import"./inline-message-DGh2LsDu.js";import"./kbd-C9587X8D.js";import"./key-item-Cu2hLkcq.js";import"./keyboard-shortcut-CMS3bTC6.js";import"./label-value-o_jvt4kl.js";import"./meter-group-BPfGGMbH.js";import"./page-state-By0fGZIX.js";import"./paginator-B1cjV7-o.js";import"./radio-group-DZrwsi0s.js";import"./scaffold-DlnKxn3X.js";import"./secret-BnZ7AX2b.js";import"./select-dropdown-DVf6hVJD.js";import"./select-CTNbtzak.js";import"./skip-link-CIphpZ5o.js";import"./slider-DROOd6f2.js";import"./split-view-DsCxL_Na.js";import"./stack-Cbce-CUg.js";import"./stepper-DMe1qmkB.js";import"./switch-CpOHNJV_.js";import"./table-BSFDgrOO.js";import"./tab-panel-C5fQ6vP_.js";import"./time-picker-DGtDDiAE.js";import"./timestamp-CY9JmWfG.js";import"./toast-Du-ej_ml.js";import"./toolbar-bgz36830.js";import"./tooltip-v0Hw78HT.js";import"./tree-item-BCSd17DI.js";import"./view-switcher-D7AQr4N8.js";import"./deprecated-icon-button-CPrSq0uw.js";import"./split-button-C14Sz91i.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
