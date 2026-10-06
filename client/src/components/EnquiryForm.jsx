import { useCallback, useState } from 'react'
import EnquiryToast from './EnquiryToast'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../data/services'
import { packages } from '../data/packages'
import { projects } from '../data/projects'

export default function EnquiryForm(){
  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
  const web3FormsKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim()
  const [params]=useSearchParams()
  const selectedPackage=packages.find(p=>p.id===params.get('package'))
  const selectedService=services.find(s=>s.id===params.get('service'))
  const selectedProject=projects.find(p=>String(p.id)===params.get('project'))
  const [form,setForm]=useState(()=>({name:'',email:'',phone:'',service:selectedService?.title||(selectedPackage?'Website Design & Development':''),budget:selectedPackage?.price||'',message:selectedProject?`I’m interested in a website like ${selectedProject.title}. `:'',privacy:false}))
  const [status,setStatus]=useState('idle')
  const [error,setError]=useState('')
  const [notice,setNotice]=useState(null)
  const dismissNotice=useCallback(()=>setNotice(null),[])
  const update=e=>setForm(current=>({...current,[e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value}))
  async function submit(e){
    e.preventDefault()
    if(status==='loading'||status==='success'||!e.currentTarget.reportValidity()) return
    setStatus('loading')
    setError('')
    setNotice(null)
    const controller=new AbortController()
    const timeout=window.setTimeout(()=>controller.abort(),35000)
    try {
      const response=await fetch(web3FormsKey?'https://api.web3forms.com/submit':`${apiBase}/api/contact`, {
        method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify(web3FormsKey?{
          access_key:web3FormsKey,
          subject:`New Webstead enquiry: ${form.service}`,
          name:form.name,email:form.email,phone:form.phone||'Not provided',
          service:form.service,budget:form.budget||'Please advise',message:form.message,
        }:form), signal:controller.signal,
      })
      const data=response.headers.get('content-type')?.includes('application/json')?await response.json():null
      if(!response.ok||(web3FormsKey?data?.success!==true:data?.sent!==true)) throw new Error('send-failed')
      setStatus('success')
      setNotice({type:'success',title:'Enquiry sent successfully!',message:'Thank you for contacting Webstead. We’ll get back to you soon.'})
    } catch (error) {
      setStatus('error')
      setNotice({type:'error',title:error.name==='AbortError'?'Delivery not confirmed':'Couldn’t send your enquiry',message:error.name==='AbortError'?'The request timed out. Please wait a moment before trying again. Your details are saved in the form.':'Please try again shortly. Your details are saved in the form.'})
      setError(error.name==='AbortError'?'The request timed out before we could confirm delivery. Please wait a moment before trying again. Your details have been kept.':'We couldn’t send your enquiry right now. Please try again shortly. Your details have been kept.')
    } finally { window.clearTimeout(timeout) }
  }
  return <form className="contact-form enquiry-form" onSubmit={submit}>
    <EnquiryToast notice={notice} onDismiss={dismissNotice}/>
    <div className="form-heading"><span className="eyebrow"><i/>LET’S MAKE IT HAPPEN</span><h2>What would you like to build?</h2><p>A few details are enough to start. No commitment needed.</p></div>
    {selectedPackage&&<p className="selected-plan"><Check size={17}/> {selectedPackage.name} package · {selectedPackage.price}</p>}
    <div className="form-grid">
      <label className="form-field"><span>Your name *</span><input name="name" autoComplete="name" minLength={2} maxLength={120} required value={form.name} onChange={update} placeholder="Full name"/></label>
      <label className="form-field"><span>Email address *</span><input name="email" type="email" autoComplete="email" maxLength={254} required value={form.email} onChange={update} placeholder="you@company.com"/></label>
      <label className="form-field"><span>Phone <small>(optional)</small></span><input name="phone" type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={update} placeholder="Your contact number"/></label>
      <label className="form-field"><span>I need help with *</span><select name="service" required value={form.service} onChange={update}><option value="">Choose a service</option>{services.map(s=><option key={s.id}>{s.title}</option>)}<option>Help choosing a service</option></select></label>
      <label className="form-field"><span>Budget <small>(optional)</small></span><select name="budget" value={form.budget} onChange={update}><option value="">Help me choose</option>{packages.map(p=><option key={p.id} value={p.price}>{p.name} · {p.price}</option>)}<option>Custom budget</option></select></label>
    </div>
    <label className="form-field message-field"><span>A little about your project *</span><textarea name="message" required minLength={10} maxLength={5000} rows={4} value={form.message} onChange={update} placeholder="What does your business do, and what should your website help customers do?"/></label>
    <label className="privacy-check"><input type="checkbox" name="privacy" required checked={form.privacy} onChange={update}/><span>You can contact me about this enquiry. <Link to="/privacy" target="_blank">Privacy details</Link></span></label>
    {error&&<p className="form-message error">{error}</p>}
    {status==='success'?<p className="form-message success">Thank you! Your enquiry has been sent to Webstead. We’ll get back to you using the details you provided.</p>:<button type="submit" className="button form-submit" disabled={status==='loading'} aria-busy={status==='loading'}>{status==='loading'?'Sending enquiry…':'Get my website quote'}<ArrowUpRight size={18}/></button>}
    <p className="form-note">Your enquiry goes directly to our team. We’ll discuss your needs before you commit.</p>
  </form>
}
