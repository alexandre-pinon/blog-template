import React from 'react'
import { Header } from '.'

const Layout = ({ children }: Record<string, any>) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
