import{b as d}from"./iframe-CSIdYrZJ.js";import{s as u,g as f}from"./utils-CL5ue9IV.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BjTSqfO8.js";import"./app-bar-menu-button-z7jWlLxN.js";import"./app-bar-profile-button-eteLot7q.js";import{I as g}from"./icon-D0ZxlEvQ.js";import"./menu-BYkMwpRl.js";import{a as E,b,c as C,d as y}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-DlI3fnDe.js";import"./popover-o0o6y1Gd.js";import"./overlay-C1ZJYdef.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-EUyK87zq.js";import"./list-item-Dby-tdmr.js";import"./avatar-bb5PVuJ_.js";import"./icon-button-RYDssO7r.js";import"./autocomplete-XFrvtvL1.js";import"./label-BOLaqKZc.js";import"./base-field-CFZKx8zr.js";import"./focus-indicator-Da-r1W3d.js";import"./text-field-C5XkiU4l.js";import"./backdrop-C9lBlb_d.js";import"./badge-D3Q04J38.js";import"./banner-SJDp0s89.js";import"./bottom-sheet-uFNq9NzU.js";import"./dialog-DZ0jhAl1.js";import"./button-area-BHQgludf.js";import"./button-toggle-group-BSTAcSXy.js";import"./button-DCvaMBF6.js";import"./calendar-CPmI1-a5.js";import"./card-Q8geSosK.js";import"./checkbox-TAUAIiTt.js";import"./chip-set-sihMPc5A.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-C4IddSiB.js";import"./date-picker-ey3n0FY-.js";import"./date-range-picker-jSjD3spc.js";import"./divider-C3Bc89ld.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-LYbFtMEz.js";import"./open-icon-Cr7aZ4m7.js";import"./file-picker-DqqhFYyP.js";import"./floating-action-button-BmG51IN7.js";import"./inline-message-BKecgmUf.js";import"./kbd-DaxYzKDU.js";import"./key-item-DjLGZjQf.js";import"./keyboard-shortcut-XXptfkk2.js";import"./label-value-06gdOjV6.js";import"./meter-group-BwTZGGLL.js";import"./page-state-DdcxjGPv.js";import"./paginator-CvWFNQrl.js";import"./radio-group-DVd9gRQy.js";import"./scaffold-ua4VSBPI.js";import"./secret-Ch_uQdS8.js";import"./select-dropdown-BaTKvB6z.js";import"./select-CdnIVU71.js";import"./skip-link-DrPq12Dl.js";import"./slider-DCeMrx6C.js";import"./split-view-DgVqb2ik.js";import"./stack-CzasDS03.js";import"./stepper-VfJ513Nv.js";import"./switch-BXjjbs66.js";import"./table-POwo77IT.js";import"./tab-panel-foF_Y5OA.js";import"./time-picker-DEdOA6LR.js";import"./timestamp-DZjGyhwW.js";import"./toast-DB77gEhG.js";import"./toolbar-D-Vo5x4Q.js";import"./tooltip-pr1nZvAZ.js";import"./tree-item-SDUE-6I1.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-DOQ2iNHR.js";import"./split-button-C_MwjRCH.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Qt as P,l as W};
