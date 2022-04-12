import { Story } from "@storybook/react";
import { ForgeButton, ForgeDialog, ForgeDialogOptions, ForgeDivider, ForgeIconButton, ForgeTextField, ForgeToolbar } from "@tylertech/forge-react";
import { Field, Form, Formik } from "formik";
import React, { CSSProperties, FC, useState } from "react";
import { FormikTextField } from "../../shared/formik";

interface IControlInformation {
  controlId: string;
  sageControlNumber: string;
  title: string;
}

interface IServerInformation {
  serverType: string;
  categoryAssignedTo: string;
  subcategoryAssignedTo: string;
}

interface ISecuritySettings {
  type: string;
  severityLevel: string;
  acceptedSettingsForScore: string;
  source: string;
  sourceDocument: string;
  defaultRecommendation: string;
}

interface IDescriptions {
  sourceDescriptions: string;
}

interface IEditSettingsFormValues extends IControlInformation, IServerInformation, ISecuritySettings, IDescriptions {}

export const EditSettingsTemplate: Story = () => {
  const initialFormValues: IEditSettingsFormValues = {
    controlId: '',
    sageControlNumber: '',
    title: '',
    serverType: '',
    categoryAssignedTo: '',
    subcategoryAssignedTo: '',
    type: '',
    severityLevel: '',
    acceptedSettingsForScore: '',
    source: '',
    sourceDocument: '',
    defaultRecommendation: '',
    sourceDescriptions: '',
  };
  const [form, setForm] = useState<IEditSettingsFormValues>(initialFormValues);
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const handleSubmit = async (values) => {
      console.log(values);
  };
  const oneThirdStart: CSSProperties = {
    width: 'calc(33.33% - 8px)', 
    paddingRight: '16px'
  }
  const oneThirdCenter: CSSProperties = {
    width: 'calc(33.33% - 16px)', 
    paddingRight: '16px'
  }
  const oneThirdEnd: CSSProperties = {
    width: 'calc(33.34% - 8px)'
  }
  const twoThirdEnd: CSSProperties = {
    width: 'calc(66.67% - 8px)'
  }

  const ControlInformation: FC = () => (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      <ForgeTextField style={oneThirdStart}>
        <label>Control ID</label>
        <Field 
        name="controlId"
        type="text"
        id="control-id"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={oneThirdCenter}>
        <label>Sage control number</label>
        <Field 
        name="sageControlNumber"
        type="text"
        id="sage-control-number"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={oneThirdEnd}>
        <label>Title</label>
        <Field 
        name="title"
        type="text"
        id="title"
        component={FormikTextField}></Field>
      </ForgeTextField>
    </div>
  );

  const ServerInformation: FC = () => (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      <ForgeTextField style={oneThirdStart}>
        <label>Server type</label>
        <Field 
        name="serverType"
        type="text"
        id="server-type"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={oneThirdCenter}>
        <label>Category assigned to</label>
        <Field 
        name="categoryAssignedTo"
        type="text"
        id="category-assigned-to"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={oneThirdEnd}>
        <label>Subcategory assigned to</label>
        <Field 
        name="subcategoryAssignedTo"
        type="text"
        id="subcategory-assigned-to"
        component={FormikTextField}></Field>
      </ForgeTextField>
    </div>
  );

  const SecuritySettings: FC = () => (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      <ForgeTextField style={oneThirdStart}>
        <label>Type</label>
        <Field 
        name="type"
        type="text"
        id="type"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={oneThirdCenter}>
        <label>Severity level</label>
        <Field 
        name="severityLevel"
        type="text"
        id="severity-level"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={oneThirdEnd}>
        <label>Accepted settings for scoring</label>
        <Field 
        name="acceptedSettingsForScoring"
        type="text"
        id="accepted-settings-for-scoring"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={oneThirdStart}>
        <label>Source</label>
        <Field 
        name="source"
        type="text"
        id="source"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={twoThirdEnd}>
        <label>Source document</label>
        <Field 
        name="sourceDocument"
        type="text"
        id="source-document"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={oneThirdStart}>
        <label>Default recommendation</label>
        <Field 
        name="defaultRecommendation"
        type="text"
        id="default-recommendation"
        component={FormikTextField}></Field>
      </ForgeTextField>
    </div>
  );

  const Descriptions: FC = () => (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      <ForgeTextField style={{width: '100%'}}>
        <label>Source descriptions</label>
        <Field 
        name="sourceDescriptions"
        type="text"
        id="source-descriptions"
        component={FormikTextField}></Field>
      </ForgeTextField>
    </div>
  );

  return (
    <Formik
    initialValues={form as IEditSettingsFormValues}
    onSubmit={handleSubmit}
    validationSchema={() => false}>
      {formik => {
        const options: ForgeDialogOptions = {
          backdropClose: false,
          escapeClose: false,
          fullscreen: false,
          moveable: false,
          moveTarget: '',
          dialogClass: '',
          beforeCloseCallback: () => formik.dirty
        }
        const reset = () => {
          formik.resetForm();
          setForm(initialFormValues);
          setIsOpen(false);
        };
        return (
          <>
            <ForgeButton type="raised"> 
              <button onClick={() => setIsOpen(!isOpen)}>Edit settings</button>
            </ForgeButton>
            <ForgeDialog open={isOpen} options={options} onDismiss={() => {}}>
              <Form>
                <header className="forge-dialog__header" forge-dialog-move-target="true">
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <h2 style={{flex: '1 1 0.0001px'}}>Edit settings</h2>
                    <ForgeIconButton>
                      <button 
                      onClick={() => {
                        reset();
                      }} 
                      type="button" 
                      aria-label="Close edit settings dialog" 
                      className="tyler-icons">close</button>
                    </ForgeIconButton>
                  </div>
                </header>
                <ForgeDivider/>
                <section className="forge-dialog__body" style={{ width: '900px', maxHeight: '600px', }}>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h3>Control information</h3>
                    <ControlInformation/>
                    <h3>Server information</h3>
                    <ServerInformation/>
                    <h3>Security settings</h3>
                    <SecuritySettings/>
                    <h3>Descriptions</h3>
                    <Descriptions/>
                  </div>
                </section>
                <ForgeDivider/>
                <ForgeToolbar>
                  <ForgeButton type="outlined" style={{ marginRight: 16 }} slot={'end'}>
                    <button type="button" onClick={() => {
                      reset();
                    }}>Cancel</button>
                  </ForgeButton>
                  <ForgeButton type="unelevated" style={{ marginRight: 16 }} slot={'end'}>
                    <button disabled={formik.isSubmitting} type="submit" onClick={() => handleSubmit(formik.values)}>
                      Submit
                    </button>
                  </ForgeButton>
                </ForgeToolbar>
              </Form>
            </ForgeDialog>
          </>
        )
      }}
    </Formik>
  );
};
