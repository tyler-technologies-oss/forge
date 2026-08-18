import{b as d}from"./iframe-B0vKBzPk.js";import{s as u,g as f}from"./utils-QCscRJfA.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DYFIqpJs.js";import"./app-bar-profile-button-qNBq282f.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Dp432aHk.js";import"./menu-DZyDPJNU.js";import"./linear-progress-CsGp1g6o.js";import"./list-CVzTbD2g.js";import"./popover-gwjvAjf-.js";import"./overlay-CqP4w4-f.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-B5JliGtP.js";import"./avatar-BP484sZl.js";import"./icon-button-MtKQF9Cm.js";import"./focus-indicator-Bw8FAg-e.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-eNfkP8MS.js";import"./label-Ca7MhaHs.js";import"./base-field-sYTOEQ1U.js";import"./text-field-VqH1ZQ4i.js";import"./backdrop-3KzDwztH.js";import"./badge-BmFZS4uN.js";import"./banner-B1-5SWUu.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-E4Rk5a90.js";import"./button-toggle-group-CYXqogGb.js";import"./button-CC2Xkyfz.js";import"./calendar-BsGFxKDM.js";import"./card-DVSlM5Jf.js";import"./checkbox-BsBKZw4X.js";import"./chip-set-DVTVw06p.js";import"./circular-progress-DIduwjig.js";import"./color-picker-CCa06iEu.js";import"./date-picker-DzxaGmIN.js";import"./date-range-picker-B8cFK310.js";import"./divider-CZcBsnNn.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-KB_ZOHJc.js";import"./open-icon--hoiUnqy.js";import"./file-picker-DamEuHYi.js";import"./floating-action-button-DWp75xI0.js";import"./inline-message-fj34p3Px.js";import"./key-item-Ci3PTm0X.js";import"./keyboard-shortcut-BSY6Gvtq.js";import"./label-value-cTsUvwyw.js";import"./meter-group-C7vsdpzU.js";import"./page-state-DDjhdZbK.js";import"./paginator-BU8sXWR5.js";import"./radio-group-Dh6xMgYs.js";import"./scaffold-CufLEZ-a.js";import"./secret-C7chJRoP.js";import"./select-dropdown-DaZV1w3q.js";import"./select-wlwn4AGY.js";import"./skip-link-CF760mg-.js";import"./slider-Ckjezixm.js";import"./split-view-CUzkQCN5.js";import"./stack-Bc7kWG9C.js";import"./stepper-CVjj8f69.js";import"./switch-D11QlSLx.js";import"./table-NLLLwIPh.js";import"./tab-panel-CjoytrXY.js";import"./time-picker-BGFLiwdA.js";import"./timestamp-nhbc2po4.js";import"./toast-Bdxqt-pG.js";import"./toolbar-vumc9l8J.js";import"./tooltip-Di7PxSzI.js";import"./tree-item-C12koJyl.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-Q19sTOZx.js";import"./split-button-DF5r-RQA.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
