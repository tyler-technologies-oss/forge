import{b as d}from"./iframe-D8FO6Qui.js";import{s as u,g as f}from"./utils-Ckg8JNDy.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DstuGk2-.js";import"./app-bar-profile-button-BFdm0XmE.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BPPraRYM.js";import"./menu-CyCZIctU.js";import"./linear-progress-C9rKJPwB.js";import"./list-7TZwFZJa.js";import"./popover-BCVIx3D1.js";import"./overlay-Cgb5IAlb.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-7bCDpj6R.js";import"./avatar-32T4hYTN.js";import"./icon-button-D3lzCQ6m.js";import"./focus-indicator-EatIIEs7.js";import"./state-layer-D0SSeJ16.js";import"./autocomplete-D9xbvYcU.js";import"./label-I34sSzDA.js";import"./button-BQLvLqBM.js";import"./button-toggle-group-DuGP473l.js";import"./checkbox-DvcYDMoO.js";import"./switch-dWF8Uu4p.js";import"./base-field-C5n_ApQC.js";import"./text-field-DdKTfqir.js";import"./backdrop-Ck2ckKlw.js";import"./badge-BBzP3B18.js";import"./banner-DL-fuBcg.js";import"./bottom-sheet-CTDZIrhF.js";import"./dialog-CDD3XYiE.js";import"./button-area-DcJacWKV.js";import"./calendar-BI_e2aQk.js";import"./card-CT7_UNHh.js";import"./chip-set-CWDI2QHE.js";import"./circular-progress-Ccu7KP3W.js";import"./color-picker-C5zvK34q.js";import"./date-picker-CGxLE49x.js";import"./date-range-picker-B09_y3Cs.js";import"./divider-D3vD-PJu.js";import"./base-drawer-C4rHpISA.js";import"./drawer-C0IrLLch.js";import"./modal-drawer-IDmJNvF_.js";import"./mini-drawer-DaJAA5Gd.js";import"./expansion-panel-C10jyLKT.js";import"./open-icon-D9xPVFtv.js";import"./file-picker-B3QE0RPP.js";import"./floating-action-button-CkfOJKtP.js";import"./inline-message-MDZIyJNO.js";import"./key-item-Do9RaFu2.js";import"./keyboard-shortcut-DTvUsgkr.js";import"./label-value-342323er.js";import"./meter-group-Ccfbtn-9.js";import"./page-state-BXhyhEYZ.js";import"./paginator-CdF5-O5X.js";import"./scaffold-DpCXKOUM.js";import"./select-dropdown-CGDtiq_5.js";import"./select-vlNEZs5V.js";import"./skip-link-Bny4mJPU.js";import"./slider-C5hOfc4P.js";import"./split-view-CzIDoOTx.js";import"./stack-DTbT3KUK.js";import"./stepper-cl8JPVPT.js";import"./table-L3uy8S9A.js";import"./tab-bar-qrzKoBVu.js";import"./time-picker-BfPlekLo.js";import"./toast-BeME1y5O.js";import"./toolbar-CFdgiwTS.js";import"./tooltip-P-CrpSEv.js";import"./tree-item-Bmfh6DaO.js";import"./view-switcher-C5b2QH2R.js";import"./deprecated-icon-button-BlgxPDe7.js";import"./split-button-B1_0slm-.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
