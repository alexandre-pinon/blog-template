import React from 'react'
import { Header } from '.'

function Layout({ children }: Record<string, any>) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
