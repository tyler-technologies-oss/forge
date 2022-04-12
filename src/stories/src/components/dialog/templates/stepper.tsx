import { Story } from "@storybook/react";
import { 
  ForgeAutocomplete, 
  ForgeButton, 
  ForgeCheckbox, 
  ForgeDialog, 
  ForgeDialogOptions, 
  ForgeDivider, 
  ForgeIconButton, 
  ForgeList, 
  ForgeListItem, 
  ForgeStep, 
  ForgeStepper, 
  ForgeTextField, 
  ForgeToolbar, 
  ForgeView, 
  ForgeViewSwitcher 
} from "@tylertech/forge-react";
import { Field, Form, Formik, useFormikContext } from "formik";
import React, { 
  Children, 
  FC, 
  ReactChild, 
  ReactElement, 
  ReactFragment, 
  ReactPortal, 
  useState 
} from "react";
import { string as yupString, object as yupObject } from 'yup';
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import { FormikAutocompleteField, FormikCheckbox, FormikTextField } from "../../shared/formik";
import { US_STATES } from "../../../mock/mock-options";
import { LOREM_IPSUM } from "../../../mock/lorem-ipsum";
import { DEFAULT_ACCOUNT, DEFAULT_ADDRESS, IAccount, IAddress, IPayment, IPaymentMethod, PaymentType } from "../dialog-args";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

interface IStepperValues {
  steps: (ReactChild | ReactFragment | ReactPortal)[];
  stepIndex: number;
  totalSteps: number;
  isLastStep: boolean;
}

interface IStepperFormValues extends IAddress, IAccount, IPaymentMethod {
  acceptedTerms: boolean;
}

// (DerekMoss): see formik example https://github.com/formium/formik/blob/88f9e72140730e5403883e6f486f228a8b5e1bd0/examples/MultistepWizard.js

const Step: FC<{onSubmit: () => void; validationSchema?: OptionalObjectSchema<ObjectShape>}> = ({ children }) => (<>{children}</>);

