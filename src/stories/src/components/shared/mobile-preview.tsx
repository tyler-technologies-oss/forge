import React, { FC } from "react";

const mobileBorderColor = 'var(--mdc-theme-elevated-surface)';

export const MobilePreview: FC = ({children}) => {
  const Header: FC = () => (
    <div style={{
      backgroundColor: mobileBorderColor,
      borderRadius: '15px 15px 0 0',
      height: '40px',
      width: '320px',
    }}></div>
  );
  const Footer: FC = () => (
    <div style={{
      backgroundColor: mobileBorderColor,
      borderRadius: '0 0 15px 15px',
      height: '60px',
      width: '320px',
    }}></div>
  );
  return (
  <div style={{
    display: 'flex', 
    flexDirection: 'column',
    border: `6px solid ${mobileBorderColor}`,
    borderRadius: '25px',
    maxWidth: '332px',
    boxSizing: 'border-box',
    margin: '24px',
  }}>
    <Header/>
    <div style={{
      width: '320px',
      height: 'calc(320px * 1.7778)',
    }}>
      {children}
    </div>
    <Footer/>
  </div>
)};