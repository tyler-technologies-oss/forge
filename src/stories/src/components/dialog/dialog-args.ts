export interface IDialogProps {
  fullscreen: boolean;
  moveable: boolean;
}

export const argTypes = {
  fullscreen: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  moveable: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};

export interface IAccount {
  firstName: string;
  lastName: string;
  ssn: string;
  driverLicenseNumber: string;
  driverLicenseState: string;
  phoneNumber: string;
}

export interface IAccountErrors {
  firstName?: string;
  lastName?: string;
  ssn?: string;
  driverLicenseNumber?: string;
  driverLicenseState?: string;
  phoneNumber?: string;
}

export const DEFAULT_ACCOUNT = {
  firstName: '',
  lastName: '',
  ssn: '',
  driverLicenseNumber: '',
  driverLicenseState: '',
  phoneNumber: '',
}

export interface IAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface IAddressErrors {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}

export const DEFAULT_ADDRESS = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  zipcode: '',
}

export enum PaymentType {
  None = 'None',
  MasterCard = 'Master card',
  VisaCard = 'Visa card',
  CheckingAccount = 'Checking account',
  PayVendor = 'Pay vendor',
}

export interface IPaymentMethod {
  selectedPayment?: IPayment;
}

export interface IPayment {
  id: string;
  type: PaymentType;
  number?: string;
}

export interface IPaymentErrors {
  type?: string;
  number?: string;
}
