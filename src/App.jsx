import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { SITE } from './data/site'

const ChiSono = lazy(() => import('./pages/ChiSono'))
const MetodoBussola = lazy(() => import('./pages/MetodoBussola'))
const Testimonianze = lazy(() => import('./pages/Testimonianze'))
const Caso = lazy(() => import('./pages/Caso'))
const Consulenza = lazy(() => import('./pages/Consulenza'))
const Masterclass = lazy(() => import('./pages/Masterclass'))
const Libro = lazy(() => import('./pages/Libro'))
const CryoVis = lazy(() => import('./pages/CryoVis'))
const NotFound = lazy(() => import('./pages/NotFound'))

const OldCaso = () => {
  const { slug } = useParams()
  return <Navigate to={`/testimonianze/${slug}`} replace />
}

const Privacy = () => {
  useEffect(() => {
    window.location.replace(SITE.privacy)
  }, [])
  return null
}

const Cookie = () => {
  useEffect(() => {
    window.location.replace(SITE.cookie)
  }, [])
  return null
}

const App = () => (
  <Router>
    <Suspense fallback={<div className="page-loading" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chi-sono" element={<ChiSono />} />
          <Route path="/metodo-bussola" element={<MetodoBussola />} />
          <Route path="/testimonianze" element={<Testimonianze />} />
          <Route path="/testimonianze/:slug" element={<Caso />} />
          <Route path="/consulenza-conoscitiva" element={<Consulenza />} />
          <Route path="/masterclass" element={<Masterclass />} />
          <Route path="/libro" element={<Libro />} />
          <Route path="/landing-cryovis" element={<CryoVis />} />

          {/* Indirizzi del vecchio sito Shopify */}
          <Route path="/pages/chi-sono" element={<Navigate to="/chi-sono" replace />} />
          <Route path="/pages/consulenza-conoscitiva" element={<Navigate to="/consulenza-conoscitiva" replace />} />
          <Route path="/pages/lista-attesa" element={<Navigate to="/consulenza-conoscitiva" replace />} />
          <Route path="/pages/masterclass" element={<Navigate to="/masterclass" replace />} />
          <Route path="/pages/landing-cryovis" element={<Navigate to="/landing-cryovis" replace />} />
          <Route path="/products/libro" element={<Navigate to="/libro" replace />} />
          <Route path="/collections/*" element={<Navigate to="/libro" replace />} />
          <Route path="/blogs/testimonianze" element={<Navigate to="/testimonianze" replace />} />
          <Route path="/blogs/testimonianze/:slug" element={<OldCaso />} />
          <Route path="/policies/privacy-policy" element={<Privacy />} />
          <Route path="/pages/privacy-policy" element={<Privacy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie-policy" element={<Cookie />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
)

export default App
