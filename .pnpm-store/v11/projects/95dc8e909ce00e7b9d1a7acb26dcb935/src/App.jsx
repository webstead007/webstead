import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Footer, Navbar } from './components/Site'
import Home from './pages/Home'
import ContactActions from './components/ContactActions'
const Services=lazy(()=>import('./pages/Services'))
const About=lazy(()=>import('./pages/About'))
const Portfolio=lazy(()=>import('./pages/Portfolio'))
const Contact=lazy(()=>import('./pages/Contact'))
const Privacy=lazy(()=>import('./pages/Privacy'))

function Layout(){const location=useLocation();const reduced=useReducedMotion();return <><Navbar/><AnimatePresence mode="wait" initial={false}><motion.main key={location.pathname} initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={reduced?undefined:{opacity:0,y:-5}} transition={{duration:.28}}><Suspense fallback={<div className="route-loading" aria-label="Loading page"/>}><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/><Route path="/about" element={<About/>}/><Route path="/work" element={<Portfolio/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="*" element={<Home/>}/></Routes></Suspense></motion.main></AnimatePresence><Footer/><ContactActions/></>}
export default function App(){return <BrowserRouter><Layout/></BrowserRouter>}

