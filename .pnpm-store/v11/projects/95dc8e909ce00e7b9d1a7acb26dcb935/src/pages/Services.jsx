import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PackagesSection, SEO, ServicesGrid, SectionTitle } from '../components/Site'
import { services } from '../data/services'

export default function Services(){return <><SEO title="Website & E-commerce Services | Webstead" description="Website design, e-commerce, UI/UX, redesign and maintenance services with clear package pricing from Webstead."/><section className="simple-page-hero"><div className="wrap"><span className="eyebrow"><i/>WHAT WE DO</span><h1>Websites that work<br/>for <em>your business.</em></h1><p>Practical web design and development services, with straightforward package pricing.</p></div></section><section className="services-section section-pad simple-services"><div className="wrap"><SectionTitle eyebrow="OUR SERVICES" title="Choose the help you need." description="Each project is scoped clearly, so you know what’s included before we start."/><ServicesGrid/><div className="service-simple-contact"><span>Need help choosing?</span><Link to="/contact" className="text-link">Tell us about your website <ArrowRight size={16}/></Link></div></div></section><PackagesSection/></>}
