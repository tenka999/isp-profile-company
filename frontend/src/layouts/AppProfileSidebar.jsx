import { Sidebar } from 'primereact/sidebar'
import { useContext } from 'react'

import { Divider } from 'primereact/divider'
import { useNavigate } from 'react-router'
import useConfig from '@/hooks/config/useConfig'
import { LayoutContext } from '../context/Context'


const AppProfileSidebar = () => {
  const { layoutState, onSidebarToggle } = useContext(LayoutContext)


  const { Logout } = useConfig()

/**
 * Sidebar menu items
 * @property {string} label - The label of the menu item
 * @property {string} icon - The icon of the menu item
 * @property {string} [description] - The description of the menu item
 * @property {string} [to] - The route to navigate to
 * @property {() => void} [command] - The command to execute
 */
  const items= [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      description: 'View your profile',
      to: '/app/profile'
    },
    {
      label: 'Keluar',
      icon: 'pi pi-fw pi-sign-out',
      description: 'Logout from the app',
      command: () => {
        Logout()
      }
    }
  ]

  return (
    <Sidebar
      visible={layoutState.profileSidebarVisible}
      onHide={() => onSidebarToggle()}
      position='right'
      className='layout-config-sidebar w-20rem'>
      <h5 className='mb-2'>Halo</h5>
      <p>Hello User</p>
      <Divider />
      <div>
        {items.map((item, index) => (
          <NavCard key={index} {...item} />
        ))}
      </div>
    </Sidebar>
  )
}

const NavCard = (props) => {
  const navigate = useNavigate()
  const action = () => {
    if (props.command) {
      props.command()
    } else if (props.to) {
      navigate(props.to)
    }
  }
  return (
    <div
      className='card p-3 flex align-items-center gap-3 cursor-pointer'
      onClick={action}>
      <i className={props.icon}></i>
      <div>
        <div>{props.label}</div>
        <small className='text-400'>{props.description}</small>
      </div>
    </div>
  )
}

export default AppProfileSidebar
