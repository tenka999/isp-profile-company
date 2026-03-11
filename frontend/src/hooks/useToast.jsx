import { ToastContext } from '@/context/Context'
import { useContext } from 'react'

const useToast = () => {
  const { showToast, hideToast } = useContext(ToastContext)

  /**
   * Show a toast notification
   * @param {GlobalToastProps}  - The toast notification properties
   * @property {ToastSeverity} severity - The severity of the toast (success, info, warn, error)
   * @property {string} summary - The summary of the toast
   * @property {string} detail - The detail message of the toast
   * @returns {void}
   */
  const show = ({ severity, summary, detail }) => {
    showToast({ severity, summary, detail })
  }

  const clear = () => {
    hideToast()
  }

  return {
    show,
    clear
  }
}

export default useToast
