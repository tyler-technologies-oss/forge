import{b as d}from"./iframe-CjRhfDGo.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BTnfAZjD.js";import"./app-bar-profile-button-dPKsu_4F.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-YpDbZMXW.js";import"./menu-gyuGMZzv.js";import"./linear-progress-BmTkV8LG.js";import"./list-WdkV34ph.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-CWR4BRx-.js";import"./icon-button-PYwqfbgo.js";import"./focus-indicator-DdDTn0xq.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-B-02Qa9G.js";import"./label-C-99RQJ5.js";import"./button-sqwnevhW.js";import"./button-toggle-group-CSOX9jY7.js";import"./checkbox-qv67HpAA.js";import"./switch-CorLJVsf.js";import"./base-field-BUORQnQu.js";import"./text-field-DgBiceVH.js";import"./backdrop-B-u3npFo.js";import"./badge-BeXhqZno.js";import"./banner-BeJ4bzUY.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-BvKY-DTJ.js";import"./calendar-Pb3Rg6cd.js";import"./card-CdxbuXZk.js";import"./chip-set-CcXiT8US.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-BPHQqtIQ.js";import"./date-picker-C5vOdgvb.js";import"./date-range-picker-CA0BZ4nB.js";import"./divider-cQQmZUkO.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-BRrsZrUK.js";import"./open-icon-mboG-jN-.js";import"./file-picker-CTqBzFtK.js";import"./floating-action-button-BvfS_Ynp.js";import"./inline-message-rggUpLwV.js";import"./key-item-D9gmgWh9.js";import"./keyboard-shortcut-BrdIsz5D.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-CzExgl1s.js";import"./page-state-B9wnmWpA.js";import"./paginator-BiOnS4JK.js";import"./scaffold-ALuq0Bgn.js";import"./secret-BPkuCINT.js";import"./select-dropdown-wc0nzIOK.js";import"./select-D37jHVHo.js";import"./skip-link-Bdlu3uo6.js";import"./slider-B-TQoIRB.js";import"./split-view-D1PCmO72.js";import"./stack-DGYl-onA.js";import"./stepper-D3Y3ZZX-.js";import"./table-D3YstJpi.js";import"./tab-bar-CWb5leWS.js";import"./time-picker-D7CN6von.js";import"./toast-DuvY3Mcp.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-d2IepWjl.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-BeQKtqie.js";import"./split-button-Bsn7qfOw.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
