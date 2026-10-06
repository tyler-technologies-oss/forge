import{b as d}from"./iframe-oAO0QRyC.js";import{s as u,g as f}from"./utils-BUadP3tW.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DMYmaamK.js";import"./app-bar-menu-button-NUFhxc-M.js";import"./app-bar-profile-button-CjsgFjkw.js";import{I as g}from"./icon-BNaE2C0t.js";import"./menu-CCR7Fusj.js";import{a as E,b,c as C,d as y}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-c_yY3uTR.js";import"./popover-DCnuFbj-.js";import"./overlay-DWOSAut5.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-ZraD1p-1.js";import"./list-item-BYmRBlrw.js";import"./avatar-CAfCJU7j.js";import"./icon-button-BUDykOqB.js";import"./autocomplete-DMsOU6MV.js";import"./label-DWc44Up3.js";import"./base-field-R00t77-F.js";import"./focus-indicator-DF5CnxaH.js";import"./text-field-Cm3IZ4rz.js";import"./backdrop-ngk7d2eo.js";import"./badge-CANenywJ.js";import"./banner-CLAMj5Wj.js";import"./bottom-sheet-jPigxZDK.js";import"./dialog-BexnfuTj.js";import"./button-area-BUIyG277.js";import"./button-toggle-group-CysZ5sj-.js";import"./button-CSrhRaCz.js";import"./calendar-Cg8Kd7hO.js";import"./card-DnLWAyvI.js";import"./checkbox-hjKXV30y.js";import"./chip-set-BaA3T9k6.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-C2GdX2bO.js";import"./date-picker-DQdxk9An.js";import"./date-range-picker-CZOMi44q.js";import"./divider-BINJGSch.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-D_RH-52G.js";import"./open-icon-BiVJIkgo.js";import"./file-picker-BYG4CNZv.js";import"./floating-action-button-OGaVr6J7.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-DWt6PiAv.js";import"./key-item-C3s9_HKP.js";import"./keyboard-shortcut-BxZBjJfj.js";import"./label-value-C0-wovkK.js";import"./listbox-ByJhCwYP.js";import"./meter-group-Dd9K6e5W.js";import"./page-state-DvaZGddB.js";import"./paginator-7U2kqEAR.js";import"./process-stepper-DMlSiHXa.js";import"./radio-group-CQHNH8Jn.js";import"./scaffold-Ca9xBuAs.js";import"./secret-BHw6VepO.js";import"./option-4PQWN2eg.js";import"./select-dropdown-BdlNKPiw.js";import"./select-CG0Pf0k9.js";import"./skip-link-Yawrih0l.js";import"./slider-B5f114mU.js";import"./split-view-ByVWxigp.js";import"./stack-D8CK8UqP.js";import"./stepper-l69D-KSB.js";import"./switch-CzZ9IRiQ.js";import"./table-CP-EgFt7.js";import"./tab-panel-CukN7ftx.js";import"./time-picker-Swar9kA3.js";import"./timestamp-BYYX_cfg.js";import"./toast-B3qlhcVK.js";import"./toolbar-B10vbXo5.js";import"./tooltip-BnZGP5cf.js";import"./tree-item-YjkOclA-.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-BTZPVDyN.js";import"./split-button-BW5cuK_p.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
