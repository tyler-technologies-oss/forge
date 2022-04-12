import React, { CSSProperties, FC } from "react"

export const ImageLinkList: FC = ({children}) => {
  // margin: '0',
  // padding: '0',
  // border: '0',
  // fontSize: '100%',
  // font: 'inherit',
  // verticalAlign: 'initial',
  // listStyle: 'none',
  const tileContainer: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    marginTop: '1rem',
    width: 'calc(100% - 2px)',
    paddingLeft: '1px',
  }
  return (
    <ul style={tileContainer}>
      {children}
    </ul>
  )
}