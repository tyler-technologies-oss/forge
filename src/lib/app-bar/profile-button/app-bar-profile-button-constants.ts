import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName = `${COMPONENT_NAME_PREFIX}app-bar-profile-button`;

const attributes = {
  FULL_NAME: 'full-name',
  EMAIL: 'email',
  AVATAR_IMAGE_URL: 'avatar-image-url',
  AVATAR_LETTER_COUNT: 'avatar-letter-count',
  AVATAR_TEXT: 'avatar-text',
  SIGN_OUT_BUTTON: 'sign-out-button',
  PROFILE_BUTTON: 'profile-button',
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
  avatarText: string;
  avatarImageUrl: string;
  avatarLetterCount: number;
}

export type AppBarProfileButtonProfileCardBuilder = () => HTMLElement;
