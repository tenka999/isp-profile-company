import { Link } from 'react-router'
import { classNames } from 'primereact/utils'
import { forwardRef, useContext, useImperativeHandle, useRef } from 'react'
import AppProfileSidebar from './AppProfileSidebar'
import { LayoutContext } from '../context/Context'

const AppTopbar = forwardRef((_props, ref) => {
  const {
    layoutConfig,
    layoutState,
    onMenuToggle,
    // setLayoutConfig,
    setLayoutState,
    _changeTheme,
  } = useContext(LayoutContext)
  // const { changeTheme } = useContext(PrimeReactContext)

  const menubuttonRef = useRef(null)
  const topbarmenuRef = useRef(null)
  const topbarmenubuttonRef = useRef(null)

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }))

  const toggleDarkTheme = () => {
    const isDark = layoutConfig.colorScheme === 'dark'
    const theme = isDark ? 'lara-light-green' : 'lara-dark-green-new'
    const colorScheme = isDark ? 'light' : 'dark'
    _changeTheme(theme, colorScheme)
  }

  const onConfigButtonClick = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      profileSidebarVisible: true
    }))
  }

  return (
    <div className="layout-topbar">
      <Link to="/app" className="layout-topbar-logo">
        <img
          src={`/layout/images/logo-${
            layoutConfig.colorScheme !== "light" ? "white" : "dark"
          }.svg`}
          width="47.22px"
          height={"35px"}
          alt="logo"
        />
        <span>Sakai</span>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={onConfigButtonClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        <button
          type="button"
          className="p-link layout-topbar-button"
          onClick={toggleDarkTheme}
        >
          <i
            className={
              layoutConfig.colorScheme === "dark" ? "pi pi-sun" : "pi pi-moon"
            }
          ></i>
          <span>Theme</span>
        </button>
        <button
          type="button"
          className="p-link layout-topbar-button"
          onClick={onConfigButtonClick}
        >
          <i className="pi pi-user"></i>
          <span>Profile</span>
        </button>

        <AppProfileSidebar />
      </div>
    </div>
  );
})

AppTopbar.displayName = 'AppTopbar'

export default AppTopbar
