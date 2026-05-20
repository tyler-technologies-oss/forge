import{b as d}from"./iframe-ClGmR9ML.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-qgSKss-H.js";import"./app-bar-profile-button-DJ5WceCy.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-C6sewHdg.js";import"./menu-BqSO2mOe.js";import"./linear-progress-mfaOyWFY.js";import"./list-B_nEKClZ.js";import"./popover-Drh8MX47.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BtsO4Ege.js";import"./avatar-DdD-9PHi.js";import"./icon-button-BTDWQ4c3.js";import"./focus-indicator-BpIQOnul.js";import"./state-layer-CUeokLWr.js";import"./autocomplete-CM2WTLKD.js";import"./label-CJfGDViV.js";import"./button-DZleSkHk.js";import"./button-toggle-group-gz-cK6Ln.js";import"./checkbox-9QmVkWlY.js";import"./switch-Bnvfo3NB.js";import"./base-field-83n_qEkW.js";import"./text-field-Dqz3fgEC.js";import"./backdrop-B-u3npFo.js";import"./badge-DVlScodB.js";import"./banner-7P6NxKR1.js";import"./bottom-sheet-DOcWw--n.js";import"./dialog-uczvtxT1.js";import"./button-area-DXel3LTJ.js";import"./calendar-B1SyuKzf.js";import"./card-fafw8SWZ.js";import"./chip-set-DWBTzXq6.js";import"./circular-progress-DhyLGCcW.js";import"./color-picker-DfYyxfRx.js";import"./date-picker-COHGF912.js";import"./date-range-picker-b5VjUDct.js";import"./divider-Bmu8vAUK.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-DkxTDhj5.js";import"./modal-drawer-Cm-EtuRe.js";import"./mini-drawer-CMMNfkHz.js";import"./expansion-panel-B5WC0GGF.js";import"./open-icon-CzT4oZ2c.js";import"./file-picker-CSLIC2hD.js";import"./floating-action-button-dVQuh1UX.js";import"./inline-message-uXSkm0K0.js";import"./key-item-DCNf3dxi.js";import"./keyboard-shortcut-BD56o8oO.js";import"./label-value-kvRz9-RB.js";import"./meter-group-Cs3KXK5o.js";import"./page-state-COgvxgN-.js";import"./paginator-D4iMlsZQ.js";import"./scaffold-ALuq0Bgn.js";import"./secret-CC7f6WY3.js";import"./select-dropdown-ylQhgkZo.js";import"./select-BSyd0QSC.js";import"./skip-link-B_r6k6Xa.js";import"./slider-BHjsui9Y.js";import"./split-view-BCg2Z7VP.js";import"./stack-DGYl-onA.js";import"./stepper-BxgyOjMh.js";import"./table-CMk8QwSJ.js";import"./tab-bar-CNVpaYep.js";import"./time-picker-DHlssDzc.js";import"./toast-DvnHQVf5.js";import"./toolbar-Bxqi4dGz.js";import"./tooltip-Cdv6aXTQ.js";import"./tree-item-B4Ojjol5.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-CH9bKY2l.js";import"./split-button-mmwglkXb.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