export const StepperTemplate: Story = () => {
  const initialFormValues: IStepperFormValues = {
    ...DEFAULT_ADDRESS, 
    ...DEFAULT_ACCOUNT, 
    selectedPayment: undefined, 
    acceptedTerms: false,
  };
  const [form, setForm] = useState<IStepperFormValues>(initialFormValues);
  const initialStepperValues: IStepperValues = {
    steps: [],
    stepIndex: 0,
    totalSteps: 0,
    isLastStep: false,
  };
  const [stepper, setStepper] = useState<IStepperValues>(initialStepperValues);
  let step;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLosingData, setIsLosingData] = useState<boolean>(false);

  const filter = (filterText, value) => {
    return US_STATES.filter(item  => item.label.toLowerCase().includes(filterText.toLowerCase()));
  };

  const next = values => {
    setForm(values);
    setStepper({...stepper, stepIndex: Math.min(stepper.stepIndex + 1, stepper.totalSteps - 1)});
  };
  const previous = values => {
    setForm(values);
    setStepper({...stepper, stepIndex: Math.max(stepper.stepIndex - 1, 0)});
  };
  const select = (evt, values) => {
    setForm(values);
    setStepper({...stepper, stepIndex: evt.detail});
  }
  const handleSubmit = async (values) => {
    step = stepper.steps[stepper.stepIndex] as ReactElement;
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (stepper.isLastStep) {
      return async values => {
        return sleep(300).then(() => console.log('Wizard submit', values))
      };
    } else {
      // bag.setTouched({});
      next(values);
    }
  };

  // const StepperForm: FC<{values: IFormValues, isSubmitting: boolean}> = ({children, values, isSubmitting}) => {
  const StepperForm: FC = ({children}) => {
    stepper.steps = Children.toArray(children);
    step = stepper.steps[stepper.stepIndex] as ReactElement;
    stepper.totalSteps = stepper.steps.length;
    stepper.isLastStep = stepper.stepIndex === stepper.totalSteps - 1;

    const formik = useFormikContext();

    const tryToClose = () => {
      if (formik.dirty) {
        setIsLosingData(true);
      } else {
        reset();
      }
    }
    const reset = () => {
      formik.resetForm();
      setForm(initialFormValues);
      setStepper({...stepper, stepIndex: 0});
      setIsOpen(false);
      setIsLosingData(false);
    };   

    return  (
      <Form>
      { isLosingData
        ? (
          <>
            <header className="forge-dialog__header" forge-dialog-move-target="true">
              <h2>Discard request?</h2>
            </header>
            <section className="forge-dialog__body" style={{ width: '600px', maxHeight: '400px', }}>          
              About to cancel request for new service.
            </section>
            <ForgeDivider/>        
            <ForgeToolbar>
              <ForgeButton type="outlined" style={{ marginRight: 16 }} slot={'end'}>
                <button type="button" onClick={() => {
                  setIsLosingData(false);
                }}>Cancel</button>
              </ForgeButton>
              <ForgeButton type="unelevated" style={{ marginRight: 16 }} slot={'end'}>
                <button type="button" onClick={() => reset()}>
                  Discard
                </button>
              </ForgeButton>
            </ForgeToolbar>
          </>
        ) : (
          <>
            <header className="forge-dialog__header" forge-dialog-move-target="true">
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <h2 style={{flex: '1 1 0.0001px'}}>New service request</h2>
                  <ForgeIconButton>
                    <button 
                    onClick={() => {
                      tryToClose();
                    }} 
                    type="button" 
                    aria-label="Close service request dialog" 
                    className="tyler-icons">close</button>
                  </ForgeIconButton>
                </div>
                <ForgeStepper 
                on-forge-step-selected={evt => select(evt, formik.values)} 
                selectedIndex={stepper.stepIndex}>
                  <ForgeStep>Address</ForgeStep>
                  <ForgeStep>Account</ForgeStep>
                  <ForgeStep>Payment</ForgeStep>
                  <ForgeStep>Terms</ForgeStep>
                </ForgeStepper>
              </div>
            </header>
            <ForgeDivider/>
            <section className="forge-dialog__body" style={{ width: '600px', maxHeight: '400px', }}>
              <ForgeViewSwitcher index={stepper.stepIndex}>
                {step}
              </ForgeViewSwitcher>
            </section>
            <ForgeDivider/>
            <ForgeToolbar>
              <ForgeButton type="unelevated" style={{ marginRight: 16 }} slot={'start'}>
                <button type="button" disabled={stepper.stepIndex === 0} onClick={() => previous(formik.values)}>Previous</button>
              </ForgeButton>
              <ForgeButton type="outlined" style={{ marginRight: 16 }} slot={'end'}>
                <button type="button" onClick={() => {
                  tryToClose();
                }}>Cancel</button>
              </ForgeButton>
              <ForgeButton type="unelevated" style={{ marginRight: 16 }} slot={'end'}>
                <button disabled={formik.isSubmitting} type="submit" onClick={() => handleSubmit(formik.values)}>
                  {stepper.isLastStep ? 'Submit' : 'Next'}
                </button>
              </ForgeButton>
            </ForgeToolbar>
          </>
        )
      } 
      </Form>
    );
  }

  const AddressView: FC = () => {
    return (
      <ForgeView>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h3>Mailing address</h3>
          <ForgeTextField>
            <label>Address Line 1</label>
            <Field 
            name="line1"
            type="text"
            id="address-line-one"
            component={FormikTextField}></Field>
          </ForgeTextField>
          <ForgeTextField>
            <label>Address Line 2</label>
            <Field 
            name="line2"
            type="text"
            id="address-line-two"
            component={FormikTextField}></Field>
          </ForgeTextField>
          <ForgeTextField>
            <label>City</label>
            <Field 
            name="city"
            type="text"
            id="address-city"
            component={FormikTextField}></Field>
          </ForgeTextField>
          <ForgeAutocomplete filter={filter}>
            <ForgeTextField>
              <Field 
              name="state"
              type="text"
              id="address-state"
              component={FormikAutocompleteField}></Field>
            </ForgeTextField>
          </ForgeAutocomplete>
          <ForgeTextField>
            <label>Zipcode</label>
            <Field 
            name="zipcode"
            type="text"
            id="address-zipcode"
            component={FormikTextField}></Field>
          </ForgeTextField>
        </div>
      </ForgeView>
    )
  };

  const AccountView: FC = () => (
    <ForgeView>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h3>Your information</h3>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <ForgeTextField style={{flex: '1 1 0.0001px', marginRight: '16px'}}>
            <label>First name</label>
            <Field 
            name="firstName"
            type="text"
            id="account-first-name"
            component={FormikTextField}></Field>
          </ForgeTextField>
          <ForgeTextField style={{flex: '1 1 0.0001px'}}>
            <label>Last name</label>
            <Field 
            name="lastName"
            type="text"
            id="account-last-name"
            component={FormikTextField}></Field>
          </ForgeTextField>
        </div>
        <ForgeTextField>
          <label>SSN</label>
          <Field 
            name="ssn"
            type="text"
            id="account-ssn"
            component={FormikTextField}></Field>
        </ForgeTextField>
        <h3>Driver's license</h3>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <ForgeTextField style={{flex: '1 1 0.0001px', marginRight: '16px'}}>
            <label>License number</label>
            <Field 
            name="driverLicenseNumber"
            type="text"
            id="account-driver-license-number"
            component={FormikTextField}></Field>
          </ForgeTextField>
          <ForgeAutocomplete filter={filter} style={{flex: '1 1 0.0001px'}}>
            <ForgeTextField>
              <label htmlFor="state">state</label>
              <Field 
                name="driverLicenseState"
                type="text"
                id="account-driver-license-state"
                component={FormikAutocompleteField}></Field>
            </ForgeTextField>
          </ForgeAutocomplete>
        </div>
        <h3>Contact information</h3>
        <ForgeTextField style={{flex: '1 1 0.0001px', width: 'calc(50% - 8px)'}}>
          <label>Phone number</label>
          <Field 
            name="phoneNumber"
            type="text"
            id="account-phone-number"
            component={FormikTextField}></Field>
        </ForgeTextField>
      </div>
    </ForgeView>
  );

  const PaymentView: FC = () => {
    const payments: IPayment[] = [
      { id: '0', number: '5678', type: PaymentType.MasterCard },
      { id: '1', number: '5678', type: PaymentType.CheckingAccount },
      { id: '2', type: PaymentType.PayVendor },
    ];
    const { selectedPayment } = form;
    return (
      <ForgeView>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h3>Select payment method</h3>
          <ForgeList role="radiogroup">
            { payments.map((p, i) => {
              const hasNumber = p.number !== undefined || p.number !== '';
              const SubTitle = () => hasNumber ? (<i slot="subtitle">ending in #{p.number}</i>) : null;
              return (
                <ForgeListItem 
                on-forge-list-item-select={evt => {
                  setForm({ ...form, selectedPayment: evt.detail.value});
                }}
                twoLine={hasNumber} 
                selected={selectedPayment !== undefined && p.id === selectedPayment.id}
                value={p}
                key={`payment-method-${i + 1}`}>
                  <span slot="title">{p.type}</span>
                  <SubTitle/>
                </ForgeListItem>
              );
            })}
          </ForgeList>
        </div>
      </ForgeView>
    )
  };

  const TermsView: FC = () => (
    <ForgeView>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h3>Terms of service</h3>
        <p>{LOREM_IPSUM.p1}</p>
        <p>{LOREM_IPSUM.p2}</p>
        <p>{LOREM_IPSUM.p3}</p>
        <p>{LOREM_IPSUM.p4}</p>
        <p>{LOREM_IPSUM.p5}</p>
        <ForgeCheckbox>
          <label>Accept Terms of Service</label>
          <Field 
          name="acceptedTerms"
          type="checkbox"
          id="accepted-terms"
          component={FormikCheckbox}></Field>
        </ForgeCheckbox>
      </div>
    </ForgeView>
  )

  const DialogContent: FC = () => {
    return (
      <StepperForm>
          <Step 
          onSubmit={() => console.log('Address onSubmit')}
          validationSchema={yupObject({
            addressLine1: yupString().required('required'),
            addressCity: yupString().required('required'),
            addressState: yupString().required('required'),
            addressZipcode: yupString().required('required'),
          })}>
            <AddressView/>
          </Step>
          <Step 
          onSubmit={() => console.log('Account onSubmit')}
          validationSchema={yupObject({
            firstName: yupString().required('required'),
            lastName: yupString().required('required'),
            SSN: yupString().required('required'),
            driverLicenseNumber: yupString().required('required'),
            driverLicenseState: yupString().required('required'),
            phoneNumber: yupString().required('required'),
          })}>
            <AccountView/>
          </Step>
          <Step 
          onSubmit={() => console.log('Payment onSubmit')}
          validationSchema={yupObject({
            selectedPayment: yupString().required('required'),
          })}>
            <PaymentView/>
          </Step>
          <Step 
          onSubmit={() => console.log('Terms onSubmit')}
          validationSchema={yupObject({
            acceptedTerms: yupString().required('required'),
          })}>
            <TermsView/>
          </Step>
      </StepperForm>
    )
  };

  return (
    <Formik
    initialValues={form as IStepperFormValues}
    onSubmit={handleSubmit}
    validationSchema={() => step !== undefined ? step.props.validationSchema : false}>
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
        return (
          <>
            <ForgeButton type="raised"> 
              <button onClick={() => setIsOpen(!isOpen)}>Show stepper dialog</button>
            </ForgeButton>
            <ForgeDialog open={isOpen} options={options} onDismiss={() => {}}>
              <DialogContent/>
            </ForgeDialog>
          </>
        )
      }}
    </Formik>
  );
};
