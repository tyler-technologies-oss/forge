import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}profile-card`;

const attributes = {
  FULL_NAME: 'full-name',
  EMAIL: 'email',
  SIGN_OUT: 'sign-out',
  PROFILE: 'profile',
  AVATAR_TEXT: 'avatar-text',
  AVATAR_IMAGE_URL: 'avatar-image-url',
  AVATAR_LETTER_COUNT: 'avatar-letter-count'
};

const selectors = {
  FULL_NAME: '.forge-profile-card__full-name',
  EMAIL: '.forge-profile-card__email',
  AVATAR: '.forge-profile-card__info-avatar > forge-avatar',
  ACTION_TOOLBAR: '#action-toolbar',
  PROFILE_BUTTON: '#profile-button',
  SIGN_OUT_BUTTON: '#sign-out-button'
};

const defaults = {
  SHOW_SIGN_OUT_BUTTON: true,
  SHOW_PROFILE_BUTTON: false
};

const events = {
  SIGN_OUT: `${elementName}-sign-out`,
  PROFILE: `${elementName}-profile`
};

export const PROFILE_CARD_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  defaults,
  events
};
