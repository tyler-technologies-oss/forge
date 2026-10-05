import{b as d}from"./iframe-DuTL4nLl.js";import{s as u,g as f}from"./utils-CwE7tZFf.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BLbnKYW1.js";import"./app-bar-menu-button-BgLQ5xDT.js";import"./app-bar-profile-button-CvoVcJDN.js";import{I as g}from"./icon-BUzV7HWf.js";import"./menu-tpM8UxCX.js";import{a as E,b,c as C,d as y}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DNtySjlc.js";import"./popover-CLHAAODD.js";import"./overlay-i68906s2.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-DWKuOLCj.js";import"./list-item-BDyrHBxR.js";import"./avatar-CUnUjMLm.js";import"./icon-button-CJxY1IBT.js";import"./autocomplete-DcPH9ZUw.js";import"./label-Cs1b9vr6.js";import"./base-field-ZuZit9sw.js";import"./focus-indicator-DnG7A_bn.js";import"./text-field-DvsEyAvv.js";import"./backdrop-ngk7d2eo.js";import"./badge-Bcao1v-R.js";import"./banner-Mp3eXcFj.js";import"./bottom-sheet-CyPc9nAu.js";import"./dialog-BvtgQqmd.js";import"./button-area-BS3AEKE5.js";import"./button-toggle-group-D1Vqj9_y.js";import"./button-CXiX07Ik.js";import"./calendar-q0uo43fL.js";import"./card-qwoD5oQc.js";import"./checkbox-CXqqeG_-.js";import"./chip-set-B1HDTF8G.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-Bj5yfM95.js";import"./date-picker-CcaSszlq.js";import"./date-range-picker-Da2EAQer.js";import"./divider-Bmr77Gsj.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-CIbqn_AC.js";import"./open-icon-CdHT3fwT.js";import"./file-picker-XnBPJzDx.js";import"./floating-action-button-DMGAu3VY.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-CvNpNi_Y.js";import"./key-item-DeMQVlJZ.js";import"./keyboard-shortcut-ybbhl0uW.js";import"./label-value-C0-wovkK.js";import"./listbox-k0r4w10S.js";import"./meter-group-BTrVYdeJ.js";import"./page-state-DvaZGddB.js";import"./paginator-CZ3R05Q5.js";import"./process-stepper-BWgyC_y1.js";import"./radio-group-Bm3zeThb.js";import"./scaffold-Ca9xBuAs.js";import"./secret-D_n4CWn0.js";import"./option-DWRvPAO6.js";import"./select-dropdown-COzraM9j.js";import"./select-DSd8KQM1.js";import"./skip-link-VFniT5GO.js";import"./slider-K1Vps76c.js";import"./split-view-Dvbqbpf3.js";import"./stack-Bd7iC-xk.js";import"./stepper-4nHEJSY4.js";import"./switch-CAzqQxW8.js";import"./table-DHe-IF45.js";import"./tab-panel-DKU3x8RA.js";import"./time-picker-DWFX0k0Y.js";import"./timestamp-CVIiYUWH.js";import"./toast-DCSbgejH.js";import"./toolbar-CTtNvxpG.js";import"./tooltip-D8_0K3tX.js";import"./tree-item-DCmv370r.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-Brkrly8c.js";import"./split-button-BsCkQ_Ro.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},m={},l={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Zt as P,l as W};
