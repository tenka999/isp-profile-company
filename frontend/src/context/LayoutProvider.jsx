import { useState, useContext } from 'react'

import { PrimeReactContext } from 'primereact/api'
import { LayoutContext, ToastContext } from './Context'

export const LayoutProvider = ({ children }) => {
  const [layoutConfig, setLayoutConfig] = useState({
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'dark',
    theme: 'lara-dark-green-new',
    scale: 14
  })

  const { showToast } = useContext(ToastContext)

  const { changeTheme } = useContext(PrimeReactContext)

  const [layoutState, setLayoutState] = useState({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    progressBarIndicator: false
  })

  const onMenuToggle = () => {
    showToast({
      severity: layoutState.staticMenuDesktopInactive ? 'info' : 'warn',
      summary: 'Menu Toggled',
      detail: layoutState.staticMenuDesktopInactive ? 'The menu has been opened.' : 'The menu has been closed.',
    })
    if (isOverlay()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        overlayMenuActive: !prevLayoutState.overlayMenuActive
      }))
    }

    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive
      }))
    } else {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive
      }))
    }
  }

  const onSidebarToggle = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: !prevLayoutState.profileSidebarVisible
    }))
  }

  const _changeTheme = (theme, colorScheme) => {
    if (typeof changeTheme !== 'function') {
      console.log('changeTheme is not available')
      return
    } else {
      changeTheme(layoutConfig.theme, theme, 'theme-link', () => {
        setLayoutConfig((prevLayoutConfig) => ({
          ...prevLayoutConfig,
          theme,
          colorScheme
        }))
      })
    }
  }

  const onConfigToggle = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      configSidebarVisible: !prevLayoutState.configSidebarVisible
    }))
  }

  const isOverlay = () => {
    return layoutConfig.menuMode === 'overlay'
  }

  const isDesktop = () => {
    return window.innerWidth > 991
  }

  const onPageNavigate = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      progressBarIndicator: true
    }))

    setTimeout(() => {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        progressBarIndicator: false
      }))
    }, 1000)
  }

  const value = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    onSidebarToggle,
    onConfigToggle,
    onPageNavigate,
    _changeTheme
  }

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}
