import{b as d}from"./iframe-BIG492RP.js";import{s as u,g as f}from"./utils-B5Iu1i3H.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DzEw4foi.js";import"./app-bar-profile-button-B97CXpAk.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-ISfuYCLY.js";import"./menu-VMwpVmRX.js";import"./linear-progress-D4Cj2MuD.js";import"./list-C8hQbgjM.js";import"./popover-BjcGjYMP.js";import"./overlay-CitAxMD3.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CQ39jeHB.js";import"./avatar-BFU1rDtP.js";import"./icon-button-B-xW9wII.js";import"./focus-indicator-BTLe4wbr.js";import"./state-layer-BkRErCgp.js";import"./autocomplete-CO69WyRb.js";import"./label-Cpi3itCt.js";import"./base-field-BdcUqr0B.js";import"./text-field-BY8H0pXl.js";import"./backdrop-DWOkfyRe.js";import"./badge-DnBlvx8e.js";import"./banner-vs7Vahfl.js";import"./bottom-sheet-Io029VJ6.js";import"./dialog-Dsaa2gTD.js";import"./button-area-092pZJ8n.js";import"./button-toggle-group-BUUbVjaE.js";import"./button-DwcdxSuD.js";import"./calendar-B3itgEBo.js";import"./card-CqknZTDk.js";import"./checkbox-BSs-iPIA.js";import"./chip-set-BW2Whuvu.js";import"./circular-progress-3kKN4QWU.js";import"./color-picker-BzhCC1kF.js";import"./date-picker-Bp87It7j.js";import"./date-range-picker-Dvo1-K7o.js";import"./divider-D8Ir2gue.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DUVGp38y.js";import"./modal-drawer-Dj3OThKy.js";import"./mini-drawer-BRD3ce3r.js";import"./expansion-panel-D6nx1nuk.js";import"./open-icon-AXjWx-Ql.js";import"./file-picker-3_zz9RHL.js";import"./floating-action-button-aGHWAjUa.js";import"./inline-message-MRVYAzAu.js";import"./key-item-CLjNgI__.js";import"./keyboard-shortcut-B2n2aCdL.js";import"./label-value-CWmtlzqa.js";import"./option-group-DTcqYYEj.js";import"./meter-group-BbjFsb2z.js";import"./page-state-j1LLkVCi.js";import"./paginator-Fp-6C3ni.js";import"./radio-group-CVUPTKbp.js";import"./scaffold-CssrLcVP.js";import"./secret-Hypf9gJV.js";import"./select-dropdown-CyEvAt7U.js";import"./select-CK4UOf2Z.js";import"./skip-link-DWaifW62.js";import"./slider-Oz0UNr2V.js";import"./split-view-VEF86sXI.js";import"./stack-Cu7r2NOS.js";import"./stepper-C8BUXuYs.js";import"./switch-BbtF2Px3.js";import"./table-CpEnKpfX.js";import"./tab-panel-DO4ygdwL.js";import"./time-picker-upsgocBH.js";import"./timestamp-CLMSXzTS.js";import"./toast-DVQjsaJ5.js";import"./toolbar-DfO3Bnmi.js";import"./tooltip-Dtq6TD0L.js";import"./tree-item-B39i_5iO.js";import"./view-switcher-Xboobifv.js";import"./deprecated-icon-button-BCCemP3g.js";import"./split-button-BfqpYxMm.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,qt as P,m as W};
