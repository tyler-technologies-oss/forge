import{b as d}from"./iframe-yufYmUjC.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CoB873sV.js";import"./app-bar-profile-button-CSL6Fzgb.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BtSHXPJ7.js";import"./menu-Jkv_rDvS.js";import"./linear-progress-BmTkV8LG.js";import"./list-CBYXd4A7.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-PqRP3Y1A.js";import"./icon-button-DbnDzffv.js";import"./focus-indicator-D_DdsQvg.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-Cz7jvbDW.js";import"./label-ByBUkcF1.js";import"./button-Dvbf2HyY.js";import"./button-toggle-group-C2Bpwx_G.js";import"./checkbox-BcO0uuCL.js";import"./switch-DprtM2Er.js";import"./base-field-B9d1YLo0.js";import"./text-field-Dc1r6TEK.js";import"./backdrop-B-u3npFo.js";import"./badge-cZmtUV2T.js";import"./banner-D1vOByE9.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-BBSrtEUO.js";import"./calendar-CcWsmwa5.js";import"./card-6Iq82xoV.js";import"./chip-set-BCUkcOKJ.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-BBow85FC.js";import"./date-picker-BAfBvZb1.js";import"./date-range-picker-CLARFXqe.js";import"./divider-B5Q9AHI1.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-DQu8oxvh.js";import"./open-icon-BnT8ZI8i.js";import"./file-picker-NN6DFsuO.js";import"./floating-action-button-0Nszo5Ww.js";import"./inline-message-rggUpLwV.js";import"./key-item-DZZt4LFH.js";import"./keyboard-shortcut-DKPcbfwB.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-DIu6lvPt.js";import"./page-state-B9wnmWpA.js";import"./paginator-CCnzEREk.js";import"./scaffold-ALuq0Bgn.js";import"./secret-C0rvgSk9.js";import"./select-dropdown-B3842Eqr.js";import"./select-DqpNfKJh.js";import"./skip-link-BC0I07jk.js";import"./slider-BPKha4lw.js";import"./split-view-ZCbntuN8.js";import"./stack-DGYl-onA.js";import"./stepper-Dx0t9sNQ.js";import"./table-DH703Hci.js";import"./tab-bar-CLUeG3m6.js";import"./time-picker-DD8OpwcC.js";import"./toast-BM7HhYAl.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-J19GjW_F.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-DaWye0zg.js";import"./split-button-lrBYatih.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
