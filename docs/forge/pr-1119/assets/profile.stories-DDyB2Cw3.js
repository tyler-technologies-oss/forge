import{b as d}from"./iframe-E0MPjD_W.js";import{s as u,g as f}from"./utils-Ckg8JNDy.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B-GpfEgz.js";import"./app-bar-profile-button-BYRz9wl8.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-hEV9SdRe.js";import"./menu-r173F_DK.js";import"./linear-progress-C9rKJPwB.js";import"./list-Dokiv61p.js";import"./popover-BCVIx3D1.js";import"./overlay-Cgb5IAlb.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-7bCDpj6R.js";import"./avatar-B4QFyaa5.js";import"./icon-button-Bc6oVsA8.js";import"./focus-indicator-DAaQEzxM.js";import"./state-layer-D0SSeJ16.js";import"./autocomplete-C78MoyRJ.js";import"./label-6rc0QyL9.js";import"./button-BZE1KUUl.js";import"./button-toggle-group-DKUgvTLL.js";import"./checkbox-GJD21Guw.js";import"./switch-ByEDesx_.js";import"./base-field-OixKx3fo.js";import"./text-field-BiRJUbiq.js";import"./backdrop-Ck2ckKlw.js";import"./badge-XYHrFVaD.js";import"./banner-CPbPkwJZ.js";import"./bottom-sheet-CTDZIrhF.js";import"./dialog-CDD3XYiE.js";import"./button-area-EbzmfHAJ.js";import"./calendar-B-GPEAAG.js";import"./card-kkctYUou.js";import"./chip-set-Bv8rx2wD.js";import"./circular-progress-Ccu7KP3W.js";import"./color-picker-DhyebuO7.js";import"./date-picker-Bl4ILd-n.js";import"./date-range-picker-DkNP1OdI.js";import"./divider-DKHUvd_w.js";import"./base-drawer-DRuppJk6.js";import"./drawer-wME3NLu2.js";import"./modal-drawer-Cpnb3CS7.js";import"./mini-drawer-CF6IVjP9.js";import"./expansion-panel-xnpQpPQB.js";import"./open-icon-CJWxkT_M.js";import"./file-picker-Bi6MoWNP.js";import"./floating-action-button-fbTXQ1Zr.js";import"./inline-message-MDZIyJNO.js";import"./key-item-Dyta4LcB.js";import"./keyboard-shortcut-C9Iu6Gw7.js";import"./label-value-342323er.js";import"./meter-group-B0iS-6ij.js";import"./page-state-BXhyhEYZ.js";import"./paginator--OSb79Xc.js";import"./scaffold-DpCXKOUM.js";import"./select-dropdown-yMG0v_zu.js";import"./select-CqakW8W5.js";import"./skip-link-DOD3p-nB.js";import"./slider-Dc6zTr-y.js";import"./split-view-CEAr0dlG.js";import"./stack-DTbT3KUK.js";import"./stepper-C03m5i-8.js";import"./table-zSOkEG1O.js";import"./tab-bar-Sx3ulCGC.js";import"./time-picker-C3oMF3DA.js";import"./toast-BzctUBSb.js";import"./toolbar-CFdgiwTS.js";import"./tooltip-P-CrpSEv.js";import"./tree-item-BpGCgLob.js";import"./view-switcher-C5b2QH2R.js";import"./deprecated-icon-button-DY3vI_rH.js";import"./split-button-wyGXA5uJ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
