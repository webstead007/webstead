import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CircleCheck, CircleAlert, X } from 'lucide-react'
import './EnquiryToast.css'

export default function EnquiryToast({ notice, onDismiss }) {
  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(onDismiss, notice.type === 'success' ? 7000 : 10000)
    return () => window.clearTimeout(timer)
  }, [notice, onDismiss])

  return createPortal(
    <div className="enquiry-toast-region">
      <div role="status" aria-live="polite" aria-atomic="true">
        {notice?.type === 'success' && <ToastContent notice={notice} onDismiss={onDismiss}/>}
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="true">
        {notice?.type === 'error' && <ToastContent notice={notice} onDismiss={onDismiss}/>}
      </div>
    </div>, document.body,
  )
}

function ToastContent({ notice, onDismiss }) {
  const Icon = notice.type === 'success' ? CircleCheck : CircleAlert
  return <div className={`enquiry-toast enquiry-toast-${notice.type}`}>
    <Icon className="enquiry-toast-icon" size={24} aria-hidden="true"/>
    <div><strong>{notice.title}</strong><p>{notice.message}</p></div>
    <button type="button" onClick={onDismiss} aria-label="Dismiss notification"><X size={19}/></button>
  </div>
}
