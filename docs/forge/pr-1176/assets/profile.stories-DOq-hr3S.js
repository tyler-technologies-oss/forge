import{b as d}from"./iframe-Zk1SR4Vq.js";import{s as u,g as f}from"./utils-TiAJY-9P.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BwpjPesR.js";import"./app-bar-profile-button-dArIDg53.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-nXZdNzxe.js";import"./menu-CamMFDWk.js";import"./linear-progress-Do3VWKo6.js";import"./list-CYYanRNl.js";import"./popover-BfXKCPIw.js";import"./overlay-89RDbxb9.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CNas61Yy.js";import"./avatar-C_XRg9kj.js";import"./icon-button-U4y3n_ne.js";import"./focus-indicator-DEh0woC7.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-BMEkHIFo.js";import"./label-D_q06Ogh.js";import"./button-DzHPM5fI.js";import"./button-toggle-group-BDUgkMlQ.js";import"./checkbox-BGTXpwys.js";import"./switch-Bp0mPIkp.js";import"./base-field-Ct5vNJWs.js";import"./text-field-g_CO2Oho.js";import"./backdrop-B0IRqNVE.js";import"./badge-CGg9eZzh.js";import"./banner-DFXvtpVY.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-BnhhVoWb.js";import"./calendar-HtIIMBvi.js";import"./card-DdNdR_Mn.js";import"./chip-set-BC6zV0G4.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-DrDQhow3.js";import"./date-picker-KvzMzEfo.js";import"./date-range-picker-Ce3wJsdE.js";import"./divider-DLdL2RZN.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-Duu7O4Jm.js";import"./open-icon-DeUdhZXY.js";import"./file-picker-DZH6FKKU.js";import"./floating-action-button-kGpNDfcJ.js";import"./inline-message-wW24XM3J.js";import"./key-item-_eTCv6CO.js";import"./keyboard-shortcut-p5BNN5CG.js";import"./label-value-DjHFGdMo.js";import"./meter-group-t4TFReJr.js";import"./page-state-DECQz5Rm.js";import"./paginator-DEn7ODpU.js";import"./scaffold-F_aQKixv.js";import"./secret-Bq9QdI7g.js";import"./select-dropdown-DU57iOD-.js";import"./select-COo49lnt.js";import"./skip-link-BZUFseWW.js";import"./slider-BhsZ8IgA.js";import"./split-view-ClaN2Ryj.js";import"./stack-DEQW1E_G.js";import"./stepper-DpxIQCv_.js";import"./table-B1hUXup1.js";import"./tab-bar-nYhfKG9y.js";import"./time-picker-6OSzn-B7.js";import"./timestamp-Dt_mX99-.js";import"./toast-Dlq3UMzN.js";import"./toolbar-CZce7QOP.js";import"./tooltip-BxF0cpAI.js";import"./tree-item-IRz2xO51.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-DKMvV2Ex.js";import"./split-button-BgP9TYTI.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
