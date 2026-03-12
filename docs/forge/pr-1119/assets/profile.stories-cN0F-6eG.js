import{b as d}from"./iframe-B9Mn3MTF.js";import{s as u,g as f}from"./utils-Dr8ZxV_m.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BPY0cbT-.js";import"./app-bar-profile-button-IOisOeeZ.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Cfjef8Hp.js";import"./menu-DKc7IJv6.js";import"./linear-progress-C9rKJPwB.js";import"./list-DpG-mQpV.js";import"./popover-BCVIx3D1.js";import"./overlay-Cgb5IAlb.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-7bCDpj6R.js";import"./avatar-D-sgIQHw.js";import"./icon-button-2xWdivGS.js";import"./focus-indicator-CYJ4ta_a.js";import"./state-layer-D0SSeJ16.js";import"./autocomplete-DPmkfLd7.js";import"./label-Dxps7CO4.js";import"./button-4-N4P9ye.js";import"./button-toggle-group-84yse_00.js";import"./checkbox-T1_XI6FM.js";import"./switch-9JcCyNt4.js";import"./base-field-B7MphIDB.js";import"./text-field-DluAQgMq.js";import"./backdrop-Ck2ckKlw.js";import"./badge-plC7yW6Z.js";import"./banner-CakA5Zpw.js";import"./bottom-sheet-CTDZIrhF.js";import"./dialog-CDD3XYiE.js";import"./button-area-CMddeWfb.js";import"./calendar-BpubrdMm.js";import"./card-DFnVtGn-.js";import"./chip-set-YJ14PC_u.js";import"./circular-progress-Ccu7KP3W.js";import"./color-picker-ejKnF7Jp.js";import"./date-picker-BgosHaG_.js";import"./date-range-picker-8imY5dMw.js";import"./divider-BhCygk1f.js";import"./base-drawer-B-oVfBtq.js";import"./drawer-BBpjY8SV.js";import"./modal-drawer-B3GF85-N.js";import"./mini-drawer-M-3gdrU4.js";import"./expansion-panel-BbxVbjPz.js";import"./open-icon-nGWqZslb.js";import"./file-picker-BReIA02t.js";import"./floating-action-button-Cauo5LPF.js";import"./inline-message-MDZIyJNO.js";import"./key-item-rg5ApiVY.js";import"./keyboard-shortcut-B888_VA0.js";import"./label-value-342323er.js";import"./meter-group-CO1MoxI7.js";import"./page-state-BXhyhEYZ.js";import"./paginator-BxusBlHw.js";import"./scaffold-DpCXKOUM.js";import"./select-dropdown-DY_Fu7IF.js";import"./select-Dfbo_3JR.js";import"./skip-link-CvTJ_J_9.js";import"./slider-DcLHZcfA.js";import"./split-view-DG9jPsC4.js";import"./stack-DTbT3KUK.js";import"./stepper-BM69YNhJ.js";import"./table-Bg3PKjCK.js";import"./tab-bar-DN4eHpYi.js";import"./time-picker-DuD9LB-a.js";import"./toast-D9ezil5Y.js";import"./toolbar-CFdgiwTS.js";import"./tooltip-P-CrpSEv.js";import"./tree-item-CcdMcHN4.js";import"./view-switcher-C5b2QH2R.js";import"./deprecated-icon-button-Cg-4Lc_9.js";import"./split-button-Rh7rC-YZ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ut=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ut as P,m as W};
