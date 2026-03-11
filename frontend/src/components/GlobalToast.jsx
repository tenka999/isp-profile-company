import { useContext, useEffect, useRef } from 'react'
import { Toast } from 'primereact/toast' // Add the missing import
import { ToastContext } from '@/context/Context'

const GlobalToast = () => {
  const { toastData, hideToast } = useContext(ToastContext)
  const toastRef = useRef(null)

  useEffect(() => {
    if (toastData && toastRef.current) {
      toastRef.current.show(toastData)
    }
  }, [toastData])

  return (
    <Toast
      appendTo={document.body}
      ref={toastRef}
      onHide={hideToast}
      pt={{
        root: {
          className: 'z-100'
        }
      }}
    />
  )
}

export default GlobalToast
