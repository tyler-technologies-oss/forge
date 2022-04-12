import { Story } from "@storybook/react";
import { ForgeButton, ForgeDialog, ForgeDialogOptions, ForgeDivider, ForgeIconButton, ForgeTextField, ForgeToolbar } from "@tylertech/forge-react";
import { Field, Form, Formik } from "formik";
import React, { FC, useState } from "react";
import { MobilePreview } from "../../shared/mobile-preview";
import { FormikTextField } from "../../shared/formik";

interface INameInformation {
  firstName: string;
  lastName: string;
}

export const FullscreenResponsiveTemplate: Story = () => {
  const initialFormValues: INameInformation = {
    firstName: '',
    lastName: '',
  };
  const [form, setForm] = useState<INameInformation>(initialFormValues);
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const handleSubmit = async (values) => {
      console.log(values);
  };

  const NameInformation: FC = () => (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <ForgeTextField style={{marginTop: '16px'}}>
        <label>First name</label>
        <Field 
        name="firstName"
        type="text"
        id="first-name"
        component={FormikTextField}></Field>
      </ForgeTextField>
      <ForgeTextField style={{marginTop: '8px'}}>
        <label>Last name</label>
        <Field 
        name="lastName"
        type="text"
        id="last-name"
        component={FormikTextField}></Field>
      </ForgeTextField>
    </div>
  );

  return (
    <Formik
    initialValues={form as INameInformation}
    onSubmit={handleSubmit}
    validationSchema={() => false}>
      {formik => {
        const options: ForgeDialogOptions = {
          backdropClose: false,
          escapeClose: false,
          fullscreen: true,
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
          <MobilePreview>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              height: '100%'
            }}>
              <ForgeButton style={{
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column',
              }} type="raised"> 
                <button onClick={() => setIsOpen(!isOpen)}>Edit name</button>
              </ForgeButton>
              <ForgeDialog open={isOpen} options={options} onDismiss={() => {}} >
                <MobilePreview>
                  <Form style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <header className="forge-dialog__header" forge-dialog-move-target="true" style={{paddingTop: '9px', paddingRight: '8px'}}>
                      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <h2 style={{flex: '1 1 0.0001px', margin: '0'}}>Edit name</h2>
                        <ForgeIconButton>
                          <button 
                          onClick={() => {
                            reset();
                          }} 
                          type="button" 
                          aria-label="Close complex dialog" 
                          className="tyler-icons">close</button>
                        </ForgeIconButton>
                      </div>
                    </header>
                    <ForgeDivider/>
                    <section className="forge-dialog__body" style={{flex: '1 1 0.0001px'}}>
                      <NameInformation/>
                    </section>
                    <ForgeDivider/>
                    <ForgeToolbar>
                      <ForgeButton 
                      type="outlined" 
                      style={{ 
                        marginRight: 16, 
                        flex: '1 1 0.0001px',
                        display: 'flex',
                        flexDirection: 'column',
                      }} 
                      slot={'center'}>
                        <button type="button" onClick={() => {
                          reset();
                        }}>Cancel</button>
                      </ForgeButton>
                      <ForgeButton 
                      type="unelevated"  
                      style={{ 
                        flex: '1 1 0.0001px',
                        display: 'flex',
                        flexDirection: 'column', 
                      }} 
                      slot={'center'}>
                        <button disabled={formik.isSubmitting} type="submit" onClick={() => handleSubmit(formik.values)}>
                          Save
                        </button>
                      </ForgeButton>
                    </ForgeToolbar>
                  </Form>
                </MobilePreview>
              </ForgeDialog>
            </div>
          </MobilePreview>
        )
      }}
    </Formik>
  );
};
