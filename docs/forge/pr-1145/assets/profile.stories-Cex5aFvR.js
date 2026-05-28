import{b as d}from"./iframe-DiyFpT_N.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BZTcaCAg.js";import"./app-bar-profile-button-C5tuAT3b.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BYAinj_X.js";import"./menu-BGXHcXJ9.js";import"./linear-progress-BmTkV8LG.js";import"./list-D6a3NnYI.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-BAgJ6gFE.js";import"./icon-button-D_bEUO2t.js";import"./focus-indicator-CPbWJ5fd.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-C_Yr7FQW.js";import"./label-DtNP5tP5.js";import"./button-DRoqxLxi.js";import"./button-toggle-group-72M3IPsB.js";import"./checkbox-pfhy_b0j.js";import"./switch-BqPpIzt0.js";import"./base-field-hiw8ZerQ.js";import"./text-field-BDc0vQUb.js";import"./backdrop-B-u3npFo.js";import"./badge-DUa5TbiD.js";import"./banner-BLKY--tq.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-Btto7FOr.js";import"./calendar-BfhrN359.js";import"./card-DabyzYMx.js";import"./chip-set-UAr8hCnX.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-Dwy-TCwv.js";import"./date-picker-CEeZwyOM.js";import"./date-range-picker-gNqZSELE.js";import"./divider-CrP17QK3.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-Dgx_jk9J.js";import"./open-icon-8sEYcu7v.js";import"./file-picker-D7x9hwZN.js";import"./floating-action-button-De48hjgg.js";import"./inline-message-rggUpLwV.js";import"./key-item-CSF8Rn_U.js";import"./keyboard-shortcut-DIT7ARvN.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-NCxJVFUW.js";import"./page-state-B9wnmWpA.js";import"./paginator-Bv1zm3we.js";import"./scaffold-ALuq0Bgn.js";import"./secret-BmYhj04e.js";import"./select-dropdown-DxPDP_Pz.js";import"./select-LPamsqhq.js";import"./skip-link-Lzjazy_8.js";import"./slider-IXCBtK1l.js";import"./split-view-CaWIGT_o.js";import"./stack-DGYl-onA.js";import"./stepper-DurcUQOE.js";import"./table-BIHr9o65.js";import"./tab-bar-CkRfNuls.js";import"./time-picker-Ds9ip1jp.js";import"./toast-k74o7Z2L.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-CaJndUkb.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-C0Q8TTom.js";import"./split-button-CurFA-UQ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
