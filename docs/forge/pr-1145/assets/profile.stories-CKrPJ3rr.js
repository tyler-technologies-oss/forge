import{b as d}from"./iframe-ZKsQ3dxk.js";import{s as u,g as f}from"./utils-Cu3TicFl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D30-8Mvb.js";import"./app-bar-profile-button-CnE6PBrJ.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-tW5eMRUE.js";import"./menu-Cz5xb5sT.js";import"./linear-progress-BvuLf7up.js";import"./list-BUojCRje.js";import"./popover-CJE61R5F.js";import"./overlay-BZbN9o6E.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BneGiueD.js";import"./avatar-8UCryvLF.js";import"./icon-button-CfxoQW4h.js";import"./focus-indicator-vJw9eHJN.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-Cy93V2e-.js";import"./label-BHcEV9Ut.js";import"./base-field-CIqv2hqt.js";import"./text-field-C3KWch7F.js";import"./backdrop-SMwLBDG5.js";import"./badge-CBD69AlR.js";import"./banner-BDvyF1l9.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-CQc1sMZ9.js";import"./button-toggle-group-DYrvrPjk.js";import"./button-_yJ7umJ0.js";import"./calendar-BNZBu6sE.js";import"./card-CZ-3g9yo.js";import"./checkbox-BF4WcT9O.js";import"./chip-set-BGk8KjTw.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-CzGQJ9zn.js";import"./date-picker-CQOhjeje.js";import"./date-range-picker-CGAq0PuI.js";import"./divider-DXLh0Mi6.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-DVi7qOQC.js";import"./open-icon-CyWZw3Np.js";import"./file-picker-RNYZWWqR.js";import"./floating-action-button-4kOneBGA.js";import"./inline-message-Dej6nioH.js";import"./key-item-BJDGiofg.js";import"./keyboard-shortcut-h5c_xTXF.js";import"./label-value-CJDyRgCt.js";import"./meter-group-CbnD3HXe.js";import"./page-state-xtTZreUO.js";import"./paginator-BuSlG_ih.js";import"./radio-group-BOx0_eFM.js";import"./scaffold-l7cEUk27.js";import"./secret-BGL_KPVQ.js";import"./select-dropdown-DCsuvBzq.js";import"./select-1eeA8eni.js";import"./skip-link-BRAZ6Jei.js";import"./slider-BdMxFuX4.js";import"./split-view-CVyswJ4d.js";import"./stack-DYrRnd9D.js";import"./stepper-DSm6lp_l.js";import"./switch-DNykGc5a.js";import"./table-75S0MNRZ.js";import"./tab-bar-DXMSfX6i.js";import"./time-picker-C9_Jwpbs.js";import"./toast-C6gbBfwv.js";import"./toolbar-BDHP5EzM.js";import"./tooltip-BId7sMvb.js";import"./tree-item-0u3N5FMH.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-C-q3Ouz2.js";import"./split-button-DW9vpG7w.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
