import{b as o}from"./iframe-CCQPwMqK.js";import"./service-adapter-DlT-lJx7.js";import"./app-layout-cTBEQ0YD.js";import"./badge-vZbBLVs6.js";import"./button-CArgg2AW.js";import"./card-BOT7vSRz.js";import"./date-picker-C1F7X9h7.js";import"./calendar-BKpJ_GDn.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./icon-button-CCm6VdsQ.js";import"./tyler-icons-D_P4inVM.js";import"./text-field-mdAFESNO.js";import"./base-field-D9i8FqrF.js";import"./focus-indicator-CoBrh689.js";import"./label-B4HdJcCr.js";import"./divider-CYyN_dy_.js";import"./list-DoWEQWCg.js";import"./list-item-BE2FE9nz.js";import"./option-DxLPA5Op.js";import"./select-dropdown-D5GhW_FN.js";import"./linear-progress-Du-Ntegu.js";import"./popover-avDoFPUj.js";import"./overlay-ejBQU7cY.js";import"./skeleton-BMUbeM10.js";import"./select-DFCfpj9W.js";import"./stack-Grf8E1p3.js";import"./tab-panel-CDwwet2g.js";import"./toolbar-CtUE-sqJ.js";import"./preload-helper-PPVm8Dsz.js";import"./property-Dw5w9m4o.js";import"./state-DcDYGaya.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./base-lit-element-Rp30TdPi.js";import"./directive-CwRn8Fwj.js";import"./utils-DU-9AqTO.js";import"./app-bar-menu-button-CKzj1r2k.js";import"./class-map-BspdE2wQ.js";import"./a11y-utils-a04gn1ZN.js";import"./dom-utils-D38acdAW.js";import"./feature-detection-Cxj81Y1H.js";import"./constants-Ds-UekRh.js";import"./base-component-DokdPcmx.js";import"./icon-button-constants-BJvh1yHL.js";import"./tooltip-BwyfwMmY.js";import"./base-adapter-C2s8cO2K.js";import"./with-longpress-listener-D-W76F-r.js";import"./dismissible-stack-xq-0Rg1q.js";import"./with-element-internals-CJt7fDtX.js";import"./base-button-DlqY0Zum.js";import"./query-CtiAP21w.js";import"./query-assigned-elements-43hYArgI.js";import"./state-layer-BcVD1OXH.js";import"./dialog-jSj7mubX.js";import"./backdrop-e4rWKi0D.js";import"./drawer-C4w9_Owc.js";import"./base-drawer-C3RB7KRX.js";import"./event-utils-zQ4FLDwK.js";import"./mini-drawer-B5rmf2t_.js";import"./scaffold-C8LskKFX.js";import"./button-constants-D5k34xES.js";import"./base-date-picker-core-BImLC3rT.js";import"./a11y-BxM9_46k.js";import"./event-utils-C1SDeUaq.js";import"./with-label-aware-BP3asw-P.js";import"./button-toggle-group-constants-lDTvG_dF.js";import"./checkbox-constants-BbWb-R-a.js";import"./switch-constants-DiyC_PIB.js";import"./context-root-BrWOZWcP.js";import"./consume-DtITIqjN.js";import"./circular-progress-QjF0OwOx.js";import"./with-form-associated-gcPFdgdP.js";import"./list-dropdown-aware-core-DrsZT9oe.js";import"./list-dropdown-ChF353xc.js";import"./provide-CZDhzwTe.js";import"./focus-group-ZSjX4eU5.js";const r="forge-app-layout",Te={title:"Components/App Layout",component:r,render:a=>{const e={heading3:"forge-typography--heading1",heading4:"forge-typography--heading2",heading5:"forge-typography--heading3",body1:"forge-typography--body1",label1:"forge-typography--label1"};return o`
      <style>
        * {
          box-sizing: border-box !important;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          padding: 0;
          margin: 0;
        }

        forge-app-layout:state(small) {
          .main-content-container {
            grid-template-columns: 1fr;
          }

          .column-2 {
            grid-column: 1;
          }
        }

        body,
        #storybook-root,
        #root-inner {
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden;
          height: 100%;
        }

        body {
          height: 100dvh;
        }

        .secondary-header {
          --forge-toolbar-background: transparent;
        }

        .section-header {
          margin: var(--forge-spacing-xsmall);
        }

        [slot='body'] {
          background-color: var(--forge-theme-surface-dim);
          padding-inline: var(--forge-spacing-medium);
        }

        .tab-container {
          grid-column: 1 / -1;
        }

        .main-content-container {
          display: grid;
          grid-template-columns: 9fr 3fr;
          gap: var(--forge-spacing-medium);
          grid-auto-rows: min-content;
          margin-block-start: var(--forge-spacing-medium);
        }

        .details-card {
          grid-column: 1;
        }

        .column-2 {
          grid-column: 2;
          display: flex;
          flex-direction: column;
          gap: var(--forge-spacing-medium);
        }

        .label-value-grid {
          display: grid;
          grid-template-columns: 180px 1fr;
          column-gap: var(--forge-spacing-medium);
          row-gap: var(--forge-spacing-xsmall);
          align-items: center;
        }

        forge-button[variant='tonal'] {
          --forge-button-tonal-background: #e5e8f7;
        }
      </style>
      <forge-app-layout app-title=${a.appTitle} breakpoint=${a.breakpoint}>
        <forge-list navlist slot="navigation" data-forge-app-layout-close>
          <!-- Dashboard Section -->
          <div class="forge-typography--body1 section-header">Dashboard</div>
          <forge-list-item class="section-item">
            <forge-icon slot="start" name="visibility" external></forge-icon>
            <button type="button">Overview</button>
          </forge-list-item>
          <forge-list-item class="section-item">
            <forge-icon slot="start" name="analytics" external></forge-icon>
            <button type="button">Analytics</button>
          </forge-list-item>
          <forge-list-item class="section-item">
            <forge-icon slot="start" name="assessment" external></forge-icon>
            <button type="button">Reports</button>
          </forge-list-item>

          <forge-divider></forge-divider>

          <!-- Users Section -->
          <div class="forge-typography--body1 section-header">Users</div>
          <forge-list-item class="section-item">
            <forge-icon slot="start" name="people" external></forge-icon>
            <button type="button">All Users</button>
          </forge-list-item>
          <forge-list-item class="section-item">
            <forge-icon slot="start" name="admin_panel_settings" external></forge-icon>
            <button type="button">Roles & Permissions</button>
          </forge-list-item>
          <forge-list-item class="section-item">
            <forge-icon slot="start" name="groups" external></forge-icon>
            <button type="button">User Groups</button>
          </forge-list-item>

          <forge-divider></forge-divider>

          <!-- Documents Section -->
          <div class="forge-typography--body1 section-header">Documents</div>
          <forge-list-item class="section-item">
            <forge-icon slot="start" name="history" external></forge-icon>
            <button type="button">Recent Files</button>
          </forge-list-item>
          <forge-list-item class="section-item">
            <forge-icon slot="start" name="share" external></forge-icon>
            <button type="button">Shared</button>
          </forge-list-item>
          <forge-list-item class="section-item">
            <forge-icon slot="start" name="archive" external></forge-icon>
            <button type="button">Archive</button>
          </forge-list-item>

          <forge-divider></forge-divider>

          <!-- Standalone Items -->
          <forge-list-item>
            <forge-icon slot="start" name="settings" external></forge-icon>
            <button type="button">Settings</button>
          </forge-list-item>
          <forge-list-item>
            <forge-icon slot="start" name="help" external></forge-icon>
            <button type="button">Help & Support</button>
          </forge-list-item>
        </forge-list>

        <main slot="body">
          <forge-toolbar class="secondary-header" no-divider>
            <!-- Back button - always visible -->
            <forge-stack inline alignment="center" gap="32" slot="before-start">
              <forge-stack alignment="center" inline gap="8">
                <forge-icon-button aria-label="Go back" density="small">
                  <forge-icon name="arrow_back" external></forge-icon>
                </forge-icon-button>
                <h2 class="${e.heading5}">Cory Ander</h2>
              </forge-stack>
              <forge-stack inline alignment="center" gap="8">
                <forge-badge theme="secondary">Interview pending</forge-badge>
                <forge-badge theme="info">Internal</forge-badge>
              </forge-stack>
            </forge-stack>
          </forge-toolbar>
          <div class="tab-container">
            <forge-tab-bar data-aria-label="Demo tabs" active-tab="0" clustered slot="start">
              <forge-tab>Applicant information</forge-tab>
              <forge-tab>Documents</forge-tab>
              <forge-tab>Interviews</forge-tab>
              <forge-tab>Messages</forge-tab>
            </forge-tab-bar>
          </div>

          <div class="main-content-container">
            <forge-card class="details-card">
              <forge-stack gap="24">
                <h3 class="${e.heading4}">Details</h3>
                <div class="label-value-grid">
                  <label slot="label" class="${e.label1}">Applied for</label>
                  <span slot="value" class="${e.body1}">Senior software engineer</span>
                  <label slot="label" class="${e.label1}">Application date</label>
                  <span slot="value" class="${e.body1}">January 1, 2024</span>
                </div>
                <div class="tab-container">
                  <forge-tab-bar data-aria-label="Demo tabs" active-tab="0" clustered slot="start">
                    <forge-tab>Personal information</forge-tab>
                    <forge-tab>Qualifications</forge-tab>
                    <forge-tab>Work history</forge-tab>
                    <forge-tab>References</forge-tab>
                  </forge-tab-bar>
                </div>
                <forge-stack gap="24">
                  <h4 class="${e.heading3}">Education</h4>
                  <forge-stack gap="24">
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Institution</label>
                      <span slot="value" class="${e.body1}">Massachusetts Institute of Technology</span>
                      <label slot="label" class="${e.label1}">Degree</label>
                      <span slot="value" class="${e.body1}">Masters of Science</span>
                      <label slot="label" class="${e.label1}">Area 1</label>
                      <span slot="value" class="${e.body1}">Computer Science</span>
                      <label slot="label" class="${e.label1}">Area 2</label>
                      <span slot="value" class="${e.body1}">Mathematics</span>
                    </div>
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Institution</label>
                      <span slot="value" class="${e.body1}">University of California, Berkeley</span>
                      <label slot="label" class="${e.label1}">Degree</label>
                      <span slot="value" class="${e.body1}">Bachelors of Science</span>
                      <label slot="label" class="${e.label1}">Area 1</label>
                      <span slot="value" class="${e.body1}">Computer Engineering</span>
                      <label slot="label" class="${e.label1}">Area 2</label>
                      <span slot="value" class="${e.body1}">Mathematics</span>
                    </div>
                  </forge-stack>
                </forge-stack>
                <forge-divider></forge-divider>

                <forge-stack gap="24">
                  <h4 class="${e.heading3}">Certifications</h4>
                  <forge-stack gap="24">
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Type</label>
                      <span slot="value" class="${e.body1}">AWS Certified Solutions Architect</span>
                      <label slot="label" class="${e.label1}">Area</label>
                      <span slot="value" class="${e.body1}">Cloud Computing</span>
                      <label slot="label" class="${e.label1}">Level</label>
                      <span slot="value" class="${e.body1}">Professional</span>
                      <label slot="label" class="${e.label1}">Effective date</label>
                      <span slot="value" class="${e.body1}">01/01/2026</span>
                      <label slot="label" class="${e.label1}">Expiration date</label>
                      <span slot="value" class="${e.body1}">01/01/2028</span>
                    </div>
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Type</label>
                      <span slot="value" class="${e.body1}">Certified Scrum Master</span>
                      <label slot="label" class="${e.label1}">Area</label>
                      <span slot="value" class="${e.body1}">Agile Methodology</span>
                      <label slot="label" class="${e.label1}">Effective date</label>
                      <span slot="value" class="${e.body1}">01/01/2026</span>
                      <label slot="label" class="${e.label1}">Expiration date</label>
                      <span slot="value" class="${e.body1}">01/01/2028</span>
                    </div>
                  </forge-stack>
                </forge-stack>
              </forge-stack>
            </forge-card>

            <div class="column-2">
              <forge-card>
                <forge-stack gap="16">
                  <h3 class="${e.heading4}">Workflow Status</h3>
                  <forge-select
                    label="Applicant status"
                    aria-label="Label"
                    label-position="block-start"
                    label-alignment="default"
                    variant="outlined"
                    theme="default"
                    shape="default"
                    density="default"
                    value="1"
                    support-text-inset
                    select-all-label="Select all">
                    <forge-option value="1">Interview</forge-option>
                    <forge-option value="2">Option 2</forge-option>
                    <forge-option value="3">Option 3</forge-option>
                  </forge-select>
                  <forge-stack gap="8">
                    <forge-button variant="filled">
                      <forge-icon name="calendar_today" slot="start" external></forge-icon>
                      <span>Schedule interview</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="send_variant_outline" slot="start" external></forge-icon>
                      <span>Send reference request</span>
                    </forge-button>
                  </forge-stack>
                </forge-stack>
              </forge-card>

              <forge-card class="workflow-status-card">
                <forge-stack gap="16">
                  <h3 class="${e.heading4}">Interview details</h3>
                  <forge-date-picker>
                    <forge-text-field label-position="block-start">
                      <label for="date-picker">Date</label>
                      <input aria-label="Pick a date" type="text" id="date-picker" autocomplete="off" placeholder="mm/dd/yyyy" />
                    </forge-text-field>
                  </forge-date-picker>
                  <forge-stack gap="8">
                    <forge-button variant="tonal">
                      <forge-icon name="question_answer" slot="start" external></forge-icon>
                      <span>Generate questions</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="star_border" slot="start" external></forge-icon>
                      <span>Add evaluation</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="notes" slot="start" external></forge-icon>
                      <span>View notes</span>
                    </forge-button>
                  </forge-stack>
                </forge-stack>
              </forge-card>

              <forge-card class="workflow-status-card">
                <forge-stack gap="16">
                  <h3 class="${e.heading4}">Verification status</h3>
                  <forge-stack gap="8">
                    <div class="label-value-grid">
                      <span class="${e.label1}">Background check</span>
                      <forge-badge theme="info-secondary">Initiated</forge-badge>

                      <span class="${e.label1}">Reference check</span>
                      <forge-badge theme="tertiary">Sent</forge-badge>
                    </div>
                  </forge-stack>
                </forge-stack>
              </forge-card>
            </div>
          </div>
        </main>

        <div slot="footer">
          <div
            style="padding: 16px; background: var(--forge-theme-surface-container); border-top: 1px solid var(--forge-theme-outline-low); text-align: center;">
            Footer Content
          </div>
        </div>
      </forge-app-layout>
    `},argTypes:{appTitle:{control:"text",description:"The title text to display in the app bar",table:{category:"Properties"}},breakpoint:{control:"number",description:"The screen width breakpoint in pixels for responsive behavior",table:{category:"Properties"}}},args:{appTitle:"App Layout Demo",breakpoint:960}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const _e=["MockedApplication"];export{t as MockedApplication,_e as __namedExportsOrder,Te as default};
