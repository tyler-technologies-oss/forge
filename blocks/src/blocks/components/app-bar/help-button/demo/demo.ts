import { IconRegistry } from '@tylertech/forge/icon';
import type { IMenuOption, IAppBarHelpButtonComponent } from '@tylertech/forge';
import { tylIconHelp } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconHelp]);

const options: IMenuOption[] = [{ label: 'Help', value: 'help' }];

const helpButton = document.querySelector<IAppBarHelpButtonComponent>('forge-app-bar-help-button');
if (helpButton) {
  helpButton.options = options;
}
