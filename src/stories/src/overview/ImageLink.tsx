import React, { CSSProperties, FC } from "react";
import { linkTo } from '@storybook/addon-links';

interface IImageLinkProps {
  label: string;
  image: string;
  linkTitle: string;
  linkStory: string;
  description: string;
}

export const ImageLink: FC<IImageLinkProps> = ({
  label,
  image, 
  linkTitle,
  linkStory,
  description,
}) => {  

  
  const tileStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    outline: '1px solid var(--mdc-theme-border-color)',
    backgroundColor: 'var(--mdc-theme-surface)',
    pointerEvents: 'all',
    cursor: 'pointer',
  };
  const labelStyle: CSSProperties = {
    padding: '0 12px',
    minHeight: '32px',
    color: 'var(--mdc-theme-text-secondary-on-background)',
  };
  const imageStyle: CSSProperties = {
    backgroundImage: `url(${image})`,
    height: '92px',
    width: '92px',
    alignSelf: 'center',
    pointerEvents: 'none',
  };
  const descriptionStyle: CSSProperties = {
    ...labelStyle
  };
  return (
    <li style={tileStyle} onClick={linkTo(linkTitle, linkStory)}>
      <div style={labelStyle} className={'forge-typography--caption'}>{label}</div>
      <div style={imageStyle}></div>
      <div style={descriptionStyle} className={'forge-typography--caption'}>{description}</div>
    </li>
  );
};
