import { SplitViewPaneComponent, SPLIT_VIEW_PANE_CONSTANTS, defineSplitViewPaneComponent } from '@tylertech/tyler-components-web';

describe('SplitViewPaneComponent', () => {
  let componentInstance: SplitViewPaneComponent;
  let fixtureContainer: HTMLElement;

  beforeAll(() => {
    defineSplitViewPaneComponent();
    fixtureContainer = document.createElement('div');
    document.body.appendChild(fixtureContainer);
  });

  beforeEach(() => {    
    const element = document.createElement(SPLIT_VIEW_PANE_CONSTANTS.elementName);
    fixtureContainer.appendChild(element);
    componentInstance = document.querySelector(SPLIT_VIEW_PANE_CONSTANTS.elementName) as SplitViewPaneComponent;
  });

  afterEach(() => {
    fixtureContainer.removeChild(componentInstance);
  });

  it('should instantiate component instance', () => {
    expect(componentInstance.shadowRoot).not.toBeNull();
  });  
});
