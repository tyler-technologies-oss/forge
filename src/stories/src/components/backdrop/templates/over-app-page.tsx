import React, { CSSProperties, MutableRefObject, useRef } from 'react';
import { Story } from '@storybook/react';
import { ForgeBackdrop, ForgeButton, ForgeDrawer, ForgeList, ForgeListItem, ForgeAppBar, ForgeScaffold, ForgeToolbar } from '@tylertech/forge-react';
import { IBackdropProps } from '../backdrop-args';
import { IBackdropComponent } from '@tylertech/forge';

export const OverAppPageTemplate: Story<IBackdropProps> = props => {
  const backdropRef = useRef<IBackdropComponent>();
  const backdropLabelRef = useRef<HTMLDivElement>()  as MutableRefObject<HTMLDivElement>;
  
  const openBackdrop = () => {
    const backdrop = backdropRef.current as IBackdropComponent;
    const backdropLabel = backdropLabelRef.current as HTMLDivElement;
    backdrop.style.display = 'block';
    backdrop.fadeIn();    
    backdropLabel.style.opacity = '1';
  }

  const closeBackdrop = () => {
    const backdrop = backdropRef.current as IBackdropComponent;
    const backdropLabel = backdropLabelRef.current as HTMLDivElement;
    backdrop.fadeOut().then(() => backdrop.style.display = 'none');
    backdropLabel.style.opacity = '0';
  }

  const OpenButton = () => (
    <ForgeButton>
      <button onClick={openBackdrop}>Show backdrop</button>
    </ForgeButton>
  );

  const defaultStyles: CSSProperties = {
    opacity: 0,
    zIndex: 7,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    fontSize: '4rem',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  };

  return (
    <ForgeScaffold style={{ '--forge-scaffold-height': '350px' }}>
      <ForgeAppBar title-text="Application Title" slot="header"></ForgeAppBar>
      <ForgeToolbar slot="body-header">
        <h1 slot="start" className="forge-typography--title">
          Subtitle
        </h1>
      </ForgeToolbar>
      <div slot="body-left">
        <ForgeDrawer>
          <ForgeToolbar slot="header" style={{ '--forge-toolbar-padding': 0 }}>
            <ForgeList slot="center" style={{ width: '100%' }}>
              <ForgeListItem>
                <i slot="leading" className="tyler-icons">
                  home
                </i>
                Home
              </ForgeListItem>
            </ForgeList>
          </ForgeToolbar>
          <ForgeList>
            <ForgeListItem selected="true">
              <i className="tyler-icons" slot="leading">
                add
              </i>
              Create
            </ForgeListItem>
            <ForgeListItem>
              <i className="tyler-icons" slot="leading">
                search
              </i>
              Search
            </ForgeListItem>
            <ForgeListItem>
              <i className="tyler-icons" slot="leading">
                settings
              </i>
              Settings
            </ForgeListItem>
          </ForgeList>
        </ForgeDrawer>
      </div>
      <div slot="body" style={{ paddingLeft: '16px' }}>
        <OpenButton/>
        <ForgeBackdrop 
        ref={backdropRef}
        on-forge-backdrop-click={() => closeBackdrop()}
        {...props}
        style={{display: 'none'}}></ForgeBackdrop>
        <div style={defaultStyles} ref={backdropLabelRef}>Click to close backdrop</div>
      </div>
    </ForgeScaffold>
  );
};
