import{b as d}from"./iframe-BJbEpszz.js";import{s as u,g as f}from"./utils-3yMKERXj.js";import"./service-adapter-8tADcN_b.js";import"./accordion-R0d0KE0c.js";import"./expansion-panel-406al6Dv.js";import"./open-icon-COwAWgQ8.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-DAgiWWpK.js";import"./state-layer-Dr4I3-ea.js";import"./focus-indicator-D5rXac5k.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BS8_pNWa.js";import"./menu-Byhs15I4.js";import"./linear-progress-Cnx_HyUf.js";import"./list-VCtMCYzb.js";import"./popover-C7v8d-bT.js";import"./overlay-CnRxeVdV.js";import"./skeleton-CMBvqwtz.js";import"./avatar-BIcJ5Qxs.js";import"./icon-button-BJe5BT5b.js";import"./autocomplete-DhhFEXMs.js";import"./label-64IPd7Ff.js";import"./button-DxNiNzFb.js";import"./button-toggle-group-CuTLB-F0.js";import"./checkbox-CYcpnhwL.js";import"./switch-CBC5az3f.js";import"./base-field-JVYJIdv9.js";import"./text-field-oibF3m6m.js";import"./backdrop--id5x3jp.js";import"./badge-BJPhDCO9.js";import"./banner-TkKxXU3r.js";import"./bottom-sheet-BJXxXepC.js";import"./dialog-DvB2hdYD.js";import"./button-area-BVnT4xvv.js";import"./calendar-X8aia9cG.js";import"./card-Bok9Cw4u.js";import"./chip-set-DEr6HNXe.js";import"./circular-progress-B5Kshctg.js";import"./color-picker-DUbdumIK.js";import"./date-picker--BTpfsI_.js";import"./date-range-picker-V6JeeMvX.js";import"./divider-CY-gug5I.js";import"./base-drawer-q74epyPW.js";import"./drawer-DRLMAEyk.js";import"./modal-drawer-CCu9BUGH.js";import"./mini-drawer-Cck9Qwkt.js";import"./file-picker-DoNOBJS7.js";import"./floating-action-button-3pYuYEWv.js";import"./inline-message-DM46YaML.js";import"./key-item-B1oj-79F.js";import"./keyboard-shortcut-DnEED6Tm.js";import"./label-value-Cm7o2IPb.js";import"./meter-group-BZ5s51C1.js";import"./page-state-CTPXyko5.js";import"./paginator-BCgS0PU6.js";import"./scaffold-C0JMtL8O.js";import"./select-dropdown-Cf-4Sa3k.js";import"./select-BCENHj_M.js";import"./skip-link-DiejuDmv.js";import"./slider-DqfrkZ-0.js";import"./split-view-B6E_HV6W.js";import"./stack-C45mBB1R.js";import"./stepper-DpCrNAq8.js";import"./table-CQ4Pn9ry.js";import"./tab-bar-FbokO3PK.js";import"./time-picker-BstsM94J.js";import"./toast-DTv1eCdl.js";import"./toolbar-DPBJiSu_.js";import"./tooltip-DZbumLUT.js";import"./tree-item-8wbyLHDl.js";import"./view-switcher-ZGhMaguC.js";import"./deprecated-icon-button-DvStRMvT.js";import"./split-button-CqYqVKv_.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ht=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ht as P,m as W};
