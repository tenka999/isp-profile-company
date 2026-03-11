import { useState, } from 'react'
import { MenuContext } from './Context'


export const MenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('')

  const value = {
    activeMenu,
    setActiveMenu
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}
