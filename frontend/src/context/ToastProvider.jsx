import React from 'react'
import { ToastContext } from './Context'

const ToastProvider = ({ children }) => {
  /**
   * Toast message data
   * @type {[Object|null, function]}
   * @property {string} severity - The severity level of the toast (e.g., 'success', 'info', 'warn', 'error')
   * @property {string} summary - The summary message of the toast
   * @property {string} detail - The detailed message of the toast
   * @property {boolean} [sticky] - Whether the toast should remain visible until dismissed
   * @property {number} [life] - Duration in milliseconds before auto-hiding (default: 3000)
   */
  const [toastData, setToastData] = React.useState(null)

  /**
   * Displays a toast notification with the provided data
   * @param {Object} data - The toast configuration object
   * @param {string} data.severity - Severity level ('success', 'info', 'warn', 'error')
   * @param {string} data.summary - Toast title/summary
   * @param {string} data.detail - Toast detailed message
   * @param {boolean} [data.sticky] - Whether toast should persist until dismissed
   * @param {number} [data.life] - Duration in milliseconds before auto-hiding
   */
  const showToast = (data) => {
    // if (isOpen) {
    //   setIsOpen(false)
    // }
    setToastData(data)
    // setIsOpen(true)
  }

  const hideToast = () => {
    // setIsOpen(false)
    setToastData(null)
  }

  return (
    <ToastContext.Provider value={{ toastData, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
