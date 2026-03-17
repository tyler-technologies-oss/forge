import '$src/shared';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import { IProfileCardComponent, PROFILE_CARD_CONSTANTS } from '@tylertech/forge/profile-card';
import '@tylertech/forge/profile-card';
import './profile-card.scss';

const profileCard = document.querySelector('forge-profile-card') as IProfileCardComponent;

profileCard.addEventListener(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, () => {
  console.log(PROFILE_CARD_CONSTANTS.events.SIGN_OUT);
});

profileCard.addEventListener(PROFILE_CARD_CONSTANTS.events.PROFILE, () => {
  console.log(PROFILE_CARD_CONSTANTS.events.PROFILE);
});

const signOutToggle = document.querySelector('#opt-sign-out-button') as ISwitchComponent;
signOutToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  profileCard.signOut = selected;
});

const profileToggle = document.querySelector('#opt-profile-button') as ISwitchComponent;
profileToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  profileCard.profile = selected;
});

const signOutTextField = document.querySelector('#opt-sign-out-text') as HTMLInputElement;
signOutTextField.addEventListener('input', () => {
  profileCard.signOutText = signOutTextField.value;
});

const profileTextField = document.querySelector('#opt-profile-text') as HTMLInputElement;
profileTextField.addEventListener('input', () => {
  profileCard.profileText = profileTextField.value;
});

const fullNameTextField = document.querySelector('#opt-full-name') as HTMLInputElement;
fullNameTextField.addEventListener('input', () => {
  profileCard.fullName = fullNameTextField.value;
});

const emailInput = document.querySelector('#opt-email') as HTMLInputElement;
emailInput.addEventListener('input', () => {
  profileCard.email = emailInput.value;
});
