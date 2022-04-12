import { Story } from "@storybook/react";
import { ForgeButton, ForgeDialog, ForgeDialogOptions } from "@tylertech/forge-react";
import React, { useState } from "react";

export const SuccessConfirmationTemplate: Story = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); 

  const options: ForgeDialogOptions = {
    backdropClose: false,
    escapeClose: false,
    fullscreen: false,
    moveable: false,
    moveTarget: '',
    dialogClass: '',
    beforeCloseCallback: () => false
  }
  return (
    <>
      <ForgeButton type="raised"> 
        <button onClick={() => setIsOpen(!isOpen)}>Save condition</button>
      </ForgeButton>
      <ForgeDialog open={isOpen} options={options} onDismiss={() => {}} >
        <div style={{padding: '16px 8px 8px 8px'}}>
          <section className="forge-dialog__body" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 32px', paddingBottom: '8px',}}>
            <img src="https://cdn.forge.tylertech.com/v1/images/spot/thumbs-up-spot.svg" width="128" height="128" alt="" style={{marginTop: '8px'}} />
            <div className="forge-typography--body1" style={{marginTop: '16px'}}>Your condition has been saved successfully!</div>
            <div className="forge-typography--subtitle1" style={{textAlign: 'center'}}>Would you like to create another condition within <br/> Revenue or move on to Expenditure?</div>
          </section>
          <footer className="forge-dialog__footer">
            <ForgeButton type="outlined" style={{ marginRight: 16 }} slot={'center'}>
              <button type="button" onClick={() => setIsOpen(false)}>Create another condition</button>
            </ForgeButton>
            <ForgeButton type="unelevated" slot={'center'}>
              <button type="submit" onClick={() => setIsOpen(false)}>Move on</button>
            </ForgeButton>
          </footer>
        </div>
      </ForgeDialog>
    </>
  );
};