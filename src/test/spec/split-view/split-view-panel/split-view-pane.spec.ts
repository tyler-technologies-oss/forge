import { SplitViewPanelComponent, SPLIT_VIEW_PANEL_CONSTANTS, defineSplitViewPanelComponent } from '@tylertech/forge/split-view';

describe('SplitViewPaneComponent', () => {
  let componentInstance: SplitViewPanelComponent;
  let fixtureContainer: HTMLElement;

  beforeAll(() => {
    defineSplitViewPanelComponent();
    fixtureContainer = document.createElement('div');
    document.body.appendChild(fixtureContainer);
  });

  beforeEach(() => {    
    const element = document.createElement(SPLIT_VIEW_PANEL_CONSTANTS.elementName);
    fixtureContainer.appendChild(element);
    componentInstance = document.querySelector(SPLIT_VIEW_PANEL_CONSTANTS.elementName) as SplitViewPanelComponent;
  });

  afterEach(() => {
    fixtureContainer.removeChild(componentInstance);
  });

  it('should instantiate component instance', () => {
    expect(componentInstance.shadowRoot).not.toBeNull();
  });  
});
