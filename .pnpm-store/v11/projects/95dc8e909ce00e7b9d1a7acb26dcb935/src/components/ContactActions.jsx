import { Phone } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import './ContactActions.css'

export default function ContactActions() {
  return <nav className="contact-actions-dock" aria-label="Quick contact">
    <a className="contact-dock-call" href="tel:+919845432516"><Phone size={20} aria-hidden="true"/><span>Call us</span></a>
    <a className="contact-dock-whatsapp" href="https://wa.me/919845432516" target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={22}/><span>WhatsApp</span></a>
  </nav>
}
