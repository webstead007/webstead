import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Check, PanelsTopLeft, ShoppingBag, Figma, RefreshCw, ShieldCheck, MessageCircle } from 'lucide-react'
import { packages } from '../data/packages'
import { services } from '../data/services'
import './ShowcaseSections.css'

const icons = { PanelsTopLeft, ShoppingBag, Figma, RefreshCw, ShieldCheck }
const offers = {
  'web-development': ['Make your business the easy choice.', 'From ₹5,000', 'Explore website packages', '/services#pricing'],
  ecommerce: ['Turn your products into an online store.', 'Quoted to your store', 'Plan my online store'],
  'ui-ux': ['Make every visit feel effortless.', 'Design & prototyping', 'Discuss my design'],
  redesign: ['Give your website a fresh start.', 'Refresh your existing site', 'Plan my redesign'],
  maintenance: ['Keep your website in good hands.', 'Ongoing website support', 'Get website support'],
}

export function ServiceCard({service,index=0}) {
  const Icon=icons[service.icon]
  const [headline,price,cta,to]=offers[service.id]
  return <article id={service.id} className="studio-service">
    <div className={`service-art service-art-${service.id}`} aria-hidden="true">
      <div className="art-grid"/><div className="art-orbit"/>
      {index===0&&<><div className="art-browser"><span className="art-toolbar"><i/><i/><i/></span><div className="art-hero"><Icon size={32}/><span/><span/></div><div className="art-columns"><i/><i/><i/></div></div><span className="art-float art-float-bottom"><Check size={13}/> Built for your brand</span></>}
      {index===1&&<><div className="art-store"><span className="art-toolbar"><i/><i/><i/></span><div className="art-products"><span/><span/><span/></div><div className="art-store-bottom"><ShoppingBag size={21}/><b>Ready for business</b></div></div><span className="art-float art-float-top"><Check size={13}/> A better checkout</span></>}
      {index===2&&<div className="art-design"><span><Figma size={36}/></span><ArrowRight size={24}/><span><PanelsTopLeft size={36}/></span><small>From idea to interface</small></div>}
      {index===3&&<><div className="art-wireframe"><i/><i/><i/><i/></div><div className="art-scan"/><span className="art-float art-float-bottom"><RefreshCw size={14}/> A fresh perspective</span></>}
      {index===4&&<><div className="art-shield"><ShieldCheck size={48}/></div><span className="art-float art-float-top">Updates & fixes</span><span className="art-float art-float-bottom"><Check size={13}/> Ongoing care</span></>}
    </div>
    <div className="studio-service-copy"><h3>{service.title}</h3><p>{service.description}</p><Link to={to||`/contact?service=${service.id}`}>{cta}<ArrowUpRight size={17}/></Link></div>
  </article>
}

export function ServicesGrid(){return <div className="studio-service-grid">{services.map((service,index)=><ServiceCard key={service.id} service={service} index={index}/>)}<article className="studio-service studio-service-invite"><span className="eyebrow"><i/>LET’S TALK</span><h3>Have a project<br/><em>in mind?</em></h3><p>A new website or a little help with the one you have. Start with a conversation.</p><div className="service-invite-note"><MessageCircle size={25}/><b>Your goals. Your budget.<br/>A clear way forward.</b><span>We’ll help you choose the right service and explain what’s included.</span></div><div className="service-invite-actions"><Link to="/services#pricing">View pricing <ArrowRight size={16}/></Link><Link to="/contact">Let’s talk <ArrowUpRight size={16}/></Link></div></article></div>}

export function PackagesSection() {
  return <section id="pricing" className="plans-section section-pad pricing-reference"><div className="wrap pricing-frame">
    <div className="plans-heading"><div><span className="eyebrow"><i/>GOOD DESIGN. CLEAR PRICING.</span><h2>Big possibilities.<br/><em>Down-to-earth prices.</em></h2></div><p>Choose the right foundation for your business.<br/>Thoughtful design, clear scope, and a team in your corner.</p></div>
    <div className="plans-assurance"><span><Check size={16}/> Mobile-friendly design</span><span><Check size={16}/> Scope agreed before we start</span><span><Check size={16}/> Direct contact with our team</span></div>
    <div className="plans-grid">{packages.map(p=><article key={p.id} className={`plan ${p.popular?'plan-featured':''}`}>
      <div className="plan-level" aria-hidden="true">{Array.from({length:packages.indexOf(p)+1},(_,i)=><i key={i}/>)}</div><div className="plan-top"><h3>{p.name}</h3>{p.popular&&<span>BUSINESS ESSENTIALS</span>}</div>
      <p className="plan-kind">{p.note}</p><div className={`plan-price ${p.id==='custom'?'plan-price-range':''}`}>{p.price}</div><small className="plan-currency">INR · project pricing</small>
      <p className="plan-description">{p.description}</p><ul>{p.features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul>
      <Link to={`/contact?package=${p.id}`} className={`button ${p.popular?'':'button-secondary'}`}>{p.id==='custom'?'Get a custom quote':`Choose ${p.name}`}<ArrowUpRight size={17}/></Link>
      <p className="plan-fit">{p.bestFor}</p>
    </article>)}</div>
    <div className="plans-help"><div><MessageCircle size={23}/><span><b>Not sure which package fits?</b><small>Tell us what you need. We’ll help you choose.</small></span></div><Link to="/contact">Help me choose <ArrowRight size={17}/></Link></div>
    <p className="plan-disclaimer">Starting prices for website development. E-commerce and integrations are quoted separately. Domain, hosting, taxes, content and paid tools are additional where applicable. Final scope and price are agreed before work starts.</p>
  </div></section>
}

const projectFeatures={1:['Scroll-driven product story','Product catalogue'],2:['Animated showroom','Custom jersey preview'],3:['Service-led navigation','Clear enquiry paths']}
export function ProjectCard({project}) {
  return <article className="work-card">
    <a className="work-preview" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Explore ${project.title} (opens in a new tab)`}>
      <div className="browser-bar"><span><i/><i/><i/></span><small>{new URL(project.liveUrl).hostname}</small><ArrowUpRight size={14}/></div>
      <img src={project.image} alt={`${project.title} website preview`} loading="lazy"/><span className="work-preview-label">Explore live website <ArrowUpRight size={16}/></span>
    </a>
    <div className="work-copy"><span className="work-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><ul>{projectFeatures[project.id]?.map(f=><li key={f}>{f}</li>)}</ul><Link to={`/contact?project=${project.id}`} className="work-enquire">Build something like this <ArrowRight size={17}/></Link></div>
  </article>
}
