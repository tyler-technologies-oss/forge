import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-bar-profile-button`;

const attributes = {
  FULL_NAME: 'full-name',
  EMAIL: 'email',
  AVATAR_IMAGE_URL: 'avatar-image-url',
  AVATAR_LETTER_COUNT: 'avatar-letter-count',
  AVATAR_TEXT: 'avatar-text',
  AVATAR_ICON: 'avatar-icon',
  SIGN_OUT_BUTTON: 'sign-out-button',
  PROFILE_BUTTON: 'profile-button',
  SIGN_OUT_BUTTON_TEXT: 'sign-out-button-text',
  PROFILE_BUTTON_TEXT: 'profile-button-text',
  OPEN: 'open'
};

const selectors = {
  BUTTON: 'button'
};

export const APP_BAR_PROFILE_BUTTON_CONSTANTS = {
  elementName,
  attributes,
  selectors
};

export interface IAppBarProfileCardConfig {
  fullName: string;
  email: string;
  signOut: boolean;
  profile: boolean;
  signOutButtonText: string;
  profileButtonText: string;
  avatarText: string;
  avatarIcon: string;
  avatarImageUrl: string;
  avatarLetterCount: number;
}

export type AppBarProfileButtonProfileCardBuilder = () => HTMLElement;
