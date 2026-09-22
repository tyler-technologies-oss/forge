import { RouteProps } from 'react-router-dom';
import { Home } from './core/home/Home';
import { AccordionDemo } from './demos/accordion/AccordionDemo';
import { ButtonDemo } from './demos/button/ButtonDemo';
import { TableDemo } from './demos/table/TableDemo';
import { AvatarDemo } from './demos/avatar/AvatarDemo';
import { BadgeDemo } from './demos/badge/BadgeDemo';
import { BannerDemo } from './demos/banner/BannerDemo';
import { StackDemo } from './demos/stack/StackDemo';
import { BottomSheetDemo } from './demos/bottom-sheet/BottomSheetDemo';
import { ToastDemo } from './demos/toast/ToastDemo';
import { DialogDemo } from './demos/dialog/DialogDemo';
import { PopoverDemo } from './demos/popover/PopoverDemo';
import { AppLauncherDemo } from './demos/app-launcher/AppLauncherDemo';
import { AppLayoutDemo } from './demos/app-layout/AppLayoutDemo';
import { BusyIndicatorDemo } from './demos/busy-indicator/BusyIndicatorDemo';
import { ConfirmationDialogDemo } from './demos/confirmation-dialog/ConfirmationDialogDemo';
import { ContentScaffoldDemo } from './demos/content-scaffold/ContentScaffoldDemo';
import { CountCardDemo } from './demos/count-card/CountCardDemo';
import { FooterDemo } from './demos/footer/FooterDemo';
import { MultiSelectHeaderDemo } from './demos/multi-select-header/MultiSelectHeaderDemo';
import { QuantityFieldDemo } from './demos/quantity-field/QuantityFieldDemo';
import { ResponsiveToolbarDemo } from './demos/responsive-toolbar/ResponsiveToolbarDemo';
import { StructuredCardDemo } from './demos/structured-card/StructuredCardDemo';
import { ThemeToggleDemo } from './demos/theme-toggle/ThemeToggleDemo';
import { UserProfileDemo } from './demos/user-profile/UserProfileDemo';

export interface IAppRoute extends RouteProps {
  path: string;
  routes?: IAppRoute[];
  text?: string;
  icon?: string;
}

const routes: IAppRoute[] = [
  { path: '/', component: Home, exact: true, text: 'Home', icon: 'home' },
  {
    path: '/components',
    text: 'Components',
    icon: 'settings_input_component',
    routes: [
      { path: '/accordion', component: AccordionDemo, text: 'Accordion' },
      { path: '/app-launcher', component: AppLauncherDemo, text: 'App launcher' },
      { path: '/app-layout', component: AppLayoutDemo, text: 'App layout' },
      { path: '/avatar', component: AvatarDemo, text: 'Avatar' },
      { path: '/badge', component: BadgeDemo, text: 'Badge' },
      { path: '/banner', component: BannerDemo, text: 'Banner' },
      { path: '/bottom-sheet', component: BottomSheetDemo, text: 'Bottom sheet' },
      { path: '/button', component: ButtonDemo, text: 'Button' },
      { path: '/busy-indicator', component: BusyIndicatorDemo, text: 'Busy indicator' },
      { path: '/confirmation-dialog', component: ConfirmationDialogDemo, text: 'Confirmation dialog' },
      { path: '/content-scaffold', component: ContentScaffoldDemo, text: 'Content scaffold' },
      { path: '/count-card', component: CountCardDemo, text: 'Count card' },
      { path: '/dialog', component: DialogDemo, text: 'Dialog' },
      { path: '/footer', component: FooterDemo, text: 'Footer' },
      { path: '/multi-select-header', component: MultiSelectHeaderDemo, text: 'Multi select header' },
      { path: '/popover', component: PopoverDemo, text: 'Popover' },
      { path: '/quantity-field', component: QuantityFieldDemo, text: 'Quantity field' },
      { path: '/responsive-toolbar', component: ResponsiveToolbarDemo, text: 'Responsive toolbar' },
      { path: '/stack', component: StackDemo, text: 'Stack' },
      { path: '/structured-card', component: StructuredCardDemo, text: 'Structured card' },
      { path: '/table', component: TableDemo, text: 'Table' },
      { path: '/theme-toggle', component: ThemeToggleDemo, text: 'Theme toggle' },
      { path: '/toast', component: ToastDemo, text: 'Toast' },
      { path: '/user-profile', component: UserProfileDemo, text: 'User profile' }
    ]
  }
];

export default routes;
